"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { Clock, Edit2, Trash2, Plus } from "lucide-react";

const DEMO_SERVICES = [
  { id: "1", name: "Citas companionship", price: 1500, duration: 120 },
  { id: "2", name: "Encuentros íntimos", price: 2000, duration: 60 },
  { id: "3", name: "旅途acompanamiento", price: 5000, duration: 1440 },
  { id: "4", name: "Masaje sensi", price: 1200, duration: 60 },
  { id: "5", name: "Noche especial", price: 8000, duration: 480 },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Mis Servicios</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Button>
        </div>

        <div className="space-y-4">
          {DEMO_SERVICES.map((svc) => (
            <Card key={svc.id} className="border-white/10">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{svc.name}</h3>
                    <p className="text-sm text-white/50">{svc.duration} minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold text-secondary">
                    {formatPrice(svc.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-primary hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-primary hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
