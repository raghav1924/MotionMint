"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  PanelLeft,
  Search,
  Package,
  Copy,
  Check,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useMotionMint } from "@/components/site/providers";
import { PromptMenu } from "@/components/shell/prompt-menu";
import { cn } from "@/lib/utils";

export function FloatingToolbar() {
  const pathname = usePathname();
  const {
    sidebarOpen,
    setSidebarOpen,
    setCommandOpen,
    resolvedAppearance,
    setAppearance,
    viewportMode,
    setViewportMode,
    refreshPreview,
    fullscreenPreview,
    setFullscreenPreview,
    activeComponentSlug,
  } = useMotionMint();

  const [copiedPkg, setCopiedPkg] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const slugFromPath =
    pathname.startsWith("/components/") && pathname !== "/components"
      ? pathname.replace("/components/", "").split("/")[0]
      : activeComponentSlug;

  const packageId = slugFromPath
    ? `${BRAND.registryNamespace}/${slugFromPath}`
    : `${BRAND.registryNamespace}/ui`;

  const copyPackage = async () => {
    try {
      await navigator.clipboard?.writeText(packageId);
    } catch {
      // Ignore clipboard errors
    }
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 1500);
  };

  const pillClass =
    "flex items-center gap-0.5 sm:gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]/95 p-1 sm:p-1.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-md";

  const iconBtnClass =
    "inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-text-primary)]";

  return (
    <div
      role="toolbar"
      aria-label="Floating workspace controls"
      className="fixed bottom-3 sm:bottom-4 inset-x-0 z-50 flex justify-center px-2 sm:px-3 pointer-events-none"
    >
      <div className="relative pointer-events-auto flex max-w-full items-center gap-1.5 sm:gap-2 py-1">
        {/* Left Capsule: Navigation & Command Palette */}
        <div className={pillClass}>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation overlay"
            title="Navigation"
            className={iconBtnClass}
          >
            <PanelLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <div className="mx-0.5 hidden sm:block h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command palette"
            className="inline-flex h-7 items-center gap-2 rounded-full px-2 sm:px-2.5 text-xs text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] transition-colors cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <kbd className="hidden sm:inline-flex items-center rounded bg-[var(--ws-surface)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ws-text-secondary)] border border-[var(--ws-border-subtle)]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Middle Capsule: Component Identification & Copy Prompt */}
        <div className={cn(pillClass, "relative")}>
          <div className="flex items-center gap-1 sm:gap-1.5 pl-1.5 sm:pl-2 pr-0.5 sm:pr-1 text-xs">
            <Package className="hidden sm:block h-3.5 w-3.5 shrink-0 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            <span className="hidden sm:inline font-mono text-[11px] text-[var(--ws-text-primary)] whitespace-nowrap">
              {packageId}
            </span>
            <button
              type="button"
              onClick={copyPackage}
              aria-label={`Copy ${packageId}`}
              title={`Copy ${packageId}`}
              className={iconBtnClass}
            >
              {copiedPkg ? (
                <Check className="h-3 w-3 text-emerald-500" aria-hidden="true" />
              ) : (
                <Copy className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="mx-0.5 h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />

          <button
            type="button"
            onClick={() => setPromptOpen((o) => !o)}
            aria-expanded={promptOpen}
            aria-label="Copy prompt options"
            className="inline-flex h-7 items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Copy className="hidden sm:block h-3 w-3 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            <span>Copy prompt</span>
            <ChevronDown
              className={cn(
                "h-3 w-3 text-[var(--ws-text-secondary)] transition-transform duration-150",
                promptOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>

          <PromptMenu open={promptOpen} onClose={() => setPromptOpen(false)} slug={slugFromPath} />
        </div>

        {/* Right Capsule: Viewport, Refresh, Fullscreen & Theme */}
        <div className={pillClass}>
          <button
            type="button"
            onClick={() => setViewportMode("desktop")}
            aria-label="Desktop preview"
            aria-pressed={viewportMode === "desktop"}
            title="Desktop preview"
            className={cn(
              iconBtnClass,
              viewportMode === "desktop" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
            )}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setViewportMode("tablet")}
            aria-label="Tablet preview"
            aria-pressed={viewportMode === "tablet"}
            title="Tablet preview"
            className={cn(
              iconBtnClass,
              viewportMode === "tablet" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
            )}
          >
            <Tablet className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setViewportMode("mobile")}
            aria-label="Mobile preview"
            aria-pressed={viewportMode === "mobile"}
            title="Mobile preview"
            className={cn(
              iconBtnClass,
              viewportMode === "mobile" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
            )}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <div className="mx-0.5 hidden sm:block h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />

          <button
            type="button"
            onClick={refreshPreview}
            aria-label="Refresh preview"
            title="Refresh preview"
            className={cn(iconBtnClass, "hidden sm:inline-flex")}
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setFullscreenPreview(!fullscreenPreview)}
            aria-label={fullscreenPreview ? "Exit fullscreen" : "Fullscreen preview"}
            aria-pressed={fullscreenPreview}
            title={fullscreenPreview ? "Exit fullscreen" : "Fullscreen preview"}
            className={cn(
              iconBtnClass,
              "hidden sm:inline-flex",
              fullscreenPreview && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
            )}
          >
            {fullscreenPreview ? (
              <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setAppearance(resolvedAppearance === "dark" ? "light" : "dark")}
            aria-label={resolvedAppearance === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={resolvedAppearance === "dark" ? "Light mode" : "Dark mode"}
            className={iconBtnClass}
          >
            {resolvedAppearance === "dark" ? (
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
