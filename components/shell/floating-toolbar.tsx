"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelLeft,
  Search,
  Copy,
  Check,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Square,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Contrast,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { ALL_THEMES } from "@/lib/themes/registry";
import { RenderJoyMark } from "@/components/brand/renderjoy-logo";
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
    skin,
    setTheme,
    themeMode,
    setThemeMode,
    viewportMode,
    setViewportMode,
    triggerReplay,
    triggerReset,
    fullscreenPreview,
    setFullscreenPreview,
    activeComponentSlug,
    soundEnabled,
    toggleSound,
    inspectorOpen,
    setInspectorOpen,
    showPreviewText,
    setShowPreviewText,
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

  const isBackgroundPreview = slugFromPath === "shader-background";

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

  // ~30% tighter visual scale with frosted glass while preserving accessible hit targets
  const pillClass =
    "flex items-center gap-0.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]/80 p-0.5 shadow-[var(--ws-shadow-floating)] backdrop-blur-xl";

  const iconBtnClass =
    "relative inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-text-primary)] after:absolute after:-inset-1.5 after:content-['']";

  return (
    <div
      role="toolbar"
      aria-label="Floating workspace controls"
      className="fixed bottom-2.5 sm:bottom-3.5 inset-x-0 z-50 flex justify-center px-2 pointer-events-none"
    >
      <div className="relative pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-1 py-0.5">
        {/* Group A: Home (logomark only), Sidebar, Search */}
        <div className={pillClass}>
          <Link
            href="/"
            aria-label="Home"
            title="Home"
            className={cn(iconBtnClass, "text-[var(--ws-text-primary)]")}
          >
            <RenderJoyMark size={14} />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
            title="Navigation"
            className={iconBtnClass}
          >
            <PanelLeft className="h-3 w-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command palette (Cmd+K)"
            title="Search components (⌘K)"
            className="relative inline-flex h-6 items-center gap-1.5 rounded-full px-2 text-[11px] text-[var(--ws-text-secondary)] hover:bg-[var(--ws-surface-hover)] hover:text-[var(--ws-text-primary)] transition-colors cursor-pointer after:absolute after:-inset-1 after:content-['']"
          >
            <Search className="h-3 w-3" aria-hidden="true" />
            <kbd className="hidden sm:inline font-mono text-[9px] opacity-75">⌘K</kbd>
          </button>
        </div>

        {/* Group B: Package / Prompt / Sound Lab */}
        {mode === "sounds" ? (
          <div className={pillClass}>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundEnabled}
              aria-label={`Sound: ${soundEnabled ? "ON" : "OFF"}`}
              title="Toggle Sound Feedback"
              className="inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="h-3 w-3 text-emerald-500" aria-hidden="true" />
              ) : (
                <VolumeX className="h-3 w-3 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              )}
              <span>{soundEnabled ? "On" : "Off"}</span>
            </button>
            <button
              type="button"
              onClick={() => stopAllSounds()}
              aria-label="Stop All"
              title="Stop All Sounds"
              className={iconBtnClass}
            >
              <Square className="h-2.5 w-2.5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className={pillClass}>
            <button
              type="button"
              onClick={copyPackage}
              aria-label={`Copy package identifier ${packageId}`}
              title={`Copy ${packageId}`}
              className="hidden sm:inline-flex h-6 items-center gap-1.5 rounded-full px-2 text-[11px] text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer"
            >
              <span className="font-mono text-[10px] truncate max-w-[140px]">{packageId}</span>
              {copiedPkg ? (
                <Check className="h-2.5 w-2.5 text-emerald-500 shrink-0" aria-hidden="true" />
              ) : (
                <Copy className="h-2.5 w-2.5 text-[var(--ws-text-secondary)] shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setPromptOpen((v) => !v)}
              aria-expanded={promptOpen}
              aria-label="Copy prompt options"
              title="Copy AI integration prompt"
              className="inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] transition-colors cursor-pointer"
            >
              <Copy className="h-3 w-3 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              <span className="hidden md:inline">Prompt</span>
              <ChevronDown className="h-2.5 w-2.5 text-[var(--ws-text-secondary)]" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Group C: Preview Controls (Viewport, Replay, Reset, Inspect, Hide/Show Text, Independent Themes) */}
        <div className={pillClass}>
          {mode !== "sounds" && (
            <>
              <div className="hidden md:flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setViewportMode("desktop")}
                  aria-label="Desktop preview"
                  aria-pressed={viewportMode === "desktop"}
                  title="Desktop viewport"
                  className={cn(
                    iconBtnClass,
                    viewportMode === "desktop" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  )}
                >
                  <Monitor className="h-3 w-3" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode("tablet")}
                  aria-label="Tablet preview"
                  aria-pressed={viewportMode === "tablet"}
                  title="Tablet viewport"
                  className={cn(
                    iconBtnClass,
                    viewportMode === "tablet" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  )}
                >
                  <Tablet className="h-3 w-3" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewportMode("mobile")}
                  aria-label="Mobile preview"
                  aria-pressed={viewportMode === "mobile"}
                  title="Mobile viewport"
                  className={cn(
                    iconBtnClass,
                    viewportMode === "mobile" && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                  )}
                >
                  <Smartphone className="h-3 w-3" aria-hidden="true" />
                </button>
                <div className="mx-0.5 h-3.5 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />
              </div>

              {mode === "component" && (
                <>
                  <button
                    type="button"
                    onClick={() => setInspectorOpen((v) => !v)}
                    aria-label={inspectorOpen ? "Hide Inspector" : "Show Inspector"}
                    aria-pressed={inspectorOpen}
                    title={inspectorOpen ? "Hide Inspector" : "Inspect props"}
                    className={cn(
                      iconBtnClass,
                      inspectorOpen && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                    )}
                  >
                    <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
                  </button>

                  {isBackgroundPreview && (
                    <button
                      type="button"
                      onClick={() => setShowPreviewText((v) => !v)}
                      aria-label={showPreviewText ? "Hide sample text" : "Show sample text"}
                      aria-pressed={!showPreviewText}
                      title={showPreviewText ? "Hide sample text" : "Show sample text"}
                      className={cn(
                        iconBtnClass,
                        !showPreviewText && "bg-[var(--ws-surface-active)] text-[var(--ws-text-primary)]"
                      )}
                    >
                      {showPreviewText ? (
                        <Eye className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <EyeOff className="h-3 w-3" aria-hidden="true" />
                      )}
                    </button>
                  )}

                  <select
                    aria-label="Component preview theme"
                    title="Component preview theme (scoped)"
                    value={skin}
                    onChange={(e) => setTheme(e.target.value)}
                    className="hidden lg:inline-block h-6 rounded-full border border-[var(--ws-border-subtle)] bg-transparent px-2 text-[10px] text-[var(--ws-text-primary)] cursor-pointer outline-none"
                  >
                    {ALL_THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
                    aria-label={`Component preview mode: ${themeMode}`}
                    title={`Component preview mode: ${themeMode === "dark" ? "Dark" : "Light"} (click to toggle)`}
                    className="inline-flex h-6 items-center gap-1 rounded-full px-1.5 text-[10px] font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
                  >
                    <Contrast className="h-3 w-3" aria-hidden="true" />
                    <span className="hidden sm:inline capitalize">{themeMode}</span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={triggerReplay}
                aria-label="Replay animation"
                title="Replay animation"
                className={iconBtnClass}
              >
                <Play className="h-3 w-3" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={triggerReset}
                aria-label="Reset component state"
                title="Reset editable state"
                className={iconBtnClass}
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
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
                  <Minimize2 className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Maximize2 className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
            </>
          )}

          <div className="mx-0.5 h-3.5 w-px bg-[var(--ws-border-subtle)]" aria-hidden="true" />

          <button
            type="button"
            onClick={() => setAppearance(resolvedAppearance === "dark" ? "light" : "dark")}
            aria-label={`Website appearance: ${resolvedAppearance}`}
            title={`Website appearance: ${resolvedAppearance === "dark" ? "Dark" : "Light"} (global)`}
            className={iconBtnClass}
          >
            {resolvedAppearance === "dark" ? (
              <Sun className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Moon className="h-3 w-3" aria-hidden="true" />
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
