"use client";

import React, { useState } from "react";

const LINKS = ["Components", "Themes", "Docs", "Pricing"];

export interface WordmarkFooterProps {
  wordmark?: string;
  className?: string;
}

/**
 * Oversized editorial wordmark footer with interactive link highlights.
 */
export function WordmarkFooter({
  wordmark = "RENDERJOY",
  className = "",
}: WordmarkFooterProps) {
  const [active, setActive] = useState(LINKS[0]);

  return (
    <footer
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left space-y-4 ${className}`.trim()}
    >
      <div className="flex flex-wrap gap-2">
        {LINKS.map((link) => (
          <button
            key={link}
            type="button"
            onClick={() => setActive(link)}
            aria-pressed={active === link}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
              active === link
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
            }`}
          >
            {link}
          </button>
        ))}
      </div>
      <p className="font-mono text-3xl sm:text-4xl font-black tracking-[0.18em] text-[var(--mm-fg)]">
        {wordmark}
      </p>
    </footer>
  );
}
