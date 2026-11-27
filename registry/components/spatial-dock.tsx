"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Home, Layers, Sparkles, Terminal, Compass, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface SpatialDockItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const DEFAULT_DOCK_ITEMS: SpatialDockItem[] = [
  { id: "home", label: "Overview", icon: <Home className="h-5 w-5" /> },
  { id: "layers", label: "Components", icon: <Layers className="h-5 w-5" /> },
  { id: "shaders", label: "Shaders", icon: <Sparkles className="h-5 w-5" /> },
  { id: "cli", label: "Registry CLI", icon: <Terminal className="h-5 w-5" /> },
  { id: "explore", label: "Themes", icon: <Compass className="h-5 w-5" /> },
  { id: "prefs", label: "Settings", icon: <Settings className="h-5 w-5" /> },
];

export function SpatialDock({
  items = DEFAULT_DOCK_ITEMS,
  magnification = 1.42,
  sound,
  haptic,
  className,
}: {
  items?: SpatialDockItem[];
  magnification?: number;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "home");
  const prefersReduced = useReducedMotion();

  return (
    <nav
      aria-label="Spatial Glass Dock"
      onMouseLeave={() => setHoveredIdx(null)}
      className={cn(
        "inline-flex items-end gap-2 rounded-2xl border border-white/20 bg-zinc-950/75 px-3 py-2.5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_20px_48px_-12px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {items.map((item, idx) => {
        const dist = hoveredIdx === null ? 99 : Math.abs(hoveredIdx - idx);
        const scale = prefersReduced
          ? 1
          : dist === 0
            ? magnification
            : dist === 1
              ? 1 + (magnification - 1) * 0.48
              : dist === 2
                ? 1 + (magnification - 1) * 0.16
                : 1;
        const isActive = activeId === item.id;

        return (
          <div key={item.id} className="relative flex flex-col items-center">
            {hoveredIdx === idx && (
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/15 bg-zinc-900/95 px-2 py-0.5 text-[11px] font-medium text-white shadow-lg">
                {item.label}
              </span>
            )}
            <motion.button
              type="button"
              aria-label={item.label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => {
                setActiveId(item.id);
                triggerInteractionFeedback("click", { sound, haptic });
              }}
              animate={{ scale, y: hoveredIdx === idx && !prefersReduced ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border text-white transition-colors cursor-pointer origin-bottom",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                isActive
                  ? "border-white/35 bg-white/20"
                  : "border-white/10 bg-white/10 hover:bg-white/15"
              )}
            >
              {item.icon}
            </motion.button>
            <span
              aria-hidden="true"
              className={cn(
                "mt-1 h-1 w-1 rounded-full transition-opacity",
                isActive ? "bg-white opacity-90" : "opacity-0"
              )}
            />
          </div>
        );
      })}
    </nav>
  );
}
