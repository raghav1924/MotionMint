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
  Volume2,
  VolumeX,
  Square,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useRenderJoy } from "@/components/site/providers";
import { PromptMenu } from "@/components/shell/prompt-menu";
import { stopAllSounds } from "@/lib/audio/sound-engine";
import { cn } from "@/lib/utils";

type ToolbarMode = "component" | "themes" | "motion" | "sounds" | "default";

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
    soundEnabled,
    toggleSound,
  } = useRenderJoy();

  const [copiedPkg, setCopiedPkg] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  const mode: ToolbarMode = pathname.startsWith("/sounds")
    ? "sounds"
    : pathname.startsWith("/motion")
      ? "motion"
      : pathname.startsWith("/themes")
        ? "themes"
        : pathname.startsWith("/components/") && pathname !== "/components"
          ? "component"
          : "default";

  const slugFromPath =
    mode === "component"
      ? pathname.replace("/components/", "").split("/")[0]
      : mode === "motion"
        ? "motion-reveal"
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
        {/* Group A: Navigation & Command Palette */}
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

        {/* Group B: Contextual Actions */}
        {mode === "sounds" ? (
          <div className={pillClass}>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundEnabled}
              className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              )}
              <span>Sound: {soundEnabled ? "ON" : "OFF"}</span>
            </button>
            <div className="mx-0.5 h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />
            <button
              type="button"
              onClick={() => stopAllSounds()}
              className="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] cursor-pointer"
            >
              <Square className="h-3 w-3" aria-hidden="true" />
              <span>Stop All</span>
            </button>
          </div>
        ) : (
          <div className={pillClass}>
            <button
              type="button"
              onClick={copyPackage}
              aria-label={`Copy package identifier ${packageId}`}
              className="hidden sm:inline-flex h-7 items-center gap-2 rounded-full px-2.5 text-xs text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer"
            >
              <Package className="h-3.5 w-3.5 text-rose-500 shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] truncate max-w-[170px]">{packageId}</span>
              {copiedPkg ? (
                <Check className="h-3 w-3 text-emerald-500 shrink-0" aria-hidden="true" />
              ) : (
                <Copy className="h-3 w-3 text-[var(--ws-text-secondary)] shrink-0" aria-hidden="true" />
              )}
            </button>

            <div className="mx-0.5 hidden sm:block h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setPromptOpen((v) => !v)}
              aria-expanded={promptOpen}
              aria-label="Copy prompt options"
              className="inline-flex h-7 items-center gap-1.5 rounded-full px-2 sm:px-2.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              <span className="hidden xs:inline sm:inline">Copy prompt</span>
              <ChevronDown className="h-3 w-3 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Group C: Preview & Appearance */}
        <div className={pillClass}>
          {mode !== "sounds" && (
            <>
              <div className="hidden md:flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setViewportMode("desktop")}
                  aria-label="Desktop preview"
                  aria-pressed={viewportMode === "desktop"}
                  title="Desktop"
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
                  title="Tablet"
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
                  title="Mobile"
                  className={cn(
                    iconBtnClass,
                    viewportMode === "mobile" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  )}
                >
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <div className="mx-0.5 h-4 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />
              </div>

              <button
                type="button"
                onClick={refreshPreview}
                aria-label="Refresh preview"
                title="Refresh preview"
                className={iconBtnClass}
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setFullscreenPreview(!fullscreenPreview)}
                aria-label={fullscreenPreview ? "Exit fullscreen" : "Enter fullscreen"}
                aria-pressed={fullscreenPreview}
                title={fullscreenPreview ? "Exit fullscreen" : "Fullscreen"}
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
            </>
          )}
          <button
            type="button"
            onClick={() => setAppearance(resolvedAppearance === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${resolvedAppearance === "dark" ? "light" : "dark"} mode`}
            title={resolvedAppearance === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={iconBtnClass}
          >
            {resolvedAppearance === "dark" ? (
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        <PromptMenu
          open={promptOpen}
          onClose={() => setPromptOpen(false)}
          slug={slugFromPath}
        />
      </div>
    </div>
  );
}
