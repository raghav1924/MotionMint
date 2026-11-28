"use client";

import React, { useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface DottedSphereProps {
  pointCount?: number;
  className?: string;
}

/**
 * 3D Fibonacci-projected dot-matrix sphere with rotation toggle.
 */
export function DottedSphere({
  pointCount = 48,
  className = "",
}: DottedSphereProps) {
  const prefersReduced = useReducedMotion();
  const [spinning, setSpinning] = useState(true);

  const dots = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: pointCount }, (_, i) => {
      const y = 1 - (i / Math.max(pointCount - 1, 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      return {
        cx: Math.round((50 + x * 36) * 10) / 10,
        cy: Math.round((50 + y * 36) * 10) / 10,
        opacity: Math.round((0.3 + ((z + 1) / 2) * 0.7) * 100) / 100,
      };
    });
  }, [pointCount]);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <svg
        viewBox="0 0 100 100"
        className={`h-28 w-28 ${spinning && !prefersReduced ? "animate-spin" : ""}`}
        style={spinning && !prefersReduced ? { animationDuration: "14s" } : undefined}
        aria-label="3D dotted sphere"
      >
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="1.6" fill="var(--mm-accent)" fillOpacity={d.opacity} />
        ))}
      </svg>
      <button
        type="button"
        onClick={() => setSpinning((s) => !s)}
        aria-pressed={spinning}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {spinning ? "Pause Orbit" : "Resume Orbit"}
      </button>
    </div>
  );
}
