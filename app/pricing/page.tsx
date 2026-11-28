import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { WorkspacePage, WorkspaceHeader } from "@/components/workspace/workspace-page";
import { PRICING_TIERS } from "@/lib/pricing";
import { ProLicenseManager } from "@/components/pro/license-manager";

export default function PricingPage() {
  return (
    <WorkspacePage>
      <WorkspaceHeader
        eyebrow="PRICING & LICENSING"
        title="Open core first. Pro when you scale."
        description="Install all Open Core components free via the public shadcn registry, or configure an authenticated @renderjoy-pro licence token."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col justify-between gap-6 rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-semibold text-[var(--ws-text-primary)]">
                  {tier.name}
                </span>
                <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-secondary)]">
                  {tier.badge}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold tracking-tight text-[var(--ws-text-primary)]">
                  {tier.priceLabel}
                </p>
                <p className="mt-1 text-xs text-[var(--ws-text-muted)]">{tier.billingNote}</p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
                {tier.description}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-[var(--ws-text-secondary)]">
                {tier.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={tier.ctaHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--ws-text-primary)] px-5 text-xs font-medium text-[var(--ws-bg)] hover:opacity-90"
            >
              <span>{tier.ctaLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </section>

      <ProLicenseManager />
    </WorkspacePage>
  );
}
