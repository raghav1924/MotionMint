"use client";

import React, { useState } from "react";
import { Disc } from "lucide-react";

export interface AlbumCoverProps {
  title?: string;
  artist?: string;
  year?: string;
  className?: string;
}

/**
 * Interactive vinyl album sleeve that reveals a sliding disc on hover, focus, or click.
 */
export function AlbumCover({
  title = "Kinetic Forms",
  artist = "RenderJoy Ensemble",
  year = "2026",
  className = "",
}: AlbumCoverProps) {
  const [ejected, setEjected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setEjected((v) => !v)}
      aria-pressed={ejected}
      aria-label={`${title} by ${artist} — toggle vinyl sleeve`}
      className={`group relative flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mm-accent)] rounded-2xl cursor-pointer ${className}`.trim()}
    >
      {/* Sliding Vinyl Disc */}
      <div
        aria-hidden="true"
        className={`absolute right-0 flex h-32 w-32 items-center justify-center rounded-full border border-[var(--mm-border)] bg-neutral-900 text-neutral-300 shadow-lg transition-transform duration-500 ease-out motion-reduce:transition-none ${
          ejected
            ? "translate-x-10 rotate-45"
            : "translate-x-3 group-hover:translate-x-10 group-focus-visible:translate-x-10"
        }`}
      >
        <Disc className="h-12 w-12 opacity-60" />
      </div>

      {/* Front Sleeve */}
      <div className="relative z-10 flex h-36 w-36 flex-col justify-between rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-3.5 text-[var(--mm-fg)] shadow-md">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mm-fg-muted)]">
          LP · {year}
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">{title}</p>
          <p className="mt-0.5 text-[11px] text-[var(--mm-fg-muted)]">{artist}</p>
        </div>
      </div>
    </button>
  );
}
