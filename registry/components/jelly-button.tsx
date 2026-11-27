"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface JellyButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  magneticStrength?: number;
  variant?: "primary" | "3d" | "glass" | "obsidian";
  sound?: boolean;
  haptic?: boolean;
}

export function JellyButton({
  children,
  className,
  magneticStrength = 0.25,
  variant = "primary",
  sound,
  haptic,
  onClick,
  disabled,
  type = "button",
  ...props
}: JellyButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * magneticStrength,
      y: (e.clientY - cy) * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    triggerInteractionFeedback("click", { sound, haptic });
    onClick?.(e);
  };

  const variantClasses = {
    primary:
      "bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_24px_-8px_rgba(0,0,0,0.35)]",
    "3d":
      "bg-gradient-to-b from-zinc-800 to-zinc-900 text-white border border-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_5px_0_0_#09090b,0_12px_22px_-6px_rgba(0,0,0,0.45)]",
    glass:
      "bg-white/15 text-[var(--mm-fg,#fafafa)] backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_24px_-6px_rgba(0,0,0,0.25)]",
    obsidian:
      "bg-zinc-950 text-white border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_26px_-8px_rgba(0,0,0,0.5)]",
  }[variant];

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={prefersReduced ? undefined : { x: offset.x, y: offset.y }}
      whileHover={prefersReduced ? undefined : { scale: 1.04 }}
      whileTap={prefersReduced ? undefined : { scale: 0.93, scaleX: 1.06, scaleY: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 16, mass: 0.6 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 h-10 text-sm font-semibold tracking-[-0.01em] cursor-pointer select-none",
        "rounded-[var(--mm-radius-sm,10px)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mm-bg,#09090b)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        variantClasses,
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
