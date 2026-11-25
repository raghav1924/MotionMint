"use client";

import React, { useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { RotateCcw, ArrowLeft, ArrowRight, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface DeckCardItem {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
}

export interface SwipeCardDeckProps {
  cards: DeckCardItem[];
  sound?: boolean;
  haptic?: boolean;
  onCardDismiss?: (card: DeckCardItem, direction: "left" | "right") => void;
  className?: string;
}

export function SwipeCardDeck({
  cards,
  sound,
  haptic,
  onCardDismiss,
  className,
}: SwipeCardDeckProps) {
  const [index, setIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<"left" | "right">("right");
  const prefersReduced = useReducedMotion();

  const remaining = cards.slice(index);

  const dismissTop = useCallback(
    (dir: "left" | "right") => {
      if (index >= cards.length) return;
      const current = cards[index];
      setLastDirection(dir);
      setIndex((prev) => prev + 1);
      triggerInteractionFeedback("drop", { sound, haptic });
      onCardDismiss?.(current, dir);
    },
    [cards, haptic, index, onCardDismiss, sound]
  );

  const undo = useCallback(() => {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
    triggerInteractionFeedback("click", { sound, haptic });
  }, [haptic, index, sound]);

  const reset = useCallback(() => {
    setIndex(0);
    triggerInteractionFeedback("click", { sound, haptic });
  }, [haptic, sound]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      dismissTop("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      dismissTop("right");
    } else if (e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      undo();
    }
  };

  return (
    <div
      className={cn("flex w-full max-w-sm flex-col items-center gap-5", className)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Swipeable card deck. Use Left and Right arrow keys to swipe cards."
    >
      <div className="relative h-64 w-full">
        {remaining.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[var(--mm-radius-lg,20px)] border border-dashed border-[var(--mm-border-strong,rgba(255,255,255,0.2))] bg-[var(--mm-surface-subtle,#141418)] p-6 text-center">
            <p className="text-sm font-semibold text-[var(--mm-fg,#fafafa)]">
              All {cards.length} cards reviewed
            </p>
            <p className="text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
              Reset the deck or undo the last swipe.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-[var(--mm-radius-sm,8px)] bg-[var(--mm-accent,#10b981)] px-3.5 py-1.5 text-xs font-semibold text-[var(--mm-accent-fg,#03150e)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset Deck
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {remaining.slice(0, 3).map((card, stackPos) => {
              const isTop = stackPos === 0;
              return (
                <motion.div
                  key={card.id}
                  style={{
                    zIndex: 10 - stackPos,
                    originX: 0.5,
                    originY: 0.8,
                  }}
                  initial={
                    prefersReduced
                      ? { opacity: 1 }
                      : { scale: 1 - stackPos * 0.05, y: stackPos * 10, opacity: 0.9 }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1 }
                      : {
                          scale: 1 - stackPos * 0.05,
                          y: stackPos * 10,
                          rotate: stackPos === 0 ? 0 : stackPos % 2 === 0 ? 2 : -2,
                          opacity: 1 - stackPos * 0.14,
                        }
                  }
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : {
                          x: lastDirection === "right" ? 260 : -260,
                          rotate: lastDirection === "right" ? 16 : -16,
                          opacity: 0,
                        }
                  }
                  transition={{ type: "spring", stiffness: 360, damping: 26 }}
                  drag={isTop && !prefersReduced ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.65}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 85) dismissTop("right");
                    else if (info.offset.x < -85) dismissTop("left");
                  }}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-6 select-none",
                    "rounded-[var(--mm-radius-lg,20px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.2))]",
                    "bg-[var(--mm-surface-elevated,#18181c)] text-[var(--mm-fg,#fafafa)] shadow-[var(--mm-shadow-hover)]",
                    isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    {card.tag && (
                      <span className="rounded-full bg-[var(--mm-accent-soft,rgba(16,185,129,0.14))] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--mm-accent,#10b981)]">
                        {card.tag}
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[11px] text-[var(--mm-fg-subtle,#71717a)]">
                      {index + stackPos + 1} / {cards.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold tracking-tight">{card.title}</h3>
                    <p className="text-xs leading-relaxed text-[var(--mm-fg-muted,#a1a1aa)]">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[var(--mm-fg-subtle,#71717a)]">
                    <span>← Skip</span>
                    <span>Drag or Arrow Keys</span>
                    <span>Keep →</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Tactile Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => dismissTop("left")}
          disabled={remaining.length === 0}
          aria-label="Swipe left"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] disabled:opacity-40 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={undo}
          disabled={index === 0}
          aria-label="Undo last card"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] px-3 text-xs font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] disabled:opacity-40 cursor-pointer"
        >
          <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
          Undo
        </button>

        <button
          type="button"
          onClick={() => dismissTop("right")}
          disabled={remaining.length === 0}
          aria-label="Swipe right"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface)] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] disabled:opacity-40 cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
