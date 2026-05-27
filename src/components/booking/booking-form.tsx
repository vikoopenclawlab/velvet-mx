"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { ModelService } from "@/lib/types";

interface BookingFormProps {
  modelId: string;
  services: ModelService[];
  selectedDate?: string;
  selectedTime?: string;
  onSubmit: (data: { serviceIds: string[]; address?: string; notes?: string }) => void;
  isLoading?: boolean;
}

export function BookingForm({
  modelId,
  services,
  selectedDate,
  selectedTime,
  onSubmit,
  isLoading,
}: BookingFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const total = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + Number(s.price), 0);

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ serviceIds: selectedServices, address, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date/Time Summary */}
      {selectedDate && selectedTime && (
        <Card className="border-secondary/20 bg-secondary/5">
          <CardContent className="p-4">
            <p className="text-sm text-white/60">Fecha seleccionada</p>
            <p className="text-secondary font-semibold mt-1">
              {new Date(selectedDate).toLocaleDateString("es-MX", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              a las {selectedTime}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Services */}
      <div>
        <h4 className="font-display text-lg font-semibold text-white mb-4">Servicios</h4>
        <div className="space-y-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              onClick={() => handleServiceToggle(svc.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedServices.includes(svc.id)
                  ? "border-secondary bg-secondary/10"
                  : "border-white/10 bg-surface hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedServices.includes(svc.id)}
                    className="border-2 border-white/30 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary"
                  />
                  <div>
                    <p className="font-medium text-white">{svc.service?.name}</p>
                    <p className="text-sm text-white/50">{svc.service?.duration} min</p>
                  </div>
                </div>
                <span className="text-secondary font-semibold">
                  {formatPrice(svc.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-white/60 mb-2 block">
          Dirección de la cita
        </label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Hotel, domicilio, o dirección específica"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm font-medium text-white/60 mb-2 block">
          Notas adicionales
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Preferencias, instrucciones especiales..."
          className="w-full h-24 bg-primary border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
        />
      </div>

      {/* Total & Submit */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/60">Total estimado</span>
          <span className="text-2xl font-bold text-secondary">
            {formatPrice(total)}
          </span>
        </div>
        <Button
          type="submit"
          disabled={selectedServices.length === 0 || !selectedDate || !selectedTime || isLoading}
          className="w-full glow-gold"
          size="lg"
        >
          {isLoading ? "Procesando..." : "Continuar al Pago"}
        </Button>
      </div>
    </form>
  );
}
