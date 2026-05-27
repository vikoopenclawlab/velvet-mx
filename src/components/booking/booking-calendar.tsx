"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
;
import { cn } from "@/lib/utils";
import { SEED_CITIES } from "@/lib/seed-data";
import type { FilterState} from "@/lib/types";

interface BookingCalendarProps {
  modelId: string;
  availableHours?: Record<string, { start: string; end: string }>;
  blockedDates?: string[];
  onSelect: (date: string, time: string) => void;
}

export function BookingCalendar({
  modelId,
  availableHours,
  blockedDates = [],
  onSelect,
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate time slots
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelect(selectedDate.toISOString(), time);
    }
  };

  // Simple calendar grid for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const shortDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  return (
    <div className="space-y-6">
      {/* Calendar Grid */}
      <div className="p-4 border border-white/10 rounded-xl bg-surface">
        <div className="text-center mb-4 font-display text-lg text-white">
          {today.toLocaleDateString("es-MX", { month: "long", year: "numeric" })}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {shortDays.map((day) => (
            <div key={day} className="text-center text-xs text-white/40 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentYear, currentMonth, i + 1);
            const dateStr = date.toISOString().split("T")[0];
            const isPast = date < today;
            const isBlocked = blockedDates.includes(dateStr);
            const isSelected = selectedDate?.toISOString().split("T")[0] === dateStr;

            return (
              <button
                key={i}
                onClick={() => !isPast && !isBlocked && handleDateSelect(date)}
                disabled={isPast || isBlocked}
                className={cn(
                  "aspect-square rounded-md text-sm transition-colors",
                  isPast || isBlocked
                    ? "text-white/20 cursor-not-allowed"
                    : isSelected
                    ? "bg-secondary text-primary font-semibold"
                    : "text-white hover:bg-white/10"
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="text-sm font-medium text-white/60 mb-3">Hora disponible</h4>
        <div className="grid grid-cols-4 gap-2">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              disabled={!selectedDate}
              className={cn(
                "py-2 px-3 rounded-lg text-sm transition-colors",
                !selectedDate
                  ? "bg-primary text-white/30 cursor-not-allowed"
                  : selectedTime === time
                  ? "bg-accent text-white font-semibold"
                  : "bg-primary text-white hover:bg-white/10"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
          <p className="text-sm text-white/60">Seleccionado:</p>
          <p className="text-lg font-semibold text-secondary mt-1">
            {selectedDate.toLocaleDateString("es-MX", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            a las {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}
