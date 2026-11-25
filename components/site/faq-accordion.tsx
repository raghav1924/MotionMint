"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How do I install MotionMint components?",
    a: "Every implemented component is authored as self-contained TypeScript under registry/components/ and can be copied directly from the Component Studio. Automated npx shadcn add registry endpoints are scheduled in Phase 3.",
  },
  {
    q: "Why is sound off by default?",
    a: "Respecting user attention and browser autoplay policies is a core rule. Web Audio synthesis only plays after an explicit user toggle or inside the Sound Lab audition pad.",
  },
  {
    q: "Do all components support all 29 themes?",
    a: "Yes. Every implemented component consumes semantic --mm-* CSS variables and is tested across all 29 theme profiles in our automated matrix.",
  },
  {
    q: "Are the 200+ inventory items already built?",
    a: "No. Twelve core and signature components are implemented and live today; the rest of the inventory is transparently labelled as Planned in the Full Inventory view.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--mm-border)] mm-card overflow-hidden">
      {FAQS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--mm-fg)] hover:bg-[var(--mm-surface-subtle)] cursor-pointer"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--mm-fg-muted)] transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-xs sm:text-sm leading-relaxed text-[var(--mm-fg-muted)]">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
