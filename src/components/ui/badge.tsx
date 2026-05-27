import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary/20 text-secondary",
        secondary: "bg-primary text-white/80",
        accent: "bg-accent/20 text-accent",
        success: "bg-green-500/20 text-green-400",
        warning: "bg-yellow-500/20 text-yellow-400",
        destructive: "bg-red-500/20 text-red-400",
        outline: "border border-white/20 text-white/80",
      },
      size: {
        default: "px-2.5 py-1",
        sm: "px-2 py-0.5",
        lg: "px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };
