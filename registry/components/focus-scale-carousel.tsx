"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FocusSlide {
  id: string;
  title: string;
  tag: string;
  accent: string;
}

export interface FocusScaleCarouselProps {
  slides?: FocusSlide[];
  className?: string;
}

const DEFAULT_SLIDES: FocusSlide[] = [
  { id: "fs1", title: "Spatial Tokens", tag: "System", accent: "#38BDF8" },
  { id: "fs2", title: "Spring Curves", tag: "Motion", accent: "#A855F7" },
  { id: "fs3", title: "Shader Passes", tag: "WebGL", accent: "#10B981" },
  { id: "fs4", title: "Audio Cues", tag: "Sound", accent: "#F59E0B" },
];

/**
 * Center-focused carousel that scales up the active slide and recedes neighbors.
 */
export function FocusScaleCarousel({
  slides = DEFAULT_SLIDES,
  className = "",
}: FocusScaleCarouselProps) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(1);

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      aria-label="Focus scale carousel"
      className={`w-full max-w-md space-y-3 text-[var(--mm-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-accent)] rounded-2xl ${className}`.trim()}
    >
      <div className="flex items-center justify-center gap-2 overflow-hidden py-2">
        {slides.map((slide, idx) => {
          const isCenter = idx === active;
          return (
            <motion.button
              key={slide.id}
              type="button"
              onClick={() => setActive(idx)}
              animate={
                prefersReduced
                  ? undefined
                  : {
                      scale: isCenter ? 1 : 0.86,
                      opacity: isCenter ? 1 : 0.55,
                    }
              }
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="flex h-32 w-28 shrink-0 flex-col justify-between rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-3 text-left shadow-sm cursor-pointer"
            >
              <span
                className="h-2.5 w-8 rounded-full"
                style={{ backgroundColor: slide.accent }}
              />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
                  {slide.tag}
                </p>
                <p className="text-xs font-semibold leading-tight">{slide.title}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous focus slide"
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">
          {slides[active]?.title} ({active + 1}/{slides.length})
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Next focus slide"
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] p-1.5 hover:opacity-80 cursor-pointer"
        >
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
