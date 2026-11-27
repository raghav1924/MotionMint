"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  finish?: "frost" | "obsidian" | "prism";
  size?: "sm" | "md" | "lg";
  sound?: boolean;
  haptic?: boolean;
}

export function GlassButton({
  children,
  className,
  finish = "frost",
  size = "md",
  sound,
  haptic,
  onClick,
  disabled,
  type = "button",
  ...props
}: GlassButtonProps) {
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const sizeMap = {
    sm: "h-8 px-3.5 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  }[size];

  const finishMap = {
    frost:
      "bg-white/20 text-[var(--mm-fg,#09090b)] border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_28px_-8px_rgba(0,0,0,0.22)] hover:bg-white/30",
    obsidian:
      "bg-zinc-950/60 text-white border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_30px_-8px_rgba(0,0,0,0.5)] hover:bg-zinc-900/75",
    prism:
      "bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/20 to-amber-500/25 text-[var(--mm-fg,#fafafa)] border-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_28px_-8px_rgba(99,102,241,0.3)] hover:brightness-110",
  }[finish];

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100,
          y: ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100,
          active: true,
        });
      }}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      onClick={(e) => {
        if (disabled) return;
        triggerInteractionFeedback("click", { sound, haptic });
        onClick?.(e);
      }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border backdrop-blur-xl font-medium tracking-[-0.01em] select-none cursor-pointer",
        "transition-all duration-200 active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeMap,
        finishMap,
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(110px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.38), transparent 70%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
