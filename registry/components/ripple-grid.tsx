"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface RippleGridProps {
  rows?: number;
  cols?: number;
  className?: string;
}

/**
 * Interactive tactile grid propagating radial spring waves from any clicked cell.
 */
export function RippleGrid({
  rows = 4,
  cols = 6,
  className = "",
}: RippleGridProps) {
  const prefersReduced = useReducedMotion();
  const [origin, setOrigin] = useState<{ r: number; c: number; nonce: number }>({
    r: 1,
    c: 2,
    nonce: 0,
  });

  return (
    <div
      role="grid"
      aria-label="Interactive ripple grid"
      className={`inline-grid gap-2 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const dist = Math.hypot(r - origin.r, c - origin.c);
        const isOrigin = origin.nonce > 0 && r === origin.r && c === origin.c;

        return (
          <motion.button
            key={`${r}-${c}-${origin.nonce}`}
            type="button"
            onClick={() => setOrigin({ r, c, nonce: origin.nonce + 1 })}
            aria-label={`Ripple cell row ${r + 1} column ${c + 1}`}
            initial={prefersReduced || origin.nonce === 0 ? false : { scale: 0.72 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 20,
              delay: prefersReduced ? 0 : dist * 0.045,
            }}
            className={`h-7 w-7 rounded-lg border transition-colors cursor-pointer ${
              isOrigin
                ? "border-[var(--mm-accent)] bg-[var(--mm-accent)]"
                : "border-[var(--mm-border)] bg-[var(--mm-bg)] hover:border-[var(--mm-accent)]"
            }`}
          />
        );
      })}
    </div>
  );
}
