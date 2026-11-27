"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "3d" | "glass" | "shimmer";
  size?: "sm" | "md" | "lg";
  /** Override global sound setting for this button */
  sound?: boolean;
  /** Override global haptic setting for this button */
  haptic?: boolean;
}

export function RippleButton({
  children,
  className,
  variant = "primary",
  size = "md",
  sound,
  haptic,
  onClick,
  disabled,
  type = "button",
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100,
      y: ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100,
      active: true,
    });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        (window.matchMedia("(prefers-reduced-motion: reduce)")?.matches ?? false);

      if (!prefersReduced) {
        const rect = e.currentTarget.getBoundingClientRect();
        const sizePx = Math.max(rect.width, rect.height) * 2.2;
        const x = e.clientX ? e.clientX - rect.left - sizePx / 2 : rect.width / 2 - sizePx / 2;
        const y = e.clientY ? e.clientY - rect.top - sizePx / 2 : rect.height / 2 - sizePx / 2;

        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev.slice(-3), { id, x, y, size: sizePx }]);
        const timer = setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
          timersRef.current.delete(timer);
        }, 620);
        timersRef.current.add(timer);
      }

      triggerInteractionFeedback("click", { sound, haptic });
      onClick?.(e);
    },
    [disabled, haptic, onClick, sound]
  );

  const sizeClasses = {
    sm: "h-8 px-3.5 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_8px_20px_-6px_rgba(0,0,0,0.35)] hover:brightness-110",
    secondary:
      "bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] border border-[var(--mm-border-strong,rgba(255,255,255,0.16))] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_14px_-4px_rgba(0,0,0,0.25)] hover:bg-[var(--mm-surface-subtle,#141418)]",
    outline:
      "bg-transparent text-[var(--mm-fg,#fafafa)] border border-[var(--mm-border-strong,rgba(255,255,255,0.22))] hover:border-[var(--mm-accent,#10b981)] hover:bg-[var(--mm-accent-soft,rgba(16,185,129,0.1))]",
    "3d":
      "bg-zinc-900 text-white border border-zinc-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_0_0_#09090b,0_10px_20px_-6px_rgba(0,0,0,0.45)] active:translate-y-[3px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_0_0_#09090b]",
    glass:
      "bg-white/15 dark:bg-white/10 text-[var(--mm-fg,#fafafa)] backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_24px_-6px_rgba(0,0,0,0.25)] hover:bg-white/22",
    shimmer:
      "bg-gradient-to-b from-zinc-800 to-zinc-950 text-white border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_-8px_rgba(0,0,0,0.5)] hover:border-white/30",
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlowPos((p) => ({ ...p, active: false }))}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium tracking-[-0.01em] select-none cursor-pointer",
        "rounded-[var(--mm-radius-sm,10px)]",
        "transition-all duration-150 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mm-bg,#09090b)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {/* Pointer-tracking radial highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glowPos.active ? 1 : 0,
          background: `radial-gradient(120px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.22), transparent 70%)`,
        }}
      />

      {/* Specular top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            transform: "scale(0)",
            animation: "ping 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        />
      ))}
    </button>
  );
}
