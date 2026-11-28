"use client";

import React, { useState } from "react";

const MEMBERS = [
  { id: "m1", name: "Maya Lin", title: "Design Systems", dept: "Design" as const },
  { id: "m2", name: "Alex Rivera", title: "Motion Engineer", dept: "Engineering" as const },
  { id: "m3", name: "Samira Patel", title: "WebGL Graphics", dept: "Engineering" as const },
];

export interface TeamSectionProps {
  className?: string;
}

/**
 * Studio team directory block with department filter pills.
 */
export function TeamSection({ className = "" }: TeamSectionProps) {
  const [dept, setDept] = useState<"All" | "Design" | "Engineering">("All");
  const visible = dept === "All" ? MEMBERS : MEMBERS.filter((m) => m.dept === dept);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[var(--mm-fg)]">Core Team</span>
        <div role="group" aria-label="Filter team" className="flex gap-1">
          {(["All", "Design", "Engineering"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDept(d)}
              aria-pressed={dept === d}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
                dept === d
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {visible.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2"
          >
            <div>
              <p className="text-xs font-semibold text-[var(--mm-fg)]">{m.name}</p>
              <p className="text-[11px] text-[var(--mm-fg-muted)]">{m.title}</p>
            </div>
            <span className="font-mono text-[10px] text-[var(--mm-accent)]">{m.dept}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
