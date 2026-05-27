"use client";

import { Clock, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { ModelService } from "@/lib/types";

interface ModelServicesProps {
  services: (ModelService & { service?: { name: string; description?: string; duration: number } })[];
}

export function ModelServices({ services }: ModelServicesProps) {
  if (!services?.length) return null;

  return (
    <Card className="border-white/10">
      <CardHeader>
        <CardTitle className="font-display text-xl">Servicios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg bg-primary/50 border border-white/5 hover:border-secondary/20 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">
                    {svc.service?.name ?? "Servicio"}
                  </h4>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                {svc.service?.description && (
                  <p className="text-sm text-white/50 mt-1">
                    {svc.service.description}
                  </p>
                )}
                <div className="flex items-center gap-1.5 mt-2 text-xs text-white/40">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{svc.service?.duration ?? 60} min</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-semibold text-secondary">
                  {formatPrice(svc.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
