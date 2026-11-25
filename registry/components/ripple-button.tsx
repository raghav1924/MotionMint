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
  variant?: "primary" | "secondary" | "outline";
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
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
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
        const sizePx = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX ? e.clientX - rect.left - sizePx / 2 : rect.width / 2 - sizePx / 2;
        const y = e.clientY ? e.clientY - rect.top - sizePx / 2 : rect.height / 2 - sizePx / 2;

        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev.slice(-3), { id, x, y, size: sizePx }]);
        const timer = setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
          timersRef.current.delete(timer);
        }, 550);
        timersRef.current.add(timer);
      }

      triggerInteractionFeedback("click", { sound, haptic });
      onClick?.(e);
    },
    [disabled, haptic, onClick, sound]
  );

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)] border-[var(--mm-border-width,1px)] border-[var(--mm-border,transparent)] hover:brightness-110",
    secondary:
      "bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.18))] hover:bg-[var(--mm-surface-subtle,#141418)]",
    outline:
      "bg-transparent text-[var(--mm-fg,#fafafa)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.2))] hover:bg-[var(--mm-accent-soft,rgba(16,185,129,0.12))]",
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium select-none cursor-pointer",
        "rounded-[var(--mm-radius-sm,8px)] shadow-[var(--mm-shadow,none)]",
        "transition-transform duration-150 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mm-bg,#09090b)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: "550ms",
            animationIterationCount: 1,
          }}
        />
      ))}
    </button>
  );
}
