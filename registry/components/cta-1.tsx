"use client";

import React, { useState } from "react";

export interface CtaBannerProps {
  heading?: string;
  command?: string;
  className?: string;
}

/**
 * Editorial call-to-action banner with one-click CLI install trigger.
 */
export function CtaBanner({
  heading = "Add tactile motion in seconds.",
  command = "npx shadcn@latest add @renderjoy/ripple-button",
  className = "",
}: CtaBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    setCopied(true);
    try {
      await navigator.clipboard?.writeText(command);
    } catch {
      // Clipboard API may be unavailable
    }
  };

  return (
    <section
      className={`w-full max-w-lg rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-accent)]">
            Zero Lock-In
          </p>
          <h3 className="mt-1 text-base font-bold tracking-tight text-[var(--mm-fg)]">
            {heading}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-[var(--mm-accent)] px-4 py-2 font-mono text-xs font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
        >
          {copied ? "CLI Copied" : "Copy Install CLI"}
        </button>
      </div>
    </section>
  );
}
