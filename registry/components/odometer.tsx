"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

export interface OdometerProps {
  initialValue?: number;
  step?: number;
  label?: string;
  className?: string;
}

/**
 * Rolling numeric odometer with vertical digit drums and reduced-motion fallback.
 */
export function Odometer({
  initialValue = 1248,
  step = 137,
  label = "Active Installs",
  className = "",
}: OdometerProps) {
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(initialValue);
  const digits = String(Math.max(0, Math.round(value))).padStart(4, "0").split("");

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-5 py-4 ${className}`.trim()}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
        {label}
      </span>
      <div
        role="status"
        aria-live="polite"
        aria-label={`${label}: ${value}`}
        className="flex items-center gap-1 tabular-nums"
      >
        {digits.map((digit, idx) => {
          const num = Number(digit);
          return (
            <div
              key={idx}
              className="relative h-10 w-7 overflow-hidden rounded-md border border-[var(--mm-border)] bg-[var(--mm-bg)] font-mono text-xl font-bold text-[var(--mm-fg)]"
            >
              <div
                style={{
                  transform: `translateY(-${num * 10}%)`,
                  transition: prefersReduced
                    ? "none"
                    : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="flex flex-col"
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="flex h-10 items-center justify-center">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setValue((v) => v + step)}
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
        >
          +{step}
        </button>
        <button
          type="button"
          onClick={() => setValue(initialValue)}
          className="rounded-full border border-[var(--mm-border)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
