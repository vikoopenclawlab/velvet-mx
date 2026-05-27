import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { generateStars, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/types";

interface ModelReviewsProps {
  reviews: (Review & { user?: { name?: string } })[];
}

export function ModelReviews({ reviews }: ModelReviewsProps) {
  if (!reviews?.length) {
    return (
      <Card className="border-white/10">
        <CardContent className="py-12 text-center">
          <p className="text-white/50">Aún no hay reseñas</p>
          <p className="text-sm text-white/30 mt-1">Sé el primero en dejar una reseña</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-xl">Reseñas</CardTitle>
          <span className="text-sm text-white/50">{reviews.length} reseñas</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => {
            const stars = generateStars(review.rating);
            const date = new Date(review.createdAt);

            return (
              <div key={review.id} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-semibold">
                      {review.user?.name?.[0]?.toUpperCase() ?? "A"}
                    </div>
                    <div>
                      <span className="font-medium text-white">
                        {review.user?.name ?? "Anónimo"}
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
                          "text-sm",
                          star === "full" ? "text-secondary" : star === "half" ? "text-secondary/50" : "text-white/20"
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
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
