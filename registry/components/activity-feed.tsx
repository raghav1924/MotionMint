"use client";

import React, { useState } from "react";

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  category: "Deploy" | "Security";
  time: string;
}

const DEFAULT_EVENTS: ActivityEvent[] = [
  { id: "a1", actor: "Maya Lin", action: "Published v2.4.0 to production", category: "Deploy", time: "2m ago" },
  { id: "a2", actor: "GuardBot", action: "Rotated edge signing key", category: "Security", time: "14m ago" },
  { id: "a3", actor: "Alex Rivera", action: "Rolled out registry CDN cache", category: "Deploy", time: "1h ago" },
];

export interface ActivityFeedProps {
  events?: ActivityEvent[];
  className?: string;
}

/**
 * Filterable team & deployment activity feed with unread state management.
 */
export function ActivityFeed({
  events = DEFAULT_EVENTS,
  className = "",
}: ActivityFeedProps) {
  const [filter, setFilter] = useState<"All" | "Deploy" | "Security">("All");
  const [unreadIds, setUnreadIds] = useState<string[]>(events.map((e) => e.id));

  const visible = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="group" aria-label="Filter activity" className="flex gap-1">
          {(["All", "Deploy", "Security"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`rounded-full px-2.5 py-1 font-mono text-[11px] cursor-pointer ${
                filter === cat
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUnreadIds([])}
          className="font-mono text-[11px] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)] cursor-pointer"
        >
          Mark all read ({unreadIds.length})
        </button>
      </div>

      <ul className="space-y-2">
        {visible.map((item) => {
          const isUnread = unreadIds.includes(item.id);
          return (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2.5 text-left"
            >
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    isUnread ? "bg-[var(--mm-accent)]" : "bg-[var(--mm-border)]"
                  }`}
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--mm-fg)]">{item.actor}</p>
                  <p className="text-xs text-[var(--mm-fg-muted)]">{item.action}</p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[var(--mm-fg-muted)] shrink-0">
                {item.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
