'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { X, Plus, Loader2 } from 'lucide-react'

// Demo gallery - in production would come from API
const DEMO_GALLERY = [
  'https://picsum.photos/seed/model-1/400/600',
  'https://picsum.photos/seed/model-2/400/600',
  'https://picsum.photos/seed/model-3/400/600',
  'https://picsum.photos/seed/model-4/400/600',
]

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>(DEMO_GALLERY)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleAddImage = async (url: string) => {
    if (images.length >= 20) {
      alert('Máximo 20 fotos en la galería')
      return
    }
    setImages([...images, url])
    setShowUpload(false)
  }

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Mi Galería</h1>
            <p className="text-white/50 text-sm mt-1">{images.length}/20 fotos</p>
          </div>
          <Button onClick={() => setShowUpload(true)} disabled={images.length >= 20}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Foto
          </Button>
        </div>

        <Card className="border-white/10 mb-8">
          <CardContent className="p-6">
            <p className="text-white/50 text-sm">
              Sube fotos de alta calidad (mínimo 800x1200px). Solo extensiones JPG, PNG, WebP.
              Máximo 5MB por imagen. La primera foto será tu foto de portada.
            </p>
          </CardContent>
        </Card>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <Card className="border-white/20 bg-primary w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-display text-lg font-semibold text-white">Subir foto</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <CardContent className="p-6">
                <ImageUpload
                  label=""
                  description="Clic o arrastra para subir"
                  onChange={handleAddImage}
                  aspectRatio="portrait"
                  maxSizeMB={5}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <Card className="border-white/10">
            <CardContent className="py-20 text-center">
              <p className="text-white/50">No tienes fotos en tu galería</p>
              <Button onClick={() => setShowUpload(true)} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Agregar primera foto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                <Image
                  src={img}
                  alt={`Foto ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(i)}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {i === 0 && (
                  <div className="absolute bottom-2 left-2 bg-secondary text-primary text-xs px-2 py-1 rounded font-medium">
                    Portada
                  </div>
                )}
              </div>
            ))}

            {/* Add more button */}
            {images.length < 20 && (
              <button
                onClick={() => setShowUpload(true)}
                className="aspect-[3/4] rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-secondary/50 transition-colors text-white/40 hover:text-secondary"
              >
                <Plus className="h-8 w-8" />
                <span className="text-sm">Agregar</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}