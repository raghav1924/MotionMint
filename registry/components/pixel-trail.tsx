"use client";

import React, { useState } from "react";

export interface PixelTrailProps {
  cols?: number;
  rows?: number;
  className?: string;
}

/**
 * Interactive quantized pixel trail surface lighting up cells on hover/focus.
 */
export function PixelTrail({
  cols = 10,
  rows = 5,
  className = "",
}: PixelTrailProps) {
  const [trail, setTrail] = useState<number[]>([24, 25]);

  const activate = (idx: number) => {
    setTrail((prev) => [...prev.slice(-7), idx]);
  };

  return (
    <div
      aria-label="Interactive pixel trail"
      className={`inline-grid gap-1.5 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const pos = trail.lastIndexOf(idx);
        const active = pos !== -1;
        const opacity = active ? 0.35 + ((pos + 1) / Math.max(trail.length, 1)) * 0.65 : 0.15;
        return (
          <button
            key={idx}
            type="button"
            onMouseEnter={() => activate(idx)}
            onFocus={() => activate(idx)}
            onClick={() => activate(idx)}
            aria-label={`Pixel cell ${idx + 1}`}
            style={{ opacity }}
            className={`h-4 w-4 rounded-[3px] transition-all duration-200 cursor-pointer ${
              active ? "bg-[var(--mm-accent)] scale-105" : "bg-[var(--mm-border)]"
            }`}
          />
        );
      })}
    </div>
  );
}
