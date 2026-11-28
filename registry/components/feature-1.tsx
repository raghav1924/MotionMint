"use client";

import React, { useState } from "react";

const FEATURES = [
  { id: "cli", label: "Zero Lock-In", snippet: "npx shadcn@latest add @renderjoy/ripple-button" },
  { id: "themes", label: "29 Themes", snippet: '<RenderJoyTheme theme="cyberpunk" mode="dark">' },
  { id: "audio", label: "56 Audio Cues", snippet: 'const { play } = useSound("click-soft");' },
];

export interface FeatureSpotlightProps {
  className?: string;
}

/**
 * Interactive feature highlight card pairing capability chips with code snippets.
 */
export function FeatureSpotlight({ className = "" }: FeatureSpotlightProps) {
  const [selectedId, setSelectedId] = useState(FEATURES[0].id);
  const active = FEATURES.find((f) => f.id === selectedId) ?? FEATURES[0];

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div role="group" aria-label="Feature highlights" className="flex flex-wrap gap-1.5">
        {FEATURES.map((feat) => (
          <button
            key={feat.id}
            type="button"
            onClick={() => setSelectedId(feat.id)}
            aria-pressed={selectedId === feat.id}
            className={`rounded-full px-3 py-1 font-mono text-[11px] cursor-pointer ${
              selectedId === feat.id
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] bg-[var(--mm-bg)] text-[var(--mm-fg-muted)]"
            }`}
          >
            {feat.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3 font-mono text-[11px] text-[var(--mm-fg)]">
        <code>{active.snippet}</code>
      </pre>
    </div>
  );
}
