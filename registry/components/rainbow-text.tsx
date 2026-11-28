"use client";

import React, { useState } from "react";

const PALETTES = [
  "linear-gradient(90deg, #f43f5e, #f59e0b, #10b981, #38bdf8, #a855f7)",
  "linear-gradient(90deg, #38bdf8, #818cf8, #e879f9, #fb7185, #fbbf24)",
];

export interface RainbowTextProps {
  text?: string;
  className?: string;
}

/**
 * Chromatic spectrum headline with interactive palette cycling.
 */
export function RainbowText({
  text = "SPECTRUM TYPE",
  className = "",
}: RainbowTextProps) {
  const [index, setIndex] = useState(0);

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-6 py-4 ${className}`.trim()}
    >
      <span
        style={{
          backgroundImage: PALETTES[index % PALETTES.length],
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        className="font-mono text-xl font-extrabold tracking-wider"
      >
        {text}
      </span>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % PALETTES.length)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        Shift Spectrum ({(index % PALETTES.length) + 1}/{PALETTES.length})
      </button>
    </div>
  );
}
