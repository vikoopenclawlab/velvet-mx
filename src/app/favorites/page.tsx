"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ModelGrid } from "@/components/models/model-grid";
import { SEED_MODELS, SEED_CITIES } from "@/lib/seed-data";
import { Heart } from "lucide-react";
import type { ModelProfile } from "@/lib/types";

export default function FavoritesPage() {
  const favorites: any[] = SEED_MODELS.slice(0, 6).map((m) => ({
    ...m,
    city: SEED_CITIES.find((c) => c.id === m.cityId),
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-secondary" />
          <h1 className="font-display text-3xl font-bold text-white">Mis Favoritos</h1>
        </div>

        {favorites.length > 0 ? (
          <ModelGrid models={favorites} columns={3} />
        ) : (
          <Card className="border-white/10">
            <CardContent className="py-20 text-center">
              <Heart className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 text-lg text-center">
                Aún no tienes modelos en favoritos
              </p>
              <p className="text-white/30 text-sm mt-2">
                Explora y guarda tus modelos preferidas
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
