"use client";

import React, { useState } from "react";

const LOGOS = [
  { id: "acme", name: "Acme AI", group: "AI" as const },
  { id: "vercel", name: "OrbitCloud", group: "DevTools" as const },
  { id: "linear", name: "VectorLab", group: "AI" as const },
  { id: "stripe", name: "PulseCLI", group: "DevTools" as const },
];

export interface LogoCloudProps {
  className?: string;
}

/**
 * Filterable partner logo cloud with semantic category pills.
 */
export function LogoCloud({ className = "" }: LogoCloudProps) {
  const [group, setGroup] = useState<"All" | "AI" | "DevTools">("All");
  const visible = group === "All" ? LOGOS : LOGOS.filter((l) => l.group === group);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
          Trusted Teams
        </span>
        <div role="group" aria-label="Filter logos" className="flex gap-1">
          {(["All", "AI", "DevTools"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
                group === g
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {visible.map((logo) => (
          <div
            key={logo.id}
            className="flex items-center justify-center rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] py-3 font-mono text-xs font-bold tracking-wider text-[var(--mm-fg)]"
          >
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
