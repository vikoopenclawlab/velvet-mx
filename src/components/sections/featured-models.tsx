import Link from "next/link";
import { ModelCard } from "@/components/models/model-card";
import { Button } from "@/components/ui/button";
;
import type { ModelProfile } from "@/lib/types";

interface FeaturedModelsProps {
  models: ModelProfile[];
}

export function FeaturedModels({ models }: FeaturedModelsProps) {
  if (!models?.length) return null;

  return (
    <section className="py-20 bg-primary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Modelos Destacadas
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Las acompañantes más populares seleccionadas por nuestro equipo.
            Cada una verificada personalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.slice(0, 6).map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/models">
            <Button variant="secondary" size="lg">
              Ver Todas las Modelos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
