"use client";

import React from "react";
import { cn } from "@/lib/utils";

type BorderBeamProps = {
  duration?: number;
  size?: number;
  className?: string;
  reverse?: boolean;
};

// Simple animated border glow using gradients
export function BorderBeam({ duration = 8, className, reverse }: BorderBeamProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-2xl",
        "[mask:linear-gradient(white,transparent)]",
        className
      )}
      style={{
        background:
          "conic-gradient(from 0deg, rgba(59,130,246,0), rgba(59,130,246,0.35), rgba(59,130,246,0))",
        animation: `${reverse ? "spin-rev" : "spin"} ${duration}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes spin-rev { to { transform: rotate(-360deg); } }
      `}</style>
    </span>
  );
}


