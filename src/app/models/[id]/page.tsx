import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModelProfileHeader } from "@/components/models/model-profile-header";
import { ModelServices } from "@/components/models/model-services";
import { ModelGallery } from "@/components/models/model-gallery";
import { ModelReviews } from "@/components/models/model-reviews";
import { Card, CardContent } from "@/components/ui/card";
import { SEED_MODELS, SEED_CITIES, SEED_REVIEWS } from "@/lib/seed-data";
import type { ModelService, Review } from "@/lib/types";
import { Metadata } from "next";
import { ArrowLeft, Flag, Heart, Share2 } from "lucide-react";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const model = SEED_MODELS.find((m) => m.id === params.id);
  if (!model) return { title: "Modelo no encontrada" };

  return {
    title: `${model.name} - ${model.tagline || "Acompañante"}`,
    description: model.bio ?? `Perfil de ${model.name} en Velvet MX`,
  };
}

export default function ModelProfilePage({ params }: PageProps) {
  const seedModel = SEED_MODELS.find((m) => m.id === params.id);

  if (!seedModel) {
    notFound();
  }

  // Build model profile with relations
  const model = {
    ...seedModel,
    userId: seedModel.id,
    languages: ["Español", "English"] as string[],
    city: SEED_CITIES.find((c) => c.id === seedModel.cityId),
    services: [
      { id: "svc-1", modelId: seedModel.id, serviceId: "svc-1", price: 1500, service: { id: "svc-1", name: "Citas companionship", description: " companionship", duration: 120, price: 1500 } },
      { id: "svc-2", modelId: seedModel.id, serviceId: "svc-2", price: 2000, service: { id: "svc-2", name: "Encuentros íntimos", description: "Intimate encounter", duration: 60, price: 2000 } },
      { id: "svc-3", modelId: seedModel.id, serviceId: "svc-3", price: 5000, service: { id: "svc-3", name: "旅途acompanamiento", description: "Travel companion", duration: 1440, price: 5000 } },
    ],
    reviews: SEED_REVIEWS.filter((r) => r.modelId === seedModel.id).map((r) => ({
      ...r,
      user: { name: r.userName },
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 30),
    })) as unknown as Review[],
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/models">
          <Button variant="ghost" className="text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a modelos
          </Button>
        </Link>
      </div>

      {/* Profile Header */}
      <ModelProfileHeader model={model} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            {model.bio && (
              <Card className="border-white/10">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-white mb-4">Sobre Mí</h2>
                  <p className="text-white/70 leading-relaxed">{model.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            <ModelServices services={model.services ?? []} />

            {/* Gallery */}
            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-6">Galería</h2>
              <ModelGallery images={model.gallery} modelName={model.name} />
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-display text-xl font-semibold text-white mb-6">Reseñas</h2>
              <ModelReviews reviews={model.reviews ?? []} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking CTA */}
            <Card className="border-secondary/20 bg-secondary/5 sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-4">
                  Reservar una Cita
                </h3>
                <p className="text-sm text-white/60 mb-6">
                  Selecciona fecha y hora disponible para agendar tu encuentro
                </p>
                <Button className="w-full glow-gold" size="lg">
                  Reservar Ahora
                </Button>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button className="p-2 rounded-full bg-primary border border-white/10 hover:border-secondary/30 transition-colors text-white/60 hover:text-secondary">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-primary border border-white/10 hover:border-secondary/30 transition-colors text-white/60 hover:text-secondary">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-primary border border-white/10 hover:border-secondary/30 transition-colors text-white/60 hover:text-secondary">
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-white/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-white">
                  Información
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Edad</span>
                    <span className="text-white">{model.age} años</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Ciudad</span>
                    <span className="text-white">{model.city?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Tipo</span>
                    <span className="text-white">
                      {model.type === "ACOMPANANTE" ? "Acompañante" : model.type === "TRAVESTI" ? "Travesti" : "Masajista"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Valoración</span>
                    <span className="text-secondary">{model.rating} ★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Reservas</span>
                    <span className="text-white">{model.bookingCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
