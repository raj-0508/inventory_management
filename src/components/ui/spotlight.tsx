"use client";

import React from "react";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
};

export function Spotlight({ gradientFirst, gradientSecond, gradientThird }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: gradientFirst ?? "radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.10), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 left-10 h-[40rem] w-[40rem] rounded-full blur-3xl"
        style={{ background: gradientSecond ?? "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.08), transparent 80%)" }}
      />
      <div
        className="absolute -bottom-20 right-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: gradientThird ?? "radial-gradient(50% 50% at 50% 50%, rgba(244,114,182,0.06), transparent 100%)" }}
      />
    </div>
  );
}


