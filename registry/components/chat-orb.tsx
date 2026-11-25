"use client";

import React from "react";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ChatOrbProps {
  state?: "idle" | "listening" | "speaking";
  onToggle?: () => void;
  sound?: boolean;
  haptic?: boolean;
  label?: string;
  className?: string;
}

export function ChatOrb({
  state = "idle",
  onToggle,
  sound,
  haptic,
  label = "Voice assistant orb",
  className,
}: ChatOrbProps) {
  const isActive = state !== "idle";

  return (
    <button
      type="button"
      onClick={() => {
        triggerInteractionFeedback("click", { sound, haptic });
        onToggle?.();
      }}
      aria-pressed={isActive}
      aria-label={`${label}: ${state}`}
      className={cn(
        "relative inline-flex h-20 w-20 items-center justify-center rounded-full cursor-pointer select-none",
        "border-2 border-[var(--mm-accent,#10b981)] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2",
        className
      )}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-[var(--mm-accent,#10b981)] opacity-50 motion-safe:animate-ping"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-2 rounded-full bg-[var(--mm-accent-soft,rgba(16,185,129,0.16))]"
      />
      <Mic className="relative z-10 h-6 w-6 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
    </button>
  );
}
