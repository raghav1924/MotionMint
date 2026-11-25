"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ThinkingLoaderProps {
  stages?: string[];
  intervalMs?: number;
  variant?: "orbit" | "pulse-grid" | "wave";
  className?: string;
}

const DEFAULT_STAGES = [
  "Connecting to workspace...",
  "Indexing source files...",
  "Validating schema tokens...",
  "Preparing output...",
];

export function ThinkingLoader({
  stages = DEFAULT_STAGES,
  intervalMs = 2000,
  variant = "orbit",
  className,
}: ThinkingLoaderProps) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stages.length <= 1) return;
    const id = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % stages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, stages.length]);

  const currentStage = stages[stageIndex] ?? "Processing...";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={currentStage}
      className={cn(
        "inline-flex items-center gap-3.5 px-4 py-2.5",
        "rounded-[var(--mm-radius,14px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.18))]",
        "bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] shadow-[var(--mm-shadow,none)]",
        className
      )}
    >
      {/* Visual Indicator */}
      <span aria-hidden="true" className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        {variant === "orbit" && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-[var(--mm-accent-soft,rgba(16,185,129,0.2))]" />
            <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--mm-accent,#10b981)] animate-spin motion-reduce:animate-none" />
            <span className="h-2 w-2 rounded-full bg-[var(--mm-accent,#10b981)]" />
          </>
        )}
        {variant === "pulse-grid" && (
          <span className="grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-[2px] bg-[var(--mm-accent,#10b981)] animate-pulse motion-reduce:animate-none"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </span>
        )}
        {variant === "wave" && (
          <span className="flex items-end gap-0.5 h-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[var(--mm-accent,#10b981)]"
                style={{
                  height: "100%",
                  animation: "mm-bounce-dot 1s infinite ease-in-out",
                  animationDelay: `${i * 0.16}s`,
                }}
              />
            ))}
          </span>
        )}
      </span>

      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-[var(--mm-fg,#fafafa)] truncate">
          {currentStage}
        </span>
        <span className="text-[10px] font-mono text-[var(--mm-fg-subtle,#71717a)]">
          Stage {stageIndex + 1} of {stages.length}
        </span>
      </div>
    </div>
  );
}
