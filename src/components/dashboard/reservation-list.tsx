import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPrice } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import { ReservationStatus } from "@/lib/types";

interface SimpleReservation {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: ReservationStatus;
  totalAmount: number;
  modelName?: string;
  model?: { name?: string };
}

interface ReservationListProps {
  reservations: SimpleReservation[];
  showModel?: boolean;
}

export function ReservationList({ reservations, showModel = true }: ReservationListProps) {
  if (!reservations?.length) {
    return (
      <Card className="border-white/10">
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No hay reservas</p>
          <p className="text-sm text-white/30 mt-1">Tu historial de reservas aparecerá aquí</p>
        </CardContent>
      </Card>
    );
  }

  const statusVariant: Record<string, "warning" | "success" | "default" | "destructive"> = {
    PENDING: "warning",
    CONFIRMED: "success",
    COMPLETED: "default",
    CANCELLED: "destructive",
  };

  const statusLabel: Record<string, string> = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
  };

  return (
    <div className="space-y-3">
      {reservations.map((res) => {
        const name = res.modelName || res.model?.name || "Modelo";
        return (
          <Card key={res.id} className="border-white/10 p-4 hover:bg-white/5 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-medium">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{name}</p>
                  <p className="text-xs text-white/40 font-mono">#{res.id.slice(0, 8)}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-white/70">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(res.date)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Clock className="h-4 w-4" />
                  <span>{res.startTime}</span>
                </div>
                <p className="text-secondary font-semibold min-w-[80px] text-right">
                  {formatPrice(res.totalAmount)}
                </p>
                <Badge variant={statusVariant[res.status] || "default"}>
                  {statusLabel[res.status] || res.status}
                </Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
