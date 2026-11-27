"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChampagneButton } from "./champagne-button";

export function AuroraHero({
  headline = "Spatial UI Primitives for Modern React",
  subtitle = "Fluid physical motion, zero layout shift, and cursor-reactive aurora depth.",
  ctaLabel = "Explore Components",
  className,
}: {
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 40 });

  return (
    <section
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100,
          y: ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100,
        });
      }}
      className={cn(
        "relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#09090b] px-6 py-12 text-center text-white shadow-[0_28px_70px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Cursor-tracking liquid aurora mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(360px circle at ${pos.x}% ${pos.y}%, rgba(230,200,140,0.22), transparent 65%), radial-gradient(320px circle at ${100 - pos.x}% ${100 - pos.y}%, rgba(99,102,241,0.22), transparent 65%)`,
        }}
      />
      {/* Architectural grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="relative z-10 mx-auto max-w-lg space-y-4">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-200/90">
          Liquid Aurora Engine
        </span>
        <h2 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-2xl sm:text-3xl font-semibold tracking-tight text-transparent">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">{subtitle}</p>
        <div className="pt-2">
          <ChampagneButton label={ctaLabel} />
        </div>
      </div>
    </section>
  );
}
