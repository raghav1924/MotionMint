"use client";

import React, { useState } from "react";
import { useReducedMotion } from "motion/react";

export interface RadarBlip {
  id: string;
  label: string;
  x: number;
  y: number;
  status: string;
}

const DEFAULT_BLIPS: RadarBlip[] = [
  { id: "edge-us", label: "US-East Edge", x: 64, y: 34, status: "12ms · Healthy" },
  { id: "edge-eu", label: "EU-Central", x: 32, y: 42, status: "19ms · Healthy" },
  { id: "edge-ap", label: "AP-South", x: 68, y: 70, status: "28ms · Syncing" },
];

export interface RadarSweepProps {
  blips?: RadarBlip[];
  className?: string;
}

/**
 * Concentric SVG radar sweep with selectable telemetry nodes and play/pause control.
 */
export function RadarSweep({
  blips = DEFAULT_BLIPS,
  className = "",
}: RadarSweepProps) {
  const prefersReduced = useReducedMotion();
  const [scanning, setScanning] = useState(true);
  const [selectedId, setSelectedId] = useState(blips[0]?.id ?? "");
  const activeBlip = blips.find((b) => b.id === selectedId) ?? blips[0];

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-5 ${className}`.trim()}
    >
      <div className="relative h-44 w-44 shrink-0 rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)]">
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="16" fill="none" stroke="var(--mm-border)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="var(--mm-border)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--mm-border)" strokeWidth="0.6" />
          <line x1="50" y1="4" x2="50" y2="96" stroke="var(--mm-border)" strokeWidth="0.5" />
          <line x1="4" y1="50" x2="96" y2="50" stroke="var(--mm-border)" strokeWidth="0.5" />
          <path
            d="M50,50 L50,4 A46,46 0 0,1 86,22 Z"
            fill="var(--mm-accent)"
            fillOpacity="0.18"
            className={scanning && !prefersReduced ? "origin-center animate-spin" : ""}
            style={scanning && !prefersReduced ? { animationDuration: "5s" } : undefined}
          />
        </svg>

        {blips.map((blip) => {
          const isSelected = blip.id === activeBlip?.id;
          return (
            <button
              key={blip.id}
              type="button"
              onClick={() => setSelectedId(blip.id)}
              aria-label={`Inspect ${blip.label}`}
              aria-pressed={isSelected}
              style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full transition-transform cursor-pointer ${
                isSelected
                  ? "scale-125 bg-[var(--mm-accent)] ring-4 ring-[var(--mm-accent)]/25"
                  : "bg-[var(--mm-fg-muted)] hover:scale-110"
              }`}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3 text-left min-w-[180px]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mm-fg-muted)]">
            Network Radar
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--mm-fg)]">
            {activeBlip?.label ?? "No node selected"}
          </p>
          <p className="font-mono text-xs text-[var(--mm-accent)]">
            {activeBlip?.status ?? "Idle"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScanning((s) => !s)}
          aria-pressed={scanning}
          className="self-start rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
        >
          {scanning ? "Pause Scan" : "Resume Scan"}
        </button>
      </div>
    </div>
  );
}
