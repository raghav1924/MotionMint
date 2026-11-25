"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (code: string) => void;
  alphanumeric?: boolean;
  status?: "idle" | "error" | "success";
  disabled?: boolean;
  label?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value,
  onValueChange,
  onComplete,
  alphanumeric = false,
  status = "idle",
  disabled = false,
  label = "One-time verification code",
  sound,
  haptic,
  className,
}: OTPInputProps) {
  const [internal, setInternal] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const isControlled = value !== undefined;
  const code = (isControlled ? value : internal).slice(0, length);
  const chars = Array.from({ length }, (_, i) => code[i] ?? "");

  const pattern = alphanumeric ? /^[a-zA-Z0-9]$/ : /^[0-9]$/;

  const updateCode = (next: string) => {
    const clean = next.slice(0, length);
    if (!isControlled) setInternal(clean);
    onValueChange?.(clean);
    if (clean.length === length) {
      triggerInteractionFeedback("success", { sound, haptic });
      onComplete?.(clean);
    }
  };

  const handleChange = (idx: number, raw: string) => {
    if (disabled) return;
    const lastChar = raw.slice(-1);
    if (!lastChar) return;
    if (!pattern.test(lastChar)) return;

    const nextChars = [...chars];
    nextChars[idx] = lastChar;
    updateCode(nextChars.join(""));

    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const nextChars = [...chars];
      if (nextChars[idx]) {
        nextChars[idx] = "";
        updateCode(nextChars.join(""));
      } else if (idx > 0) {
        nextChars[idx - 1] = "";
        updateCode(nextChars.join(""));
        inputsRef.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = e.clipboardData
      .getData("text")
      .split("")
      .filter((ch) => pattern.test(ch))
      .slice(0, length)
      .join("");
    if (!pasted) return;
    updateCode(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center gap-2", className)}>
      {chars.map((char, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode={alphanumeric ? "text" : "numeric"}
          maxLength={1}
          value={char}
          disabled={disabled}
          aria-label={`${label} digit ${idx + 1}`}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          className={cn(
            "h-11 w-10 rounded-[var(--mm-radius-sm,8px)] border bg-[var(--mm-surface,#111114)] text-center font-mono text-base font-bold text-[var(--mm-fg,#fafafa)] outline-none transition-colors",
            "focus:border-[var(--mm-accent,#10b981)] focus:ring-2 focus:ring-[var(--mm-ring,#10b981)]",
            "disabled:opacity-45",
            status === "error" && "border-red-500",
            status === "success" && "border-emerald-500",
            status === "idle" && "border-[var(--mm-border-strong,rgba(255,255,255,0.18))]"
          )}
        />
      ))}
    </div>
  );
}
