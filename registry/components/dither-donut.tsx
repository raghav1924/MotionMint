"use client";

import React, { useId, useState } from "react";

export interface DonutSlice {
  id: string;
  label: string;
  value: number;
  opacity: number;
}

const DEFAULT_SLICES: DonutSlice[] = [
  { id: "ui", label: "Components", value: 48, opacity: 0.95 },
  { id: "motion", label: "Motion", value: 32, opacity: 0.6 },
  { id: "audio", label: "Audio", value: 20, opacity: 0.35 },
];

export interface DitherDonutProps {
  slices?: DonutSlice[];
  className?: string;
}

/**
 * Halftone dither-patterned SVG donut chart with selectable segments.
 */
export function DitherDonut({
  slices = DEFAULT_SLICES,
  className = "",
}: DitherDonutProps) {
  const patternId = useId();
  const [selectedId, setSelectedId] = useState(slices[0]?.id ?? "");
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const active = slices.find((s) => s.id === selectedId) ?? slices[0];

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 ${className}`.trim()}
    >
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <defs>
            <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.9" fill="var(--mm-accent)" />
            </pattern>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--mm-border)"
            strokeWidth="14"
          />
          {slices.map((slice) => {
            const len = (slice.value / total) * circumference;
            const dashOffset = -offset;
            offset += len;
            const isSelected = slice.id === active?.id;
            return (
              <circle
                key={slice.id}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={`url(#${patternId})`}
                strokeOpacity={isSelected ? 1 : slice.opacity}
                strokeWidth={isSelected ? 16 : 13}
                strokeDasharray={`${len} ${circumference - len}`}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-lg font-bold text-[var(--mm-fg)]">
            {active ? Math.round((active.value / total) * 100) : 0}%
          </span>
          <span className="text-[10px] text-[var(--mm-fg-muted)]">{active?.label}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 min-w-[140px]">
        {slices.map((slice) => {
          const isSelected = slice.id === active?.id;
          return (
            <button
              key={slice.id}
              type="button"
              onClick={() => setSelectedId(slice.id)}
              aria-pressed={isSelected}
              className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-1.5 text-xs cursor-pointer ${
                isSelected
                  ? "border-[var(--mm-accent)] bg-[var(--mm-bg)] font-semibold text-[var(--mm-fg)]"
                  : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              <span>{slice.label}</span>
              <span className="font-mono tabular-nums">{slice.value}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
