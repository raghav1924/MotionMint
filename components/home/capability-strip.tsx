import React from "react";

const VERIFIED_CAPABILITIES = [
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Motion for React",
  "shadcn-compatible registry (50 items)",
  "AI-agent llms.txt discovery",
  "Web Audio API",
];

export function CapabilityStrip() {
  return (
    <section
      aria-label="Verified platform capabilities"
      className="border-b border-[var(--ws-border)] bg-[var(--ws-surface)]"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6">
        {VERIFIED_CAPABILITIES.map((label) => (
          <span
            key={label}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ws-text-secondary)]"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
