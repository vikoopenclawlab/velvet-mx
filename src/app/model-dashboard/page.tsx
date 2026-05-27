"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Calendar, Eye, Star, Clock, MessageCircle } from "lucide-react";

export default function ModelDashboardPage() {
  const earningsData = [
    { month: "Ene", amount: 12000 },
    { month: "Feb", amount: 15000 },
    { month: "Mar", amount: 14000 },
    { month: "Abr", amount: 18000 },
    { month: "May", amount: 22000 },
    { month: "Jun", amount: 19000 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Mi Panel</h1>
          <p className="text-white/60">BIENVENIDA DE NUEVO</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Ganancias (mes)" value="$19,000 MXN" subtitle="+15% vs mes anterior" trend={{ value: 15, label: "vs mes anterior" }} icon={<DollarSign className="h-5 w-5" />} />
          <StatsCard title="Reservas (mes)" value="12" subtitle="7 confirmadas" icon={<Calendar className="h-5 w-5" />} />
          <StatsCard title="Vistas perfil" value="847" subtitle="Esta semana" icon={<Eye className="h-5 w-5" />} />
          <StatsCard title="Mi rating" value="4.9 ★" subtitle="42 reseñas" icon={<Star className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <EarningsChart data={earningsData} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="font-display text-lg">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="/model-dashboard/calendar" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="text-white">Gestionar Calendario</span>
                </a>
                <a href="/model-dashboard/gallery" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <Eye className="h-5 w-5 text-secondary" />
                  <span className="text-white">Actualizar Galería</span>
                </a>
                <a href="/model-dashboard/services" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <DollarSign className="h-5 w-5 text-secondary" />
                  <span className="text-white">Mis Servicios</span>
                </a>
                <a href="/model-dashboard/messages" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <MessageCircle className="h-5 w-5 text-secondary" />
                  <span className="text-white">Mensajes</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
