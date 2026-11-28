"use client";

import React, { useState } from "react";

export interface FeatureTab {
  id: string;
  label: string;
  headline: string;
  detail: string;
}

export interface FeatureTabsBlockProps {
  tabs?: FeatureTab[];
  className?: string;
}

const DEFAULT_TABS: FeatureTab[] = [
  {
    id: "tokens",
    label: "Scoped Tokens",
    headline: "Zero global style leaks",
    detail: "Each specimen receives inline --mm-* CSS custom properties.",
  },
  {
    id: "motion",
    label: "Spring Physics",
    headline: "Interruptible GPU motion",
    detail: "Shared spring presets with automatic prefers-reduced-motion fallback.",
  },
  {
    id: "registry",
    label: "CLI Registry",
    headline: "Own every line of source",
    detail: "Install directly into your repo with npx shadcn add @renderjoy/<slug>.",
  },
];

/**
 * Interactive 3-tab product feature showcase block.
 */
export function FeatureTabsBlock({
  tabs = DEFAULT_TABS,
  className = "",
}: FeatureTabsBlockProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "tokens");
  const current = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <div role="tablist" aria-label="Product features" className="flex gap-1.5 border-b border-[var(--mm-border)] pb-2.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === current.id}
            onClick={() => setActiveId(tab.id)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
              tab.id === current.id
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)]"
                : "text-[var(--mm-fg-muted)] hover:bg-[var(--mm-bg)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-4 space-y-1">
        <p className="text-sm font-semibold">{current.headline}</p>
        <p className="text-xs leading-relaxed text-[var(--mm-fg-muted)]">{current.detail}</p>
      </div>
    </div>
  );
}
