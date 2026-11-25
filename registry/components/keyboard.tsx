"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface VisualKeyboardProps {
  rows?: string[][];
  highlightedKeys?: string[];
  trackPhysicalKeys?: boolean;
  onKeyClick?: (key: string) => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

const DEFAULT_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⌘", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export function VisualKeyboard({
  rows = DEFAULT_ROWS,
  highlightedKeys = ["⌘", "K"],
  trackPhysicalKeys = false,
  onKeyClick,
  sound,
  haptic,
  className,
}: VisualKeyboardProps) {
  const [pressed, setPressed] = useState<string[]>([]);

  useEffect(() => {
    if (!trackPhysicalKeys) return;
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      setPressed((prev) => (prev.includes(k) ? prev : [...prev, k]));
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      setPressed((prev) => prev.filter((item) => item !== k));
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [trackPhysicalKeys]);

  const activeSet = new Set([
    ...highlightedKeys.map((k) => k.toUpperCase()),
    ...pressed,
  ]);

  return (
    <div
      role="group"
      aria-label="Interactive visual keyboard"
      className={cn(
        "inline-flex flex-col items-center gap-1.5 rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.16))] bg-[var(--mm-surface,#111114)] p-3 shadow-[var(--mm-shadow)]",
        className
      )}
    >
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex flex-wrap justify-center gap-1">
          {row.map((keyLabel) => {
            const isActive = activeSet.has(keyLabel.toUpperCase());
            return (
              <button
                key={keyLabel}
                type="button"
                onClick={() => {
                  setPressed((prev) => [...prev, keyLabel.toUpperCase()]);
                  setTimeout(
                    () =>
                      setPressed((prev) =>
                        prev.filter((k) => k !== keyLabel.toUpperCase())
                      ),
                    180
                  );
                  triggerInteractionFeedback("click", { sound, haptic });
                  onKeyClick?.(keyLabel);
                }}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex h-8 min-w-[32px] items-center justify-center rounded-[var(--mm-radius-sm,8px)] border px-2 font-mono text-xs font-semibold transition-transform active:translate-y-0.5 cursor-pointer",
                  isActive
                    ? "border-[var(--mm-accent,#10b981)] bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)]"
                    : "border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] shadow-[0_2px_0_var(--mm-border)]"
                )}
              >
                {keyLabel}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
