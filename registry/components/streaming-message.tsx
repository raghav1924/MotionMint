"use client";

import React from "react";
import { AlertCircle, RotateCcw, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIMessage } from "@/lib/ai/types";

export interface StreamingMessageProps {
  message: AIMessage;
  onRetry?: () => void;
  className?: string;
}

export function StreamingMessage({
  message,
  onRetry,
  className,
}: StreamingMessageProps) {
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";
  const isError = message.status === "error";

  return (
    <div
      role="article"
      aria-label={`${message.role} message`}
      aria-live={isStreaming ? "polite" : "off"}
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isUser && (
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--mm-border-strong,rgba(255,255,255,0.16))] bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-accent,#10b981)]"
        >
          <Bot className="h-3.5 w-3.5" />
        </span>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-[var(--mm-radius,14px)] px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-[var(--mm-accent,#10b981)] text-[var(--mm-accent-fg,#03150e)]"
            : "border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)]",
          isError && "border-red-500/60"
        )}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
          {isStreaming && (
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-3.5 w-1.5 align-middle bg-[var(--mm-accent,#10b981)] animate-pulse motion-reduce:animate-none"
            />
          )}
        </p>

        {isError && (
          <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-red-500/20 pt-2 text-xs text-red-400">
            <span className="inline-flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Message failed
            </span>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1 font-medium hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--mm-accent-soft,rgba(16,185,129,0.14))] text-[var(--mm-accent,#10b981)]"
        >
          <User className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}
