"use client";

import { Card } from "@/components/ui/card";
import React from "react";

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

export function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <Card className="border-border/60 p-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-500/5">
          <span className="text-blue-600">{icon}</span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

type SummaryGridProps = {
  children: React.ReactNode;
};

export function SummaryGrid({ children }: SummaryGridProps) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">{children}</div>;
}


