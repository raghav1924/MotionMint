import React from "react";
import { BRAND } from "@/lib/brand";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--mm-fg)]">
          Documentation
        </h1>
        <p className="text-sm text-[var(--mm-fg-muted)]">
          Architecture, token system, and registry-first integration guide for {BRAND.name}.
        </p>
      </div>

      <section className="mm-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-[var(--mm-fg)]">1. Registry-First Model</h2>
        <p className="text-sm text-[var(--mm-fg-muted)] leading-relaxed">
          Components are authored as self-contained TypeScript files under{" "}
          <code className="font-mono text-xs">registry/components/</code> and distributed via
          a shadcn-compatible JSON registry. You own the source code in your repository.
        </p>
      </section>

      <section className="mm-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-[var(--mm-fg)]">2. Token-Driven Skins</h2>
        <p className="text-sm text-[var(--mm-fg-muted)] leading-relaxed">
          All components consume semantic CSS custom properties (<code className="font-mono text-xs">--mm-accent</code>,{" "}
          <code className="font-mono text-xs">--mm-surface</code>, <code className="font-mono text-xs">--mm-border</code>,{" "}
          <code className="font-mono text-xs">--mm-radius</code>). Switching{" "}
          <code className="font-mono text-xs">data-skin</code> on the root element restyles every component uniformly.
        </p>
      </section>

      <section className="mm-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-[var(--mm-fg)]">3. Sound &amp; Accessibility</h2>
        <p className="text-sm text-[var(--mm-fg-muted)] leading-relaxed">
          Audio feedback is off by default, requires explicit user gesture, and can be
          overridden per component via <code className="font-mono text-xs">sound={`{false}`}</code>.
          All motion respects <code className="font-mono text-xs">prefers-reduced-motion: reduce</code>.
        </p>
      </section>
    </div>
  );
}
