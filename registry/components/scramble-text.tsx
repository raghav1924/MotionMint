"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*";

export interface ScrambleTextProps {
  text?: string;
  className?: string;
}

/**
 * Kinetic cipher text that decodes into target copy on hover, focus, or click.
 */
export function ScrambleText({
  text = "RENDERJOY PHYSICS",
  className = "",
}: ScrambleTextProps) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (nonce === 0 || prefersReduced) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const total = Math.max(text.length * 2, 12);
    const id = window.setInterval(() => {
      frame++;
      const resolvedCount = Math.floor((frame / total) * text.length);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < resolvedCount) return ch;
          return GLYPHS[(i + frame) % GLYPHS.length];
        })
        .join("");
      setDisplay(next);
      if (frame >= total) {
        setDisplay(text);
        window.clearInterval(id);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [nonce, prefersReduced, text]);

  return (
    <button
      type="button"
      onMouseEnter={() => setNonce((n) => n + 1)}
      onFocus={() => setNonce((n) => n + 1)}
      onClick={() => setNonce((n) => n + 1)}
      aria-label={`Scramble text: ${text}`}
      className={`rounded-xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-4 py-2.5 font-mono text-sm font-bold tracking-wider text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer ${className}`.trim()}
    >
      {display}
    </button>
  );
}
