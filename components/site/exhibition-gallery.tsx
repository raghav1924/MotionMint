"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { cn } from "@/lib/utils";

interface ExhibitionItem {
  slug: string;
  title: string;
  category: string;
  hint: string;
  spanClass: string;
  stageClass: string;
}

const EXHIBITION_ITEMS: ExhibitionItem[] = [
  {
    slug: "swipe-card-deck",
    title: "Swipe Card Deck",
    category: "Signature · Media",
    hint: "Drag cards left/right or use Arrow keys",
    spanClass: "md:col-span-7",
    stageClass: "min-h-[320px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "thinking-loader",
    title: "Thinking Loader",
    category: "Signature · AI Status",
    hint: "Live-region multi-stage status indicator",
    spanClass: "md:col-span-5",
    stageClass: "min-h-[320px] bg-[#0a0c10] text-zinc-100",
  },
  {
    slug: "flip-card",
    title: "Direction-Aware Flip Card",
    category: "Signature · 3D",
    hint: "Click any edge to flip along that axis",
    spanClass: "md:col-span-5",
    stageClass: "min-h-[280px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "dropzone",
    title: "File Dropzone",
    category: "Inputs · Validation",
    hint: "Drag-and-drop or Enter/Space file picker",
    spanClass: "md:col-span-7",
    stageClass: "min-h-[280px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "wiggle-text",
    title: "Wiggle Text",
    category: "Typography",
    hint: "Hover characters for staggered spring",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[160px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "sound-toggle",
    title: "Sound & Haptic Toggle",
    category: "Controls · Audio",
    hint: "Spring switch + synthesized cue",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[160px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "progress-ring",
    title: "Progress Ring & Bar",
    category: "Data Viz",
    hint: "Click to advance tabular progress",
    spanClass: "md:col-span-4",
    stageClass: "min-h-[160px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "ripple-button",
    title: "Ripple & Jelly Buttons",
    category: "Tactile Buttons",
    hint: "Pointer-origin ripple feedback",
    spanClass: "md:col-span-6",
    stageClass: "min-h-[150px] bg-[var(--mm-surface-subtle)]",
  },
  {
    slug: "skeleton-shimmer",
    title: "Skeleton Shimmer",
    category: "Loaders",
    hint: "CSS shimmer with reduced-motion fallback",
    spanClass: "md:col-span-6",
    stageClass: "min-h-[150px] bg-[var(--mm-surface-subtle)]",
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
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
          className={cn("mm-card flex flex-col justify-between p-5 gap-4", item.spanClass)}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-accent)]">
                {item.category}
              </p>
              <h3 className="mt-0.5 text-base font-bold text-[var(--mm-fg)]">
                {item.title}
              </h3>
            </div>
            <Link
              href={`/components/${item.slug}`}
              aria-label={`Open ${item.title} in Component Studio`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated)] text-[var(--mm-fg)] hover:border-[var(--mm-accent)] hover:text-[var(--mm-accent)] transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div
            className={cn(
              "flex items-center justify-center rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] p-5",
              item.stageClass
            )}
          >
            <ComponentLivePreview slug={item.slug} />
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--mm-fg-subtle)]">
            <span>{item.hint}</span>
            <Link
              href={`/components/${item.slug}`}
              className="font-medium text-[var(--mm-accent)] hover:underline"
            >
              Open Studio →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
