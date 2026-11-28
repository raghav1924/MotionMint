"use client";

import React, { useId, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface DitherGaugeProps {
  initialValue?: number;
  label?: string;
  className?: string;
}

/**
 * Semi-circular dithered SVG gauge with preset load steps and meter semantics.
 */
export function DitherGauge({
  initialValue = 76,
  label = "GPU Budget",
  className = "",
}: DitherGaugeProps) {
  const patternId = useId();
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(initialValue);

  const clamped = Math.max(0, Math.min(100, value));
  const arcLen = 125.66; // pi * 40
  const filled = (clamped / 100) * arcLen;

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-5 py-4 ${className}`.trim()}
    >
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="relative flex flex-col items-center"
      >
        <svg viewBox="0 0 100 58" className="h-24 w-44" aria-hidden="true">
          <defs>
            <pattern id={patternId} width="3.5" height="3.5" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="0.85" fill="var(--mm-accent)" />
            </pattern>
          </defs>
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="var(--mm-border)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={`url(#${patternId})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${arcLen}`}
            style={{
              transition: prefersReduced ? "none" : "stroke-dasharray 320ms ease",
            }}
          />
        </svg>
        <div className="-mt-6 text-center">
          <p className="font-mono text-xl font-bold tabular-nums text-[var(--mm-fg)]">
            {clamped}%
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
            {label}
          </p>
        </div>
      </div>

      <div role="group" aria-label="Gauge presets" className="flex gap-1.5">
        {[42, 76, 94].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setValue(preset)}
            aria-pressed={clamped === preset}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] cursor-pointer ${
              clamped === preset
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
}
