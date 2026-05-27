"use client";

import Image from "next/image";
import { BadgeCheck, MapPin, Clock, Languages, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateStars, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { ModelProfile } from "@/lib/types";

interface ModelProfileHeaderProps {
  model: ModelProfile;
}

export function ModelProfileHeader({ model }: ModelProfileHeaderProps) {
  const stars = generateStars(model.rating);

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
        <Image
          src={model.mainPhoto}
          alt={model.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-secondary/30 shadow-2xl shrink-0">
              <Image
                src={model.mainPhoto}
                alt={model.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-white">
                  {model.name}
                </h1>
                {model.verified && (
                  <Badge variant="accent" className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4" />
                    Verificada
                  </Badge>
                )}
                <Badge variant="outline">
                  {model.type === "ACOMPANANTE" ? "Acompañante" : model.type === "TRAVESTI" ? "Travesti" : "Masajista"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/70">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span>{model.city?.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-secondary" />
                  <span>{model.age} años</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-secondary" />
                  <span>{model.languages?.join(", ") ?? "Español"}</span>
                </div>
              </div>

              {model.tagline && (
                <p className="text-lg text-secondary italic font-display">
                  &ldquo;{model.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="lg:text-right space-y-2 shrink-0">
              <div className="flex items-center gap-1 lg:justify-end">
                {stars.map((star, i) => (
                  <span key={i} className={cn(
                    "text-lg",
                    star === "full" ? "text-secondary" : star === "half" ? "text-secondary/50" : "text-white/20"
                  )}>
                    ★
                  </span>
                ))}
                <span className="text-white/60 ml-2">
                  {model.rating} ({model.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 lg:justify-end text-sm text-white/50">
                <Eye className="h-4 w-4" />
                <span>{model.viewCount.toLocaleString()} vistas</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="glow-gold">
              Reservar Ahora
            </Button>
            <Button size="lg" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
