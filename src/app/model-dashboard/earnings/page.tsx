"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { formatPrice } from "@/lib/utils";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";

export default function EarningsPage() {
  const chartData = [
    { month: "Ene", amount: 12000 },
    { month: "Feb", amount: 15000 },
    { month: "Mar", amount: 14000 },
    { month: "Abr", amount: 18000 },
    { month: "May", amount: 22000 },
    { month: "Jun", amount: 19000 },
  ];

  const recentWithdrawals = [
    { date: "2024-06-01", amount: 15000, status: "completado" },
    { date: "2024-05-15", amount: 12000, status: "completado" },
    { date: "2024-05-01", amount: 10000, status: "completado" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text white mb-8">Ganancias</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Total ganado</p>
                <p className="text-2xl font-bold text-white">{formatPrice(120000)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Este mes</p>
                <p className="text-2xl font-bold text-white">{formatPrice(19000)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Disponible</p>
                <p className="text-2xl font-bold text-white">{formatPrice(8500)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <EarningsChart data={chartData} />
        </div>

        {/* Recent Withdrawals */}
        <Card className="border-white/10">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Retiros recientes</h3>
            <div className="space-y-3">
              {recentWithdrawals.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-primary">
                  <div>
                    <p className="text-white">{formatPrice(w.amount)}</p>
                    <p className="text-xs text-white/50">{w.date}</p>
                  </div>
                  <span className="text-sm text-green-400 capitalize">{w.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
