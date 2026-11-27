"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How do I install RenderJoy components?",
    answer:
      "Install components via the shadcn-compatible registry (`pnpm dlx shadcn@latest add @renderjoy/<slug>`) or copy the TypeScript source from Component Studio.",
  },
  {
    question: "Why is sound off by default?",
    answer:
      "Respecting user attention and browser autoplay policies is a core rule. Web Audio synthesis only plays after an explicit user toggle or inside Sound Lab.",
  },
  {
    question: "Do all components support all 29 themes?",
    answer:
      "Yes. Every implemented component consumes scoped --mm-* CSS variables and supports all 29 themes in both Light and Dark modes (58 variants).",
  },
  {
    question: "Are the 200+ inventory items already built?",
    answer:
      "No. 44 core, signature, AI, and control components are implemented today; future waves are transparently labelled as Planned in the Full Inventory view.",
  },
];

export function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    items[0]?.question ?? null
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const isOpen = openQuestion === item.question;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-floating)] overflow-hidden self-start"
          >
            <button
              type="button"
              onClick={() => setOpenQuestion(isOpen ? null : item.question)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--ws-text-muted)] transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-[var(--ws-border-subtle)] px-5 py-3.5 text-xs sm:text-sm leading-relaxed text-[var(--ws-text-secondary)]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
