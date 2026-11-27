"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CheckCircle2, Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export function DynamicIsland({
  title = "Build Complete",
  detail = "52 registry components validated in 1.2s",
  sound,
  haptic,
  className,
}: {
  title?: string;
  detail?: string;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-expanded={expanded}
      onClick={() => {
        setExpanded((v) => !v);
        triggerInteractionFeedback("click", { sound, haptic });
      }}
      layout={!prefersReduced}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden rounded-[28px] bg-[#0a0a0c] text-white border border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.65)] cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        expanded ? "w-[320px] p-4" : "h-10 px-4",
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Disc3
            className={cn("h-4 w-4 text-emerald-400", !prefersReduced && "animate-spin")}
            style={{ animationDuration: "5s" }}
            aria-hidden="true"
          />
          <span className="text-xs font-semibold tracking-tight">{title}</span>
        </div>
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 4 }}
            className="mt-2.5 text-left text-xs leading-relaxed text-zinc-400"
          >
            {detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
