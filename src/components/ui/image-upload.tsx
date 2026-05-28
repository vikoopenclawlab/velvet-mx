'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string) => void
  onChangePublicId?: (publicId: string) => void
  label: string
  description?: string
  aspectRatio?: 'square' | 'video' | 'portrait'
  maxSizeMB?: number
  className?: string
  disabled?: boolean
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
}

export function ImageUpload({
  value,
  onChange,
  onChangePublicId,
  label,
  description,
  aspectRatio = 'video',
  maxSizeMB = 5,
  className,
  disabled = false,
}: ImageUploadProps) {
  const [status, setStatus] = useState<UploadStatus>(value ? 'success' : 'idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMessage('Solo se permiten archivos JPG, PNG o WebP')
      setStatus('error')
      return
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`El archivo es demasiado grande. Máximo: ${maxSizeMB}MB`)
      setStatus('error')
      return
    }

    setStatus('uploading')
    setErrorMessage('')

    try {
      // Convert to base64 for Next.js API route upload
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = async () => {
        const base64 = reader.result as string

        try {
          const res = await fetch('/api/upload/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64, folder: 'velvet-mx/kyc' }),
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || 'Error uploading image')
          }

          onChange(data.secure_url)
          if (data.public_id) {
            onChangePublicId?.(data.public_id)
          }
          setStatus('success')
        } catch (err: any) {
          setErrorMessage(err.message || 'Error al subir la imagen')
          setStatus('error')
        }
      }

      reader.onerror = () => {
        setErrorMessage('Error al leer el archivo')
        setStatus('error')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error unknown')
      setStatus('error')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    onChange('')
    if (onChangePublicId) onChangePublicId('')
    setStatus('idle')
    setErrorMessage('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className={className}>
      {label && (
        <label className="text-sm font-medium text-white/60 mb-2 block">
          {label}
        </label>
      )}

      {status === 'success' && value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className={cn('w-full object-cover', aspectClasses[aspectRatio])}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
              disabled={disabled}
            >
              <Upload className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/80 hover:text-red-400 transition-colors"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Subida
            </span>
          </div>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all',
            aspectClasses[aspectRatio],
            isDragging
              ? 'border-secondary bg-secondary/10'
              : 'border-white/20 bg-primary hover:border-secondary/50',
            disabled && 'opacity-50 cursor-not-allowed',
            status === 'error' && 'border-red-500/50 bg-red-500/5'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleInputChange}
            disabled={disabled}
          />

          {status === 'uploading' ? (
            <>
              <Loader2 className="h-10 w-10 text-secondary animate-spin" />
              <span className="text-sm text-white/60">Subiendo imagen...</span>
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle className="h-10 w-10 text-red-400" />
              <div className="text-center px-4">
                <span className="text-sm text-red-400">{errorMessage}</span>
              </div>
              <span className="text-xs text-white/40">Clic para reintentar</span>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                {description ? (
                  <ImageIcon className="h-8 w-8 text-white/30" />
                ) : (
                  <Upload className="h-8 w-8 text-white/30" />
                )}
              </div>
              <div className="text-center">
                <span className="text-sm text-white/60 block">
                  {description || 'Clic o arrastra para subir'}
                </span>
                <span className="text-xs text-white/30 mt-1 block">
                  JPG, PNG o WebP · Máx {maxSizeMB}MB
                </span>
              </div>
            </>
          )}
        </label>
      )}
    </div>
  )
}
