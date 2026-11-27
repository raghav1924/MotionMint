"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import { useRenderJoy } from "@/components/site/providers";
import { cn } from "@/lib/utils";

export function NavigationToggle({ className }: { className?: string }) {
  const { sidebarOpen, setSidebarOpen } = useRenderJoy();

  return (
    <button
      type="button"
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={sidebarOpen ? "Close navigation overlay" : "Open navigation overlay"}
      aria-expanded={sidebarOpen}
      title="Toggle navigation"
      className={cn(
        "fixed top-12 left-4 z-40 inline-flex h-8 w-8 items-center justify-center rounded-[10px]",
        "text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)]",
        "transition-colors duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-text-primary)]",
        className
      )}
    >
      <PanelLeft className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
