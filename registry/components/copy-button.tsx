"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, Copy, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
  sound?: boolean;
  haptic?: boolean;
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  errorLabel = "Failed",
  sound,
  haptic,
  className,
  onClick,
  disabled,
  ...props
}: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus("idle"), 1800);
  };

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!value || !navigator.clipboard?.writeText) {
      setStatus("error");
      triggerInteractionFeedback("error", { sound, haptic });
      scheduleReset();
      onClick?.(e);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      triggerInteractionFeedback("success", { sound, haptic });
      scheduleReset();
    } catch {
      setStatus("error");
      triggerInteractionFeedback("error", { sound, haptic });
      scheduleReset();
    }
    onClick?.(e);
  };

  const displayLabel =
    status === "copied" ? copiedLabel : status === "error" ? errorLabel : label;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleCopy}
      aria-label={
        status === "copied"
          ? copiedLabel
          : status === "error"
            ? errorLabel
            : `${label}: ${value}`
      }
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium cursor-pointer select-none",
        "rounded-[var(--mm-radius-sm,8px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.16))]",
        "bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)]",
        "hover:border-[var(--mm-accent,#10b981)] transition-all duration-150 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        status === "copied" &&
          "border-[var(--mm-accent,#10b981)] text-[var(--mm-accent,#10b981)]",
        status === "error" && "border-red-500 text-red-400",
        className
      )}
      {...props}
    >
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        {status === "copied" ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : status === "error" ? (
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </span>
      <span>{displayLabel}</span>
    </button>
  );
}
