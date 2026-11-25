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
  sound?: boolean;
  haptic?: boolean;
}

export function JellyButton({
  children,
  className,
  magneticStrength = 0.25,
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
      whileTap={prefersReduced ? undefined : { scale: 0.92, scaleX: 1.06, scaleY: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 16, mass: 0.6 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 h-10 text-sm font-semibold cursor-pointer select-none",
        "rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)]",
        "border-[var(--mm-border-width,1px)] border-[var(--mm-border,transparent)] shadow-[var(--mm-shadow,none)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mm-bg,#09090b)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
