"use client";

import React, { useId, useState } from "react";

const SERIES: Record<"7D" | "30D" | "90D", number[]> = {
  "7D": [24, 38, 34, 52, 49, 68, 74],
  "30D": [18, 29, 44, 40, 58, 63, 86],
  "90D": [12, 22, 31, 46, 55, 72, 92],
};

export interface DitherLineChartProps {
  title?: string;
  className?: string;
}

/**
 * SVG trend chart with halftone dither area fill and selectable time ranges.
 */
export function DitherLineChart({
  title = "Registry Requests",
  className = "",
}: DitherLineChartProps) {
  const patternId = useId();
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const points = SERIES[range];

  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * 200;
    const y = 76 - (val / 100) * 64;
    return { x, y, val };
  });

  const linePath = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `0,76 ${linePath} 200,76`;

  return (
    <div
      className={`w-full max-w-sm rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-[var(--mm-fg)]">{title}</p>
          <p className="font-mono text-[11px] text-[var(--mm-accent)]">
            Peak {Math.max(...points)}k
          </p>
        </div>
        <div role="group" aria-label="Time range" className="flex gap-1">
          {(["7D", "30D", "90D"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] cursor-pointer ${
                range === r
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 200 80" className="h-24 w-full" aria-label={`${title} ${range} trend`}>
        <defs>
          <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.85" fill="var(--mm-accent)" fillOpacity="0.45" />
          </pattern>
        </defs>
        <polygon points={areaPath} fill={`url(#${patternId})`} />
        <polyline
          fill="none"
          stroke="var(--mm-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          points={linePath}
        />
        {coords.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--mm-accent)" />
        ))}
      </svg>
    </div>
  );
}
