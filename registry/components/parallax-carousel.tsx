"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ParallaxSlide {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
}

export interface ParallaxCarouselProps {
  slides?: ParallaxSlide[];
  className?: string;
}

const DEFAULT_SLIDES: ParallaxSlide[] = [
  { id: "px1", eyebrow: "01 · Depth", title: "Layered Parallax Stage", accent: "#6366F1" },
  { id: "px2", eyebrow: "02 · Motion", title: "Offset Foreground Badge", accent: "#06B6D4" },
  { id: "px3", eyebrow: "03 · Tokens", title: "Theme-Scoped Surfaces", accent: "#F59E0B" },
];

/**
 * Multi-layer carousel offsetting foreground and backdrop layers per slide.
 */
export function ParallaxCarousel({
  slides = DEFAULT_SLIDES,
  className = "",
}: ParallaxCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const current = slides[index];

  return (
    <div className={`w-full max-w-sm space-y-3 text-[var(--mm-fg)] ${className}`.trim()}>
      <div className="relative h-36 overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4">
        <motion.div
          key={`bg-${current.id}`}
          initial={prefersReduced ? false : { x: 24, opacity: 0.4 }}
          animate={{ x: 0, opacity: 0.28 }}
          transition={{ duration: 0.45 }}
          className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full blur-xl"
          style={{ backgroundColor: current.accent }}
        />
        <motion.div
          key={`fg-${current.id}`}
          initial={prefersReduced ? false : { x: 14, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex h-full flex-col justify-between"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
            {current.eyebrow}
          </span>
          <p className="text-lg font-bold tracking-tight">{current.title}</p>
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous parallax slide"
          className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === index ? "w-5 bg-[var(--mm-accent)]" : "w-1.5 bg-[var(--mm-border)]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next parallax slide"
          className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
