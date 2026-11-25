"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface RubberBandOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RubberBandSelectProps {
  options: RubberBandOption[];
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function RubberBandSelect({
  options,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  sound,
  haptic,
  className,
}: RubberBandSelectProps) {
  const initial = defaultValue ?? (options[0] && !options[0].disabled ? [options[0].value] : []);
  const [internal, setInternal] = useState<string[]>(initial);
  const prefersReduced = useReducedMotion();

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const toggle = (opt: RubberBandOption) => {
    if (opt.disabled) return;
    let next: string[];
    if (multiple) {
      next = selected.includes(opt.value)
        ? selected.filter((v) => v !== opt.value)
        : [...selected, opt.value];
    } else {
      next = [opt.value];
    }
    if (!isControlled) setInternal(next);
    triggerInteractionFeedback("select", { sound, haptic });
    onValueChange?.(next);
  };

  return (
    <div
      role="group"
      aria-label="Rubber band selection"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <motion.button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            aria-pressed={isSelected}
            onClick={() => toggle(opt)}
            whileTap={prefersReduced ? undefined : { scaleX: 1.12, scaleY: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 14 }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer select-none transition-colors",
              "disabled:opacity-40 disabled:pointer-events-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]",
              isSelected
                ? "border-[var(--mm-accent,#10b981)] bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)]"
                : "border-[var(--mm-border-strong)] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] hover:border-[var(--mm-accent)]"
            )}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
