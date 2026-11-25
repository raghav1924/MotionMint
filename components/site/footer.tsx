import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { ParticleWordmark } from "@/components/site/particle-wordmark";

export function Footer() {
  return (
    <footer className="border-t border-[var(--mm-border)] bg-[var(--mm-surface-subtle)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 space-y-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm font-bold text-[var(--mm-fg)]">{BRAND.name}</p>
            <p className="text-xs leading-relaxed text-[var(--mm-fg-muted)]">
              {BRAND.tagline}. Interaction-first React components, 29 themes, and opt-in
              Web Audio &amp; haptic feedback.
            </p>
            <p className="font-mono text-[11px] text-[var(--mm-fg-subtle)]">
              v{BRAND.version}
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mm-fg-subtle)]">
              Explore
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--mm-fg-muted)]">
              <li><Link href="/components" className="hover:text-[var(--mm-fg)]">Component Catalogue</Link></li>
              <li><Link href="/themes" className="hover:text-[var(--mm-fg)]">29-Theme Gallery</Link></li>
              <li><Link href="/sounds" className="hover:text-[var(--mm-fg)]">Sound &amp; Haptics Lab</Link></li>
              <li><Link href="/flow" className="hover:text-[var(--mm-fg)]">MotionMint Flow (Phase 6)</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mm-fg-subtle)]">
              Signature
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--mm-fg-muted)]">
              <li><Link href="/components/swipe-card-deck" className="hover:text-[var(--mm-fg)]">Swipe Card Deck</Link></li>
              <li><Link href="/components/thinking-loader" className="hover:text-[var(--mm-fg)]">Thinking Loader</Link></li>
              <li><Link href="/components/flip-card" className="hover:text-[var(--mm-fg)]">Direction-Aware Flip Card</Link></li>
              <li><Link href="/components/dropzone" className="hover:text-[var(--mm-fg)]">File Dropzone</Link></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mm-fg-subtle)]">
              Resources
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--mm-fg-muted)]">
              <li><Link href="/docs" className="hover:text-[var(--mm-fg)]">Documentation</Link></li>
              <li><Link href="/#pricing" className="hover:text-[var(--mm-fg)]">Pricing Preview</Link></li>
              <li><Link href="/#faq" className="hover:text-[var(--mm-fg)]">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Large Interactive Wordmark Signature */}
        <div className="border-t border-[var(--mm-border)] pt-8 space-y-2">
          <ParticleWordmark text={BRAND.name} />
          <p className="text-center text-[11px] text-[var(--mm-fg-subtle)]">
            Move your pointer or click the wordmark above for a particle shockwave.
          </p>
        </div>
      </div>
    </footer>
  );
}
