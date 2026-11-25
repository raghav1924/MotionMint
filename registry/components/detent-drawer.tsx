"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export type DrawerDetent = "compact" | "medium" | "expanded";

export interface DetentDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  detent?: DrawerDetent;
  onDetentChange?: (detent: DrawerDetent) => void;
  side?: "bottom" | "top" | "left" | "right";
  title?: string;
  triggerLabel?: string;
  children: React.ReactNode;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

const DETENT_SIZE: Record<DrawerDetent, string> = {
  compact: "32vh",
  medium: "56vh",
  expanded: "86vh",
};

export function DetentDrawer({
  open: controlledOpen,
  onOpenChange,
  detent: controlledDetent,
  onDetentChange,
  side = "bottom",
  title = "Detent Drawer",
  triggerLabel = "Open Detent Drawer",
  children,
  sound,
  haptic,
  className,
}: DetentDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalDetent, setInternalDetent] = useState<DrawerDetent>("medium");
  const prefersReduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;
  const activeDetent = controlledDetent ?? internalDetent;

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    triggerInteractionFeedback(next ? "panelOpen" : "panelClose", { sound, haptic });
    onOpenChange?.(next);
  };

  const setDetent = (next: DrawerDetent) => {
    if (controlledDetent === undefined) setInternalDetent(next);
    triggerInteractionFeedback("click", { sound, haptic });
    onDetentChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  });

  const isVertical = side === "bottom" || side === "top";

  return (
    <div className={cn("inline-block", className)}>
      {controlledOpen === undefined && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-4 py-2 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
        >
          {triggerLabel}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              ref={panelRef}
              tabIndex={-1}
              initial={prefersReduced ? false : { opacity: 0, y: side === "bottom" ? 40 : 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: isVertical ? DETENT_SIZE[activeDetent] : "100%",
              }}
              exit={prefersReduced ? undefined : { opacity: 0, y: side === "bottom" ? 40 : 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className={cn(
                "fixed flex flex-col border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] shadow-2xl outline-none",
                side === "bottom" && "inset-x-0 bottom-0 rounded-t-[var(--mm-radius-lg,20px)] border-t",
                side === "top" && "inset-x-0 top-0 rounded-b-[var(--mm-radius-lg,20px)] border-b",
                side === "left" && "inset-y-0 left-0 w-80 border-r",
                side === "right" && "inset-y-0 right-0 w-80 border-l"
              )}
            >
              {isVertical && (
                <div className="flex justify-center pt-2.5">
                  <span className="h-1 w-10 rounded-full bg-[var(--mm-border-strong)]" aria-hidden="true" />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--mm-border)] px-5 py-3">
                <span className="text-sm font-semibold">{title}</span>
                <div className="flex items-center gap-1">
                  {isVertical &&
                    (["compact", "medium", "expanded"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDetent(d)}
                        aria-pressed={activeDetent === d}
                        className={cn(
                          "rounded px-2 py-0.5 text-[11px] capitalize border cursor-pointer",
                          activeDetent === d
                            ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                            : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close drawer"
                    className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-[var(--mm-surface-elevated)] cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
