"use client";

import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function SplitCompare({
  beforeLabel = "Wireframe",
  afterLabel = "Rendered",
  className,
}: {
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [percent, setPercent] = useState(52);

  return (
    <div
      className={cn(
        "relative h-56 w-full max-w-md overflow-hidden rounded-2xl border border-[var(--mm-border,rgba(255,255,255,0.14))] select-none",
        className
      )}
    >
      {/* After layer (Right / Full) */}
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#1d1a14] via-[#121015] to-[#09090b] p-5 text-white">
        <div className="flex justify-end">
          <span className="rounded-full border border-[#e6c88c]/40 bg-[#e6c88c]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#f5e1b9]">
            {afterLabel}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight">Champagne Shader Surface</p>
          <p className="text-xs text-zinc-400">Drag the divider to compare layers.</p>
        </div>
      </div>

      {/* Before layer (Left / Clipped) */}
      <div
        className="absolute inset-0 flex flex-col justify-between bg-zinc-100 p-5 text-zinc-900"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <div>
          <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-700">
            {beforeLabel}
          </span>
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight">Wireframe Token Pass</p>
          <p className="text-xs text-zinc-600">Monochrome base structure.</p>
        </div>
      </div>

      {/* Luminous divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#e6c88c] shadow-[0_0_16px_rgba(230,200,140,0.9)]"
        style={{ left: `${percent}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fff4d6] bg-[#171209] text-[#f5e1b9] shadow-lg">
          <MoveHorizontal className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Accessible range input overlay */}
      <input
        type="range"
        min={5}
        max={95}
        value={percent}
        aria-label="Split comparison position"
        onChange={(e) => setPercent(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
