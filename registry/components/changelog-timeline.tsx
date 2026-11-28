"use client";

import React, { useState } from "react";

export type ReleaseKind = "All" | "Added" | "Changed" | "Fixed";

export interface ReleaseEntry {
  version: string;
  date: string;
  kind: Exclude<ReleaseKind, "All">;
  summary: string;
}

export interface ChangelogTimelineProps {
  entries?: ReleaseEntry[];
  className?: string;
}

const DEFAULT_ENTRIES: ReleaseEntry[] = [
  { version: "v1.4.0", date: "Nov 28", kind: "Added", summary: "Launched 29 Theme Demo Websites & Bench workspace." },
  { version: "v1.3.2", date: "Nov 24", kind: "Changed", summary: "Unified PreviewStage across Studio and Theme Studio." },
  { version: "v1.3.1", date: "Nov 20", kind: "Fixed", summary: "Improved WebGL context loss fallback and DPR capping." },
];

/**
 * Release notes timeline with category filter pills.
 */
export function ChangelogTimeline({
  entries = DEFAULT_ENTRIES,
  className = "",
}: ChangelogTimelineProps) {
  const [filter, setFilter] = useState<ReleaseKind>("All");
  const visible = filter === "All" ? entries : entries.filter((e) => e.kind === filter);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold">Release History</span>
        <div role="group" aria-label="Filter release kind" className="flex gap-1 text-[10px]">
          {(["All", "Added", "Changed", "Fixed"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              aria-pressed={filter === k}
              className={`rounded-full border px-2 py-0.5 cursor-pointer ${
                filter === k
                  ? "border-[var(--mm-accent)] bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-medium"
                  : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ol className="space-y-2.5 border-l border-[var(--mm-border)] pl-3">
        {visible.map((entry) => (
          <li key={entry.version} className="space-y-0.5 text-xs">
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="font-semibold text-[var(--mm-fg)]">{entry.version}</span>
              <span className="text-[var(--mm-fg-muted)]">{entry.date}</span>
              <span className="rounded bg-[var(--mm-bg)] px-1.5 py-0.5 text-[var(--mm-accent)]">
                {entry.kind}
              </span>
            </div>
            <p className="text-[var(--mm-fg-muted)]">{entry.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
