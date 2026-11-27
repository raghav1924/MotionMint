"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FounderQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const DEFAULT_QUOTES: FounderQuote[] = [
  {
    id: "q1",
    quote: "Every spring curve feels weighted and intentional—our onboarding conversion jumped 18%.",
    author: "Elena Vance",
    role: "Design Lead, Raycast Studio",
  },
  {
    id: "q2",
    quote: "Drop-in shadcn registry portability with zero lock-in and Apple-level polish.",
    author: "Marcus Chen",
    role: "Staff Engineer, Linear",
  },
];

export function FounderWall({
  quotes = DEFAULT_QUOTES,
  className,
}: {
  quotes?: FounderQuote[];
  className?: string;
}) {
  return (
    <div className={cn("grid w-full max-w-xl grid-cols-1 sm:grid-cols-2 gap-3", className)}>
      {quotes.map((q) => (
        <figure
          key={q.id}
          className="flex flex-col justify-between rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#121216)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <blockquote className="text-xs leading-relaxed text-[var(--mm-fg,#fafafa)]">
            “{q.quote}”
          </blockquote>
          <figcaption className="mt-4 border-t border-[var(--mm-border,rgba(255,255,255,0.08))] pt-3">
            <p className="text-xs font-semibold text-[var(--mm-fg,#fafafa)]">{q.author}</p>
            <p className="text-[11px] text-[var(--mm-fg-muted,#a1a1aa)]">{q.role}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
