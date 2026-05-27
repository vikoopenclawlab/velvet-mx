"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, Clock } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("es-MX", { month: "long", year: "numeric" });

  const shortDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  const toggleBlock = (date: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-white mb-8">Calendario</h1>

        <Card className="border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-xl">{monthName}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {shortDays.map((day) => (
                <div key={day} className="text-center text-xs text-white/40 py-2 font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isPast = new Date(currentYear, currentMonth, day) < today;
                const isBlocked = blockedDates.has(dateStr);

                return (
                  <button
                    key={day}
                    onClick={() => !isPast && toggleBlock(dateStr)}
                    disabled={isPast}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-sm transition-colors relative",
                      isPast ? "text-white/20 cursor-not-allowed" : isBlocked ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-white hover:bg-white/10"
                    )}
                  >
                    {day}
                    {isBlocked && <X className="absolute top-1 right-1 h-3 w-3 text-red-400" />}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary border border-white/10" />
                <span className="text-white/50">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/30" />
                <span className="text-white/50">Bloqueado</span>
              </div>
            </div>

            <p className="text-sm text-white/40 mt-4">
              Haz clic en un día para bloquear/desbloquear disponibilidad
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
