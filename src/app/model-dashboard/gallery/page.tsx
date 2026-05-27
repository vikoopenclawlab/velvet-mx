"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Upload, Plus } from "lucide-react";

const DEMO_GALLERY = [
  "https://picsum.photos/seed/model-1/400/600",
  "https://picsum.photos/seed/model-2/400/600",
  "https://picsum.photos/seed/model-3/400/600",
  "https://picsum.photos/seed/model-4/400/600",
];

export default function GalleryPage() {
  const [images, setImages] = useState(DEMO_GALLERY);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Mi Galería</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Foto
          </Button>
        </div>

        <Card className="border-white/10 mb-8">
          <CardContent className="p-6">
            <p className="text-white/50 text-sm">
              Sube fotos de alta calidad (mínimo 800x1200px). Solo extensiones JPG, PNG, WebP.
              Máximo 10MB por imagen.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
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
        </div>
      </div>
    </div>
  );
}
