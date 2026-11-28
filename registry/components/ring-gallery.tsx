"use client";

import React, { useState } from "react";
import { RotateCw } from "lucide-react";

export interface RingItem {
  id: string;
  label: string;
  accent: string;
}

export interface RingGalleryProps {
  items?: RingItem[];
  className?: string;
}

const DEFAULT_ITEMS: RingItem[] = [
  { id: "rg1", label: "Prism", accent: "#38BDF8" },
  { id: "rg2", label: "Aurora", accent: "#10B981" },
  { id: "rg3", label: "Silk", accent: "#EC4899" },
  { id: "rg4", label: "Mercury", accent: "#94A3B8" },
  { id: "rg5", label: "Torus", accent: "#8B5CF6" },
  { id: "rg6", label: "Flare", accent: "#F59E0B" },
];

/**
 * Orbital circular gallery rotating selected items to the focal top slot.
 */
export function RingGallery({
  items = DEFAULT_ITEMS,
  className = "",
}: RingGalleryProps) {
  const [active, setActive] = useState(0);

  const rotateNext = () => setActive((i) => (i + 1) % items.length);
  const activeItem = items[active];

  return (
    <div className={`flex flex-col items-center gap-3 text-[var(--mm-fg)] ${className}`.trim()}>
      <div className="relative h-44 w-44 rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)]">
        {items.map((item, idx) => {
          const angle = ((idx - active) / items.length) * Math.PI * 2 - Math.PI / 2;
          const x = 88 + Math.cos(angle) * 62 - 18;
          const y = 88 + Math.sin(angle) * 62 - 18;
          const isSelected = idx === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(idx)}
              aria-pressed={isSelected}
              aria-label={`Select ${item.label}`}
              style={{ left: x, top: y, backgroundColor: item.accent }}
              className={`absolute flex h-9 w-9 items-center justify-center rounded-full text-[9px] font-bold text-white shadow transition-all duration-300 motion-reduce:transition-none cursor-pointer ${
                isSelected ? "scale-125 ring-2 ring-[var(--mm-fg)]" : "opacity-75 hover:opacity-100"
              }`}
            >
              {item.label.slice(0, 2)}
            </button>
          );
        })}

        <button
          type="button"
          onClick={rotateNext}
          aria-label="Rotate ring gallery"
          className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] text-[10px] font-semibold shadow-sm hover:opacity-85 cursor-pointer"
        >
          <RotateCw className="h-3.5 w-3.5 mb-0.5" aria-hidden="true" />
          <span>{activeItem?.label}</span>
        </button>
      </div>
    </div>
  );
}
