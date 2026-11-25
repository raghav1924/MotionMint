"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MotionMintTheme } from "@/components/theme/theme-scope";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { useMotionMint } from "./providers";
import type { ThemeId } from "@/lib/themes/types";
import { cn } from "@/lib/utils";

interface ExhibitionItem {
  slug: string;
  title: string;
  category: string;
  hint: string;
  theme: ThemeId;
  spanClass: string;
  stageHeightClass: string;
}

const EXHIBITION_ITEMS: ExhibitionItem[] = [
  {
    slug: "swipe-card-deck",
    title: "Swipe Card Deck",
    category: "Gestures",
    hint: "Spring-driven card stack with velocity-aware flick dismissal.",
    theme: "bento-grid",
    spanClass: "md:col-span-7",
    stageHeightClass: "min-h-[300px]",
  },
  {
    slug: "thinking-loader",
    title: "Thinking Loader",
    category: "AI Surfaces",
    hint: "Multi-stage reasoning pulse with calm editorial cadence.",
    theme: "minimalism",
    spanClass: "md:col-span-5",
    stageHeightClass: "min-h-[300px]",
  },
  {
    slug: "physical-knob",
    title: "Physical Knob",
    category: "Tactile Controls",
    hint: "Rotary encoder with radial detents and keyboard precision.",
    theme: "swiss-design",
    spanClass: "md:col-span-4",
    stageHeightClass: "min-h-[260px]",
  },
  {
    slug: "reaction-arc",
    title: "Reaction Arc",
    category: "Micro-Interactions",
    hint: "Orbital radial burst triggered by click or keyboard activation.",
    theme: "glassmorphism",
    spanClass: "md:col-span-4",
    stageHeightClass: "min-h-[260px]",
  },
  {
    slug: "ai-prompt-composer",
    title: "AI Prompt Composer",
    category: "AI Surfaces",
    hint: "Expanding input bar with context attachment pills.",
    theme: "neo-brutalism",
    spanClass: "md:col-span-4",
    stageHeightClass: "min-h-[260px]",
  },
];

export function ExhibitionGallery() {
  const { resolvedAppearance } = useMotionMint();
  const prefersReduced = useReducedMotion();
  const previewMode = resolvedAppearance === "dark" ? "dark" : "light";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {EXHIBITION_ITEMS.map((item, idx) => (
        <motion.article
          key={item.slug}
          initial={prefersReduced ? false : { opacity: 0, y: 14 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.42, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "group flex flex-col justify-between overflow-hidden rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-surface)] transition-colors hover:border-[var(--ws-border-strong)]",
            item.spanClass
          )}
        >
          {/* Interactive Live Stage */}
          <div className="p-4 sm:p-5">
            <MotionMintTheme
              theme={item.theme}
              mode={previewMode}
              className={cn(
                "flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-[var(--mm-border)] bg-[var(--mm-bg)] p-6",
                item.stageHeightClass
              )}
            >
              <ComponentLivePreview slug={item.slug} />
            </MotionMintTheme>
          </div>

          {/* Minimal Editorial Caption */}
          <div className="flex items-center justify-between gap-4 border-t border-[var(--ws-border-subtle)] px-5 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium tracking-[-0.01em] text-[var(--ws-text-primary)]">
                  {item.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]">
                  {item.category}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-[var(--ws-text-secondary)]">
                {item.hint}
              </p>
            </div>

            <Link
              href={`/components/${item.slug}`}
              aria-label={`Inspect ${item.title} in Component Studio`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--ws-border)] text-[var(--ws-text-primary)] transition-colors group-hover:bg-[var(--ws-text-primary)] group-hover:text-[var(--ws-bg)]"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
