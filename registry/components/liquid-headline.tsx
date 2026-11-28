"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

export interface LiquidHeadlineProps {
  text?: string;
  className?: string;
}

/**
 * Flowing gradient headline with pointer-reactive shimmer angle.
 */
export function LiquidHeadline({
  text = "Fluid Typography",
  className = "",
}: LiquidHeadlineProps) {
  const prefersReduced = useReducedMotion();
  const [angle, setAngle] = useState(115);

  return (
    <div
      onMouseMove={(e) => {
        if (prefersReduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / Math.max(rect.width, 1);
        setAngle(Math.round(60 + ratio * 140));
      }}
      className={`inline-flex flex-col items-center gap-2 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-6 py-5 ${className}`.trim()}
    >
      <span
        style={{
          backgroundImage: `linear-gradient(${angle}deg, var(--mm-fg) 10%, var(--mm-accent) 55%, var(--mm-fg) 90%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        className="text-2xl font-extrabold tracking-tight"
      >
        {text}
      </span>
      <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">
        Gradient Angle: {angle}°
      </span>
    </div>
  );
}
