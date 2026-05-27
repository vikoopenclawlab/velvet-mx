"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, generateStars } from "@/lib/utils";
import type { ModelProfile } from "@/lib/types";

interface ModelCardProps {
  model: ModelProfile;
  className?: string;
}

export function ModelCard({ model, className }: ModelCardProps) {
  const stars = generateStars(model.rating);

  return (
    <Link href={`/models/${model.id}`}>
      <Card className={cn("overflow-hidden group cursor-pointer border-white/10 hover:border-secondary/30 transition-all duration-300", className)}>
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={model.mainPhoto}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Verified Badge */}
          {model.verified && (
            <div className="absolute top-3 right-3">
              <Badge variant="accent" className="flex items-center gap-1">
                <BadgeCheck className="h-3 w-3" />
                Verificada
              </Badge>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-secondary">
              Desde {formatPrice(model.services?.[0]?.price ?? 1200)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-white group-hover:text-secondary transition-colors">
                {model.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-white/60 mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{model.city?.name ?? "México"}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              {stars.map((star, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    star === "full" ? "fill-secondary text-secondary" : star === "half" ? "text-secondary" : "text-white/20"
                  )}
                />
              ))}
              <span className="text-xs text-white/60 ml-1">({model.reviewCount})</span>
            </div>
          </div>

          {model.tagline && (
            <p className="text-sm text-white/50 line-clamp-1">{model.tagline}</p>
          )}

          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <Badge variant="outline" className="text-xs">
              {model.type === "ACOMPANANTE" ? "Acompañante" : model.type === "TRAVESTI" ? "Travesti" : "Masajista"}
            </Badge>
            <span className="text-xs text-white/40">{model.age} años</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
