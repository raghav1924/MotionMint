"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface MorphingTrayProps {
  title: string;
  compactSummary?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  defaultExpanded?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function MorphingTray({
  title,
  compactSummary,
  children,
  actions,
  defaultExpanded = false,
  sound,
  haptic,
  className,
}: MorphingTrayProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const prefersReduced = useReducedMotion();

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    triggerInteractionFeedback(next ? "panelOpen" : "panelClose", { sound, haptic });
  };

  return (
    <motion.div
      layout={!prefersReduced}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && expanded) setExpanded(false);
      }}
      className={cn(
        "w-full max-w-md overflow-hidden rounded-[var(--mm-radius-lg,20px)] border border-[var(--mm-border-strong,rgba(255,255,255,0.18))] bg-[var(--mm-surface,#111114)] text-[var(--mm-fg,#fafafa)] shadow-[var(--mm-shadow)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          className="flex flex-1 items-center gap-2.5 text-left text-xs font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] rounded"
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
          ) : (
            <ChevronUp className="h-4 w-4 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
          )}
          <span>{title}</span>
          {!expanded && compactSummary && (
            <span className="ml-auto font-normal text-[var(--mm-fg-muted)]">{compactSummary}</span>
          )}
        </button>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {expanded && (
        <div className="border-t border-[var(--mm-border)] bg-[var(--mm-surface-subtle,#141418)] p-4 text-xs">
          {children}
        </div>
      )}
    </motion.div>
  );
}
