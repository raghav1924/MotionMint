"use client";

import React, { useState } from "react";

export interface PricingTierCardProps {
  className?: string;
}

/**
 * Interactive two-tier pricing comparison block with Monthly/Annual billing toggle.
 */
export function PricingTierCard({ className = "" }: PricingTierCardProps) {
  const [annual, setAnnual] = useState(true);
  const [selectedTier, setSelectedTier] = useState<"Solo" | "Team" | null>(null);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
          License Tiers
        </span>
        <div role="group" aria-label="Billing cycle" className="flex gap-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
              !annual
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
              annual
                ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {(
          [
            { name: "Solo" as const, price: annual ? "$79" : "$12", desc: "1 seat · Lifetime updates" },
            { name: "Team" as const, price: annual ? "$249" : "$34", desc: "5 seats · Pro registry" },
          ] as const
        ).map((tier) => (
          <div
            key={tier.name}
            className="flex flex-col justify-between rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3"
          >
            <div>
              <p className="text-xs font-semibold text-[var(--mm-fg)]">{tier.name}</p>
              <p className="mt-1 font-mono text-lg font-bold text-[var(--mm-fg)]">{tier.price}</p>
              <p className="mt-0.5 text-[10px] text-[var(--mm-fg-muted)]">{tier.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTier(tier.name)}
              className="mt-3 w-full rounded-lg bg-[var(--mm-accent)] py-1.5 font-mono text-[10px] font-semibold text-[var(--mm-accent-fg)] cursor-pointer"
            >
              {selectedTier === tier.name ? `Selected ${tier.name}` : `Choose ${tier.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
