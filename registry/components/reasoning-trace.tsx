"use client";

import React, { useState } from "react";
import { ChevronDown, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReasoningTraceProps {
  title?: string;
  durationLabel?: string;
  entries: string[];
  defaultOpen?: boolean;
  className?: string;
}

export function ReasoningTrace({
  title = "Execution Trace",
  durationLabel,
  entries,
  defaultOpen = false,
  className,
}: ReasoningTraceProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "w-full rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.1))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-xs hover:bg-[var(--mm-surface-subtle,#141418)] cursor-pointer"
      >
        <span className="flex items-center gap-2 font-medium">
          <ListChecks className="h-3.5 w-3.5 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
          <span>{title}</span>
          {durationLabel && (
            <span className="font-mono text-[10px] text-[var(--mm-fg-subtle,#71717a)]">
              ({durationLabel})
            </span>
          )}
        </span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-[var(--mm-fg-muted)] transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="border-t border-[var(--mm-border,rgba(255,255,255,0.08))] bg-[var(--mm-surface-subtle,#141418)] px-4 py-3 space-y-1.5 text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
          {entries.map((entry, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-mono text-[10px] text-[var(--mm-fg-subtle,#71717a)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{entry}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
