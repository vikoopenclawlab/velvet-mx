"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { ReservationStatus, PaymentStatus } from "@/lib/types";
import { Calendar, Eye } from "lucide-react";

const DEMO_RESERVATIONS = [
  { id: "res-001", userId: "u1", modelId: "model-001", date: new Date(Date.now() + 86400000 * 2), startTime: "20:00", endTime: "23:00", status: ReservationStatus.CONFIRMED, totalAmount: 2000, paymentStatus: PaymentStatus.PAID, modelName: "Valentina Noir", userName: "Carlos M." },
  { id: "res-002", userId: "u2", modelId: "model-007", date: new Date(Date.now() + 86400000 * 5), startTime: "21:00", endTime: "23:00", status: ReservationStatus.PENDING, totalAmount: 2500, paymentStatus: PaymentStatus.PENDING, modelName: "Victoria Fuentes", userName: "Roberto K." },
  { id: "res-003", userId: "u3", modelId: "model-004", date: new Date(Date.now() - 86400000 * 3), startTime: "19:00", endTime: "22:00", status: ReservationStatus.COMPLETED, totalAmount: 1500, paymentStatus: PaymentStatus.PAID, modelName: "Camila Vega", userName: "Miguel A." },
];

export default function AdminReservationsPage() {
  const statusConfig: Record<ReservationStatus, { label: string; variant: "warning" | "success" | "default" | "destructive" }> = {
    PENDING: { label: "Pendiente", variant: "warning" },
    CONFIRMED: { label: "Confirmada", variant: "success" },
    COMPLETED: { label: "Completada", variant: "default" },
    CANCELLED: { label: "Cancelada", variant: "destructive" },
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Reservas</h1>

        <Card className="border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary border-b border-white/5">
                <tr>
                  <th className="text-left text-xs text-white/40 font-medium p-4">ID</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Cliente</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Modelo</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Fecha</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Monto</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Estado</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_RESERVATIONS.map((res) => (
                  <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-white/50 font-mono">{res.id.slice(0, 8)}</td>
                    <td className="p-4 text-sm text-white">{res.userName}</td>
                    <td className="p-4 text-sm text-white">{res.modelName}</td>
                    <td className="p-4 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(res.date)}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-secondary font-semibold">{formatPrice(res.totalAmount)}</td>
                    <td className="p-4">
                      <Badge variant={statusConfig[res.status].variant}>
                        {statusConfig[res.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
