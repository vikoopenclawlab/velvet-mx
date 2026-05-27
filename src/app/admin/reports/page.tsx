"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { formatPrice } from "@/lib/utils";
import { Download, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";

const reportData = [
  { month: "Ene", models: 18, reservations: 142, revenue: 245000 },
  { month: "Feb", models: 20, reservations: 158, revenue: 278000 },
  { month: "Mar", models: 22, reservations: 165, revenue: 292000 },
  { month: "Abr", models: 23, reservations: 178, revenue: 315000 },
  { month: "May", models: 24, reservations: 189, revenue: 332000 },
  { month: "Jun", models: 24, reservations: 195, revenue: 342000 },
];

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Reportes</h1>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Ingresos totales</p>
                <p className="text-2xl font-bold text-white">{formatPrice(1847000)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Total modelos</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Total reservas</p>
                <p className="text-2xl font-bold text-white">1,847</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Crecimiento</p>
                <p className="text-2xl font-bold text-green-400">+12%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <EarningsChart
            data={reportData.map((d) => ({ month: d.month, amount: d.revenue }))}
          />
        </div>

        {/* Detailed Table */}
        <Card className="border-white/10 overflow-hidden">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Reporte Mensual</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs text-white/40 font-medium p-2">Mes</th>
                    <th className="text-left text-xs text-white/40 font-medium p-2">Modelos</th>
                    <th className="text-left text-xs text-white/40 font-medium p-2">Reservas</th>
                    <th className="text-left text-xs text-white/40 font-medium p-2">Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row) => (
                    <tr key={row.month} className="border-b border-white/5">
                      <td className="p-2 text-white">{row.month} 2024</td>
                      <td className="p-2 text-white">{row.models}</td>
                      <td className="p-2 text-white">{row.reservations}</td>
                      <td className="p-2 text-secondary font-semibold">{formatPrice(row.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
