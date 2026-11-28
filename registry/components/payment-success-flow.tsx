"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Copy, Receipt, RotateCcw } from "lucide-react";

export interface PaymentSuccessFlowProps {
  amount?: string;
  merchant?: string;
  invoiceId?: string;
  dateLabel?: string;
  className?: string;
}

/**
 * Animated payment receipt reveal with copyable invoice ID and accessible summary.
 */
export function PaymentSuccessFlow({
  amount = "$149.00",
  merchant = "RenderJoy Pro License",
  invoiceId = "INV-2026-8492",
  dateLabel = "Nov 28, 2026",
  className = "",
}: PaymentSuccessFlowProps) {
  const prefersReduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(invoiceId);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <motion.div
      key={replayKey}
      initial={prefersReduced ? false : { opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-label={`Payment confirmed for ${amount}`}
      className={`w-full max-w-sm rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 text-[var(--mm-fg)] shadow-sm space-y-4 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <motion.div
            initial={prefersReduced ? false : { scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
          >
            <Check className="h-5 w-5" aria-hidden="true" />
          </motion.div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-500">
              Payment Confirmed
            </p>
            <p className="text-xl font-bold tracking-tight">{amount}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          aria-label="Replay receipt animation"
          className="rounded-lg border border-[var(--mm-border)] p-1.5 text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-2 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[var(--mm-fg-muted)]">Item</span>
          <span className="font-medium">{merchant}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--mm-fg-muted)]">Date</span>
          <span>{dateLabel}</span>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--mm-border)] pt-2">
          <span className="inline-flex items-center gap-1 text-[var(--mm-fg-muted)]">
            <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
            Invoice
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 font-mono font-medium text-[var(--mm-accent)] hover:underline cursor-pointer"
          >
            <span>{invoiceId}</span>
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
