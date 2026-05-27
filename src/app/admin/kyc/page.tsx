'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Eye, Image as ImageIcon, User } from 'lucide-react'

type KycSubmission = {
  id: string
  name: string
  email: string
  kycStatus: 'NOT_SUBMITTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
  kycSubmittedAt: string | null
  ineFrontUrl: string | null
  ineBackUrl: string | null
  selfieUrl: string | null
  verified: boolean
  createdAt: string
}

// Mock data for demonstration - in real app this would come from API
const mockSubmissions: KycSubmission[] = [
  {
    id: '1',
    name: 'Valentina Noir',
    email: 'valentina@example.com',
    kycStatus: 'SUBMITTED',
    kycSubmittedAt: '2026-05-27T10:00:00Z',
    ineFrontUrl: '/images/kyc/ine-front-1.jpg',
    ineBackUrl: '/images/kyc/ine-back-1.jpg',
    selfieUrl: '/images/kyc/selfie-1.jpg',
    verified: false,
    createdAt: '2026-05-20T08:00:00Z',
  },
  {
    id: '2',
    name: 'Luna Reyes',
    email: 'luna@example.com',
    kycStatus: 'NOT_SUBMITTED',
    kycSubmittedAt: null,
    ineFrontUrl: null,
    ineBackUrl: null,
    selfieUrl: null,
    verified: false,
    createdAt: '2026-05-21T09:00:00Z',
  },
  {
    id: '3',
    name: 'Sofia Mencia',
    email: 'sofia@example.com',
    kycStatus: 'APPROVED',
    kycSubmittedAt: '2026-05-25T14:00:00Z',
    ineFrontUrl: '/images/kyc/ine-front-3.jpg',
    ineBackUrl: '/images/kyc/ine-back-3.jpg',
    selfieUrl: '/images/kyc/selfie-3.jpg',
    verified: true,
    createdAt: '2026-05-22T10:00:00Z',
  },
]

const statusConfig = {
  NOT_SUBMITTED: { label: 'No enviada', color: 'bg-white/10 text-white/60', icon: Clock },
  SUBMITTED: { label: 'En revisión', color: 'bg-secondary/20 text-secondary', icon: Clock },
  APPROVED: { label: 'Aprobada', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  REJECTED: { label: 'Rechazada', color: 'bg-red-500/20 text-red-400', icon: XCircle },
}

export default function AdminKycPage() {
  const [submissions, setSubmissions] = useState<KycSubmission[]>(mockSubmissions)
  const [filter, setFilter] = useState<'ALL' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'>('SUBMITTED')
  const [selectedSubmission, setSelectedSubmission] = useState<KycSubmission | null>(null)

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'ALL') return true
    return sub.kycStatus === filter
  })

  const pendingCount = submissions.filter(s => s.kycStatus === 'SUBMITTED').length

  const handleApprove = (id: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, kycStatus: 'APPROVED' as const, verified: true }
          : s
      )
    )
    setSelectedSubmission(null)
  }

  const handleReject = (id: string) => {
    setSubmissions(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, kycStatus: 'REJECTED' as const }
          : s
      )
    )
    setSelectedSubmission(null)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Revisión KYC</h1>
            <p className="text-white/60">Verificación de identidad de modelos</p>
          </div>
          {pendingCount > 0 && (
            <Badge className="bg-secondary/20 text-secondary px-4 py-2">
              <Clock className="h-4 w-4 mr-1" />
              {pendingCount} pendientes
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(['ALL', 'SUBMITTED', 'APPROVED', 'REJECTED'] as const).map(status => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              size="sm"
            >
              {status === 'ALL' ? 'Todas' :
               status === 'SUBMITTED' ? 'Pendientes' :
               status === 'APPROVED' ? 'Aprobadas' : 'Rechazadas'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredSubmissions.length === 0 ? (
              <Card className="border-white/10">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-white/60">No hay solicitudes en esta categoría</p>
                </CardContent>
              </Card>
            ) : (
              filteredSubmissions.map(submission => {
                const config = statusConfig[submission.kycStatus]
                const Icon = config.icon
                return (
                  <Card
                    key={submission.id}
                    className={`border-white/10 cursor-pointer hover:border-secondary/50 transition-colors ${
                      selectedSubmission?.id === submission.id ? 'border-secondary' : ''
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                          {submission.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white">{submission.name}</h3>
                            {submission.verified && (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            )}
                          </div>
                          <p className="text-sm text-white/50">{submission.email}</p>
                        </div>
                        <Badge className={`${config.color} px-2 py-1`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <Card className="border-white/10 sticky top-4">
                <CardHeader>
                  <CardTitle className="font-display text-xl">Detalles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-2xl font-bold mx-auto mb-3">
                      {selectedSubmission.name.charAt(0)}
                    </div>
                    <h3 className="font-medium text-white">{selectedSubmission.name}</h3>
                    <p className="text-sm text-white/50">{selectedSubmission.email}</p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Documentos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {/* INE Front */}
                      <a
                        href={selectedSubmission.ineFrontUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square bg-primary rounded-lg flex items-center justify-center border border-white/10 hover:border-secondary/50 transition-colors"
                      >
                        {selectedSubmission.ineFrontUrl ? (
                          <ImageIcon className="h-6 w-6 text-white/40" />
                        ) : (
                          <span className="text-xs text-white/40">-</span>
                        )}
                      </a>
                      {/* INE Back */}
                      <a
                        href={selectedSubmission.ineBackUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square bg-primary rounded-lg flex items-center justify-center border border-white/10 hover:border-secondary/50 transition-colors"
                      >
                        {selectedSubmission.ineBackUrl ? (
                          <ImageIcon className="h-6 w-6 text-white/40" />
                        ) : (
                          <span className="text-xs text-white/40">-</span>
                        )}
                      </a>
                      {/* Selfie */}
                      <a
                        href={selectedSubmission.selfieUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square bg-primary rounded-lg flex items-center justify-center border border-white/10 hover:border-secondary/50 transition-colors"
                      >
                        {selectedSubmission.selfieUrl ? (
                          <User className="h-6 w-6 text-white/40" />
                        ) : (
                          <span className="text-xs text-white/40">-</span>
                        )}
                      </a>
                    </div>
                    <p className="text-xs text-white/40 text-center mt-2">
                      INE frontal | INE reverso | Selfie
                    </p>
                  </div>

                  {selectedSubmission.kycStatus === 'SUBMITTED' && (
                    <div className="border-t border-white/10 pt-4 flex gap-2">
                      <Button
                        onClick={() => handleApprove(selectedSubmission.id)}
                        className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedSubmission.id)}
                        variant="outline"
                        className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}

                  {selectedSubmission.kycStatus === 'SUBMITTED' && (
                    <p className="text-xs text-white/40 text-center">
                      Fecha de envío: {new Date(selectedSubmission.kycSubmittedAt!).toLocaleDateString('es-MX')}
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-white/10">
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">Selecciona una solicitud para ver detalles</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}