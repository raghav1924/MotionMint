"use client";

import React, { useState } from "react";

const GLYPHS: Record<string, number[][]> = {
  R: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  J: [
    [0, 0, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
};

const KEYS = Object.keys(GLYPHS);

export interface DotMonogramProps {
  className?: string;
}

/**
 * Interactive LED dot-matrix monogram display with glyph cycling.
 */
export function DotMonogram({ className = "" }: DotMonogramProps) {
  const [idx, setIdx] = useState(0);
  const symbol = KEYS[idx % KEYS.length];
  const matrix = GLYPHS[symbol];

  return (
    <div
      className={`inline-flex flex-col items-center gap-3 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <div
        role="img"
        aria-label={`Dot monogram ${symbol}`}
        className="grid grid-cols-4 gap-1.5 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3"
      >
        {matrix.flatMap((row, r) =>
          row.map((on, c) => (
            <span
              key={`${r}-${c}`}
              className={`h-3 w-3 rounded-full transition-opacity ${
                on ? "bg-[var(--mm-accent)] opacity-100" : "bg-[var(--mm-border)] opacity-35"
              }`}
            />
          ))
        )}
      </div>
      <button
        type="button"
        onClick={() => setIdx((i) => (i + 1) % KEYS.length)}
        className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        Glyph: {symbol}
      </button>
    </div>
  );
}
