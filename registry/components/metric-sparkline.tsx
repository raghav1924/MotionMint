"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricSparkline({
  label = "Monthly Recurring Revenue",
  value = "$148,920",
  delta = "+24.8%",
  points = [18, 26, 22, 34, 30, 44, 41, 56, 62],
  className,
}: {
  label?: string;
  value?: string;
  delta?: string;
  points?: number[];
  className?: string;
}) {
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(1, max - min);
  const w = 220;
  const h = 56;
  const coords = points.map((p, idx) => {
    const x = (idx / Math.max(1, points.length - 1)) * w;
    const y = h - ((p - min) / span) * (h - 10) - 5;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#121216)] p-5 space-y-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-medium text-[var(--mm-fg-muted,#a1a1aa)]">{label}</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-[var(--mm-fg,#fafafa)]">
            {value}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
          <TrendingUp className="h-3 w-3" aria-hidden="true" />
          {delta}
        </span>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full overflow-visible" aria-hidden="true">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400"
          points={coords.join(" ")}
        />
      </svg>
    </div>
  );
}
