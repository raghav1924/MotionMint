"use client";

import React, { useState } from "react";

const TABS = [
  { id: "design", label: "Design", summary: "58 isolated CSS variable theme variants." },
  { id: "motion", label: "Motion", summary: "Spring physics with reduced-motion fallbacks." },
  { id: "audio", label: "Audio", summary: "56 procedural Web Audio UI cues, off by default." },
];

export interface HoverTabsProps {
  className?: string;
}

/**
 * Pointer- and keyboard-activated tabs switching preview on hover, focus, or click.
 */
export function HoverTabs({ className = "" }: HoverTabsProps) {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div role="tablist" aria-label="Hover tabs" className="flex gap-1.5">
        {TABS.map((tab) => {
          const isSelected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onMouseEnter={() => setActiveId(tab.id)}
              onFocus={() => setActiveId(tab.id)}
              onClick={() => setActiveId(tab.id)}
              className={`rounded-full px-3 py-1 font-mono text-[11px] cursor-pointer ${
                isSelected
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] bg-[var(--mm-bg)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2.5 text-xs text-[var(--mm-fg)]"
      >
        {active.summary}
      </div>
    </div>
  );
}
