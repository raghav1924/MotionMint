"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const RAMP = " .:-=+*#%@";

export interface AsciiWebglProps {
  cols?: number;
  rows?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Procedural ASCII interference field with pointer reactivity and reduced-motion fallback.
 */
export function AsciiWebgl({
  cols = 28,
  rows = 10,
  className = "",
  children,
}: AsciiWebglProps) {
  const prefersReduced = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (prefersReduced) return;
    const id = window.setInterval(() => setFrame((f) => f + 1), 90);
    return () => window.clearInterval(id);
  }, [prefersReduced]);

  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let row = "";
    for (let c = 0; c < cols; c++) {
      const nx = c / cols;
      const ny = r / rows;
      const dist = Math.hypot(nx - pointerRef.current.x, ny - pointerRef.current.y);
      const val =
        (Math.sin(nx * 8 + frame * 0.18) +
          Math.cos(ny * 6 - frame * 0.14) +
          Math.sin(dist * 14 - frame * 0.25)) /
          6 +
        0.5;
      const idx = Math.max(0, Math.min(RAMP.length - 1, Math.floor(val * RAMP.length)));
      row += RAMP[idx];
    }
    lines.push(row);
  }

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          pointerRef.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
          };
        }
      }}
      className={`relative overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] ${className}`.trim()}
    >
      <pre
        aria-hidden="true"
        className="pointer-events-none select-none font-mono text-[10px] leading-[1.15] text-[var(--mm-accent)] opacity-75"
      >
        {lines.join("\n")}
      </pre>
      {children ? <div className="relative z-10 mt-2">{children}</div> : null}
    </div>
  );
}
