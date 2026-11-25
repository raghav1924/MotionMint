"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

type EntryDirection = "top" | "right" | "bottom" | "left";

export interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

function getEntryDirection(e: React.MouseEvent<HTMLButtonElement>): EntryDirection {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle >= -45 && angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= -135 && angle < -45) return "top";
  return "left";
}

export function FlipCard({
  front,
  back,
  sound,
  haptic,
  className,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<EntryDirection>("right");
  const prefersReduced = useReducedMotion();

  const toggle = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e && e.clientX !== 0) {
      setDirection(getEntryDirection(e));
    }
    setFlipped((prev) => !prev);
    triggerInteractionFeedback("click", { sound, haptic });
  };

  const rotateTransform = () => {
    if (!flipped) return { rotateX: 0, rotateY: 0 };
    switch (direction) {
      case "top":
        return { rotateX: 180, rotateY: 0 };
      case "bottom":
        return { rotateX: -180, rotateY: 0 };
      case "left":
        return { rotateX: 0, rotateY: -180 };
      case "right":
      default:
        return { rotateX: 0, rotateY: 180 };
    }
  };

  const target = rotateTransform();
  const isVertical = direction === "top" || direction === "bottom";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={flipped}
      aria-label={flipped ? "Show front of card" : "Flip card to see back"}
      style={{ perspective: 1000 }}
      className={cn(
        "relative block h-56 w-full max-w-xs cursor-pointer text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] rounded-[var(--mm-radius-lg,20px)]",
        className
      )}
    >
      {prefersReduced ? (
        <div className="h-full w-full rounded-[var(--mm-radius-lg,20px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.2))] bg-[var(--mm-surface-elevated,#18181c)] p-6 shadow-[var(--mm-shadow)]">
          {flipped ? back : front}
        </div>
      ) : (
        <motion.div
          animate={target}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[var(--mm-radius-lg,20px)] border-[var(--mm-border-width,1px)] border-[var(--mm-border-strong,rgba(255,255,255,0.2))] bg-[var(--mm-surface-elevated,#18181c)] p-6 shadow-[var(--mm-shadow)]"
          >
            {front}
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: isVertical ? "rotateX(180deg)" : "rotateY(180deg)",
            }}
            className="absolute inset-0 rounded-[var(--mm-radius-lg,20px)] border-[var(--mm-border-width,1px)] border-[var(--mm-accent,#10b981)] bg-[var(--mm-surface,#111114)] p-6 shadow-[var(--mm-shadow-hover)]"
          >
            {back}
          </div>
        </motion.div>
      )}
    </button>
  );
}
