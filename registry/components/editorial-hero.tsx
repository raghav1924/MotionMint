"use client";

import React, { useState } from "react";

const EDITIONS = [
  { id: "01", title: "Issue 01 · Kinetic Systems", summary: "Crafted spring curves and scoped design tokens." },
  { id: "02", title: "Issue 02 · Tactile Audio", summary: "Zero-dependency procedural Web Audio synthesis." },
];

export interface EditorialHeroProps {
  className?: string;
}

/**
 * Magazine-style split editorial hero with interactive edition switcher.
 */
export function EditorialHero({ className = "" }: EditorialHeroProps) {
  const [editionId, setEditionId] = useState("01");
  const current = EDITIONS.find((e) => e.id === editionId) ?? EDITIONS[0];

  return (
    <section
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-accent)]">
          Editorial Monograph
        </span>
        <div role="group" aria-label="Select edition" className="flex gap-1">
          {EDITIONS.map((ed) => (
            <button
              key={ed.id}
              type="button"
              onClick={() => setEditionId(ed.id)}
              aria-pressed={editionId === ed.id}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
                editionId === ed.id
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              #{ed.id}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold tracking-tight text-[var(--mm-fg)]">{current.title}</h3>
      <p className="text-xs text-[var(--mm-fg-muted)]">{current.summary}</p>
    </section>
  );
}
