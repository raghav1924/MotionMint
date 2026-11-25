"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Loader2, ShieldCheck, Workflow } from "lucide-react";
import { WORKFLOW_PRESETS, getFlowNodeDefinition } from "@/lib/flow/presets";
import { validateWorkflowDAG } from "@/lib/flow/dag";
import type { NodeExecutionStatus, PocNodeType } from "@/lib/flow/types";
import { cn } from "@/lib/utils";

export function FlowShowcase() {
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
      await new Promise((r) => setTimeout(r, 220));
      setStatuses((prev) => ({ ...prev, [nodeId]: "success" }));
    }

    setRunning(false);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--ws-text-muted)]">
            MotionMint Flow · Node Pipeline Orchestrator
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--ws-text-primary)] sm:text-4xl">
            From components to connected workflows.
          </h2>
          <p className="text-sm leading-relaxed text-[var(--ws-text-secondary)]">
            Built on <code className="font-mono text-xs text-[var(--ws-text-primary)]">@xyflow/react</code>{" "}
            and ported from our full-stack POC: 9 typed nodes, dynamic{" "}
            <code className="font-mono text-xs text-[var(--ws-text-primary)]">{"{{ variable }}"}</code>{" "}
            handles, and Kahn&apos;s DAG validation.
          </p>
        </div>

        <Link
          href="/flow"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--ws-text-primary)] px-5 text-xs font-medium text-[var(--ws-bg)] hover:opacity-90"
        >
          <span>Explore MotionMint Flow</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ws-text-primary)]">
              <Workflow className="h-4 w-4 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              {preset.name}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Kahn DAG Valid ({validation.numNodes} nodes · {validation.numEdges} edges)
            </span>
            <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-700 dark:text-amber-300">
              Simulated Execution Demo
            </span>
          </div>

          <button
            type="button"
            onClick={() => void handleSimulate()}
            disabled={running}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border-strong)] bg-[var(--ws-floating)] px-3.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] disabled:opacity-50 cursor-pointer"
          >
            {running ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {running ? "Simulating…" : "Simulate Pipeline Run"}
          </button>
        </div>

        {/* Real Pipeline Nodes Excerpt */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {preset.nodes.map((node, idx) => {
            const def = getFlowNodeDefinition(node.type as PocNodeType);
            const status = statuses[node.id] ?? "idle";
            return (
              <div
                key={node.id}
                className={cn(
                  "rounded-2xl border bg-[var(--ws-floating)] p-3.5 transition-all space-y-1.5",
                  status === "running"
                    ? "border-amber-400 ring-2 ring-amber-400/30"
                    : status === "success"
                      ? "border-emerald-500/70"
                      : "border-[var(--ws-border)]"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: def.accent }}
                      aria-hidden="true"
                    />
                    <span className="truncate text-xs font-semibold text-[var(--ws-text-primary)]">
                      {idx + 1}. {String(node.data.label ?? def.label)}
                    </span>
                  </div>
                  {status === "running" && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500 shrink-0" />
                  )}
                  {status === "success" && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                  {def.category} · {node.type}
                </p>
                <p className="text-[11px] text-[var(--ws-text-secondary)] line-clamp-2">
                  {def.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
