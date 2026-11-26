"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Loader2, Sun, Moon, ShieldCheck } from "lucide-react";
import { getThemeById } from "@/lib/themes/registry";
import type { ComponentThemeMode, ThemeId } from "@/lib/themes/types";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { RippleButton } from "@/registry/components/ripple-button";
import { WORKFLOW_PRESETS } from "@/lib/flow/presets";
import { validateWorkflowDAG } from "@/lib/flow/dag";
import type { NodeExecutionStatus } from "@/lib/flow/types";
import { cn } from "@/lib/utils";

const FEATURED_THEMES: ThemeId[] = [
  "minimalism",
  "neo-brutalism",
  "scrapbook",
  "blueprint",
  "cyberpunk",
  "victorian",
];

export function ThemesFlowSplit() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("neo-brutalism");
  const [mode, setMode] = useState<ComponentThemeMode>("light");
  const [clicks, setClicks] = useState(0);

  const activeTheme = getThemeById(selectedTheme);

  const preset = WORKFLOW_PRESETS[0];
  const validation = useMemo(
    () => validateWorkflowDAG(preset.nodes, preset.edges),
    [preset.nodes, preset.edges]
  );
  const [statuses, setStatuses] = useState<Record<string, NodeExecutionStatus>>({});
  const [running, setRunning] = useState(false);

  const handleSimulate = async () => {
    if (running) return;
    setRunning(true);
    setStatuses({});

    for (const nodeId of validation.topologicalOrder) {
      setStatuses((prev) => ({ ...prev, [nodeId]: "running" }));
      await new Promise((r) => setTimeout(r, 200));
      setStatuses((prev) => ({ ...prev, [nodeId]: "success" }));
    }

    setRunning(false);
  };

  return (
    <section
      aria-label="Design languages and node orchestration"
      className="mx-auto max-w-[1400px] px-4 sm:px-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: 29 Themes × Light/Dark = 58 Expressions */}
        <article className="flex flex-col justify-between rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
                01 · Component Themes
              </span>
              <Link
                href="/themes"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ws-text-primary)] hover:underline"
              >
                <span>Open Theme Studio</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ws-text-primary)] sm:text-3xl">
              29 languages. 58 expressions.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
              Each component reads scoped{" "}
              <code className="font-mono text-xs text-[var(--ws-text-primary)]">--mm-*</code>{" "}
              tokens inside <code className="font-mono text-xs text-[var(--ws-text-primary)]">&lt;MotionMintTheme&gt;</code>, keeping the host website calm and untouched.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_THEMES.map((id) => {
                  const t = getThemeById(id);
                  const active = selectedTheme === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedTheme(id)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
                        active
                          ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                          : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                      )}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>

              <div
                role="group"
                aria-label="Component theme polarity"
                className="inline-flex rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-[11px]"
              >
                {(["light", "dark"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 capitalize transition-colors cursor-pointer",
                      mode === m
                        ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                    )}
                  >
                    {m === "light" ? (
                      <Sun className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Moon className="h-3 w-3" aria-hidden="true" />
                    )}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <MotionMintTheme
              theme={selectedTheme}
              mode={mode}
              className="flex min-h-[172px] flex-col items-center justify-center gap-3 rounded-[18px] border border-[var(--mm-border)] bg-[var(--mm-bg)] p-6 text-center transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mm-text-muted)]">
                {activeTheme.name} · {mode}
              </span>
              <RippleButton onClick={() => setClicks((c) => c + 1)}>
                Trigger Expression{clicks > 0 ? ` (${clicks})` : ""}
              </RippleButton>
            </MotionMintTheme>
          </div>
        </article>

        {/* Right: MotionMint Flow Orchestrator */}
        <article className="flex flex-col justify-between rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
                02 · RenderJoy Flow
              </span>
              <Link
                href="/flow"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--ws-text-primary)] hover:underline"
              >
                <span>Open Flow Studio</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ws-text-primary)] sm:text-3xl">
              Connected node pipelines.
            </h2>
            <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
              Built on <code className="font-mono text-xs text-[var(--ws-text-primary)]">@xyflow/react</code>{" "}
              with 9 typed nodes, dynamic{" "}
              <code className="font-mono text-xs text-[var(--ws-text-primary)]">{"{{ variable }}"}</code>{" "}
              handles, and Kahn&apos;s DAG validation.
            </p>
          </div>

          <div className="space-y-4 rounded-[18px] border border-[var(--ws-border)] bg-[var(--ws-bg)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-[var(--ws-text-primary)]">
                  {preset.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  DAG Valid ({validation.numNodes} nodes)
                </span>
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-700 dark:text-amber-300">
                  Simulated Demo
                </span>
              </div>

              <button
                type="button"
                onClick={() => void handleSimulate()}
                disabled={running}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[var(--ws-text-primary)] px-3.5 text-xs font-medium text-[var(--ws-bg)] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {running ? (
                  <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                ) : (
                  <Play className="h-3 w-3" aria-hidden="true" />
                )}
                <span>{running ? "Running…" : "Simulate Run"}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {preset.nodes.slice(0, 4).map((node, index) => {
                const status = statuses[node.id] ?? "idle";
                return (
                  <div
                    key={node.id}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 transition-colors",
                      status === "running" && "border-amber-500/60 bg-amber-500/5",
                      status === "success" && "border-emerald-500/50 bg-emerald-500/5",
                      status === "idle" && "border-[var(--ws-border)] bg-[var(--ws-surface)]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-[var(--ws-text-muted)]">
                      <span>0{index + 1}</span>
                      {status === "running" && (
                        <Loader2 className="h-3 w-3 animate-spin text-amber-500" aria-hidden="true" />
                      )}
                      {status === "success" && (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                      )}
                    </div>
                    <div className="mt-1 truncate text-xs font-medium text-[var(--ws-text-primary)]">
                      {node.data.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
