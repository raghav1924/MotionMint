"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface FanCard {
  id: string;
  title: string;
  accent: string;
}

export interface FanCarouselProps {
  cards?: FanCard[];
  className?: string;
}

const DEFAULT_CARDS: FanCard[] = [
  { id: "fc1", title: "Minimalism", accent: "#64748B" },
  { id: "fc2", title: "Cyberpunk", accent: "#EC4899" },
  { id: "fc3", title: "Blueprint", accent: "#38BDF8" },
  { id: "fc4", title: "Wabi Sabi", accent: "#84CC16" },
];

/**
 * Radial-fanning card carousel rotating around a bottom pivot.
 */
export function FanCarousel({
  cards = DEFAULT_CARDS,
  className = "",
}: FanCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(1);

  return (
    <div className={`w-full max-w-sm space-y-3 text-[var(--mm-fg)] ${className}`.trim()}>
      <div className="relative flex h-44 items-center justify-center">
        {cards.map((card, idx) => {
          const delta = idx - active;
          const isCenter = delta === 0;
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => setActive(idx)}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      rotate: delta * 11,
                      x: delta * 34,
                      y: Math.abs(delta) * 8,
                      scale: isCenter ? 1 : 0.92,
                    }
              }
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ zIndex: cards.length - Math.abs(delta), transformOrigin: "50% 110%" }}
              aria-pressed={isCenter}
              className="absolute flex h-36 w-28 flex-col justify-between rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-3 text-left shadow-md cursor-pointer"
            >
              <span
                className="h-14 w-full rounded-xl opacity-85"
                style={{ backgroundColor: card.accent }}
              />
              <span className="text-xs font-semibold">{card.title}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="text-center font-mono text-[10px] text-[var(--mm-fg-muted)]">
        Active: {cards[active]?.title}
      </p>
    </div>
  );
}
