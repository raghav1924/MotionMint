"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ChampagneButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  label?: string;
  strength?: number;
  sound?: boolean;
  haptic?: boolean;
}

export function ChampagneButton({
  label = "Get Started",
  children,
  strength = 0.28,
  sound,
  haptic,
  className,
  onClick,
  disabled,
  type = "button",
  ...props
}: ChampagneButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={(e) => {
        if (prefersReduced || disabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (rect.left + rect.width / 2)) * strength,
          y: (e.clientY - (rect.top + rect.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => {
        setHovered(false);
        setOffset({ x: 0, y: 0 });
      }}
      onClick={(e) => {
        if (disabled) return;
        triggerInteractionFeedback("click", { sound, haptic });
        onClick?.(e);
      }}
      animate={prefersReduced ? undefined : { x: offset.x, y: offset.y }}
      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 360, damping: 20 }}
      className={cn(
        "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold tracking-[-0.01em] select-none cursor-pointer",
        "bg-gradient-to-b from-[#f5e1b9] via-[#e6c88c] to-[#cfa862] text-[#171209]",
        "border border-[#fff4d6]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_28px_-8px_rgba(207,168,98,0.5)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6c88c] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Animated specular sheen sweep */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700",
          hovered ? "translate-x-[340%]" : "-translate-x-full"
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children ?? label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </motion.button>
  );
}
