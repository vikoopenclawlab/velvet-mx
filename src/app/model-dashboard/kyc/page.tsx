'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/ui/image-upload'
import { Upload, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react'

type KycStatus = 'NOT_SUBMITTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

const statusConfig: Record<KycStatus, { label: string; color: string; icon: typeof CheckCircle; description: string }> = {
  NOT_SUBMITTED: {
    label: 'No enviada',
    color: 'bg-white/10 text-white/60',
    icon: AlertCircle,
    description: 'Necesitas verificar tu identidad para publicar tu perfil.',
  },
  SUBMITTED: {
    label: 'En revisión',
    color: 'bg-secondary/20 text-secondary',
    icon: Clock,
    description: 'Tus documentos están siendo revisados por nuestro equipo.',
  },
  APPROVED: {
    label: 'Verificada',
    color: 'bg-green-500/20 text-green-400',
    icon: CheckCircle,
    description: 'Tu identidad ha sido verificada. Tu perfil es visible.',
  },
  REJECTED: {
    label: 'Rechazada',
    color: 'bg-red-500/20 text-red-400',
    icon: AlertCircle,
    description: 'Tu verificación fue rechazada. Revisa los motivos e intenta de nuevo.',
  },
}

export default function KycPage() {
  const [kycStatus, setKycStatus] = useState<KycStatus>('NOT_SUBMITTED')
  const [documents, setDocuments] = useState({
    ineFront: '',
    ineBack: '',
    selfie: '',
  })
  const [publicIds, setPublicIds] = useState({
    ineFront: '',
    ineBack: '',
    selfie: '',
  })
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rejectedReason] = useState<string | null>('La foto del anverso del INE no es legible. Asegúrate de que el texto sea visible y la imagen esté bien iluminada.')

  const handleSubmit = async () => {
    if (!documents.ineFront || !documents.ineBack || !documents.selfie) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: 'current-user-model-id', // Would come from session
          ineFrontUrl: documents.ineFront,
          ineBackUrl: documents.ineBack,
          selfieUrl: documents.selfie,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setKycStatus('SUBMITTED')
      } else {
        alert(data.error || 'Error submitting KYC')
      }
    } catch (err) {
      alert('Error submitting KYC')
    } finally {
      setSubmitting(false)
    }
  }

  const config = statusConfig[kycStatus]
  const Icon = config.icon

  const allUploaded = documents.ineFront && documents.ineBack && documents.selfie

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

        {/* Document Upload */}
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
                Para verificar tu identidad necesitas subir 3 documentos. Las fotos deben ser claras y legibles.
              </p>

              {/* INE Front */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload
                  label="INE - Anverso (frente)"
                  description="Lado con fotografía y datos personales"
                  value={documents.ineFront}
                  onChange={(url) => setDocuments(prev => ({ ...prev, ineFront: url }))}
                  onChangePublicId={(id) => setPublicIds(prev => ({ ...prev, ineFront: id }))}
                  aspectRatio="video"
                  maxSizeMB={5}
                  disabled={kycStatus === 'SUBMITTED'}
                />
                {/* INE Back */}
                <ImageUpload
                  label="INE - Reverso (atrás)"
                  description="Lado con código de barras"
                  value={documents.ineBack}
                  onChange={(url) => setDocuments(prev => ({ ...prev, ineBack: url }))}
                  onChangePublicId={(id) => setPublicIds(prev => ({ ...prev, ineBack: id }))}
                  aspectRatio="video"
                  maxSizeMB={5}
                  disabled={kycStatus === 'SUBMITTED'}
                />
              </div>

              {/* Selfie */}
              <ImageUpload
                label="Selfie con INE"
                description="Toma una selfie sosteniendo tu INE junto a tu rostro"
                value={documents.selfie}
                onChange={(url) => setDocuments(prev => ({ ...prev, selfie: url }))}
                onChangePublicId={(id) => setPublicIds(prev => ({ ...prev, selfie: id }))}
                aspectRatio="portrait"
                maxSizeMB={5}
                disabled={kycStatus === 'SUBMITTED'}
              />

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!allUploaded || submitting || kycStatus === 'SUBMITTED'}
                className="w-full glow-gold"
              >
                {submitting ? (
                  'Enviando...'
                ) : kycStatus === 'SUBMITTED' ? (
                  'En revisión...'
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar para verificación
                  </>
                )}
              </Button>

              {!allUploaded && kycStatus === 'NOT_SUBMITTED' && (
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
              Tus documentos se almacenan de forma segura encriptada.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}