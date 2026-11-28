"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

const TARGET_POINTS = [
  { x: 50, y: 20, dx: 14, dy: 10 },
  { x: 76, y: 38, dx: 88, dy: 24 },
  { x: 66, y: 74, dx: 82, dy: 86 },
  { x: 34, y: 74, dx: 18, dy: 84 },
  { x: 24, y: 38, dx: 12, dy: 30 },
];

export interface ParticleRevealProps {
  className?: string;
}

/**
 * Coalescing SVG particle field that converges into a geometric emblem.
 */
export function ParticleReveal({ className = "" }: ParticleRevealProps) {
  const prefersReduced = useReducedMotion();
  const [dispersed, setDispersed] = useState(false);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <svg viewBox="0 0 100 100" className="h-24 w-24" aria-label="Particle reveal">
        {TARGET_POINTS.map((p, i) => (
          <circle
            key={i}
            cx={dispersed ? p.dx : p.x}
            cy={dispersed ? p.dy : p.y}
            r="4"
            fill="var(--mm-accent)"
            style={{
              transition: prefersReduced ? "none" : "all 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
      </svg>
      <button
        type="button"
        onClick={() => setDispersed((d) => !d)}
        aria-pressed={dispersed}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {dispersed ? "Converge" : "Disperse"}
      </button>
    </div>
  );
}
