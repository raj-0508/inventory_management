"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Variant = "purple" | "blue" | "amber" | "rose";

export function CardHoverEffect({
  icon,
  title,
  description,
  variant = "purple",
  glowEffect = true,
  size = "lg",
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: Variant;
  glowEffect?: boolean;
  size?: "md" | "lg";
}) {
  const colorMap: Record<Variant, string> = {
    purple: "from-fuchsia-500/15 to-fuchsia-500/5",
    blue: "from-sky-500/15 to-sky-500/5",
    amber: "from-amber-500/15 to-amber-500/5",
    rose: "from-rose-500/15 to-rose-500/5",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br p-6",
        "transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl",
        size === "lg" ? "p-6" : "p-4"
      )}
    >
      {glowEffect && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
            `bg-gradient-to-br ${colorMap[variant]}`
          )}
        />
      )}
      {icon && (
        <div className={cn("mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl", `bg-gradient-to-br ${colorMap[variant]}`)}>
          <span className="text-foreground/80">{icon}</span>
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}


