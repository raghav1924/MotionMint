"use client";

import React, { useState } from "react";

const SPOKES = [
  { id: "auth", label: "Auth", x: 50, y: 14, detail: "SHA-256 Pro token gate" },
  { id: "registry", label: "Registry", x: 86, y: 50, detail: "145+ shadcn JSON manifests" },
  { id: "studio", label: "Studio", x: 50, y: 86, detail: "58 isolated theme variants" },
  { id: "edge", label: "Edge", x: 14, y: 50, detail: "Static SSG delivery" },
];

export interface RadialHubDiagramProps {
  className?: string;
}

/**
 * Interactive hub-and-spoke SVG architecture diagram with selectable spokes.
 */
export function RadialHubDiagram({ className = "" }: RadialHubDiagramProps) {
  const [activeId, setActiveId] = useState(SPOKES[0].id);
  const active = SPOKES.find((s) => s.id === activeId) ?? SPOKES[0];

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 ${className}`.trim()}
    >
      <div className="relative h-40 w-40 shrink-0 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          {SPOKES.map((s) => (
            <line
              key={s.id}
              x1="50"
              y1="50"
              x2={s.x}
              y2={s.y}
              stroke={s.id === active.id ? "var(--mm-accent)" : "var(--mm-border)"}
              strokeWidth={s.id === active.id ? "2" : "1"}
            />
          ))}
          <circle cx="50" cy="50" r="10" fill="var(--mm-accent)" />
        </svg>
        {SPOKES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            aria-pressed={s.id === active.id}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 font-mono text-[9px] cursor-pointer ${
              s.id === active.id
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-bold"
                : "border border-[var(--mm-border)] bg-[var(--mm-surface)] text-[var(--mm-fg)]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="text-left min-w-[160px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
          Hub Topology
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--mm-fg)]">{active.label}</p>
        <p className="mt-0.5 text-xs text-[var(--mm-accent)]">{active.detail}</p>
      </div>
    </div>
  );
}
