"use client";

import React, { useState } from "react";
import { Activity, ArrowUpRight, Users, Zap } from "lucide-react";

export type DashboardRange = "7D" | "30D" | "90D";

export interface BentoDashboardBlockProps {
  defaultRange?: DashboardRange;
  className?: string;
}

const RANGE_METRICS: Record<
  DashboardRange,
  { revenue: string; users: string; latency: string; bars: number[] }
> = {
  "7D": { revenue: "$18.4k", users: "2,410", latency: "38ms", bars: [45, 62, 58, 78, 86, 72, 92] },
  "30D": { revenue: "$74.2k", users: "9,840", latency: "41ms", bars: [38, 52, 64, 70, 81, 88, 95] },
  "90D": { revenue: "$214k", users: "28.1k", latency: "36ms", bars: [30, 44, 56, 68, 74, 85, 98] },
};

/**
 * Responsive SaaS analytics bento dashboard block with live timeframe switching.
 */
export function BentoDashboardBlock({
  defaultRange = "30D",
  className = "",
}: BentoDashboardBlockProps) {
  const [range, setRange] = useState<DashboardRange>(defaultRange);
  const metrics = RANGE_METRICS[range];

  return (
    <section
      aria-label="Analytics Bento Dashboard"
      className={`w-full max-w-xl rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[var(--mm-accent)]" aria-hidden="true" />
          <h3 className="text-sm font-semibold">Workspace Telemetry</h3>
        </div>
        <div role="group" aria-label="Timeframe" className="flex rounded-lg border border-[var(--mm-border)] p-0.5 text-[11px]">
          {(["7D", "30D", "90D"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`rounded-md px-2 py-0.5 cursor-pointer ${
                range === r
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-medium"
                  : "text-[var(--mm-fg-muted)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <article className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
          <p className="text-[11px] text-[var(--mm-fg-muted)]">Net Volume</p>
          <p className="mt-1 flex items-center gap-1 text-base font-bold">
            {metrics.revenue}
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
          </p>
        </article>
        <article className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
          <p className="flex items-center gap-1 text-[11px] text-[var(--mm-fg-muted)]">
            <Users className="h-3 w-3" aria-hidden="true" /> Active
          </p>
          <p className="mt-1 text-base font-bold">{metrics.users}</p>
        </article>
        <article className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
          <p className="flex items-center gap-1 text-[11px] text-[var(--mm-fg-muted)]">
            <Zap className="h-3 w-3" aria-hidden="true" /> P95
          </p>
          <p className="mt-1 text-base font-bold">{metrics.latency}</p>
        </article>
      </div>

      <div className="flex h-20 items-end gap-1.5 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
        {metrics.bars.map((pct, i) => (
          <div
            key={i}
            style={{ height: `${pct}%` }}
            className="flex-1 rounded-t bg-[var(--mm-accent)]/85 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  );
}
