"use client";

import React from "react";
import { ChevronDown, ChevronUp, Terminal, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import type { DAGValidationResult, ExecutionLogEntry } from "@/lib/flow/types";
import { cn } from "@/lib/utils";

interface ExecutionConsoleProps {
  expanded: boolean;
  onToggleExpand: () => void;
  isRunning: boolean;
  validation: DAGValidationResult;
  logs: ExecutionLogEntry[];
  onClearLogs: () => void;
}

export function ExecutionConsole({
  expanded,
  onToggleExpand,
  isRunning,
  validation,
  logs,
  onClearLogs,
}: ExecutionConsoleProps) {
  return (
    <section
      aria-label="Execution console"
      className="border-t border-[var(--ws-border)] bg-[var(--ws-surface)]"
    >
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ws-text-primary)] cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            <span>Execution Console</span>
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>

          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-700 dark:text-amber-300">
            Simulated Execution Adapter (Demo)
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
              validation.isDag
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
            )}
          >
            {validation.isDag ? (
              <>
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                Valid DAG ({validation.numNodes} nodes · {validation.numEdges} edges)
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                Cycle Detected (Invalid DAG)
              </>
            )}
          </span>

          {isRunning && (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-300">
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
              Simulating…
            </span>
          )}
        </div>

        {logs.length > 0 && (
          <button
            type="button"
            onClick={onClearLogs}
            className="text-[11px] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            Clear logs
          </button>
        )}
      </div>

      {/* Expandable Log Timeline */}
      {expanded && (
        <div className="max-h-48 overflow-y-auto border-t border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] px-4 py-2.5 font-mono text-[11px] space-y-1.5">
          {logs.length === 0 ? (
            <p className="text-[var(--ws-text-muted)]">
              No execution logs yet. Click <strong>Validate DAG</strong> or{" "}
              <strong>Run (Simulated)</strong> to inspect step-by-step execution.
            </p>
          ) : (
            logs.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-2.5 py-1.5"
              >
                <div className="flex flex-wrap items-baseline gap-2 min-w-0">
                  <span className="text-[10px] text-[var(--ws-text-muted)]">
                    {entry.timestamp}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] uppercase",
                      entry.status === "success" && "bg-emerald-500/15 text-emerald-600",
                      entry.status === "running" && "bg-amber-500/15 text-amber-600",
                      entry.status === "error" && "bg-rose-500/15 text-rose-600",
                      entry.status === "idle" && "bg-zinc-500/15 text-zinc-500"
                    )}
                  >
                    {entry.status}
                  </span>
                  <span className="font-semibold text-[var(--ws-text-primary)]">
                    {entry.nodeLabel}
                  </span>
                  <span className="text-[var(--ws-text-secondary)]">{entry.message}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[var(--ws-text-muted)]">
                  {entry.outputPreview && (
                    <span className="max-w-[260px] truncate text-[var(--ws-text-secondary)]">
                      {entry.outputPreview}
                    </span>
                  )}
                  {entry.durationMs !== undefined && <span>{entry.durationMs}ms</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
