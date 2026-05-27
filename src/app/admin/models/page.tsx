"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEED_MODELS, SEED_CITIES } from "@/lib/seed-data";
import { Search, CheckCircle, XCircle, Eye, Edit2 } from "lucide-react";
import type { ModelProfile, City, AdminModelItem } from "@/lib/types";

export default function AdminModelsPage() {
  const [search, setSearch] = useState("");
  const [showVerified, setShowVerified] = useState<boolean | null>(null);

  type AdminModelItem = Omit<ModelProfile, 'userId' | 'languages'> & { city?: City };
  let models: AdminModelItem[] = SEED_MODELS.map((m) => ({
    ...m,
    city: SEED_CITIES.find((c) => c.id === m.cityId),
  }));

  if (search) {
    models = models.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (showVerified !== null) {
    models = models.filter((m) => m.verified === showVerified);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Gestionar Modelos</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar modelos..."
              className="pl-12"
            />
          </div>
          <div className="flex gap-2">
            <Button variant={showVerified === null ? "default" : "outline"} onClick={() => setShowVerified(null)}>Todas</Button>
            <Button variant={showVerified === true ? "default" : "outline"} onClick={() => setShowVerified(true)}>Verificadas</Button>
            <Button variant={showVerified === false ? "default" : "outline"} onClick={() => setShowVerified(false)}>No Verificadas</Button>
          </div>
        </div>

        {/* Table */}
        <Card className="border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary border-b border-white/5">
                <tr>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Modelo</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Ciudad</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Tipo</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Rating</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Estado</th>
                  <th className="text-left text-xs text-white/40 font-medium p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded bg-secondary/20 shrink-0" />
                        <div>
                          <p className="font-medium text-white">{m.name}</p>
                          <p className="text-xs text-white/50">{m.age} años</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white/70">{m.city?.name}</td>
                    <td className="p-4 text-sm text-white/70">{m.type}</td>
                    <td className="p-4 text-sm text-secondary">{m.rating} ★</td>
                    <td className="p-4">
                      {m.verified ? (
                        <Badge variant="accent" className="flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" /> Verificada
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="flex items-center gap-1 w-fit">
                          <XCircle className="h-3 w-3" /> Pendiente
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
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
