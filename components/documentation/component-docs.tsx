"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Code2, Copy, KeyRound, Lock } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { CATALOG_ITEMS, type CatalogItem } from "@/lib/catalog";
import { getInstallCommand, type PackageManager } from "@/lib/registry-config";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

export function ComponentDocs({
  item,
  sourceCode,
}: {
  item: CatalogItem;
  sourceCode: string | null;
}) {
  const [pkg, setPkg] = useState<PackageManager>("pnpm");
  const [activeTab, setActiveTab] = useState<"usage" | "props">("usage");
  const [showFullSource, setShowFullSource] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const installCmd = getInstallCommand(item.slug, pkg);
  const componentExport = item.name.replace(/[^a-zA-Z0-9]/g, "");
  const usageSnippet = `import { ${componentExport} } from "@/components/renderjoy/${item.slug}";\n\nexport function Example() {\n  return <${componentExport} />;\n}`;

  const related = CATALOG_ITEMS.filter(
    (c) => c.status === "implemented" && c.slug !== item.slug && c.category === item.category
  ).slice(0, 3);

  const fallbackRelated =
    related.length >= 3
      ? related
      : CATALOG_ITEMS.filter((c) => c.status === "implemented" && c.slug !== item.slug).slice(0, 3);

  const copyText = async (text: string, which: "cmd" | "usage") => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Ignore clipboard errors
    }
    if (which === "cmd") {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1500);
    } else {
      setCopiedUsage(true);
      setTimeout(() => setCopiedUsage(false), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-[760px] space-y-12 pt-8">
      {/* 10.1 Installation Section */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--ws-text-primary)]">
            Installation
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ws-text-secondary)] capitalize">
            {item.tier === "pro" && <Lock className="h-3 w-3" aria-hidden="true" />}
            {item.tier}
          </span>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)]">
          <div className="flex items-center justify-between border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-3 py-2">
            <div className="flex items-center gap-1" role="tablist" aria-label="Package managers">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  role="tab"
                  aria-selected={pkg === pm}
                  onClick={() => setPkg(pm)}
                  className={cn(
                    "rounded-[8px] px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer",
                    pkg === pm
                      ? "bg-[var(--ws-floating)] text-[var(--ws-text-primary)] shadow-xs border border-[var(--ws-border-subtle)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  {pm}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => copyText(installCmd, "cmd")}
              aria-label="Copy install command"
              className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              {copiedCmd ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs text-[var(--ws-text-primary)]">
            <code>{installCmd}</code>
          </pre>
        </div>
      </section>

      {/* 10.5 Pro Notice — only shown when item.tier === "pro" */}
      {item.tier === "pro" && (
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-primary)]">
              <KeyRound className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-[var(--ws-text-primary)]">
                {BRAND.name} Pro Component
              </h3>
              <p className="text-xs text-[var(--ws-text-secondary)]">
                Part of the upcoming Pro registry collection.
              </p>
            </div>
          </div>
          <Link
            href="/docs/installation"
            className="inline-flex items-center gap-1 rounded-[10px] border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 py-1.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] shrink-0"
          >
            Registry Docs <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      )}

      {/* 10.6 & 10.7 Usage | Props Segmented Tabs + Source Code */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-[12px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-1">
            {(["usage", "props"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={cn(
                  "rounded-[9px] px-4 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer",
                  activeTab === tab
                    ? "bg-[var(--ws-floating)] text-[var(--ws-text-primary)] shadow-xs"
                    : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {sourceCode && (
            <button
              type="button"
              onClick={() => setShowFullSource((s) => !s)}
              aria-expanded={showFullSource}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 py-1.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              {showFullSource ? "Hide Source" : "View Source"}
            </button>
          )}
        </div>

        {showFullSource && sourceCode && (
          <div className="relative rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-4">
            <button
              type="button"
              onClick={() => copyText(sourceCode, "usage")}
              aria-label="Copy full source"
              className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              {copiedUsage ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
            <pre className="max-h-96 overflow-auto pr-10 font-mono text-xs leading-relaxed text-[var(--ws-text-primary)]">
              <code>{sourceCode}</code>
            </pre>
          </div>
        )}

        {activeTab === "usage" ? (
          <div className="space-y-6">
            <div className="relative rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-4">
              <button
                type="button"
                onClick={() => copyText(usageSnippet, "usage")}
                aria-label="Copy usage example"
                className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
              >
                {copiedUsage ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
              <pre className="overflow-x-auto pr-10 font-mono text-xs leading-relaxed text-[var(--ws-text-primary)]">
                <code>{usageSnippet}</code>
              </pre>
            </div>

            {/* 10.8 Use Cases (2 columns) — component-specific */}
            {item.useCases && item.useCases.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-base font-semibold text-[var(--ws-text-primary)]">Use cases</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.useCases.map((uc) => (
                    <div key={uc.title} className="rounded-[16px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 space-y-1">
                      <h3 className="text-xs font-semibold text-[var(--ws-text-primary)]">
                        {uc.title}
                      </h3>
                      <p className="text-xs text-[var(--ws-text-secondary)] leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-floating)]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--ws-border-subtle)]">
                {item.props.map((p) => (
                  <tr key={p.name}>
                    <td className="px-4 py-3 font-mono font-medium text-[var(--ws-text-primary)]">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-[var(--ws-text-secondary)]">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-[var(--ws-text-muted)]">{p.defaultValue}</td>
                    <td className="px-4 py-3 text-[var(--ws-text-secondary)]">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 10.9 Related Components (3 columns) */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--ws-text-primary)]">
            Related components
          </h2>
          <Link
            href="/components"
            className="text-xs font-medium text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
          >
            All related components →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {fallbackRelated.map((rel) => (
            <div
              key={rel.slug}
              className="group flex flex-col rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-2 transition-all hover:border-[var(--ws-border-strong)] hover:shadow-[var(--ws-shadow-floating)]"
            >
              <div className="flex min-h-[140px] items-center justify-center overflow-hidden rounded-[14px] border border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] p-4">
                <ComponentLivePreview slug={rel.slug} />
              </div>
              <Link
                href={`/components/${rel.slug}`}
                className="flex items-center justify-between gap-2 px-2.5 pt-2.5 pb-1 text-xs font-medium text-[var(--ws-text-primary)]"
              >
                <span className="truncate">{rel.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
