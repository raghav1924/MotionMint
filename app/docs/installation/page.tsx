import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  getComponentsJsonSnippet,
  getInstallCommand,
  isProductionRegistryConfigured,
} from "@/lib/registry-config";
import { CopyButton } from "@/registry/components/copy-button";

export default function InstallationDocsPage() {
  const isProd = isProductionRegistryConfigured();
  const configSnippet = getComponentsJsonSnippet();
  const sampleInstall = getInstallCommand("swipe-card-deck", "npm");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--mm-accent)]">
          Getting Started
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--mm-fg)]">
          Registry Installation Guide
        </h1>
        <p className="text-sm text-[var(--mm-fg-muted)]">
          Install {BRAND.name} components directly into your React or Next.js project via
          the shadcn-compatible CLI. You own every line of copied source code.
        </p>
        {!isProd && (
          <div className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface-subtle)] px-4 py-2.5 text-xs text-[var(--mm-fg-muted)]">
            <strong>Development Registry Mode:</strong>{" "}
            <code className="font-mono">NEXT_PUBLIC_REGISTRY_URL</code> is not set, so
            commands below target your local registry server (<code className="font-mono">http://localhost:3000/r</code>).
          </div>
        )}
      </div>

      <section className="mm-card p-6 space-y-3">
        <h2 className="text-lg font-semibold">1. Requirements</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--mm-fg-muted)]">
          <li>React 18 or 19 (Next.js App Router recommended)</li>
          <li>Tailwind CSS v4 (or v3 with CSS variables enabled)</li>
          <li>
            An existing <code className="font-mono text-xs">components.json</code>{" "}
            (run <code className="font-mono text-xs">npx shadcn@latest init</code> if needed)
          </li>
        </ul>
      </section>

      <section className="mm-card p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">2. Configure @renderjoy Namespace</h2>
          <CopyButton value={configSnippet} label="Copy JSON" />
        </div>
        <p className="text-sm text-[var(--mm-fg-muted)]">
          Add the <code className="font-mono text-xs">@renderjoy</code> registry to your{" "}
          <code className="font-mono text-xs">components.json</code>:
        </p>
        <pre className="overflow-x-auto rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] p-4 font-mono text-xs text-[var(--mm-fg)]">
          <code>{configSnippet}</code>
        </pre>
      </section>

      <section className="mm-card p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">3. Install Any Component</h2>
          <CopyButton value={sampleInstall} label="Copy Command" />
        </div>
        <p className="text-sm text-[var(--mm-fg-muted)]">
          The CLI automatically resolves npm dependencies (<code className="font-mono text-xs">motion</code>,{" "}
          <code className="font-mono text-xs">lucide-react</code>), shared sound helpers (
          <code className="font-mono text-xs">@renderjoy/sound-engine</code>), and CSS
          keyframes into your <code className="font-mono text-xs">globals.css</code>.
        </p>
        <pre className="overflow-x-auto rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] p-4 font-mono text-xs text-[var(--mm-fg)]">
          <code>{sampleInstall}</code>
        </pre>
      </section>

      <section className="mm-card p-6 space-y-3">
        <h2 className="text-lg font-semibold">4. Standalone Defaults vs. 29-Theme Tokens</h2>
        <p className="text-sm text-[var(--mm-fg-muted)] leading-relaxed">
          Every component includes sensible inline CSS variable fallbacks (e.g.{" "}
          <code className="font-mono text-xs">var(--mm-accent, #10b981)</code>), so it
          works out of the box without installing the 29-theme engine. To customize
          appearance globally, define <code className="font-mono text-xs">--mm-*</code>{" "}
          variables in your <code className="font-mono text-xs">globals.css</code>.
        </p>
        <Link
          href="/components"
          className="inline-block text-xs font-semibold text-[var(--mm-accent)] hover:underline"
        >
          Browse all 12 installable components →
        </Link>
      </section>
    </div>
  );
}
