"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export type ChartMode = "bar" | "donut" | "gauge";

export interface ChartDatum {
  label: string;
  value: number;
}

export interface AnimatedChartsProps {
  data?: ChartDatum[];
  defaultMode?: ChartMode;
  title?: string;
  className?: string;
}

const DEFAULT_DATA: ChartDatum[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 68 },
  { label: "Wed", value: 54 },
  { label: "Thu", value: 88 },
  { label: "Fri", value: 76 },
];

/**
 * Animated SVG Bar, Donut, and Gauge charts with an accessible tabular view toggle.
 */
export function AnimatedCharts({
  data = DEFAULT_DATA,
  defaultMode = "bar",
  title = "Weekly Throughput",
  className = "",
}: AnimatedChartsProps) {
  const prefersReduced = useReducedMotion();
  const [mode, setMode] = useState<ChartMode>(defaultMode);
  const [showTable, setShowTable] = useState(false);

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const avg = Math.round(total / Math.max(data.length, 1));

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <div className="flex items-center gap-1.5">
          <div role="group" aria-label="Chart mode" className="flex rounded-lg border border-[var(--mm-border)] p-0.5 text-[11px]">
            {(["bar", "donut", "gauge"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`rounded-md px-2 py-0.5 capitalize cursor-pointer ${
                  mode === m
                    ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-medium"
                    : "text-[var(--mm-fg-muted)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowTable((t) => !t)}
            aria-pressed={showTable}
            className="rounded-lg border border-[var(--mm-border)] px-2 py-1 text-[11px] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
          >
            {showTable ? "Chart" : "Table"}
          </button>
        </div>
      </div>

      {showTable ? (
        <table className="w-full text-left text-xs border-collapse" aria-label={title}>
          <thead>
            <tr className="border-b border-[var(--mm-border)] text-[var(--mm-fg-muted)]">
              <th className="py-1.5 font-medium">Label</th>
              <th className="py-1.5 text-right font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b border-[var(--mm-border)]/50">
                <td className="py-1.5">{d.label}</td>
                <td className="py-1.5 text-right font-mono">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : mode === "bar" ? (
        <div className="flex h-36 items-end justify-between gap-2 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
          {data.map((d) => {
            const pct = Math.round((d.value / maxVal) * 100);
            return (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                <motion.div
                  initial={prefersReduced ? false : { height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="w-full max-w-[32px] rounded-t-md bg-[var(--mm-accent)]"
                  title={`${d.label}: ${d.value}`}
                />
                <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">{d.label}</span>
              </div>
            );
          })}
        </div>
      ) : mode === "donut" ? (
        <div className="flex items-center justify-center gap-6 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-4">
          <svg width="108" height="108" viewBox="0 0 108 108" aria-label={`${title} donut chart`}>
            <circle cx="54" cy="54" r="40" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="12" />
            <motion.circle
              cx="54"
              cy="54"
              r="40"
              fill="none"
              stroke="var(--mm-accent)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 40}
              initial={prefersReduced ? false : { strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - Math.min(avg, 100) / 100) }}
              transition={{ duration: 0.6 }}
              transform="rotate(-90 54 54)"
            />
            <text x="54" y="58" textAnchor="middle" fill="currentColor" className="text-sm font-bold">
              {avg}%
            </text>
          </svg>
          <div className="space-y-1 text-xs">
            <p className="font-semibold">Average Utilization</p>
            <p className="text-[var(--mm-fg-muted)]">Total: {total} units</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-4">
          <svg width="150" height="86" viewBox="0 0 150 86" aria-label={`${title} gauge`}>
            <path d="M 15 75 A 60 60 0 0 1 135 75" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="12" strokeLinecap="round" />
            <motion.path
              d="M 15 75 A 60 60 0 0 1 135 75"
              fill="none"
              stroke="var(--mm-accent)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={Math.PI * 60}
              initial={prefersReduced ? false : { strokeDashoffset: Math.PI * 60 }}
              animate={{ strokeDashoffset: Math.PI * 60 * (1 - Math.min(avg, 100) / 100) }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <p className="text-sm font-bold">{avg}% Target</p>
        </div>
      )}
    </div>
  );
}
