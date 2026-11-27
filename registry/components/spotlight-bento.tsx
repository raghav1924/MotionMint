"use client";

import React, { useState } from "react";
import { Layers, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpotlightBentoItem {
  id: string;
  title: string;
  description: string;
  span?: 1 | 2;
  tag?: string;
}

const DEFAULT_ITEMS: SpotlightBentoItem[] = [
  {
    id: "optics",
    title: "Hairline Pointer Optics",
    description: "Tracks cursor coordinates per cell to illuminate 1px borders and radial aura.",
    span: 2,
    tag: "60fps",
  },
  {
    id: "spring",
    title: "Zero Layout Shift",
    description: "GPU-composited highlights never disturb surrounding geometry.",
    tag: "Physics",
  },
  {
    id: "tokens",
    title: "Token Adaptive",
    description: "Inherits surface and border tokens across light and dark skins.",
    tag: "Themes",
  },
  {
    id: "craft",
    title: "Apple-Grade Restraint",
    description: "Subtle 1px borders, clean tabular typography, and intentional hierarchy.",
    span: 2,
    tag: "System",
  },
];

const ICONS = [Sparkles, Zap, ShieldCheck, Layers];

export function SpotlightBento({
  items = DEFAULT_ITEMS,
  spotlightColor = "rgba(230, 200, 140, 0.22)",
  className,
}: {
  items?: SpotlightBentoItem[];
  spotlightColor?: string;
  className?: string;
}) {
  const [coords, setCoords] = useState<Record<string, { x: number; y: number; active: boolean }>>({});

  return (
    <div className={cn("grid w-full max-w-2xl grid-cols-1 sm:grid-cols-3 gap-3", className)}>
      {items.map((item, idx) => {
        const Icon = ICONS[idx % ICONS.length];
        const state = coords[item.id];
        return (
          <div
            key={item.id}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCoords((prev) => ({
                ...prev,
                [item.id]: {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  active: true,
                },
              }));
            }}
            onMouseLeave={() =>
              setCoords((prev) => ({
                ...prev,
                [item.id]: { ...(prev[item.id] ?? { x: 0, y: 0 }), active: false },
              }))
            }
            className={cn(
              "relative overflow-hidden rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#121216)] p-5 transition-colors",
              item.span === 2 ? "sm:col-span-2" : "sm:col-span-1"
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: state?.active ? 1 : 0,
                background: state
                  ? `radial-gradient(240px circle at ${state.x}px ${state.y}px, ${spotlightColor}, transparent 75%)`
                  : undefined,
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface-subtle,rgba(255,255,255,0.04))] text-[var(--mm-fg,#fafafa)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {item.tag && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted,#a1a1aa)]">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--mm-fg,#fafafa)]">{item.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--mm-fg-muted,#a1a1aa)]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
