"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface Tactile3DButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  tone?: "obsidian" | "emerald" | "amber" | "ivory";
  size?: "sm" | "md" | "lg";
  sound?: boolean;
  haptic?: boolean;
}

export function Tactile3DButton({
  children,
  className,
  tone = "obsidian",
  size = "md",
  sound,
  haptic,
  onClick,
  disabled,
  type = "button",
  ...props
}: Tactile3DButtonProps) {
  const prefersReduced = useReducedMotion();

  const sizeMap = {
    sm: "h-9 px-3.5 text-xs",
    md: "h-11 px-5 text-sm",
    lg: "h-13 px-7 text-base",
  }[size];

  const toneMap = {
    obsidian: {
      face: "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white border-zinc-700/80",
      lip: "bg-zinc-950",
    },
    emerald: {
      face: "bg-gradient-to-b from-emerald-400 to-emerald-500 text-emerald-950 border-emerald-300/80",
      lip: "bg-emerald-700",
    },
    amber: {
      face: "bg-gradient-to-b from-amber-300 to-amber-400 text-amber-950 border-amber-200/80",
      lip: "bg-amber-600",
    },
    ivory: {
      face: "bg-gradient-to-b from-white to-zinc-100 text-zinc-950 border-zinc-200",
      lip: "bg-zinc-300",
    },
  }[tone];

  return (
    <div className="relative inline-block pb-[5px]">
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 top-[5px] rounded-[12px] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)]",
          toneMap.lip
        )}
      />
      <motion.button
        type={type}
        disabled={disabled}
        whileHover={prefersReduced ? undefined : { y: -1 }}
        whileTap={prefersReduced ? undefined : { y: 4 }}
        transition={{ type: "spring", stiffness: 550, damping: 24 }}
        onClick={(e) => {
          if (disabled) return;
          triggerInteractionFeedback("click", { sound, haptic });
          onClick?.(e);
        }}
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-2 rounded-[12px] border font-semibold tracking-[-0.01em] select-none cursor-pointer",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          sizeMap,
          toneMap.face,
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    </div>
  );
}
