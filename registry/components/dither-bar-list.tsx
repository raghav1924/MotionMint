"use client";

import React, { useId, useState } from "react";

export interface BarListEntry {
  id: string;
  label: string;
  value: number;
}

const DEFAULT_BARS: BarListEntry[] = [
  { id: "ripple", label: "Ripple Button", value: 92 },
  { id: "shader", label: "Logo Flare", value: 78 },
  { id: "flow", label: "Flow Canvas", value: 64 },
];

export interface DitherBarListProps {
  entries?: BarListEntry[];
  className?: string;
}

/**
 * Ranked horizontal bar list with dither-textured fill and sort order toggle.
 */
export function DitherBarList({
  entries = DEFAULT_BARS,
  className = "",
}: DitherBarListProps) {
  const patternId = useId();
  const [desc, setDesc] = useState(true);
  const sorted = [...entries].sort((a, b) => (desc ? b.value - a.value : a.value - b.value));
  const maxVal = Math.max(...entries.map((e) => e.value), 1);

  return (
    <div
      className={`w-full max-w-sm rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
          Top Installed
        </span>
        <button
          type="button"
          onClick={() => setDesc((d) => !d)}
          className="rounded-full border border-[var(--mm-border)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
        >
          Sort: {desc ? "Highest" : "Lowest"}
        </button>
      </div>

      <div className="space-y-2.5">
        {sorted.map((entry) => {
          const pct = Math.round((entry.value / maxVal) * 100);
          return (
            <div key={entry.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--mm-fg)]">{entry.label}</span>
                <span className="font-mono tabular-nums text-[var(--mm-fg-muted)]">
                  {entry.value}%
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)]">
                <svg className="h-full" style={{ width: `${pct}%` }} aria-hidden="true">
                  <defs>
                    <pattern id={`${patternId}-${entry.id}`} width="4" height="4" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="0.9" fill="var(--mm-accent)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#${patternId}-${entry.id})`} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
