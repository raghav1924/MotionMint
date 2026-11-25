"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface ReactionItem {
  id: string;
  label: string;
  emoji: string;
  disabled?: boolean;
}

export interface ReactionArcProps {
  reactions?: ReactionItem[];
  value?: string;
  onValueChange?: (id: string) => void;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

const DEFAULT_REACTIONS: ReactionItem[] = [
  { id: "like", label: "Like", emoji: "👍" },
  { id: "love", label: "Love", emoji: "❤️" },
  { id: "fire", label: "Fire", emoji: "🔥" },
  { id: "spark", label: "Sparkle", emoji: "✨" },
  { id: "rocket", label: "Rocket", emoji: "🚀" },
];

export function ReactionArc({
  reactions = DEFAULT_REACTIONS,
  value,
  onValueChange,
  sound,
  haptic,
  className,
}: ReactionArcProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  const selectedId = value ?? internal;
  const selectedItem = reactions.find((r) => r.id === selectedId);

  const select = (item: ReactionItem) => {
    if (item.disabled) return;
    if (value === undefined) setInternal(item.id);
    triggerInteractionFeedback("select", { sound, haptic });
    onValueChange?.(item.id);
    setOpen(false);
  };

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <AnimatePresence>
        {open && (
          <div
            role="radiogroup"
            aria-label="Reactions"
            className="mb-3 flex items-end justify-center gap-1.5"
          >
            {reactions.map((item, idx) => {
              const mid = (reactions.length - 1) / 2;
              const archY = Math.pow(Math.abs(idx - mid), 2) * 4;
              const isSelected = selectedId === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={item.label}
                  disabled={item.disabled}
                  onClick={() => select(item)}
                  initial={prefersReduced ? false : { opacity: 0, y: 12, scale: 0.7 }}
                  animate={{ opacity: 1, y: archY, scale: 1 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: 8, scale: 0.7 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24, delay: idx * 0.025 }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-base cursor-pointer transition-transform hover:scale-115",
                    "disabled:opacity-35 disabled:pointer-events-none",
                    isSelected
                      ? "border-[var(--mm-accent,#10b981)] bg-[var(--mm-accent-soft)]"
                      : "border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated,#18181c)]"
                  )}
                >
                  {item.emoji}
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Toggle reactions"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface,#111114)] px-4 text-xs font-medium text-[var(--mm-fg,#fafafa)] hover:border-[var(--mm-accent)] cursor-pointer"
      >
        {selectedItem ? (
          <>
            <span>{selectedItem.emoji}</span>
            <span>{selectedItem.label}</span>
          </>
        ) : (
          <>
            <Smile className="h-4 w-4 text-[var(--mm-accent,#10b981)]" aria-hidden="true" />
            <span>React</span>
          </>
        )}
      </button>
    </div>
  );
}
