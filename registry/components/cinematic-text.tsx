"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface CinematicTextProps {
  text?: string;
  className?: string;
}

/**
 * Widescreen letter-spacing collapse reveal with replay trigger.
 */
export function CinematicText({
  text = "RENDERJOY",
  className = "",
}: CinematicTextProps) {
  const prefersReduced = useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-6 py-5 ${className}`.trim()}
    >
      <motion.span
        key={replayKey}
        initial={prefersReduced ? false : { opacity: 0, letterSpacing: "0.42em" }}
        animate={{ opacity: 1, letterSpacing: "0.14em" }}
        transition={{ duration: prefersReduced ? 0 : 0.55, ease: "easeOut" }}
        className="font-mono text-xl font-bold uppercase text-[var(--mm-fg)]"
      >
        {text}
      </motion.span>
      <button
        type="button"
        onClick={() => setReplayKey((k) => k + 1)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        Replay Title
      </button>
    </div>
  );
}
