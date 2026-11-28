"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";

export interface PendulumWaveProps {
  count?: number;
  className?: string;
}

/**
 * Harmonic multi-bob pendulum wave with play/pause and reduced-motion fallback.
 */
export function PendulumWave({ count = 9, className = "" }: PendulumWaveProps) {
  const prefersReduced = useReducedMotion();
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running || prefersReduced) return;
    let raf = 0;
    const start = performance.now() - phase * 1000;
    const tick = (now: number) => {
      setPhase((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, prefersReduced]);

  return (
    <div
      className={`w-full max-w-sm rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] space-y-3 ${className}`.trim()}
    >
      <div className="flex h-28 items-start justify-around rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 pt-2">
        {Array.from({ length: count }).map((_, i) => {
          const freq = 1.4 + i * 0.14;
          const angle = running && !prefersReduced ? Math.sin(phase * freq) * 26 : (i - (count - 1) / 2) * 3;
          const length = 46 + i * 4;
          return (
            <div
              key={i}
              style={{
                height: length,
                transform: `rotate(${angle.toFixed(2)}deg)`,
                transformOrigin: "top center",
              }}
              className="flex flex-col items-center"
            >
              <span className="h-full w-px bg-[var(--mm-border)]" />
              <span className="h-3 w-3 shrink-0 rounded-full bg-[var(--mm-accent)] shadow-sm" />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
          Harmonic Wave · {count} bobs
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPhase(0)}
            aria-label="Reset pendulum wave"
            className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] p-1.5 hover:opacity-80 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            aria-label={running ? "Pause pendulum wave" : "Play pendulum wave"}
            aria-pressed={running}
            className="inline-flex items-center gap-1 rounded-lg bg-[var(--mm-accent)] px-2.5 py-1 text-xs font-medium text-[var(--mm-accent-fg)] cursor-pointer"
          >
            {running ? <Pause className="h-3 w-3" aria-hidden="true" /> : <Play className="h-3 w-3" aria-hidden="true" />}
            <span>{running ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
