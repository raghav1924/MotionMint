"use client";

import React from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface FrameProps {
  slug: string;
  children: React.ReactNode;
  className?: string;
}

export function DesktopBrowserFrame({ slug, children, className }: FrameProps) {
  return (
    <div
      data-testid="desktop-browser-frame"
      className={cn(
        "w-full overflow-hidden rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-preview-bg)] shadow-[var(--ws-shadow-floating)]",
        className
      )}
    >
      {/* Browser Top Chrome */}
      <div className="relative flex h-11 items-center justify-between border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)]/75 px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/85" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/85" />
        </div>
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] px-3.5 py-0.5 font-mono text-[11px] text-[var(--ws-text-secondary)]">
          localhost:3000/components/{slug}
        </div>
        <span className="text-[10px] font-mono text-[var(--ws-text-muted)] hidden sm:inline">
          {BRAND.registryNamespace}/{slug}
        </span>
      </div>

      {/* Browser Stage */}
      <div className="flex min-h-[440px] w-full items-center justify-center p-6 sm:p-12 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export function TabletPreviewFrame({ slug, children, className }: FrameProps) {
  return (
    <div
      data-testid="tablet-preview-frame"
      className={cn(
        "mx-auto w-full max-w-[768px] overflow-hidden rounded-[26px] border-2 border-[var(--ws-border-strong)] bg-[var(--ws-preview-bg)] shadow-[var(--ws-shadow-menu)]",
        className
      )}
    >
      {/* Tablet Browser Header */}
      <div className="relative flex h-10 items-center justify-between border-b border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[var(--ws-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--ws-border-strong)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--ws-border-strong)]" />
        </div>
        <div className="rounded-md border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] px-3 py-0.5 font-mono text-[10px] text-[var(--ws-text-secondary)]">
          localhost:3000/components/{slug}
        </div>
        <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">768px</span>
      </div>

      {/* Tablet Aspect Viewport */}
      <div className="flex min-h-[500px] w-full items-center justify-center p-6 sm:p-10 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export function MobileDeviceFrame({ slug, children, className }: FrameProps) {
  return (
    <div
      data-testid="mobile-device-frame"
      aria-label={`Mobile preview of ${slug}`}
      className={cn("relative mx-auto w-full max-w-[390px] py-1", className)}
    >
      {/* Left side hardware buttons */}
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-24 h-7 w-[3px] rounded-l bg-[#27272a]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-36 h-11 w-[3px] rounded-l bg-[#27272a]"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-50 h-11 w-[3px] rounded-l bg-[#27272a]"
      />
      {/* Right side power button */}
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-36 h-14 w-[3px] rounded-r bg-[#27272a]"
      />

      <div className="w-full rounded-[48px] border-[10px] border-[#111113] bg-white text-[#08090a] shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden">
        {/* iOS Status Bar + Dynamic Island */}
        <div className="relative flex h-12 items-center justify-between px-7 pt-1 text-[11px] font-semibold">
          <span>9:41</span>
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-[#111113]"
          />
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#08090a]/75" />
            <span className="inline-flex h-2.5 w-4 items-center rounded-[3px] border border-[#08090a]/70 p-[1px]">
              <span className="block h-full w-full rounded-[1px] bg-[#08090a]" />
            </span>
          </div>
        </div>

        {/* Inner Scrollable Device Screen */}
        <div className="flex h-[540px] flex-col items-center justify-center px-4 py-6 overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2.5 pt-1" aria-hidden="true">
          <span className="h-1 w-28 rounded-full bg-[#08090a]/25" />
        </div>
      </div>
    </div>
  );
}
