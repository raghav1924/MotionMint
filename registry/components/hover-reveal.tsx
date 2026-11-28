"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface HoverRevealItem {
  id: string;
  title: string;
  tag: string;
  previewSummary: string;
  accent: string;
}

export interface HoverRevealProps {
  items?: HoverRevealItem[];
  className?: string;
}

const DEFAULT_ITEMS: HoverRevealItem[] = [
  {
    id: "hr1",
    title: "Logo Flare Shader",
    tag: "WebGL",
    previewSummary: "Volumetric polar light rays & Gaussian central bloom.",
    accent: "#38BDF8",
  },
  {
    id: "hr2",
    title: "Cover-Flow Carousel",
    tag: "3D Motion",
    previewSummary: "Spring-interpolated perspective stack with floor reflection.",
    accent: "#A855F7",
  },
  {
    id: "hr3",
    title: "Physical Knob",
    tag: "Controls",
    previewSummary: "Rotary dial with detent ticks and keyboard increments.",
    accent: "#10B981",
  },
];

/**
 * Editorial list that reveals a floating preview card on hover or keyboard focus.
 */
export function HoverReveal({
  items = DEFAULT_ITEMS,
  className = "",
}: HoverRevealProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const activeItem = items.find((i) => i.id === activeId) ?? null;

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-3 ${className}`.trim()}
    >
      <ul className="divide-y divide-[var(--mm-border)]" aria-label="Interactive showcase list">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className="flex w-full items-center justify-between gap-2 py-2.5 text-left text-xs transition-opacity hover:opacity-85 cursor-pointer"
              >
                <span className={isActive ? "font-semibold" : "font-medium"}>{item.title}</span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--mm-fg-muted)]">
                  {item.tag}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {activeItem && (
        <div
          aria-live="polite"
          className="rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] p-3 text-xs space-y-1"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: activeItem.accent }}
              aria-hidden="true"
            />
            <span className="font-semibold">{activeItem.title}</span>
          </div>
          <p className="text-[11px] text-[var(--mm-fg-muted)]">{activeItem.previewSummary}</p>
        </div>
      )}
    </div>
  );
}
