"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PixelImageGenerationProps {
  progress?: number;
  gridSize?: number;
  label?: string;
  className?: string;
}

export function PixelImageGeneration({
  progress = 75,
  gridSize = 8,
  label = "Pixel synthesis preview",
  className,
}: PixelImageGenerationProps) {
  const total = gridSize * gridSize;
  const filled = Math.round((Math.min(Math.max(progress, 0), 100) / 100) * total);

  return (
    <div
      role="img"
      aria-label={`${label} (${progress}%)`}
      className={cn(
        "inline-flex flex-col items-center gap-2.5 rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#111114)] p-4",
        className
      )}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const active = i < filled;
          return (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "h-3 w-3 rounded-[2px] transition-colors duration-200",
                active
                  ? "bg-[var(--mm-accent,#10b981)]"
                  : "bg-[var(--mm-surface-elevated,#18181c)]"
              )}
              style={{ opacity: active ? 0.45 + ((i % 5) * 0.12) : 0.4 }}
            />
          );
        })}
      </div>
      <span className="font-mono text-[11px] text-[var(--mm-fg-muted,#a1a1aa)]">
        {label} · {progress}%
      </span>
    </div>
  );
}
