"use client";

import React, { useState } from "react";

const QUOTES = [
  { quote: "The scoped 29-theme matrix saved our design system team weeks.", author: "Maya Lin", role: "Staff UI Engineer" },
  { quote: "Opt-in Web Audio gives our flows tactile polish without bloat.", author: "Alex Rivera", role: "Design Technologist" },
];

export interface TestimonialDeckProps {
  className?: string;
}

/**
 * Interactive customer quote spotlight with next/previous controls.
 */
export function TestimonialDeck({ className = "" }: TestimonialDeckProps) {
  const [index, setIndex] = useState(0);
  const current = QUOTES[index % QUOTES.length];

  return (
    <figure
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-left space-y-3 ${className}`.trim()}
    >
      <blockquote className="text-sm font-medium leading-relaxed text-[var(--mm-fg)]">
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between pt-1">
        <figcaption className="text-xs">
          <span className="font-semibold text-[var(--mm-fg)]">{current.author}</span>
          <span className="ml-2 font-mono text-[10px] text-[var(--mm-fg-muted)]">{current.role}</span>
        </figcaption>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % QUOTES.length)}
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[10px] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
        >
          Next Quote
        </button>
      </div>
    </figure>
  );
}
