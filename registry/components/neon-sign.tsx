"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

export interface NeonSignProps {
  text?: string;
  defaultLit?: boolean;
  className?: string;
}

/**
 * Luminous neon tube display sign with interactive power switch and reduced-motion support.
 */
export function NeonSign({
  text = "OPEN LATE",
  defaultLit = true,
  className = "",
}: NeonSignProps) {
  const prefersReduced = useReducedMotion();
  const [lit, setLit] = useState(defaultLit);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-6 py-5 ${className}`.trim()}
    >
      <span
        style={{
          textShadow: lit
            ? "0 0 8px var(--mm-accent), 0 0 22px var(--mm-accent)"
            : "none",
          transition: prefersReduced ? "none" : "text-shadow 240ms ease, color 240ms ease",
        }}
        className={`font-mono text-xl font-bold tracking-[0.22em] uppercase ${
          lit ? "text-[var(--mm-accent)]" : "text-[var(--mm-fg-muted)] opacity-50"
        }`}
      >
        {text}
      </span>
      <button
        type="button"
        onClick={() => setLit((v) => !v)}
        aria-pressed={lit}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {lit ? "Power: ON" : "Power: OFF"}
      </button>
    </div>
  );
}
