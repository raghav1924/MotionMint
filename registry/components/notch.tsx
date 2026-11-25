"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bell, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export type NotchState = "idle" | "active" | "processing" | "success" | "notification";

export interface NotchProps {
  state?: NotchState;
  message: string;
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function Notch({
  state = "idle",
  message,
  detail,
  actionLabel,
  onAction,
  sound,
  haptic,
  className,
}: NotchProps) {
  const [expanded, setExpanded] = useState(state !== "idle");
  const prefersReduced = useReducedMotion();

  const Icon =
    state === "processing"
      ? Loader2
      : state === "success"
        ? CheckCircle2
        : state === "notification"
          ? Bell
          : Sparkles;

  return (
    <motion.div
      layout={!prefersReduced}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={cn(
        "inline-flex flex-col overflow-hidden rounded-[22px] border border-[var(--mm-border-strong,rgba(255,255,255,0.2))] bg-[#0a0b0e] text-zinc-100 shadow-lg",
        expanded ? "w-full max-w-sm p-3.5 gap-2.5" : "px-4 py-2",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setExpanded((e) => !e);
            triggerInteractionFeedback("click", { sound, haptic });
          }}
          aria-expanded={expanded}
          className="flex items-center gap-2.5 text-left text-xs font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] rounded"
        >
          <Icon
            aria-hidden="true"
            className={cn(
              "h-4 w-4 shrink-0 text-[var(--mm-accent,#10b981)]",
              state === "processing" && "animate-spin motion-reduce:animate-none",
              state === "success" && "text-emerald-400"
            )}
          />
          <span className="truncate">{message}</span>
        </button>

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={() => {
              triggerInteractionFeedback("click", { sound, haptic });
              onAction();
            }}
            className="shrink-0 rounded-full bg-[var(--mm-accent,#10b981)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {expanded && detail && (
        <p className="border-t border-white/10 pt-2 text-[11px] text-zinc-400">
          {detail}
        </p>
      )}
    </motion.div>
  );
}
