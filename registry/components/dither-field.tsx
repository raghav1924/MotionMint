"use client";

import React, { useState } from "react";

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export interface DitherFieldProps {
  cols?: number;
  rows?: number;
  className?: string;
}

/**
 * Interactive 4x4 Bayer ordered-dither matrix reacting to pointer position.
 */
export function DitherField({
  cols = 16,
  rows = 8,
  className = "",
}: DitherFieldProps) {
  const [focus, setFocus] = useState({ x: 0.5, y: 0.5 });

  return (
    <div
      aria-label="Ordered dither field"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setFocus({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
          });
        }
      }}
      className={`inline-grid gap-1 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const dist = Math.hypot(c / cols - focus.x, r / rows - focus.y);
        const luma = Math.max(0, 1 - dist * 1.45);
        const threshold = (BAYER_4X4[r % 4][c % 4] + 0.5) / 16;
        const lit = luma > threshold;
        return (
          <span
            key={idx}
            className={`h-2.5 w-2.5 rounded-[2px] transition-colors duration-150 ${
              lit ? "bg-[var(--mm-accent)]" : "bg-[var(--mm-border)]/40"
            }`}
          />
        );
      })}
    </div>
  );
}
