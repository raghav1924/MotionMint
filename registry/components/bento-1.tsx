"use client";

import React, { useState } from "react";

const TILES = [
  { id: "tokens", title: "Scoped Tokens", metric: "58 variants", note: "CSS vars isolated to preview" },
  { id: "audio", title: "Sound Engine", metric: "56 cues", note: "Zero-dependency Web Audio" },
  { id: "motion", title: "Spring Lab", metric: "6 presets", note: "Reduced-motion safe" },
];

export interface BentoHighlightGridProps {
  className?: string;
}

/**
 * Interactive 3-tile bento showcase with selectable detail focus.
 */
export function BentoHighlightGrid({ className = "" }: BentoHighlightGridProps) {
  const [activeId, setActiveId] = useState(TILES[0].id);
  const active = TILES.find((t) => t.id === activeId) ?? TILES[0];

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((tile) => {
          const isSelected = tile.id === active.id;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setActiveId(tile.id)}
              aria-pressed={isSelected}
              className={`rounded-xl border p-2.5 text-left cursor-pointer ${
                isSelected
                  ? "border-[var(--mm-accent)] bg-[var(--mm-bg)]"
                  : "border-[var(--mm-border)] bg-[var(--mm-bg)]/60"
              }`}
            >
              <p className="text-[11px] font-semibold text-[var(--mm-fg)]">{tile.title}</p>
              <p className="mt-1 font-mono text-[10px] text-[var(--mm-accent)]">{tile.metric}</p>
            </button>
          );
        })}
      </div>
      <p className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2 font-mono text-[11px] text-[var(--mm-fg-muted)]">
        {active.title}: {active.note}
      </p>
    </div>
  );
}
