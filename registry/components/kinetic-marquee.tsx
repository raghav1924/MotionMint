"use client";

import React from "react";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
  "Linear",
  "Planes",
  "Vercel",
  "Stripe",
  "Raycast",
  "Figma",
  "Loom",
  "Arc",
];

export function KineticMarquee({
  items = DEFAULT_ITEMS,
  speedSeconds = 18,
  className,
}: {
  items?: string[];
  speedSeconds?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface,#121216)] py-4",
        className
      )}
    >
      <div
        className="flex w-max items-center gap-4 px-4 motion-reduce:animate-none"
        style={{
          animation: `mm-marquee ${speedSeconds}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-[var(--mm-border,rgba(255,255,255,0.12))] bg-[var(--mm-surface-subtle,rgba(255,255,255,0.04))] px-4 py-1.5 text-xs font-medium tracking-tight text-[var(--mm-fg,#fafafa)]"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes mm-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
