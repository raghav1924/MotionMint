"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PhotoStackItem {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
}

export interface PhotoStackProps {
  items?: PhotoStackItem[];
  className?: string;
}

const DEFAULT_PHOTOS: PhotoStackItem[] = [
  { id: "p1", title: "Swiss Grid 01", subtitle: "Typography & contrast", accent: "#38BDF8" },
  { id: "p2", title: "Prism Optics", subtitle: "Refractive caustic study", accent: "#A855F7" },
  { id: "p3", title: "Kinetic Silk", subtitle: "Sculptural ribbon study", accent: "#10B981" },
];

/**
 * Interactive stacked photo deck with click and keyboard navigation.
 */
export function PhotoStack({
  items = DEFAULT_PHOTOS,
  className = "",
}: PhotoStackProps) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + items.length) % items.length);
  const next = () => setActive((i) => (i + 1) % items.length);

  return (
    <div className={`w-full max-w-xs space-y-3 text-[var(--mm-fg)] ${className}`.trim()}>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        aria-label="Photo stack — use left or right arrow keys to cycle"
        className="relative h-44 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-accent)] rounded-2xl"
        onClick={next}
      >
        {items.map((item, idx) => {
          const offset = (idx - active + items.length) % items.length;
          const isFront = offset === 0;
          return (
            <motion.div
              key={item.id}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      scale: 1 - offset * 0.05,
                      y: offset * 8,
                      rotate: offset === 0 ? 0 : offset % 2 === 1 ? -3 : 3,
                      opacity: offset > 2 ? 0 : 1,
                    }
              }
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              style={{ zIndex: items.length - offset }}
              className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 shadow-md"
            >
              <div
                className="h-20 w-full rounded-xl opacity-85"
                style={{
                  background: `linear-gradient(135deg, ${item.accent}44, ${item.accent}cc)`,
                }}
              />
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-[11px] text-[var(--mm-fg-muted)]">{item.subtitle}</p>
                </div>
                {isFront && (
                  <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">
                    {active + 1}/{items.length}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
