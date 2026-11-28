"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface GlitchRevealProps {
  text?: string;
  className?: string;
}

/**
 * Kinetic chromatic aberration text reveal triggered on hover, focus, or click.
 */
export function GlitchReveal({
  text = "SIGNAL LOCKED",
  className = "",
}: GlitchRevealProps) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || prefersReduced) return;
    const id = window.setTimeout(() => setActive(false), 360);
    return () => window.clearTimeout(id);
  }, [active, prefersReduced]);

  const trigger = () => {
    if (!prefersReduced) {
      setActive(true);
    }
  };

  return (
    <button
      type="button"
      onMouseEnter={trigger}
      onFocus={trigger}
      onClick={trigger}
      aria-label={`Glitch reveal: ${text}`}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-5 py-3 font-mono text-base font-bold tracking-[0.12em] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer ${className}`.trim()}
    >
      {active && !prefersReduced && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-cyan-400 opacity-80 translate-x-[-2px] -translate-y-[1px]"
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-rose-500 opacity-80 translate-x-[2px] translate-y-[1px]"
          >
            {text}
          </span>
        </>
      )}
      <span className="relative z-10">{text}</span>
    </button>
  );
}
