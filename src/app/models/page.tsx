"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModelGrid } from "@/components/models/model-grid";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import { SEED_MODELS, SEED_CITIES } from "@/lib/seed-data";
import { ModelType } from "@/lib/types";

import Link from "next/link";

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter models
  let models: any[] = SEED_MODELS.map((m) => ({
    ...m,
    city: SEED_CITIES.find((c) => c.id === m.cityId),
  }));

  if (search) {
    models = models.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (city !== "all") {
    models = models.filter((m) => m.cityId === city);
  }

  if (type !== "all") {
    models = models.filter((m) => m.type === type);
  }

  // Sort
  models.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price_low":
        return Number(a.services?.[0]?.price ?? 0) - Number(b.services?.[0]?.price ?? 0);
      case "price_high":
        return Number(b.services?.[0]?.price ?? 0) - Number(a.services?.[0]?.price ?? 0);
      default:
        return b.bookingCount - a.bookingCount;
    }
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2  ">
            Nuestras Modelos
          </h1>
          <p className="text-white/60">
            Encuentra la acompañante perfecta para tu próxima experiencia
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre..."
                className="pl-12"
              />
            </div>
            <div className="flex gap-2">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-[180px]">
                  <MapPin className="h-4 w-4 mr-2 text-white/40" />
                  <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {SEED_CITIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ACOMPANANTE">Acompañantes</SelectItem>
                  <SelectItem value="TRAVESTI">Travestis</SelectItem>
                  <SelectItem value="MASAJISTA">Masajistas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más populares</SelectItem>
                  <SelectItem value="rating">Mejor valoradas</SelectItem>
                  <SelectItem value="price_low">Precio: menor</SelectItem>
                  <SelectItem value="price_high">Precio: mayor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-white/50">
            {models.length} modelos encontradas
          </p>
        </div>

        <ModelGrid models={models} columns={3} />

        {models.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">No se encontraron modelos</p>
            <Button
              onClick={() => {
                setSearch("");
                setCity("all");
                setType("all");
              }}
              variant="secondary"
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
