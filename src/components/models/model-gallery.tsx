"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModelGalleryProps {
  images: string[];
  modelName: string;
}

export function ModelGallery({ images, modelName }: ModelGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer"
          >
            <Image
              src={img}
              alt={`${modelName} ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative aspect-[3/4] md:aspect-video">
            {selected !== null && (
              <>
                <Image
                  src={images[selected]}
                  alt={`${modelName} ${selected + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />

                {/* Navigation */}
                {selected > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}
                {selected < images.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                  {selected + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
