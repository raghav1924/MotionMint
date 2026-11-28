"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqAccordionBlockProps {
  items?: FaqItem[];
  className?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "q1",
    question: "Do components lock me into a runtime package?",
    answer: "No. Every component installs directly as TypeScript source via shadcn CLI.",
  },
  {
    id: "q2",
    question: "How does sound feedback behave by default?",
    answer: "Sound is strictly off by default and only triggers on explicit user gesture.",
  },
  {
    id: "q3",
    question: "Can I mix multiple themes on one page?",
    answer: "Yes. Wrap any subtree in <RenderJoyTheme theme mode> with zero global leaks.",
  },
];

/**
 * Accessible FAQ accordion block with aria-expanded controls.
 */
export function FaqAccordionBlock({
  items = DEFAULT_FAQS,
  className = "",
}: FaqAccordionBlockProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div
      className={`w-full max-w-md divide-y divide-[var(--mm-border)] rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] px-4 text-[var(--mm-fg)] shadow-sm ${className}`.trim()}
    >
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div key={item.id} className="py-3">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-2 text-left text-xs font-semibold cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p className="mt-2 text-xs leading-relaxed text-[var(--mm-fg-muted)]">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
