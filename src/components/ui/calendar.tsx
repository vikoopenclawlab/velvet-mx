"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("rounded-lg border border-white/10 bg-surface p-4", className)}
      classNames={{
        head_cell: "text-xs font-medium text-white/40 p-2 w-9",
        cell: "text-center text-sm p-0.5",
        day: "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-white transition-colors hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30",
        day_selected: "bg-secondary text-primary font-semibold",
        day_today: "bg-white/10 text-white font-semibold",
        day_outside: "opacity-30",
        nav: "flex items-center justify-between pb-4",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

export { Calendar };
