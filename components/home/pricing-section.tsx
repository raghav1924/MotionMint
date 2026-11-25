"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { PRICING_TIERS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [componentCount, setComponentCount] = useState(8);
  const [hoursPerComponent, setHoursPerComponent] = useState(6);
  const estimatedHours = componentCount * hoursPerComponent;

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
      <div className="mx-auto max-w-2xl text-center space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
          Value &amp; Pricing Preview
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
          Start with Open Core. Scale when Pro ships.
        </h2>
        <p className="text-sm text-[var(--ws-text-secondary)]">
          Transparent status of what is free and available today versus upcoming Pro
          milestones.
        </p>
      </div>

      {/* Interactive Effort Estimator (clearly labelled user-configurable assumptions) */}
      <div className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 sm:p-6">
        <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--ws-text-primary)]">
                Engineering Effort Estimator
              </span>
              <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--ws-text-muted)]">
                User-configurable assumptions
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block space-y-1.5 text-xs text-[var(--ws-text-secondary)]">
                <span className="flex justify-between">
                  <span>Components adopted</span>
                  <strong className="font-mono text-[var(--ws-text-primary)]">
                    {componentCount}
                  </strong>
                </span>
                <input
                  type="range"
                  min={1}
                  max={44}
                  value={componentCount}
                  onChange={(e) => setComponentCount(Number(e.target.value))}
                  aria-label="Number of components adopted"
                  className="w-full accent-[var(--ws-text-primary)] cursor-pointer"
                />
              </label>

              <label className="block space-y-1.5 text-xs text-[var(--ws-text-secondary)]">
                <span className="flex justify-between">
                  <span>Assumed build + a11y hrs each</span>
                  <strong className="font-mono text-[var(--ws-text-primary)]">
                    {hoursPerComponent}h
                  </strong>
                </span>
                <input
                  type="range"
                  min={2}
                  max={16}
                  value={hoursPerComponent}
                  onChange={(e) => setHoursPerComponent(Number(e.target.value))}
                  aria-label="Assumed hours per component"
                  className="w-full accent-[var(--ws-text-primary)] cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-4 text-center space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
              Estimated Engineering Time
            </p>
            <p className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)]">
              {estimatedHours} hrs
            </p>
            <p className="text-[11px] text-[var(--ws-text-secondary)]">
              Based on your slider inputs ({componentCount} × {hoursPerComponent}h)
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "rounded-[24px] border bg-[var(--ws-floating)] p-7 flex flex-col justify-between gap-6",
              tier.id === "free"
                ? "border-[var(--ws-border-strong)] shadow-[var(--ws-shadow-floating)]"
                : "border-[var(--ws-border)]"
            )}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-[var(--ws-text-primary)]">
                  {tier.name}
                </h3>
                <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--ws-text-secondary)]">
                  {tier.badge}
                </span>
              </div>

              <div>
                <p className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)]">
                  {tier.priceLabel}
                </p>
                <p className="text-xs text-[var(--ws-text-muted)]">{tier.billingNote}</p>
              </div>

              <p className="text-sm text-[var(--ws-text-secondary)]">{tier.description}</p>

              <ul className="space-y-2.5 pt-2">
                {tier.features.map((feat) => (
                  <li
                    key={feat.label}
                    className="flex items-start gap-2.5 text-xs text-[var(--ws-text-primary)]"
                  >
                    {feat.status === "available" ? (
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ws-text-muted)]"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        feat.status === "planned" ? "text-[var(--ws-text-secondary)]" : ""
                      }
                    >
                      {feat.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={tier.ctaHref}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-full px-5 text-xs font-semibold transition-all",
                tier.id === "free"
                  ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)] hover:opacity-90"
                  : "border border-[var(--ws-border-strong)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
              )}
            >
              {tier.ctaLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
