"use client";

import React from "react";
import { CheckCircle2, Circle, Loader2, XCircle, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentPlanStep } from "@/lib/ai/types";

export interface AgentPlanProps {
  title?: string;
  steps: AgentPlanStep[];
  className?: string;
}

export function AgentPlan({
  title = "Execution Plan",
  steps,
  className,
}: AgentPlanProps) {
  const completedCount = steps.filter((s) => s.status === "completed").length;

  return (
    <div
      className={cn(
        "w-full rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--mm-border,rgba(255,255,255,0.08))] pb-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mm-fg-muted,#a1a1aa)]">
          {title}
        </h3>
        <span className="font-mono text-[11px] text-[var(--mm-accent,#10b981)]">
          {completedCount} / {steps.length}
        </span>
      </div>

      <ol className="space-y-2.5">
        {steps.map((step) => {
          const Icon =
            step.status === "completed"
              ? CheckCircle2
              : step.status === "in_progress"
                ? Loader2
                : step.status === "failed"
                  ? XCircle
                  : step.status === "skipped"
                    ? MinusCircle
                    : Circle;

          return (
            <li key={step.id} className="flex items-start gap-2.5 text-xs">
              <Icon
                aria-hidden="true"
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  step.status === "completed" && "text-emerald-400",
                  step.status === "in_progress" && "text-[var(--mm-accent,#10b981)] animate-spin motion-reduce:animate-none",
                  step.status === "failed" && "text-red-400",
                  (step.status === "pending" || step.status === "skipped") &&
                    "text-[var(--mm-fg-subtle,#71717a)]"
                )}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-medium",
                    step.status === "skipped" && "line-through text-[var(--mm-fg-subtle,#71717a)]"
                  )}
                >
                  {step.title}
                </p>
                {step.detail && (
                  <p className="mt-0.5 text-[11px] text-[var(--mm-fg-muted,#a1a1aa)]">
                    {step.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
