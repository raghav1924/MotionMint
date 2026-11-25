"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, Terminal, Bot, FileCode2 } from "lucide-react";
import { getInstallCommand, type PackageManager } from "@/lib/registry-config";
import { cn } from "@/lib/utils";

const DX_EXAMPLES = [
  {
    slug: "ripple-button",
    label: "Ripple Button",
    exportName: "RippleButton",
    importPath: "@/components/motionmint/ripple-button",
    snippet: `import { RippleButton } from "@/components/motionmint/ripple-button";\n\nexport function CTA() {\n  return <RippleButton variant="primary">Continue</RippleButton>;\n}`,
  },
  {
    slug: "ai-prompt-composer",
    label: "AI Prompt Composer",
    exportName: "AIPromptComposer",
    importPath: "@/components/motionmint/ai-prompt-composer",
    snippet: `import { AIPromptComposer } from "@/components/motionmint/ai-prompt-composer";\n\nexport function AssistantBar() {\n  return <AIPromptComposer onSubmit={(prompt) => console.log(prompt)} />;\n}`,
  },
  {
    slug: "physical-knob",
    label: "Physical Knob",
    exportName: "PhysicalKnob",
    importPath: "@/components/motionmint/physical-knob",
    snippet: `import { PhysicalKnob } from "@/components/motionmint/physical-knob";\n\nexport function GainDial() {\n  return <PhysicalKnob defaultValue={64} label="Gain" />;\n}`,
  },
  {
    slug: "infinity-canvas",
    label: "Infinity Canvas",
    exportName: "InfinityCanvas",
    importPath: "@/components/motionmint/infinity-canvas",
    snippet: `import { InfinityCanvas } from "@/components/motionmint/infinity-canvas";\n\nexport function SpatialBoard() {\n  return <InfinityCanvas className="h-[420px]" />;\n}`,
  },
  {
    slug: "flow-canvas",
    label: "Flow Canvas",
    exportName: "FlowCanvas",
    importPath: "@/components/motionmint/flow/flow-canvas",
    snippet: `import { FlowCanvas } from "@/components/motionmint/flow/flow-canvas";\nimport { FLOW_NODE_TYPES } from "@/components/motionmint/flow/pipeline-nodes";\n\n// Connect to @xyflow/react state for custom pipeline builders`,
  },
];

export function DeveloperExperienceShowcase() {
  const [selectedSlug, setSelectedSlug] = useState(DX_EXAMPLES[0].slug);
  const [pm, setPm] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const active = DX_EXAMPLES.find((e) => e.slug === selectedSlug) ?? DX_EXAMPLES[0];
  const command = getInstallCommand(active.slug, pm);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(command);
    } catch {
      // Ignore clipboard failures in restricted environments
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
            Developer Experience
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
            Your code. Your components. Your project.
          </h2>
          <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
            Install clean, editable TypeScript source directly into your repository via the
            shadcn-compatible registry — zero black-box wrappers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/docs/installation"
            className="font-medium text-[var(--ws-text-primary)] hover:underline"
          >
            Installation Guide →
          </Link>
          <Link
            href="/llms.txt"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-1 font-mono text-[11px] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
          >
            <Bot className="h-3 w-3" aria-hidden="true" />
            llms.txt
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
        {/* Component Picker */}
        <div className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 space-y-2">
          <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
            Select a registry item
          </p>
          {DX_EXAMPLES.map((item) => {
            const activeItem = item.slug === selectedSlug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSelectedSlug(item.slug)}
                aria-pressed={activeItem}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors cursor-pointer",
                  activeItem
                    ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)] font-medium"
                    : "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] opacity-70">@{item.slug}</span>
              </button>
            );
          })}
        </div>

        {/* Live CLI + Source Preview */}
        <div className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-floating)] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-4 py-2.5">
            <div className="flex items-center gap-1" role="tablist" aria-label="Package manager">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pkgMgr) => (
                <button
                  key={pkgMgr}
                  type="button"
                  role="tab"
                  aria-selected={pm === pkgMgr}
                  onClick={() => setPm(pkgMgr)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer",
                    pm === pkgMgr
                      ? "bg-[var(--ws-floating)] text-[var(--ws-text-primary)] border border-[var(--ws-border-subtle)] shadow-xs"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  {pkgMgr}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void handleCopy()}
              aria-label="Copy CLI command"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 py-1 text-xs text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="border-b border-[var(--ws-border-subtle)] px-4 py-3.5 font-mono text-xs text-[var(--ws-text-primary)] flex items-center gap-2 overflow-x-auto">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-[var(--ws-text-muted)]" aria-hidden="true" />
            <code>{command}</code>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--ws-text-muted)]">
              <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{active.importPath}</span>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-3.5 font-mono text-xs leading-relaxed text-[var(--ws-text-primary)]">
              <code>{active.snippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
