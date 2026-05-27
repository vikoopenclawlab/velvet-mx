"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface EarningsChartProps {
  data: { month: string; amount: number }[];
}

export function EarningsChart({ data }: EarningsChartProps) {
  const max = Math.max(...data.map((d) => d.amount), 1);

  return (
    <Card className="border-white/10">
      <CardHeader>
        <CardTitle className="font-display text-xl">Ganancias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2 h-40">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full bg-secondary/20 rounded-t-sm hover:bg-secondary/30 transition-colors relative group"
                  style={{ height: `${(d.amount / max) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatPrice(d.amount)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-white/40">{d.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
