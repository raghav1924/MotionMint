"use client";

import React, { useState } from "react";

export interface RetroCrtProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Retro CRT phosphor display frame with toggleable scanlines.
 */
export function RetroCrt({
  label = "SIGNAL // CH-03",
  className = "",
  children,
}: RetroCrtProps) {
  const [scanlines, setScanlines] = useState(true);

  return (
    <div
      className={`relative w-full max-w-sm overflow-hidden rounded-2xl border-2 border-[var(--mm-border)] bg-neutral-950 p-4 text-emerald-400 shadow-inner ${className}`.trim()}
    >
      {scanlines && (
        <div
          aria-hidden="true"
          data-crt-scanlines="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 4px)",
          }}
        />
      )}

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span>{label}</span>
          <button
            type="button"
            onClick={() => setScanlines((s) => !s)}
            aria-pressed={scanlines}
            className="rounded border border-emerald-500/40 px-2 py-0.5 hover:bg-emerald-500/10 cursor-pointer"
          >
            Scanlines: {scanlines ? "ON" : "OFF"}
          </button>
        </div>

        <div className="rounded-xl border border-emerald-500/25 bg-black/50 p-3 font-mono text-xs">
          {children ?? "PHOSPHOR READY · 60HZ SYNC"}
        </div>
      </div>
    </div>
  );
}
