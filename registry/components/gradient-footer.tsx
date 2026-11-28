"use client";

import React, { useState } from "react";

export interface GradientFooterProps {
  brand?: string;
  className?: string;
}

/**
 * Ambient accent-gradient footer with interactive status pill.
 */
export function GradientFooter({
  brand = "RenderJoy Studio",
  className = "",
}: GradientFooterProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer
      style={{
        backgroundImage: "linear-gradient(135deg, var(--mm-surface) 40%, color-mix(in srgb, var(--mm-accent) 18%, var(--mm-surface)))",
      }}
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] p-5 text-left space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-[var(--mm-fg)]">{brand}</span>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[10px] text-[var(--mm-accent)] cursor-pointer"
        >
          {expanded ? "Hide Status" : "All Systems Operational"}
        </button>
      </div>
      {expanded && (
        <p className="font-mono text-[11px] text-[var(--mm-fg-muted)]">
          Registry CDN: 14ms · Static SSG: 100%
        </p>
      )}
    </footer>
  );
}
