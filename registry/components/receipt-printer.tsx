"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Printer, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ReceiptLineItem {
  name: string;
  qty: number;
  price: number;
}

export interface ReceiptPrinterProps {
  title?: string;
  items: ReceiptLineItem[];
  currency?: string;
  animate?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function ReceiptPrinter({
  title = "Order Summary",
  items,
  currency = "USD",
  animate = true,
  sound,
  haptic,
  className,
}: ReceiptPrinterProps) {
  const [printKey, setPrintKey] = useState(0);
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency });
  const total = items.reduce((acc, it) => acc + it.qty * it.price, 0);

  return (
    <div className={cn("w-full max-w-xs space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--mm-fg-muted)]">
          <Printer className="h-3.5 w-3.5 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
          Receipt Output
        </span>
        <button
          type="button"
          onClick={() => {
            setPrintKey((k) => k + 1);
            triggerInteractionFeedback("click", { sound, haptic });
          }}
          aria-label="Reprint receipt"
          className="inline-flex items-center gap-1 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] px-2 py-1 text-[11px] text-[var(--mm-fg)] cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reprint
        </button>
      </div>

      <div className="overflow-hidden rounded-t-md border-t-4 border-[var(--mm-border-strong)]">
        <motion.div
          key={printKey}
          initial={shouldAnimate ? { y: -40, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="border border-t-0 border-[var(--mm-border)] bg-[var(--mm-surface,#111114)] p-4 font-mono text-xs text-[var(--mm-fg,#fafafa)] space-y-3"
        >
          <div className="border-b border-dashed border-[var(--mm-border-strong)] pb-2 text-center">
            <p className="font-bold uppercase tracking-wider">{title}</p>
            <p className="text-[10px] text-[var(--mm-fg-subtle)]">Sample Printable Receipt</p>
          </div>

          <ul className="space-y-1.5">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="truncate">
                  {item.qty}× {item.name}
                </span>
                <span className="tabular-nums">{fmt.format(item.qty * item.price)}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-dashed border-[var(--mm-border-strong)] pt-2 font-bold">
            <span>TOTAL</span>
            <span className="tabular-nums text-[var(--mm-accent,#10b981)]">
              {fmt.format(total)}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
