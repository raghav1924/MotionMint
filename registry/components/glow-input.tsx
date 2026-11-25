"use client";

import React, { useState, useId } from "react";
import { cn } from "@/lib/utils";

export interface GlowInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  helperText?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  enableCursorGlow?: boolean;
}

export function GlowInput({
  label,
  helperText,
  error,
  prefix,
  suffix,
  enableCursorGlow = true,
  disabled,
  className,
  id: providedId,
  ...props
}: GlowInputProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const helperId = `${id}-help`;
  const [focused, setFocused] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableCursorGlow || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-[var(--mm-fg,#fafafa)]"
        >
          {label}
        </label>
      )}

      <div
        onMouseMove={handleMouseMove}
        className="relative rounded-[var(--mm-radius-sm,8px)] p-[1px] transition-all"
        style={{
          background: error
            ? "rgba(239, 68, 68, 0.7)"
            : focused && enableCursorGlow
              ? `radial-gradient(120px circle at ${pos.x}% ${pos.y}%, var(--mm-accent, #10b981), var(--mm-border-strong, rgba(255,255,255,0.2)) 70%)`
              : focused
                ? "var(--mm-accent, #10b981)"
                : "var(--mm-border-strong, rgba(255,255,255,0.18))",
        }}
      >
        <div
          className={cn(
            "flex h-10 items-center gap-2 rounded-[calc(var(--mm-radius-sm,8px)-1px)] bg-[var(--mm-surface,#111114)] px-3",
            disabled && "opacity-50"
          )}
        >
          {prefix && (
            <span className="shrink-0 text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
              {prefix}
            </span>
          )}
          <input
            id={id}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? helperId : undefined}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className="w-full bg-transparent text-sm text-[var(--mm-fg,#fafafa)] placeholder:text-[var(--mm-fg-subtle,#71717a)] outline-none disabled:cursor-not-allowed"
            {...props}
          />
          {suffix && (
            <span className="shrink-0 text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {error ? (
        <p id={helperId} role="alert" className="text-xs font-medium text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[var(--mm-fg-subtle,#71717a)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
