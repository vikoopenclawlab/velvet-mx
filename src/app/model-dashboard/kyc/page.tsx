'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Camera, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react'

type KycStatus = 'NOT_SUBMITTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

const statusConfig: Record<KycStatus, { label: string; color: string; icon: typeof CheckCircle; description: string }> = {
  NOT_SUBMITTED: {
    label: 'No enviada',
    color: 'bg-white/10 text-white/60',
    icon: AlertCircle,
    description: 'Necesitas verificar tu identidad para публиковать tu perfil.'
  },
  SUBMITTED: {
    label: 'En revisión',
    color: 'bg-secondary/20 text-secondary',
    icon: Clock,
    description: 'Tus documentos están siendo revisados por nuestro equipo.'
  },
  APPROVED: {
    label: 'Verificada',
    color: 'bg-green-500/20 text-green-400',
    icon: CheckCircle,
    description: 'Tu identidad ha sido verificada. Tu perfil es visible.'
  },
  REJECTED: {
    label: 'Rechazada',
    color: 'bg-red-500/20 text-red-400',
    icon: AlertCircle,
    description: 'Tu verificación fue rechazada. Revisa los motivos e intenta de nuevo.'
  },
}

export default function KycPage() {
  // Mock status - in real app this would come from API
  const [kycStatus, setKycStatus] = useState<KycStatus>('NOT_SUBMITTED')
  const [files, setFiles] = useState({
    ineFront: null as File | null,
    ineBack: null as File | null,
    selfie: null as File | null,
  })
  const [uploading, setUploading] = useState(false)
  const [rejectedReason] = useState<string | null>('La foto del anverso del INE no es legible. Asegúrate de que el texto sea visible y la imagen esté bien iluminada.')

  const handleFileChange = (field: keyof typeof files, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }))
    }
  }

  const handleSubmit = async () => {
    setUploading(true)
    // Simulate upload - in real app this would call the API
    await new Promise(resolve => setTimeout(resolve, 2000))
    setKycStatus('SUBMITTED')
    setUploading(false)
  }

  const config = statusConfig[kycStatus]
  const Icon = config.icon

  const allFilesUploaded = files.ineFront && files.ineBack && files.selfie

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Verificación KYC</h1>
            <p className="text-white/60">Verificación de identidad obligatoria para modelos</p>
          </div>
          <Badge className={`${config.color} px-3 py-1`}>
            <Icon className="h-4 w-4 mr-1" />
            {config.label}
          </Badge>
        </div>

        {/* Status Card */}
        <Card className="border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{config.label}</h3>
                <p className="text-sm text-white/60 mt-1">{config.description}</p>
                {kycStatus === 'REJECTED' && rejectedReason && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400">
                      <strong>Razón del rechazo:</strong> {rejectedReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Instructions */}
        {kycStatus !== 'APPROVED' && (
          <Card className="border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                Documentos requeridos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-white/60">
                Para verificar tu identidad necesitas subir 3 documentos:
              </p>

              {/* INE Front */}
              <div className="border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">INE - Anverso (frente)</h4>
                    <p className="text-xs text-white/50">Lado con fotografía y datos personales</p>
                  </div>
                  {files.ineFront && (
                    <Badge className="bg-green-500/20 text-green-400">✓ Cargado</Badge>
                  )}
                </div>
                <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-secondary/50 transition-colors">
                  <Upload className="h-5 w-5 text-white/40" />
                  <span className="text-sm text-white/60">
                    {files.ineFront ? files.ineFront.name : 'Subir foto'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange('ineFront', e)}
                  />
                </label>
              </div>

              {/* INE Back */}
              <div className="border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">INE - Reverso (atrás)</h4>
                    <p className="text-xs text-white/50">Lado con código de barras</p>
                  </div>
                  {files.ineBack && (
                    <Badge className="bg-green-500/20 text-green-400">✓ Cargado</Badge>
                  )}
                </div>
                <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-secondary/50 transition-colors">
                  <Upload className="h-5 w-5 text-white/40" />
                  <span className="text-sm text-white/60">
                    {files.ineBack ? files.ineBack.name : 'Subir foto'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange('ineBack', e)}
                  />
                </label>
              </div>

              {/* Selfie */}
              <div className="border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">Selfie con INE</h4>
                    <p className="text-xs text-white/50">Toma una selfie sosteniendo tu INE junto a tu rostro</p>
                  </div>
                  {files.selfie && (
                    <Badge className="bg-green-500/20 text-green-400">✓ Cargado</Badge>
                  )}
                </div>
                <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-secondary/50 transition-colors">
                  <Camera className="h-5 w-5 text-white/40" />
                  <span className="text-sm text-white/60">
                    {files.selfie ? files.selfie.name : 'Subir selfie'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange('selfie', e)}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!allFilesUploaded || uploading || kycStatus === 'SUBMITTED'}
                className="w-full glow-gold"
              >
                {uploading ? (
                  'Subiendo documentos...'
                ) : kycStatus === 'SUBMITTED' ? (
                  'En revisión...'
                ) : (
                  'Enviar para verificación'
                )}
              </Button>

              {!allFilesUploaded && kycStatus === 'NOT_SUBMITTED' && (
                <p className="text-xs text-white/40 text-center">
                  Sube los 3 documentos para continuar
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Legal Note */}
        <Card className="border-white/5 bg-transparent">
          <CardContent className="p-4">
            <p className="text-xs text-white/40">
              <strong className="text-white/60">Nota legal:</strong> Los documentos recopilados son únicamente 
              para verificación de identidad y no serán compartidos con terceros. El tratamiento de datos 
              personales se realiza de acuerdo con nuestra{' '}
              <a href="/privacy" className="text-secondary hover:underline">Política de Privacidad</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}