'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ReviewForm } from '@/components/review-form'
import { generateStars, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Review } from '@/lib/types'
import { MessageSquare, AlertCircle } from 'lucide-react'

interface ModelReviewsProps {
  reviews: (Review & { user?: { name?: string } })[]
  modelId: string
  modelName: string
}

export function ModelReviews({ reviews, modelId, modelName }: ModelReviewsProps) {
  const [showForm, setShowForm] = useState(false)

  const handleSubmitReview = async (review: { rating: number; title: string; content: string }) => {
    // In production, this would call the API
    console.log('Submitting review:', { modelId, ...review })
    setShowForm(false)
    // TODO: Add review to list via API call
  }

  if (!reviews?.length) {
    return (
      <Card className="border-white/10">
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">Aún no hay reseñas</p>
          <p className="text-sm text-white/30 mt-1 mb-6">Sé el primero en dejar una reseña</p>
          <Button onClick={() => setShowForm(true)} className="glow-gold">
            <MessageSquare className="h-4 w-4 mr-2" />
            Escribir Reseña
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-xl">Reseñas</CardTitle>
            <div className="flex gap-2">
              <span className="text-sm text-white/50">{reviews.length} reseñas</span>
              <Button onClick={() => setShowForm(true)} size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-1" />
                Escribir
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => {
              const stars = generateStars(review.rating)
              const date = new Date(review.createdAt)

              return (
                <div key={review.id} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold">
                        {review.user?.name?.[0]?.toUpperCase() ?? 'A'}
                      </div>
                      <div>
                        <span className="font-medium text-white">
                          {review.user?.name ?? 'Anónimo'}
                        </span>
                        <p className="text-xs text-white/40 mt-0.5">
                          {formatDate(date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {stars.map((star, i) => (
                        <span
                          key={i}
                          className={cn(
                            'text-sm',
                            star === 'full' ? 'text-secondary' : star === 'half' ? 'text-secondary/50' : 'text-white/20'
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {review.title && (
                    <h4 className="font-medium text-white mt-3">{review.title}</h4>
                  )}
                  {review.content && (
                    <p className="text-sm text-white/60 mt-2 leading-relaxed">
                      {review.content}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <ReviewForm
          modelId={modelId}
          modelName={modelName}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  )
}