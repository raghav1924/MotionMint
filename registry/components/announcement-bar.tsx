"use client";

import React, { useState } from "react";

export interface AnnouncementBarBlockProps {
  badge?: string;
  message?: string;
  className?: string;
}

/**
 * Dismissible release announcement bar with restore toggle for previewing.
 */
export function AnnouncementBarBlock({
  badge = "NEW",
  message = "Wave 7 Blocks & 58 Theme Variants now live",
  className = "",
}: AnnouncementBarBlockProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`.trim()}>
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] px-3 py-1 font-mono text-[11px] text-[var(--mm-fg)] cursor-pointer"
        >
          Restore Announcement
        </button>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Release announcement"
      className={`flex w-full max-w-lg items-center justify-between gap-3 rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface)] px-4 py-2 text-xs ${className}`.trim()}
    >
      <div className="flex items-center gap-2 truncate">
        <span className="rounded-full bg-[var(--mm-accent)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--mm-accent-fg)]">
          {badge}
        </span>
        <span className="truncate font-medium text-[var(--mm-fg)]">{message}</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="shrink-0 font-mono text-[11px] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}
