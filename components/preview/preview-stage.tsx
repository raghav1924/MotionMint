"use client";

import React from "react";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import { MobileDeviceFrame, TabletPreviewFrame } from "@/components/preview/device-frames";
import type { PreviewViewport } from "@/components/site/providers";
import type { ComponentThemeMode, ThemeId } from "@/lib/themes/types";
import { cn } from "@/lib/utils";

export interface PreviewStageProps {
  slug: string;
  viewport: PreviewViewport;
  theme: ThemeId;
  themeMode: ComponentThemeMode;
  fullBleed?: boolean;
  compactDesktop?: boolean;
  children: React.ReactNode;
}

const DOT_GRID_CLASS =
  "bg-[radial-gradient(var(--ws-border)_1.1px,transparent_1.1px)] [background-size:20px_20px]";

/**
 * Shared PreviewStage contract used by Component Studio and Theme Studio (A1.2).
 * Keeps dot-grid canvas, device frames, scoped <RenderJoyTheme>, and glossy bottom fade unified.
 */
export function PreviewStage({
  slug,
  viewport,
  theme,
  themeMode,
  fullBleed = false,
  compactDesktop = false,
  children,
}: PreviewStageProps) {
  if (viewport === "mobile") {
    return (
      <div
        className={cn(
          "relative w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)]",
          DOT_GRID_CLASS
        )}
      >
        <MobileDeviceFrame slug={slug} fullBleed={fullBleed}>
          {fullBleed ? (
            children
          ) : (
            <RenderJoyTheme theme={theme} mode={themeMode} padded className="w-full flex justify-center">
              {children}
            </RenderJoyTheme>
          )}
        </MobileDeviceFrame>
      </div>
    );
  }

  if (viewport === "tablet") {
    return (
      <div
        className={cn(
          "relative w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)]",
          DOT_GRID_CLASS
        )}
      >
        <TabletPreviewFrame slug={slug} fullBleed={fullBleed}>
          {fullBleed ? (
            children
          ) : (
            <RenderJoyTheme
              theme={theme}
              mode={themeMode}
              padded
              className="w-full max-w-lg flex justify-center"
            >
              {children}
            </RenderJoyTheme>
          )}
        </TabletPreviewFrame>
      </div>
    );
  }

  if (fullBleed) {
    return (
      <div className="relative w-full border-b border-[var(--ws-border-subtle)]">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-[var(--ws-bg)]/85 via-[var(--ws-bg)]/35 to-transparent backdrop-blur-[2px]"
        />
      </div>
    );
  }

  return (
    <div
      data-testid="desktop-canvas-stage"
      className={cn(
        "relative flex w-full items-center justify-center border-b border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] overflow-x-auto",
        DOT_GRID_CLASS,
        compactDesktop
          ? "min-h-[340px] rounded-[20px] border p-6 sm:p-10"
          : "min-h-[72vh] sm:min-h-[660px] p-6 sm:p-12"
      )}
    >
      <RenderJoyTheme
        theme={theme}
        mode={themeMode}
        padded
        className="relative z-10 w-full max-w-3xl flex justify-center"
      >
        {children}
      </RenderJoyTheme>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--ws-bg)]/90 via-[var(--ws-bg)]/45 to-transparent backdrop-blur-[2px]"
      />
    </div>
  );
}
