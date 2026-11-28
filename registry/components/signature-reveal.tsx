"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface SignatureRevealProps {
  label?: string;
  className?: string;
}

/**
 * Calligraphic SVG stroke-dashoffset signature reveal with replay control.
 */
export function SignatureReveal({
  label = "Signed by Studio",
  className = "",
}: SignatureRevealProps) {
  const prefersReduced = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-6 py-4 ${className}`.trim()}
    >
      <svg
        key={replayKey}
        viewBox="0 0 220 64"
        className="h-14 w-48"
        role="img"
        aria-label={label}
      >
        <motion.path
          d="M16 44 C 36 12, 54 52, 76 26 C 92 8, 98 48, 122 30 C 138 18, 152 44, 174 28 C 188 18, 196 34, 206 24"
          fill="none"
          stroke="var(--mm-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.9, ease: "easeInOut" }}
        />
      </svg>
      <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        Replay Signature
      </button>
    </div>
  );
}
