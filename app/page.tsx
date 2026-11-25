import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown, Check, Clock, Sparkles, Volume2, Palette, Workflow } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PRICING_TIERS } from "@/lib/pricing";
import { SilkBackdrop } from "@/components/site/silk-backdrop";
import { HomeHeroDemo } from "@/components/site/home-hero-demo";
import { ExhibitionGallery } from "@/components/site/exhibition-gallery";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-16">
      {/* 2.1 Full-Screen Hero Entrance */}
      <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden border-b border-[var(--mm-border)] px-4 py-16 sm:px-6">
        <SilkBackdrop />

        <div className="relative z-10 mx-auto w-full max-w-6xl space-y-12">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)]/80 px-3.5 py-1 text-xs font-medium text-[var(--mm-accent)] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{BRAND.name} · 12 Live Components · 29 Themes</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--mm-fg)] sm:text-6xl lg:text-7xl">
              Make interfaces feel alive.
            </h1>

            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--mm-fg-muted)]">
              Distinctive React components, expressive motion, optional Web Audio &amp;
              haptic feedback, and 29 visual themes — ready to explore in the Component
              Studio and make your own.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--mm-accent)] px-6 py-3 text-sm font-semibold text-[var(--mm-accent-fg)] shadow-[var(--mm-shadow)] transition hover:brightness-110"
              >
                Explore Components
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/components/swipe-card-deck"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)]/85 px-6 py-3 text-sm font-medium text-[var(--mm-fg)] backdrop-blur-sm transition hover:border-[var(--mm-accent)]"
              >
                Discover Signature Effects
              </Link>
            </div>

            <p className="text-[11px] font-mono text-[var(--mm-fg-subtle)]">
              React 19 · Next.js 16 · Tailwind CSS v4 · Motion · Web Audio API
            </p>
          </div>

          <HomeHeroDemo />

          <div className="flex justify-center">
            <a
              href="#exhibition"
              aria-label="Scroll to component exhibition"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--mm-fg-subtle)] hover:text-[var(--mm-fg)]"
            >
              <span>Scroll to exhibition</span>
              <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 2.3 Asymmetric Component Exhibition */}
      <section id="exhibition" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--mm-accent)]">
              Component Exhibition
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Curated interactive experiences
            </h2>
            <p className="text-sm text-[var(--mm-fg-muted)]">
              Every preview below is a live, interactive MotionMint component—no static
              mockups. Open any piece in the Component Studio to inspect props, themes,
              and source code.
            </p>
          </div>
          <Link
            href="/components"
            className="text-sm font-medium text-[var(--mm-accent)] hover:underline"
          >
            Browse full catalogue →
          </Link>
        </div>

        <ExhibitionGallery />
      </section>

      {/* 2.4 Editorial Product Storytelling */}
      <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--mm-accent)]">
            Why MotionMint
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Components that go beyond static UI.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          <div className="mm-card p-7 md:col-span-7 flex flex-col justify-between gap-4">
            <Palette className="h-6 w-6 text-[var(--mm-accent)]" aria-hidden="true" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Twenty-Nine Complete Visual Themes</h3>
              <p className="text-sm leading-relaxed text-[var(--mm-fg-muted)]">
                Not just light and dark toggles. Switch seamlessly between Minimalism,
                Swiss Design, Blueprint, Cyberpunk, Glassmorphism, Neo-Brutalism, and Wabi
                Sabi—each with its own colour palette, typography, geometry, motion
                easing, and decorative texture.
              </p>
            </div>
            <Link
              href="/themes"
              className="text-xs font-semibold text-[var(--mm-accent)] hover:underline"
            >
              Explore all 29 themes →
            </Link>
          </div>

          <div className="mm-card p-7 md:col-span-5 flex flex-col justify-between gap-4">
            <Volume2 className="h-6 w-6 text-[var(--mm-accent)]" aria-hidden="true" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Opt-In Sound &amp; Haptics</h3>
              <p className="text-sm leading-relaxed text-[var(--mm-fg-muted)]">
                Zero external audio files. Our Web Audio synthesizer and{" "}
                <code className="font-mono text-xs">navigator.vibrate</code> abstraction
                default to <strong>OFF</strong> and only respond to deliberate gestures.
              </p>
            </div>
            <Link
              href="/sounds"
              className="text-xs font-semibold text-[var(--mm-accent)] hover:underline"
            >
              Open Sound Lab →
            </Link>
          </div>

          <div className="mm-card p-7 md:col-span-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--mm-accent)]">
                <Workflow className="h-4 w-4" aria-hidden="true" />
                <span>Developing Product Area · Phase 6</span>
              </div>
              <h3 className="text-xl font-bold">
                MotionMint Flow &amp; Node Pipeline Orchestrator
              </h3>
              <p className="text-sm text-[var(--mm-fg-muted)]">
                A reusable node-workflow UI kit built on <code className="font-mono text-xs">@xyflow/react</code>{" "}
                paired with the Node Pipeline Orchestrator demo—scheduled for Phase 6.
              </p>
            </div>
            <Link
              href="/flow"
              className="shrink-0 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated)] px-5 py-2.5 text-xs font-semibold text-[var(--mm-fg)] hover:border-[var(--mm-accent)]"
            >
              View Flow Roadmap →
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5 Pricing Section */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--mm-accent)]">
            Pricing Preview
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Open Core today. Pro Ecosystem on the roadmap.
          </h2>
          <p className="text-sm text-[var(--mm-fg-muted)]">
            Pro pricing and Merchant-of-Record integration are intentionally deferred until
            the Free core and Pro flows are validated.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "mm-card p-7 flex flex-col justify-between gap-6",
                tier.id === "free" && "border-[var(--mm-accent)]"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  <span className="rounded-full bg-[var(--mm-accent-soft)] px-2.5 py-0.5 text-[10px] font-semibold uppercase text-[var(--mm-accent)]">
                    {tier.badge}
                  </span>
                </div>

                <div>
                  <p className="text-3xl font-extrabold">{tier.priceLabel}</p>
                  <p className="mt-0.5 text-xs text-[var(--mm-fg-subtle)]">{tier.billingNote}</p>
                </div>

                <p className="text-sm text-[var(--mm-fg-muted)]">{tier.description}</p>

                <ul className="space-y-2.5 pt-2">
                  {tier.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-xs text-[var(--mm-fg-muted)]">
                      {f.status === "available" ? (
                        <Check className="h-4 w-4 shrink-0 text-[var(--mm-accent)]" aria-hidden="true" />
                      ) : (
                        <Clock className="h-4 w-4 shrink-0 text-[var(--mm-fg-subtle)]" aria-hidden="true" />
                      )}
                      <span>
                        {f.label}
                        {f.status === "planned" && (
                          <span className="ml-1.5 text-[10px] uppercase text-[var(--mm-fg-subtle)]">
                            (Planned)
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tier.ctaHref}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold transition",
                  tier.id === "free"
                    ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] hover:brightness-110"
                    : "border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated)] text-[var(--mm-fg)] hover:border-[var(--mm-accent)]"
                )}
              >
                {tier.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
        <div className="space-y-2 text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--mm-accent)]">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Common questions</h2>
        </div>
        <FaqAccordion />
      </section>
    </div>
  );
}
