"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface DiffLine {
  type: "context" | "add" | "remove";
  content: string;
}

export interface InlineDiffProps {
  filename: string;
  lines: DiffLine[];
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

export function InlineDiff({
  filename,
  lines,
  onAccept,
  onReject,
  className,
}: InlineDiffProps) {
  const added = lines.filter((l) => l.type === "add").length;
  const removed = lines.filter((l) => l.type === "remove").length;

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)]",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--mm-border,rgba(255,255,255,0.08))] bg-[var(--mm-surface-subtle,#141418)] px-3.5 py-2 text-xs">
        <span className="font-mono font-medium">{filename}</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px]">
            <span className="text-emerald-400">+{added}</span>{" "}
            <span className="text-red-400">-{removed}</span>
          </span>
          {(onAccept || onReject) && (
            <div className="flex items-center gap-1.5">
              {onReject && (
                <button
                  type="button"
                  onClick={onReject}
                  className="rounded px-2 py-0.5 text-[11px] border border-[var(--mm-border)] hover:border-red-400 cursor-pointer"
                >
                  Discard
                </button>
              )}
              {onAccept && (
                <button
                  type="button"
                  onClick={onAccept}
                  className="rounded bg-[var(--mm-accent,#10b981)] px-2 py-0.5 text-[11px] font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
                >
                  Accept
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto font-mono text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex px-3 py-0.5",
              line.type === "add" && "bg-emerald-500/12 text-emerald-300",
              line.type === "remove" && "bg-red-500/12 text-red-300",
              line.type === "context" && "text-[var(--mm-fg-muted,#a1a1aa)]"
            )}
          >
            <span className="w-6 shrink-0 select-none opacity-60">
              {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
            </span>
            <span className="whitespace-pre">{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
