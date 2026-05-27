"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Lock, AlertCircle } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSubmit: (data: { cardNumber: string; expiry: string; cvc: string; name: string }) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function PaymentForm({ amount, onSubmit, onBack, isLoading }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const handleCardChange = (value: string, setter: (v: string) => void) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    setter(formatted);
  };

  const handleExpiryChange = (value: string, setter: (v: string) => void) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    const formatted = cleaned.replace(/(\d{2})(?=\d)/, "$1/");
    setter(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiry, cvc, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm text-white/80">
            <p className="font-medium text-accent">Modo Demo</p>
            <p className="text-white/60 mt-1">
              Este es un prototipo. No se procesarán pagos reales.
              Usa cualquier dato para probar.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-white/60 mb-2 block">
            Nombre en la tarjeta
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como aparece en la tarjeta"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white/60 mb-2 block">
            Número de tarjeta
          </label>
          <div className="relative">
            <Input
              value={cardNumber}
              onChange={(e) => handleCardChange(e.target.value, setCardNumber)}
              placeholder="4242 4242 4242 4242"
              className="pl-12"
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white/60 mb-2 block">
              Fecha de expiración
            </label>
            <Input
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value, setExpiry)}
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white/60 mb-2 block">
              CVC
            </label>
            <Input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.slice(0, 4))}
              placeholder="123"
              type="text"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-primary border border-white/10">
        <span className="text-white/60">Monto a pagar</span>
        <span className="text-2xl font-bold text-secondary">{formatPrice(amount)}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Volver
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1 glow-gold" size="lg">
          {isLoading ? "Procesando..." : "Confirmar Pago"}
        </Button>
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-white/40 mt-4">
        <Lock className="h-3.5 w-3.5" />
        Pago seguro con cifrado SSL
      </p>
    </form>
  );
}
