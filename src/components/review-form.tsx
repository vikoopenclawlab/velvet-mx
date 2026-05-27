'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { X, Star, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
  modelId: string
  modelName: string
  onClose: () => void
  onSubmit: (review: { rating: number; title: string; content: string }) => void
}

export function ReviewForm({ modelId, modelName, onClose, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    setSubmitting(true)
    await onSubmit({ rating, title, content })
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="border-white/20 bg-primary w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-display text-lg font-semibold text-white">
            Reseñar a {modelName}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <CardContent className="p-6 space-y-6">
          {/* Star Rating */}
          <div>
            <label className="text-sm text-white/60 mb-3 block">Tu valoración</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      'h-8 w-8 transition-colors',
                      star <= (hoverRating || rating)
                        ? 'fill-secondary text-secondary'
                        : 'text-white/20 hover:text-white/40'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Título (opcional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resumen de tu experiencia..."
              className="w-full bg-secondary/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary/50 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm text-white/60 mb-2 block">Tu reseña (opcional)</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Cuéntanos tu experiencia con esta acompañante..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || submitting}
              className="flex-1 glow-gold"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Enviando...' : 'Enviar Reseña'}
            </Button>
          </div>

          <p className="text-xs text-white/40 text-center">
            Tu reseграба hanya bisa diberikan sekali per modelo
          </p>
        </CardContent>
      </Card>
    </div>
  )
}