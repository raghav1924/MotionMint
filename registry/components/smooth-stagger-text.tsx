"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface SmoothStaggerTextProps {
  text?: string;
  className?: string;
}

/**
 * Per-character staggered vertical reveal with replay control and reduced-motion support.
 */
export function SmoothStaggerText({
  text = "TACTILE MOTION",
  className = "",
}: SmoothStaggerTextProps) {
  const prefersReduced = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-5 py-4 ${className}`.trim()}
    >
      <div key={replayKey} className="flex flex-wrap justify-center font-mono text-lg font-bold tracking-wider text-[var(--mm-fg)]">
        {text.split("").map((char, idx) => (
          <motion.span
            key={idx}
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.28, delay: prefersReduced ? 0 : idx * 0.025 }}
            className={char === " " ? "w-2" : undefined}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        Replay Stagger
      </button>
    </div>
  );
}
