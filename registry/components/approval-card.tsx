"use client";

import React, { useState } from "react";
import { ShieldAlert, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ApprovalCardProps {
  title: string;
  description: string;
  actionSummary?: string;
  status?: "requires_approval" | "approved" | "rejected";
  onApprove?: () => void;
  onReject?: () => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function ApprovalCard({
  title,
  description,
  actionSummary,
  status: controlledStatus,
  onApprove,
  onReject,
  sound,
  haptic,
  className,
}: ApprovalCardProps) {
  const [internalStatus, setInternalStatus] = useState<
    "requires_approval" | "approved" | "rejected"
  >("requires_approval");

  const status = controlledStatus ?? internalStatus;

  const handleApprove = () => {
    if (controlledStatus === undefined) setInternalStatus("approved");
    triggerInteractionFeedback("success", { sound, haptic });
    onApprove?.();
  };

  const handleReject = () => {
    if (controlledStatus === undefined) setInternalStatus("rejected");
    triggerInteractionFeedback("error", { sound, haptic });
    onReject?.();
  };

  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "w-full rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <ShieldAlert
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
          aria-hidden="true"
        />
        <div className="space-y-1 min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-[var(--mm-fg-muted,#a1a1aa)]">{description}</p>
        </div>
      </div>

      {actionSummary && (
        <pre className="overflow-x-auto rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border,rgba(255,255,255,0.08))] bg-[var(--mm-surface-subtle,#141418)] p-2.5 font-mono text-[11px] text-[var(--mm-fg-muted,#a1a1aa)]">
          <code>{actionSummary}</code>
        </pre>
      )}

      {status === "requires_approval" ? (
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex items-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] px-3 py-1.5 text-xs font-medium text-[var(--mm-fg)] hover:border-red-400 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Reject
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="inline-flex items-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-3 py-1.5 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Approve
          </button>
        </div>
      ) : (
        <p
          role="status"
          className={cn(
            "text-xs font-semibold",
            status === "approved" ? "text-emerald-400" : "text-red-400"
          )}
        >
          {status === "approved" ? "Approved by user" : "Rejected by user"}
        </p>
      )}
    </div>
  );
}
