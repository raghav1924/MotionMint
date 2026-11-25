"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface HalftonePopoverProps {
  triggerLabel?: string;
  title?: string;
  children: React.ReactNode;
  dotSpacing?: number;
  className?: string;
}

export function HalftonePopover({
  triggerLabel = "Open Halftone Popover",
  title = "Details",
  children,
  dotSpacing = 10,
  className,
}: HalftonePopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className="rounded-[var(--mm-radius-sm,8px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface,#111114)] px-3.5 py-2 text-xs font-medium text-[var(--mm-fg,#fafafa)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={title}
          className="absolute left-0 top-full mt-2 z-40 w-64 overflow-hidden rounded-[var(--mm-radius,14px)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated,#18181c)] p-4 text-xs text-[var(--mm-fg,#fafafa)] shadow-xl"
          style={{
            backgroundImage:
              "radial-gradient(var(--mm-accent-soft, rgba(16,185,129,0.16)) 1px, transparent 1px)",
            backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          }}
        >
          <p className="font-semibold mb-1.5">{title}</p>
          <div className="text-[var(--mm-fg-muted)] leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
}
