"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { ReservationList } from "@/components/dashboard/reservation-list";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SEED_MODELS, SEED_CITIES } from "@/lib/seed-data";
import { DollarSign, Calendar, Eye, Star, Heart, Clock } from "lucide-react";
import { ReservationStatus, PaymentStatus } from "@/lib/types";

export default function ClientDashboardPage() {
  const recentReservations = [
    {
      id: "res-001",
      userId: "user-demo",
      modelId: "model-001",
      date: new Date(Date.now() + 86400000 * 3),
      startTime: "20:00",
      endTime: "23:00",
      status: ReservationStatus.CONFIRMED,
      totalAmount: 2000,
      paymentStatus: PaymentStatus.PAID,
      modelName: "Valentina Noir",
      modelPhoto: "",
    },
    {
      id: "res-002",
      userId: "user-demo",
      modelId: "model-007",
      date: new Date(Date.now() - 86400000 * 7),
      startTime: "21:00",
      endTime: "23:00",
      status: ReservationStatus.COMPLETED,
      totalAmount: 2500,
      paymentStatus: PaymentStatus.PAID,
      modelName: "Victoria Fuentes",
      modelPhoto: "",
    },
  ];

  const favorites = SEED_MODELS.slice(0, 4).map((m) => ({
    ...m,
    city: SEED_CITIES.find((c) => c.id === m.cityId),
  }));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Mi Dashboard</h1>
          <p className="text-white/60">Bienvenido de nuevo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Gastado este mes" value="$4,500 MXN" subtitle="2 reservas" icon={<DollarSign className="h-5 w-5" />} />
          <StatsCard title="Próxima reserva" value="3 días" subtitle="Valentina Noir" icon={<Calendar className="h-5 w-5" />} />
          <StatsCard title="Perfiles visitados" value="23" subtitle="Este mes" icon={<Eye className="h-5 w-5" />} />
          <StatsCard title="Mi rating" value="4.8 ★" subtitle="Como cliente" icon={<Star className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Reservas Recientes</h2>
            <ReservationList reservations={recentReservations as any} />
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-white mb-4">Favoritos</h2>
            <div className="space-y-3">
              {favorites.map((m) => (
                <Card key={m.id} className="border-white/10 p-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-medium">
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{m.name}</p>
                    <p className="text-xs text-white/50">{m.city?.name}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-red-400 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
