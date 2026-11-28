"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

const ORBIT_NODES = [
  { id: "tokens", label: "58 Tokens", detail: "Isolated CSS var scopes" },
  { id: "motion", label: "Spring Lab", detail: "Physics-first choreography" },
  { id: "audio", label: "56 Cues", detail: "Opt-in Web Audio synthesis" },
];

export interface OrbitHeroProps {
  heading?: string;
  className?: string;
}

/**
 * Orbital hero section with interactive satellite badges and reduced-motion fallback.
 */
export function OrbitHero({
  heading = "Ship interfaces with physical feel.",
  className = "",
}: OrbitHeroProps) {
  const prefersReduced = useReducedMotion();
  const [activeId, setActiveId] = useState(ORBIT_NODES[0].id);
  const active = ORBIT_NODES.find((n) => n.id === activeId) ?? ORBIT_NODES[0];

  return (
    <section
      className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-6 text-center ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-[var(--mm-accent)]/40 ${
          prefersReduced ? "" : "animate-spin"
        }`}
        style={prefersReduced ? undefined : { animationDuration: "18s" }}
      >
        <span className="h-3 w-3 rounded-full bg-[var(--mm-accent)]" />
      </div>

      <h3 className="text-xl font-bold tracking-tight text-[var(--mm-fg)]">{heading}</h3>
      <p className="mt-1.5 font-mono text-xs text-[var(--mm-accent)]">{active.detail}</p>

      <div role="group" aria-label="Orbit highlights" className="mt-4 flex flex-wrap justify-center gap-2">
        {ORBIT_NODES.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setActiveId(node.id)}
            aria-pressed={activeId === node.id}
            className={`rounded-full px-3 py-1 font-mono text-[11px] cursor-pointer ${
              activeId === node.id
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] bg-[var(--mm-bg)] text-[var(--mm-fg-muted)]"
            }`}
          >
            {node.label}
          </button>
        ))}
      </div>
    </section>
  );
}
