"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

export interface SplitTextRevealProps {
  text?: string;
  className?: string;
}

/**
 * Word-by-word kinetic text reveal with replay control and reduced-motion fallback.
 */
export function SplitTextReveal({
  text = "Interfaces should feel alive.",
  className = "",
}: SplitTextRevealProps) {
  const prefersReduced = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);
  const words = text.split(" ");

  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-[var(--mm-fg)] ${className}`.trim()}
    >
      <p key={replayKey} className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xl font-bold tracking-tight">
        {words.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 26,
              delay: prefersReduced ? 0 : idx * 0.06,
            }}
          >
            {word}
          </motion.span>
        ))}
      </p>

      <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        aria-label="Replay split text reveal"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 text-[11px] font-medium text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        <span>Replay</span>
      </button>
    </div>
  );
}
