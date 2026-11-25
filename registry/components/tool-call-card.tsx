"use client";

import React, { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, Loader2, Clock, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIToolCall } from "@/lib/ai/types";

export interface ToolCallCardProps {
  toolCall: AIToolCall;
  defaultExpanded?: boolean;
  className?: string;
}

export function ToolCallCard({
  toolCall,
  defaultExpanded = false,
  className,
}: ToolCallCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const statusBadge = {
    pending: { icon: Clock, label: "Pending", cls: "text-[var(--mm-fg-subtle,#71717a)]" },
    running: { icon: Loader2, label: "Running", cls: "text-[var(--mm-accent,#10b981)] animate-spin" },
    success: { icon: CheckCircle2, label: "Success", cls: "text-emerald-400" },
    error: { icon: AlertCircle, label: "Failed", cls: "text-red-400" },
  }[toolCall.status];

  const StatusIcon = statusBadge.icon;

  return (
    <div
      className={cn(
        "w-full rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs hover:bg-[var(--mm-surface-subtle,#141418)] cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Terminal className="h-3.5 w-3.5 shrink-0 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
          <span className="font-mono font-semibold truncate">{toolCall.name}</span>
          <span className={cn("inline-flex items-center gap-1 text-[11px]", statusBadge.cls)}>
            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{statusBadge.label}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[var(--mm-fg-subtle,#71717a)]">
          {typeof toolCall.durationMs === "number" && (
            <span className="font-mono text-[10px]">{toolCall.durationMs}ms</span>
          )}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
            aria-hidden="true"
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[var(--mm-border,rgba(255,255,255,0.08))] bg-[var(--mm-surface-subtle,#141418)] p-3.5 space-y-2.5 text-[11px] font-mono">
          {toolCall.input !== undefined && (
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-[var(--mm-fg-subtle,#71717a)]">
                Input
              </p>
              <pre className="overflow-x-auto text-[var(--mm-fg-muted,#a1a1aa)]">
                {JSON.stringify(toolCall.input, null, 2)}
              </pre>
            </div>
          )}
          {toolCall.output !== undefined && (
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-[var(--mm-fg-subtle,#71717a)]">
                Output
              </p>
              <pre className="overflow-x-auto text-[var(--mm-fg-muted,#a1a1aa)]">
                {JSON.stringify(toolCall.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
