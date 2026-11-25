"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { cn } from "@/lib/utils";

interface ExhibitionItem {
  slug: string;
  title: string;
  category: string;
  hint: string;
  spanClass: string;
  stageClass: string;
  theme?: "minimalism" | "dark-mode-ui";
  mode?: "light" | "dark";
}

const EXHIBITION_ITEMS: ExhibitionItem[] = [
  {
    slug: "swipe-card-deck",
    title: "Swipe Card Deck",
    category: "Signature · Interactive",
    hint: "Drag cards left/right or press Arrow keys",
    spanClass: "md:col-span-7",
    stageClass: "min-h-[310px]",
  },
  {
    slug: "thinking-loader",
    title: "Thinking Loader",
    category: "AI · Status",
    hint: "Multi-stage live-region reasoning indicator",
    spanClass: "md:col-span-5",
    stageClass: "min-h-[310px]",
    theme: "dark-mode-ui",
    mode: "dark",
  },
  {
    slug: "ai-prompt-composer",
    title: "AI Prompt Composer",
    category: "AI · Input",
    hint: "Structured prompt bar with model & token cues",
    spanClass: "md:col-span-6",
    stageClass: "min-h-[260px]",
  },
  {
    slug: "physical-knob",
    title: "Physical Knob",
    category: "Controls · Rotary",
    hint: "Tactile dial with pointer drag & keyboard steps",
    spanClass: "md:col-span-3",
    stageClass: "min-h-[260px]",
  },
  {
    slug: "reaction-arc",
    title: "Reaction Arc",
    category: "Controls · Radial",
    hint: "Curved emoji reaction arc on trigger",
    spanClass: "md:col-span-3",
    stageClass: "min-h-[260px]",
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    category: "Controls · Scheduling",
    hint: "Spring-animated calendar popover",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[250px]",
  },
  {
    slug: "receipt-printer",
    title: "Receipt Printer",
    category: "Controls · Thermal",
    hint: "Line-by-line thermal receipt reveal",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[250px]",
  },
  {
    slug: "scratch-card",
    title: "Scratch Card",
    category: "Controls · Canvas",
    hint: "HTML5 canvas foil reveal with threshold",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[250px]",
  },
  {
    slug: "image-generation",
    title: "Image Generation",
    category: "AI · Creative",
    hint: "Prompt-to-preview generation card",
    spanClass: "md:col-span-6",
    stageClass: "min-h-[240px]",
  },
  {
    slug: "infinity-canvas",
    title: "Infinity Canvas",
    category: "Controls · Spatial",
    hint: "Pan & zoom spatial surface component",
    spanClass: "md:col-span-6",
    stageClass: "min-h-[240px]",
  },
];

export function ExhibitionGallery() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="grid gap-5 md:grid-cols-12">
      {EXHIBITION_ITEMS.map((item, idx) => (
        <motion.article
          key={item.slug}
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.42,
            delay: prefersReduced ? 0 : (idx % 3) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "group flex flex-col justify-between overflow-hidden rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] transition-all hover:border-[var(--ws-border-strong)] hover:shadow-[var(--ws-shadow-floating)]",
            item.spanClass
          )}
        >
          <MotionMintTheme
            theme={item.theme ?? "minimalism"}
            mode={item.mode ?? "light"}
            padded
            className={cn(
              "flex w-full items-center justify-center overflow-hidden rounded-none border-0 border-b border-[var(--ws-border-subtle)] p-6",
              item.stageClass
            )}
          >
            <ComponentLivePreview slug={item.slug} />
          </MotionMintTheme>

          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
                  {item.category}
                </span>
              </div>
              <h3 className="truncate text-sm font-semibold text-[var(--ws-text-primary)]">
                {item.title}
              </h3>
              <p className="truncate text-xs text-[var(--ws-text-secondary)]">{item.hint}</p>
            </div>

            <Link
              href={`/components/${item.slug}`}
              aria-label={`Open ${item.title} in Component Studio`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-primary)] transition-colors group-hover:bg-[var(--ws-text-primary)] group-hover:text-[var(--ws-bg)]"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
