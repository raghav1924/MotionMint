import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicHero } from "@/components/home/cinematic-hero";
import { CapabilityStrip } from "@/components/home/capability-strip";
import { ExhibitionGallery } from "@/components/site/exhibition-gallery";
import { ThemesFlowSplit } from "@/components/home/themes-flow-split";

export default function HomePage() {
  return (
    <div className="pb-20 sm:pb-24">
      {/* Beat 1–2: Hybrid Sculptural Silk + Living Components Hero */}
      <CinematicHero />

      {/* Beat 3: Compact Capability Strip */}
      <CapabilityStrip />

      {/* Beat 4–6: Curated Exhibition, Split Themes+Flow, Closing CTA */}
      <div className="space-y-24 pt-20 sm:space-y-32 sm:pt-28">
        {/* Beat 4: Selected Work Exhibition */}
        <section
          aria-label="Selected component exhibition"
          className="mx-auto max-w-[1400px] px-4 sm:px-8 space-y-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl space-y-2.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
                Selected Work
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--ws-text-primary)] sm:text-5xl">
                Made to move.
              </h2>
              <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
                Five tactile specimens rendered live inside scoped{" "}
                <code className="font-mono text-xs text-[var(--ws-text-primary)]">--mm-*</code>{" "}
                design languages.
              </p>
            </div>

            <Link
              href="/components"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--ws-border-strong)] bg-[var(--ws-surface)] px-5 text-xs font-medium text-[var(--ws-text-primary)] transition-colors hover:bg-[var(--ws-surface-hover)]"
            >
              <span>Explore the library</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ExhibitionGallery />
        </section>

        {/* Beat 5: Combined Split Editorial — 29 Themes & RenderJoy Flow */}
        <ThemesFlowSplit />

        {/* Beat 6: Compact Developer CTA */}
        <section
          aria-label="Get started with RenderJoy"
          className="mx-auto max-w-[1400px] px-4 sm:px-8"
        >
          <div className="flex flex-col justify-between gap-8 rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-8 sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
                shadcn-compatible Registry
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--ws-text-primary)] sm:text-4xl">
                Your next interface starts here.
              </h2>
              <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
                Install individual React components with clean TypeScript source, scoped theme tokens, and zero lock-in.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--ws-text-primary)] px-6 text-sm font-medium text-[var(--ws-bg)] transition-opacity hover:opacity-90"
              >
                <span>Browse 44 Components</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/docs/installation"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--ws-border-strong)] bg-[var(--ws-bg)] px-6 text-sm font-medium text-[var(--ws-text-primary)] transition-colors hover:bg-[var(--ws-surface-hover)]"
              >
                <span>Read Installation Docs</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
