"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ReservationList } from "@/components/dashboard/reservation-list";
import { ReservationStatus, PaymentStatus } from "@/lib/types";

export default function ReservationsPage() {
  const reservations = [
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
    },
    {
      id: "res-003",
      userId: "user-demo",
      modelId: "model-004",
      date: new Date(Date.now() + 86400000 * 10),
      startTime: "19:00",
      endTime: "22:00",
      status: ReservationStatus.PENDING,
      totalAmount: 1500,
      paymentStatus: PaymentStatus.PENDING,
      modelName: "Camila Vega",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Mis Reservas</h1>
        <div className="space-y-4">
          {reservations.map((res) => (
            <Card key={res.id} className="border-white/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-lg font-medium">
                    {res.modelName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{res.modelName}</p>
                    <p className="text-sm text-white/50">#{res.id.slice(0, 8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-white/50">Fecha</p>
                    <p className="text-white">{res.date.toLocaleDateString("es-MX")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/50">Hora</p>
                    <p className="text-white">{res.startTime} - {res.endTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/50">Total</p>
                    <p className="text-secondary font-semibold">${res.totalAmount.toLocaleString()} MXN</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      res.status === ReservationStatus.CONFIRMED ? "bg-green-500/20 text-green-400" :
                      res.status === ReservationStatus.PENDING ? "bg-yellow-500/20 text-yellow-400" :
                      res.status === ReservationStatus.COMPLETED ? "bg-secondary/20 text-secondary" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {res.status === ReservationStatus.CONFIRMED ? "Confirmada" :
                       res.status === ReservationStatus.PENDING ? "Pendiente" :
                       res.status === ReservationStatus.COMPLETED ? "Completada" : "Cancelada"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
