import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ParticleWordmark } from "@/components/site/particle-wordmark";

export function Footer() {
  return (
    <footer className="border-t border-[var(--ws-border)] bg-[var(--ws-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--ws-text-primary)] text-[var(--ws-bg)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
                </svg>
              </span>
              <p className="text-sm font-semibold tracking-tight text-[var(--ws-text-primary)]">
                {BRAND.name}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-[var(--ws-text-secondary)]">
              {BRAND.tagline}. Interactive React components, 58 theme variants, Web Audio
              cues, and Flow workflows.
            </p>
            <p className="font-mono text-[11px] text-[var(--ws-text-muted)]">
              v{BRAND.version} · © {new Date().getFullYear()} {BRAND.name}
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ws-text-muted)]">
              Product
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--ws-text-secondary)]">
              <li><Link href="/components" className="hover:text-[var(--ws-text-primary)]">Components</Link></li>
              <li><Link href="/themes" className="hover:text-[var(--ws-text-primary)]">Themes (29)</Link></li>
              <li><Link href="/flow" className="hover:text-[var(--ws-text-primary)]">MotionMint Flow</Link></li>
              <li><Link href="/motion" className="hover:text-[var(--ws-text-primary)]">Motion Lab</Link></li>
              <li><Link href="/sounds" className="hover:text-[var(--ws-text-primary)]">Sound Lab</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ws-text-muted)]">
              Featured Pieces
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--ws-text-secondary)]">
              <li><Link href="/components/swipe-card-deck" className="hover:text-[var(--ws-text-primary)]">Swipe Card Deck</Link></li>
              <li><Link href="/components/thinking-loader" className="hover:text-[var(--ws-text-primary)]">Thinking Loader</Link></li>
              <li><Link href="/components/physical-knob" className="hover:text-[var(--ws-text-primary)]">Physical Knob</Link></li>
              <li><Link href="/components/infinity-canvas" className="hover:text-[var(--ws-text-primary)]">Infinity Canvas</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--ws-text-muted)]">
              Developers
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--ws-text-secondary)]">
              <li><Link href="/docs" className="hover:text-[var(--ws-text-primary)]">Documentation</Link></li>
              <li><Link href="/docs/installation" className="hover:text-[var(--ws-text-primary)]">CLI Installation</Link></li>
              <li><Link href="/llms.txt" className="hover:text-[var(--ws-text-primary)]">llms.txt (AI Agents)</Link></li>
              <li><Link href="/#pricing" className="hover:text-[var(--ws-text-primary)]">Pricing Preview</Link></li>
              <li><Link href="/#faq" className="hover:text-[var(--ws-text-primary)]">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Original MotionMint Interactive Wordmark Signature */}
        <div className="border-t border-[var(--ws-border-subtle)] pt-8 space-y-2">
          <ParticleWordmark text={BRAND.name} />
          <p className="text-center text-[11px] text-[var(--ws-text-muted)]">
            Interactive canvas wordmark — move your pointer or click to scatter.
          </p>
        </div>
      </div>
    </footer>
  );
}
