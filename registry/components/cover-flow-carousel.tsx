"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerInteractionFeedback } from "@/lib/audio/feedback-store";

export interface CoverFlowItem {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  gradient?: string;
}

export const DEFAULT_COVER_FLOW_ITEMS: CoverFlowItem[] = [
  {
    id: "neon-nights",
    eyebrow: "Cover Flow",
    title: "Neon Nights",
    subtitle: "Synthwave Sessions · 2024",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #831843 55%, #1e1b4b 100%)",
  },
  {
    id: "urban-jungle",
    eyebrow: "Cover Flow",
    title: "Urban Jungle",
    subtitle: "Concrete Canopy · 2023",
    gradient: "linear-gradient(135deg, #065f46 0%, #0f766e 55%, #022c22 100%)",
  },
  {
    id: "mountain-echoes",
    eyebrow: "Cover Flow",
    title: "Mountain Echoes",
    subtitle: "Alpine Drift · 2023",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 55%, #0f172a 100%)",
  },
  {
    id: "summer-vibes",
    eyebrow: "Cover Flow",
    title: "Summer Vibes",
    subtitle: "Beach Party · 2022",
    gradient:
      "radial-gradient(circle at 22% 28%, #f87171 0%, transparent 55%), radial-gradient(circle at 78% 72%, #818cf8 0%, transparent 55%), linear-gradient(135deg, #fb7185 0%, #fdba74 45%, #93c5fd 100%)",
  },
  {
    id: "velvet-dusk",
    eyebrow: "Cover Flow",
    title: "Velvet Dusk",
    subtitle: "Crimson Horizon · 2024",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 60%, #1c1917 100%)",
  },
  {
    id: "amber-pulse",
    eyebrow: "Cover Flow",
    title: "Amber Pulse",
    subtitle: "Golden Hour · 2025",
    gradient: "linear-gradient(135deg, #b45309 0%, #78350f 60%, #27272a 100%)",
  },
  {
    id: "midnight-indigo",
    eyebrow: "Cover Flow",
    title: "Midnight Indigo",
    subtitle: "Deep Orbit · 2025",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #09090b 100%)",
  },
];

export interface CoverFlowCarouselProps {
  items?: CoverFlowItem[];
  initialIndex?: number;
  showReflections?: boolean;
  sound?: boolean;
  haptic?: boolean;
  className?: string;
}

export function CoverFlowCarousel({
  items = DEFAULT_COVER_FLOW_ITEMS,
  initialIndex = 3,
  showReflections = true,
  sound,
  haptic,
  className,
}: CoverFlowCarouselProps) {
  const safeInitial = Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1));
  const [activeIndex, setActiveIndex] = useState(safeInitial);
  const prefersReduced = useReducedMotion();
  const dragStartX = useRef<number | null>(null);
  const wheelLock = useRef(0);

  const selectIndex = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(0, next), items.length - 1);
      if (clamped !== activeIndex) {
        setActiveIndex(clamped);
        triggerInteractionFeedback("click", { sound, haptic });
      }
    },
    [activeIndex, items.length, sound, haptic]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectIndex(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      selectIndex(activeIndex + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - wheelLock.current < 180) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (Math.abs(delta) > 18) {
      wheelLock.current = now;
      selectIndex(activeIndex + (delta > 0 ? 1 : -1));
    }
  };

  const activeItem = items[activeIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Cover Flow Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onPointerDown={(e) => {
        dragStartX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragStartX.current === null) return;
        const dx = e.clientX - dragStartX.current;
        dragStartX.current = null;
        if (Math.abs(dx) > 36) {
          selectIndex(activeIndex + (dx < 0 ? 1 : -1));
        }
      }}
      className={cn(
        "relative flex w-full flex-col items-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-ring,#10b981)] rounded-2xl py-4",
        className
      )}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative flex h-[280px] sm:h-[320px] w-full items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          const visible = absOffset <= 3;

          const translateX = isCenter
            ? 0
            : Math.sign(offset) * (135 + (absOffset - 1) * 58);
          const rotateY = isCenter ? 0 : Math.sign(offset) * -48;
          const scale = isCenter ? 1 : Math.max(0.72, 0.84 - (absOffset - 1) * 0.06);
          const zIndex = 20 - absOffset;
          const opacity = visible ? (isCenter ? 1 : Math.max(0.45, 0.92 - absOffset * 0.16)) : 0;

          return (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`Select ${item.title}`}
              aria-current={isCenter ? "true" : undefined}
              onClick={() => selectIndex(idx)}
              initial={false}
              animate={
                prefersReduced
                  ? { x: translateX, scale, opacity }
                  : {
                      x: translateX,
                      rotateY,
                      scale,
                      opacity,
                    }
              }
              transition={
                prefersReduced
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 320, damping: 28, mass: 0.8 }
              }
              style={{
                zIndex,
                transformStyle: "preserve-3d",
                pointerEvents: visible ? "auto" : "none",
              }}
              className={cn(
                "absolute h-[210px] w-[210px] sm:h-[244px] sm:w-[244px] cursor-pointer rounded-[22px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                isCenter
                  ? "shadow-[0_28px_60px_-15px_rgba(0,0,0,0.45)]"
                  : "shadow-[0_18px_36px_-12px_rgba(0,0,0,0.35)]"
              )}
            >
              {/* Main Album / Card Surface */}
              <div
                className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[22px] border border-white/20 p-5 text-white"
                style={{
                  background:
                    item.gradient ??
                    "linear-gradient(135deg, #27272a 0%, #09090b 100%)",
                }}
              >
                <div className="space-y-1">
                  {item.eyebrow && (
                    <p className="text-[10px] font-medium tracking-wide text-white/75">
                      {item.eyebrow}
                    </p>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle vinyl / disc badge */}
                <div className="flex justify-end">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
                  >
                    <span className="h-3 w-3 rounded-full bg-white/40" />
                  </span>
                </div>
              </div>

              {/* Signature Mirrored Floor Reflection */}
              {showReflections && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 right-0 top-[calc(100%+6px)] h-16 overflow-hidden rounded-[22px] opacity-30"
                  style={{
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 75%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 75%)",
                    background:
                      item.gradient ??
                      "linear-gradient(135deg, #27272a 0%, #09090b 100%)",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Metadata + Keyboard/Arrow Controls */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center" aria-live="polite">
        <div>
          <p className="text-sm font-semibold tracking-tight text-[var(--mm-fg,#fafafa)]">
            {activeItem?.title}
          </p>
          {activeItem?.subtitle && (
            <p className="text-xs text-[var(--mm-fg-muted,#a1a1aa)]">
              {activeItem.subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            aria-label="Previous cover"
            disabled={activeIndex === 0}
            onClick={() => selectIndex(activeIndex - 1)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--mm-border,rgba(255,255,255,0.16))] bg-[var(--mm-surface-subtle,rgba(255,255,255,0.06))] text-[var(--mm-fg,#fafafa)] transition-opacity hover:opacity-80 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <span className="font-mono text-[10px] text-[var(--mm-fg-muted,#a1a1aa)]">
            {activeIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            aria-label="Next cover"
            disabled={activeIndex === items.length - 1}
            onClick={() => selectIndex(activeIndex + 1)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--mm-border,rgba(255,255,255,0.16))] bg-[var(--mm-surface-subtle,rgba(255,255,255,0.06))] text-[var(--mm-fg,#fafafa)] transition-opacity hover:opacity-80 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
