"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·- ";

export interface SplitFlapBoardProps {
  phrases?: string[];
  className?: string;
}

/**
 * Mechanical departure-board split-flap text display with cycling presets.
 */
export function SplitFlapBoard({
  phrases = ["RENDERJOY", "DEPARTURE", "NEXT WAVE"],
  className = "",
}: SplitFlapBoardProps) {
  const prefersReduced = useReducedMotion();
  const safePhrases = phrases.length > 0 ? phrases : ["RENDERJOY"];
  const [index, setIndex] = useState(0);
  const target = safePhrases[index % safePhrases.length].toUpperCase();
  const [displayed, setDisplayed] = useState(target);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(target);
      return;
    }

    let step = 0;
    const totalSteps = 10;
    const padLen = Math.max(target.length, 9);
    const id = window.setInterval(() => {
      step++;
      const next = Array.from({ length: padLen }, (_, col) => {
        const goal = target[col] ?? " ";
        if (step >= totalSteps || col < Math.floor((step / totalSteps) * padLen)) {
          return goal;
        }
        return ALPHABET[(col * 3 + step * 5) % ALPHABET.length];
      }).join("");
      setDisplayed(next);
      if (step >= totalSteps) {
        window.clearInterval(id);
      }
    }, 36);

    return () => window.clearInterval(id);
  }, [target, prefersReduced]);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <div
        role="status"
        aria-live="polite"
        aria-label={`Split-flap board reading ${target}`}
        className="flex flex-wrap justify-center gap-1"
      >
        {displayed.split("").map((char, i) => (
          <span
            key={i}
            className="relative flex h-10 w-8 items-center justify-center rounded-md border border-[var(--mm-border)] bg-[var(--mm-bg)] font-mono text-base font-bold text-[var(--mm-fg)] shadow-sm"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[var(--mm-border)] opacity-60"
            />
            {char}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % safePhrases.length)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--mm-fg-muted)] hover:border-[var(--mm-accent)] hover:text-[var(--mm-fg)] cursor-pointer"
      >
        Cycle Flap ({(index % safePhrases.length) + 1}/{safePhrases.length})
      </button>
    </div>
  );
}
