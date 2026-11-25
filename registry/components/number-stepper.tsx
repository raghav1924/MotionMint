"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface NumberStepperProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: "compact" | "expanded";
  label?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function NumberStepper({
  value,
  defaultValue = 1,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  readOnly = false,
  variant = "compact",
  label = "Quantity",
  sound,
  haptic,
  className,
}: NumberStepperProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const clamp = (n: number) => Math.min(Math.max(n, min), max);

  const commit = (next: number) => {
    const clamped = clamp(next);
    if (!isControlled) setInternal(clamped);
    onValueChange?.(clamped);
  };

  const decrement = () => {
    if (disabled || readOnly || current <= min) return;
    triggerInteractionFeedback("click", { sound, haptic });
    commit(current - step);
  };

  const increment = () => {
    if (disabled || readOnly || current >= max) return;
    triggerInteractionFeedback("click", { sound, haptic });
    commit(current + step);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)]",
        variant === "expanded" ? "h-11 px-1.5 gap-2" : "h-9 px-1 gap-1",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || readOnly || current <= min}
        aria-label={`Decrease ${label}`}
        className={cn(
          "inline-flex items-center justify-center rounded-[calc(var(--mm-radius-sm,8px)-2px)] hover:bg-[var(--mm-surface-elevated,#18181c)] disabled:opacity-35 cursor-pointer",
          variant === "expanded" ? "h-8 w-8" : "h-7 w-7"
        )}
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <input
        type="number"
        value={current}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={label}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          const parsed = Number(e.target.value);
          if (!Number.isNaN(parsed)) {
            commit(parsed);
          }
        }}
        className={cn(
          "bg-transparent text-center font-mono text-sm tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          variant === "expanded" ? "w-14" : "w-10"
        )}
      />

      <button
        type="button"
        onClick={increment}
        disabled={disabled || readOnly || current >= max}
        aria-label={`Increase ${label}`}
        className={cn(
          "inline-flex items-center justify-center rounded-[calc(var(--mm-radius-sm,8px)-2px)] hover:bg-[var(--mm-surface-elevated,#18181c)] disabled:opacity-35 cursor-pointer",
          variant === "expanded" ? "h-8 w-8" : "h-7 w-7"
        )}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
