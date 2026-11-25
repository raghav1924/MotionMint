"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  showValue = true,
  label = "Progress",
  className,
}: ProgressRingProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? Math.round((clamped / max) * 100) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--mm-border-strong, rgba(255,255,255,0.15))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--mm-accent, #10b981)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 280ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      {showValue && (
        <span className="absolute text-xs font-semibold tabular-nums text-[var(--mm-fg,#fafafa)]">
          {pct}%
        </span>
      )}
    </div>
  );
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label = "Progress",
  showValue = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {showValue && (
        <div className="flex items-center justify-between text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
          <span>{label}</span>
          <span className="tabular-nums font-medium text-[var(--mm-fg,#fafafa)]">{pct}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2.5 w-full overflow-hidden rounded-full border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface-subtle,#141418)]"
      >
        <div
          className="h-full rounded-full bg-[var(--mm-accent,#10b981)] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
