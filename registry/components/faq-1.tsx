"use client";

import React, { useState } from "react";

const QUESTIONS = [
  { id: "q1", q: "Can I copy source directly?", a: "Yes. Every component installs as standalone TypeScript." },
  { id: "q2", q: "Is audio enabled automatically?", a: "No. Sound is always off by default until user opt-in." },
];

export interface FaqQuickListProps {
  className?: string;
}

/**
 * Compact expandable FAQ list with aria-expanded disclosure buttons.
 */
export function FaqQuickList({ className = "" }: FaqQuickListProps) {
  const [openId, setOpenId] = useState<string | null>(QUESTIONS[0].id);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-2 text-left ${className}`.trim()}
    >
      {QUESTIONS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between text-left text-xs font-semibold text-[var(--mm-fg)] cursor-pointer"
            >
              <span>{item.q}</span>
              <span className="font-mono text-[11px] text-[var(--mm-accent)]">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="mt-1.5 text-[11px] text-[var(--mm-fg-muted)]">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
