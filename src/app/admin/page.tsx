"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { SEED_MODELS, SEED_CITIES } from "@/lib/seed-data";
import { DollarSign, Users, Calendar, TrendingUp, Shield, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const totalModels = SEED_MODELS.length;
  const activeReservations = 47;
  const monthlyRevenue = 284500;
  const pendingVerifications = 3;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/60">Panel de administración de Velvet MX</p>
          </div>
          <Button className="glow-gold">
            <Shield className="h-4 w-4 mr-2" />
            Modo Admin
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Modelos" value={totalModels} subtitle="Activas" icon={<Users className="h-5 w-5" />} />
          <StatsCard title="Reservas Activas" value={activeReservations} subtitle="Este mes" icon={<Calendar className="h-5 w-5" />} />
          <StatsCard title="Ingresos (mes)" value={`$${(monthlyRevenue / 1000).toFixed(0)}k`} subtitle="MXN" trend={{ value: 12, label: "vs mes anterior" }} icon={<DollarSign className="h-5 w-5" />} />
          <StatsCard title="Verificaciones" value={pendingVerifications} subtitle="Pendientes" icon={<AlertTriangle className="h-5 w-5" />} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-white/10">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <a href="/admin/models" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <Users className="h-5 w-5 text-secondary" />
                  <span className="text-white">Gestionar Modelos</span>
                </a>
                <a href="/admin/reservations" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <span className="text-white">Ver Reservas</span>
                </a>
                <a href="/admin/reports" className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-white/5 transition-colors">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <span className="text-white">Reportes</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-white/10">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                {[
                  { action: "Nueva modelo registrada", time: "Hace 2h", user: "Camila Vega" },
                  { action: "Reserva confirmada", time: "Hace 4h", user: "Valentina Noir" },
                  { action: "Pago recibido", time: "Hace 6h", user: "$3,500 MXN" },
                  { action: "Modelo verificada", time: "Ayer", user: "Victoria Fuentes" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm text-white">{item.action}</p>
                      <p className="text-xs text-white/50">{item.user}</p>
                    </div>
                    <span className="text-xs text-white/30">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
