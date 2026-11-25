"use client";

import React, { useState, useId } from "react";
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface EmailCaptureProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (email: string) => void;
  onSubmit?: (email: string) => Promise<void> | void;
  placeholder?: string;
  submitLabel?: string;
  successMessage?: string;
  disabled?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  placeholder = "you@company.com",
  submitLabel = "Subscribe",
  successMessage = "Email validated and handed off to callback.",
  disabled = false,
  sound,
  haptic,
  className,
}: EmailCaptureProps) {
  const errorId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isControlled = value !== undefined;
  const email = isControlled ? value : internal;

  const updateEmail = (next: string) => {
    if (!isControlled) setInternal(next);
    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMsg(null);
    }
    onValueChange?.(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || status === "loading") return;

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMsg("Please enter an email address.");
      triggerInteractionFeedback("error", { sound, haptic });
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      triggerInteractionFeedback("error", { sound, haptic });
      return;
    }

    try {
      setStatus("loading");
      setErrorMsg(null);
      await onSubmit?.(trimmed);
      setStatus("success");
      triggerInteractionFeedback("success", { sound, haptic });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
      triggerInteractionFeedback("error", { sound, haptic });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full max-w-md space-y-2", className)}>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          disabled={disabled || status === "loading"}
          onChange={(e) => updateEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          aria-invalid={status === "error"}
          aria-describedby={errorMsg ? errorId : undefined}
          className={cn(
            "h-10 flex-1 rounded-[var(--mm-radius-sm,8px)] border bg-[var(--mm-surface,#111114)] px-3.5 text-sm text-[var(--mm-fg,#fafafa)] placeholder:text-[var(--mm-fg-subtle,#71717a)] outline-none",
            "focus:border-[var(--mm-accent,#10b981)]",
            status === "error"
              ? "border-red-500"
              : "border-[var(--mm-border-strong,rgba(255,255,255,0.18))]"
          )}
        />
        <button
          type="submit"
          disabled={disabled || status === "loading"}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-4 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : status === "success" ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{status === "success" ? "Done" : submitLabel}</span>
        </button>
      </div>

      {status === "error" && errorMsg && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{errorMsg}</span>
        </p>
      )}
      {status === "success" && (
        <p role="status" className="text-xs text-emerald-400">
          {successMessage}
        </p>
      )}
    </form>
  );
}
