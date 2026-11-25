"use client";

import React from "react";
import { Image as ImageIcon, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageGenerationProps {
  prompt: string;
  status: "idle" | "generating" | "complete" | "error";
  progress?: number;
  imageUrl?: string;
  onRegenerate?: () => void;
  className?: string;
}

export function ImageGeneration({
  prompt,
  status,
  progress = 64,
  imageUrl,
  onRegenerate,
  className,
}: ImageGenerationProps) {
  return (
    <div
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-[var(--mm-radius-lg,20px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.16))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)]",
        className
      )}
    >
      <div className="relative flex aspect-video w-full items-center justify-center bg-[var(--mm-surface-subtle,#141418)] p-4 text-center">
        {status === "idle" && (
          <div className="space-y-1.5 text-[var(--mm-fg-muted,#a1a1aa)]">
            <ImageIcon className="mx-auto h-7 w-7 opacity-60" aria-hidden="true" />
            <p className="text-xs">Ready to generate preview</p>
          </div>
        )}

        {status === "generating" && (
          <div role="status" className="w-full max-w-[200px] space-y-2">
            <p className="text-xs font-medium text-[var(--mm-accent,#10b981)]">
              Generating preview ({progress}%)
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--mm-border)]">
              <div
                className="h-full bg-[var(--mm-accent,#10b981)] transition-[width] duration-300"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              />
            </div>
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="space-y-2 text-red-400">
            <AlertCircle className="mx-auto h-6 w-6" aria-hidden="true" />
            <p className="text-xs font-medium">Preview generation failed</p>
          </div>
        )}

        {status === "complete" &&
          (imageUrl ? (
            <img
              src={imageUrl}
              alt={prompt}
              className="h-full w-full rounded-[var(--mm-radius-sm,8px)] object-cover"
            />
          ) : (
            <div
              aria-label={`Sample generated artwork for: ${prompt}`}
              className="flex h-full w-full items-center justify-center rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border)] bg-gradient-to-br from-[var(--mm-accent-soft)] via-transparent to-sky-500/15 p-4"
            >
              <span className="font-mono text-[11px] text-[var(--mm-fg-muted)]">
                Sample Rendered Frame
              </span>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--mm-border)] px-4 py-3 text-xs">
        <p className="truncate text-[var(--mm-fg-muted,#a1a1aa)]">{prompt}</p>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            aria-label="Regenerate preview"
            className="inline-flex shrink-0 items-center gap-1 rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] px-2.5 py-1 text-[11px] font-medium hover:border-[var(--mm-accent)] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
