"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

export interface IntegrationBeamsProps {
  className?: string;
}

/**
 * Bidirectional integration beam diagram linking sources to targets.
 */
export function IntegrationBeams({ className = "" }: IntegrationBeamsProps) {
  const prefersReduced = useReducedMotion();
  const [pulsing, setPulsing] = useState(true);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="space-y-2">
          <div className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1.5 font-mono text-[11px]">
            Figma Tokens
          </div>
          <div className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1.5 font-mono text-[11px]">
            GitHub Repo
          </div>
        </div>

        <svg viewBox="0 0 80 60" className="h-14 w-20 shrink-0" aria-hidden="true">
          <path
            d="M 4 14 Q 40 30 76 14"
            fill="none"
            stroke="var(--mm-accent)"
            strokeWidth="2"
            strokeDasharray={pulsing && !prefersReduced ? "4 4" : undefined}
          />
          <path
            d="M 4 46 Q 40 30 76 46"
            fill="none"
            stroke="var(--mm-accent)"
            strokeWidth="2"
            strokeOpacity="0.6"
            strokeDasharray={pulsing && !prefersReduced ? "4 4" : undefined}
          />
          <circle cx="40" cy="30" r="6" fill="var(--mm-accent)" />
        </svg>

        <div className="space-y-2">
          <div className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1.5 font-mono text-[11px]">
            Next.js App
          </div>
          <div className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] px-2.5 py-1.5 font-mono text-[11px]">
            shadcn CLI
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPulsing((p) => !p)}
        aria-pressed={pulsing}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[10px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {pulsing ? "Pause Beams" : "Resume Beams"}
      </button>
    </div>
  );
}
