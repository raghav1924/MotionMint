"use client";

import React, { useState } from "react";

const NAV_ITEMS = ["Components", "Themes", "Motion Lab", "Pricing"];

export interface CurtainNavProps {
  brand?: string;
  className?: string;
}

/**
 * Minimal header with an expandable full-width curtain navigation drawer.
 */
export function CurtainNav({
  brand = "RENDERJOY",
  className = "",
}: CurtainNavProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(NAV_ITEMS[0]);

  return (
    <div
      className={`w-full max-w-md overflow-hidden rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] ${className}`.trim()}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-xs font-bold tracking-[0.18em] text-[var(--mm-fg)]">
          {brand}
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
        >
          {open ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {open && (
        <nav aria-label="Curtain navigation" className="border-t border-[var(--mm-border)] bg-[var(--mm-bg)] p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs cursor-pointer ${
                    selected === item
                      ? "bg-[var(--mm-surface)] font-semibold text-[var(--mm-accent)]"
                      : "text-[var(--mm-fg)] hover:bg-[var(--mm-surface)]"
                  }`}
                >
                  <span>{item}</span>
                  <span className="font-mono text-[10px] text-[var(--mm-fg-muted)]">0{idx + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
