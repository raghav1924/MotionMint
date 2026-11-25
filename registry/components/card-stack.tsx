"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface StackCardItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export interface CardStackProps {
  cards: StackCardItem[];
  activeIndex?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  onCardSelect?: (card: StackCardItem) => void;
  maxVisibleDepth?: number;
  rotationStep?: number;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function CardStack({
  cards,
  activeIndex,
  defaultIndex = 0,
  onIndexChange,
  onCardSelect,
  maxVisibleDepth = 3,
  rotationStep = 3,
  sound,
  haptic,
  className,
}: CardStackProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const prefersReduced = useReducedMotion();

  const isControlled = activeIndex !== undefined;
  const currentIndex = cards.length > 0 ? (isControlled ? activeIndex : internalIndex) % cards.length : 0;

  const setIndex = (next: number) => {
    if (cards.length === 0) return;
    const normalized = ((next % cards.length) + cards.length) % cards.length;
    if (!isControlled) setInternalIndex(normalized);
    triggerInteractionFeedback("click", { sound, haptic });
    onIndexChange?.(normalized);
  };

  if (cards.length === 0) {
    return (
      <div className="flex h-52 w-full max-w-xs items-center justify-center rounded-[var(--mm-radius,14px)] border border-dashed border-[var(--mm-border)] text-xs text-[var(--mm-fg-muted)]">
        No cards in stack
      </div>
    );
  }

  return (
    <div
      tabIndex={0}
      aria-label="Layered card stack. Use Left and Right arrow keys to cycle."
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setIndex(currentIndex + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setIndex(currentIndex - 1);
        }
      }}
      className={cn("flex w-full max-w-sm flex-col items-center gap-4 outline-none", className)}
    >
      <div className="relative h-56 w-full">
        {cards.map((card, i) => {
          const offset = (i - currentIndex + cards.length) % cards.length;
          if (offset >= maxVisibleDepth) return null;
          const isFront = offset === 0;
          const rotate = isFront ? 0 : (offset % 2 === 1 ? 1 : -1) * offset * rotationStep;

          return (
            <motion.div
              key={card.id}
              onClick={() => {
                if (isFront) {
                  onCardSelect?.(card);
                } else {
                  setIndex(i);
                }
              }}
              animate={
                prefersReduced
                  ? { opacity: isFront ? 1 : 0.7 }
                  : {
                      scale: 1 - offset * 0.055,
                      y: offset * 12,
                      rotate,
                      opacity: 1 - offset * 0.16,
                    }
              }
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              style={{ zIndex: cards.length - offset }}
              className={cn(
                "absolute inset-0 flex flex-col justify-between p-5 cursor-pointer select-none",
                "rounded-[var(--mm-radius-lg,20px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.18))]",
                "bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] shadow-[var(--mm-shadow)]"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                {card.badge && (
                  <span className="rounded-full bg-[var(--mm-accent-soft)] px-2.5 py-0.5 text-[10px] font-semibold uppercase text-[var(--mm-accent,#10b981)]">
                    {card.badge}
                  </span>
                )}
                <span className="ml-auto font-mono text-[11px] text-[var(--mm-fg-subtle)]">
                  {i + 1} / {cards.length}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold">{card.title}</h3>
                <p className="text-xs text-[var(--mm-fg-muted)]">{card.subtitle}</p>
              </div>

              <span className="text-[11px] font-mono text-[var(--mm-accent,#10b981)]">
                {isFront ? "Active Layer" : "Click to bring forward"}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIndex(currentIndex - 1)}
          aria-label="Previous card"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] text-[var(--mm-fg)] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setIndex(0)}
          aria-label="Reset stack"
          className="inline-flex h-8 items-center gap-1 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] px-3 text-xs text-[var(--mm-fg-muted)] cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Reset
        </button>
        <button
          type="button"
          onClick={() => setIndex(currentIndex + 1)}
          aria-label="Next card"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] text-[var(--mm-fg)] cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
