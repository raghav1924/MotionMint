"use client";

import React, { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md";
  ariaLabel?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  ariaLabel = "Segmented control",
  sound,
  haptic,
  className,
}: SegmentedControlProps) {
  const groupId = useId();
  const prefersReduced = useReducedMotion();
  const firstEnabled = options.find((o) => !o.disabled)?.value ?? options[0]?.value ?? "";
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);

  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internal;

  const selectValue = (next: string) => {
    if (!isControlled) setInternal(next);
    triggerInteractionFeedback("select", { sound, haptic });
    onValueChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const enabled = options.filter((o) => !o.disabled);
    if (enabled.length === 0) return;
    const currentIndex = enabled.findIndex((o) => o.value === activeValue);

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabled[(currentIndex + 1) % enabled.length];
      if (next) selectValue(next.value);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = enabled[(currentIndex - 1 + enabled.length) % enabled.length];
      if (prev) selectValue(prev.value);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface-subtle,#141418)] p-1",
        className
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === activeValue;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && selectValue(opt.value)}
            className={cn(
              "relative z-10 inline-flex items-center justify-center font-medium select-none cursor-pointer transition-colors",
              "rounded-[var(--mm-radius-sm,8px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]",
              "disabled:opacity-40 disabled:pointer-events-none",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3.5 text-xs sm:text-sm",
              selected
                ? "text-[var(--mm-accent-fg,#03150e)]"
                : "text-[var(--mm-fg-muted,#a1a1aa)] hover:text-[var(--mm-fg,#fafafa)]"
            )}
          >
            {selected && (
              <motion.span
                layoutId={`mm-seg-${groupId}`}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 30 }
                }
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] shadow-sm"
              />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
