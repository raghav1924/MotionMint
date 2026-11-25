"use client";

import React, { useState, useRef, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface PhysicalKnobProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  sensitivity?: number;
  disabled?: boolean;
  label?: string;
  unit?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function PhysicalKnob({
  value,
  defaultValue = 50,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  sensitivity = 0.6,
  disabled = false,
  label = "Level",
  unit = "",
  sound,
  haptic,
  className,
}: PhysicalKnobProps) {
  const [internal, setInternal] = useState(defaultValue);
  const draggingRef = useRef<{ startY: number; startVal: number } | null>(null);

  const isControlled = value !== undefined;
  const current = Math.min(Math.max(isControlled ? value : internal, min), max);

  const commit = (raw: number) => {
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.min(Math.max(stepped, min), max);
    if (!isControlled) setInternal(clamped);
    onValueChange?.(clamped);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current || disabled) return;
      const dy = draggingRef.current.startY - e.clientY;
      commit(draggingRef.current.startVal + dy * sensitivity);
    };
    const onUp = () => {
      draggingRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  });

  const ratio = max > min ? (current - min) / (max - min) : 0;
  const angle = -135 + ratio * 270;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      triggerInteractionFeedback("click", { sound, haptic });
      commit(current + step);
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      triggerInteractionFeedback("click", { sound, haptic });
      commit(current - step);
    } else if (e.key === "Home") {
      e.preventDefault();
      commit(min);
    } else if (e.key === "End") {
      e.preventDefault();
      commit(max);
    }
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-2.5 select-none", className)}>
      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        onDoubleClick={() => {
          if (disabled) return;
          triggerInteractionFeedback("click", { sound, haptic });
          commit(defaultValue);
        }}
        onPointerDown={(e) => {
          if (disabled) return;
          draggingRef.current = { startY: e.clientY, startVal: current };
        }}
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--mm-border-strong,rgba(255,255,255,0.22))] bg-[var(--mm-surface-elevated,#18181c)] shadow-[var(--mm-shadow)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]",
          disabled ? "opacity-45 cursor-not-allowed" : "cursor-ns-resize"
        )}
      >
        {/* Rotary Indicator */}
        <div
          aria-hidden="true"
          className="absolute inset-1.5 rounded-full border border-[var(--mm-border)]"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className="mx-auto mt-1 block h-2.5 w-1 rounded-full bg-[var(--mm-accent,#10b981)]" />
        </div>
        <span className="font-mono text-xs font-bold tabular-nums text-[var(--mm-fg,#fafafa)]">
          {current}
          {unit}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-[var(--mm-fg-muted)]">
        <span>{label}</span>
        <button
          type="button"
          disabled={disabled}
          onClick={() => commit(defaultValue)}
          aria-label={`Reset ${label}`}
          className="inline-flex h-5 w-5 items-center justify-center rounded hover:text-[var(--mm-fg)] cursor-pointer disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
