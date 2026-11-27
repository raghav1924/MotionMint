"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Volume2, VolumeX, LayoutGrid, Play, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { RenderJoyMark } from "@/components/brand/renderjoy-logo";
import { useRenderJoy } from "@/components/site/providers";
import { cn } from "@/lib/utils";

export function BrandFloatingButton() {
  const { resolvedAppearance, setAppearance, soundEnabled, toggleSound } = useRenderJoy();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed top-12 right-4 z-40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`${BRAND.name} quick utilities`}
        aria-expanded={open}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#111111] text-[var(--ws-accent,#dfff00)]",
          "shadow-[var(--ws-shadow-floating)] ring-1 ring-white/10 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-accent)]"
        )}
      >
        {/* Kinetic M brand mark */}
        <RenderJoyMark size={20} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Quick utilities"
          className="absolute top-13 right-0 w-56 rounded-[20px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-2 shadow-[var(--ws-shadow-menu)] text-xs"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-medium text-[var(--ws-text-secondary)]">
            {BRAND.name} Studio
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => setAppearance(resolvedAppearance === "dark" ? "light" : "dark")}
            className="flex w-full items-center justify-between rounded-[12px] px-2.5 py-2 text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {resolvedAppearance === "dark" ? (
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {resolvedAppearance === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={toggleSound}
            className="flex w-full items-center justify-between rounded-[12px] px-2.5 py-2 text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Sound Feedback
            </span>
            <span className="font-mono text-[10px] text-[var(--ws-text-secondary)]">
              {soundEnabled ? "ON" : "OFF"}
            </span>
          </button>
          <div className="my-1.5 h-px bg-[var(--ws-border-subtle)]" />
          <Link
            href="/flow"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            Node Pipeline Orchestrator
          </Link>
          <Link
            href="/components"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Component Studio
          </Link>
          <Link
            href="/themes"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            29 Design Themes
          </Link>
        </div>
      )}
    </div>
  );
}
