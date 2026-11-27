"use client";

import React, { useState } from "react";
import { Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingCrown({
  monthlyPrice = 29,
  annualDiscount = 0.2,
  className,
}: {
  monthlyPrice?: number;
  annualDiscount?: number;
  className?: string;
}) {
  const [annual, setAnnual] = useState(true);
  const proPrice = annual
    ? Math.round(monthlyPrice * (1 - annualDiscount))
    : monthlyPrice;

  return (
    <div className={cn("w-full max-w-xl space-y-4", className)}>
      <div className="flex items-center justify-center gap-2">
        <div
          role="group"
          aria-label="Billing cycle"
          className="inline-flex items-center rounded-full border border-[var(--mm-border,rgba(255,255,255,0.14))] bg-[var(--mm-surface,#121216)] p-1 text-xs"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors cursor-pointer",
              !annual
                ? "bg-[var(--mm-fg,#fafafa)] text-[var(--mm-bg,#09090b)]"
                : "text-[var(--mm-fg-muted,#a1a1aa)]"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors cursor-pointer",
              annual
                ? "bg-[var(--mm-fg,#fafafa)] text-[var(--mm-bg,#09090b)]"
                : "text-[var(--mm-fg-muted,#a1a1aa)]"
            )}
          >
            Annual (-{Math.round(annualDiscount * 100)}%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#121216)] p-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-[var(--mm-fg-muted,#a1a1aa)]">Starter</p>
            <p className="mt-1 text-2xl font-bold text-[var(--mm-fg,#fafafa)]">
              $0<span className="text-xs font-normal opacity-60">/mo</span>
            </p>
          </div>
          <ul className="space-y-2 text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" />Open registry primitives</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-400" />Full TypeScript source</li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#e6c88c]/50 bg-gradient-to-b from-[#1d1a14] to-[#11100d] p-5 text-white space-y-4 shadow-[0_16px_40px_-14px_rgba(230,200,140,0.3)]">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5e1b9]">
              <Crown className="h-3.5 w-3.5" aria-hidden="true" />
              Royal Pro
            </p>
            <span className="rounded-full bg-[#e6c88c]/15 px-2 py-0.5 font-mono text-[10px] text-[#f5e1b9]">
              Flagship
            </span>
          </div>
          <p className="text-2xl font-bold">
            ${proPrice}<span className="text-xs font-normal text-zinc-400">/mo</span>
          </p>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e6c88c]" />All 58+ Pro &amp; Spatial UI</li>
            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e6c88c]" />WebGL Shaders &amp; Cover Flow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
