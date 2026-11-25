"use client";

import React, { useState, useRef } from "react";
import { ArrowUp, Square, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface AIPromptComposerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (prompt: string) => void;
  onStop?: () => void;
  placeholder?: string;
  isStreaming?: boolean;
  disabled?: boolean;
  models?: string[];
  selectedModel?: string;
  onModelChange?: (model: string) => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function AIPromptComposer({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  placeholder = "Ask anything or describe a UI interaction...",
  isStreaming = false,
  disabled = false,
  models = ["Standard", "Fast", "Reasoning"],
  selectedModel,
  onModelChange,
  sound,
  haptic,
  className,
}: AIPromptComposerProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [internalModel, setInternalModel] = useState(models[0] ?? "Standard");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isControlled = value !== undefined;
  const text = isControlled ? value : internal;
  const activeModel = selectedModel ?? internalModel;

  const updateText = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled || isStreaming) return;
    triggerInteractionFeedback("click", { sound, haptic });
    onSubmit?.(trimmed);
    if (!isControlled) setInternal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-[var(--mm-radius,14px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.18))]",
        "bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] shadow-[var(--mm-shadow)] p-3 space-y-2.5",
        className
      )}
    >
      <textarea
        ref={textareaRef}
        rows={2}
        value={text}
        disabled={disabled}
        onChange={(e) => updateText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Prompt input"
        className="w-full resize-none bg-transparent text-sm text-[var(--mm-fg,#fafafa)] placeholder:text-[var(--mm-fg-subtle,#71717a)] outline-none disabled:opacity-50"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--mm-border,rgba(255,255,255,0.08))] pt-2.5">
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-1.5 text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
            <select
              aria-label="Select mode"
              value={activeModel}
              disabled={disabled}
              onChange={(e) => {
                setInternalModel(e.target.value);
                onModelChange?.(e.target.value);
              }}
              className="rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface-subtle,#141418)] px-2 py-1 text-xs text-[var(--mm-fg,#fafafa)] cursor-pointer"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <span className="hidden sm:inline font-mono text-[10px] text-[var(--mm-fg-subtle,#71717a)]">
            Enter to send · Shift+Enter newline
          </span>
        </div>

        {isStreaming ? (
          <button
            type="button"
            onClick={() => {
              triggerInteractionFeedback("click", { sound, haptic });
              onStop?.();
            }}
            aria-label="Stop generation"
            className="inline-flex h-8 items-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated,#18181c)] px-3 text-xs font-medium text-[var(--mm-fg,#fafafa)] cursor-pointer"
          >
            <Square className="h-3 w-3 fill-current" aria-hidden="true" />
            Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || text.trim().length === 0}
            aria-label="Send prompt"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)] disabled:opacity-40 cursor-pointer transition-opacity"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
