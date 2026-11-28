"use client";

import React, { useState } from "react";

const MOODS = {
  Dawn: { skyOpacity: 0.2, label: "First Light" },
  Dusk: { skyOpacity: 0.38, label: "Golden Horizon" },
  Midnight: { skyOpacity: 0.55, label: "Quiet Orbit" },
} as const;

type MoodKey = keyof typeof MOODS;

export interface ScenicHeroProps {
  className?: string;
}

/**
 * Layered SVG horizon hero with time-of-day atmospheric mood switcher.
 */
export function ScenicHero({ className = "" }: ScenicHeroProps) {
  const [mood, setMood] = useState<MoodKey>("Dusk");
  const current = MOODS[mood];

  return (
    <section
      className={`w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left space-y-3 ${className}`.trim()}
    >
      <div className="relative h-24 w-full overflow-hidden rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)]">
        <svg viewBox="0 0 240 80" className="h-full w-full" aria-hidden="true">
          <rect width="240" height="80" fill="var(--mm-accent)" fillOpacity={current.skyOpacity} />
          <circle cx="185" cy="26" r="12" fill="var(--mm-accent)" fillOpacity="0.65" />
          <path d="M0 64 Q 70 42 140 58 T 240 52 L 240 80 L 0 80 Z" fill="var(--mm-surface)" />
        </svg>
        <span className="absolute bottom-2 left-3 font-mono text-[10px] font-semibold text-[var(--mm-fg)]">
          {current.label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[var(--mm-fg)]">Scenic Horizon</h3>
        <div role="group" aria-label="Scenic mood" className="flex gap-1">
          {(Object.keys(MOODS) as MoodKey[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              aria-pressed={mood === m}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
                mood === m
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
