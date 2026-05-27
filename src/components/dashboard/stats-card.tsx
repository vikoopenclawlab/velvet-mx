import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, subtitle, trend, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("border-white/10", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/60">{title}</CardTitle>
        {icon && <div className="text-secondary">{icon}</div>}
      </CardHeader>
      <div className="px-6 pb-6">
        <div className="text-3xl font-bold text-white font-display">{value}</div>
        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
        {trend && (
          <div className={cn(
            "text-sm mt-2",
            trend.value >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}
          </div>
        )}
      </div>
    </Card>
  );
}
