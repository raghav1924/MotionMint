"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface SoundToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  showWaveform?: boolean;
  sound?: boolean;
  haptic?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SoundToggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label = "Toggle setting",
  showWaveform = false,
  sound,
  haptic,
  disabled = false,
  className,
}: SoundToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internalChecked;
  const prefersReduced = useReducedMotion();

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) {
      setInternalChecked(next);
    }
    triggerInteractionFeedback(next ? "toggleOn" : "toggleOff", { sound, haptic });
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200",
        "border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.2))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mm-bg,#09090b)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        isOn
          ? "bg-[var(--mm-accent,#10b981)]"
          : "bg-[var(--mm-surface-elevated,#18181c)]",
        className
      )}
    >
      <motion.span
        layout
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 520, damping: 28 }
        }
        className={cn(
          "flex items-center justify-center h-5 w-5 rounded-full shadow-sm",
          isOn
            ? "ml-auto bg-[var(--mm-accent-fg,#03150e)]"
            : "mr-auto bg-[var(--mm-fg,#fafafa)]"
        )}
      >
        {showWaveform && (
          <span aria-hidden="true" className="flex items-center gap-[1.5px]">
            {[1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={cn(
                  "w-[1.5px] rounded-full transition-all",
                  isOn ? "bg-[var(--mm-accent,#10b981)]" : "bg-[var(--mm-bg,#09090b)]",
                  isOn ? (bar === 2 ? "h-2.5" : "h-1.5") : "h-1"
                )}
              />
            ))}
          </span>
        )}
      </motion.span>
    </button>
  );
}
