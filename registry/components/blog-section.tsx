"use client";

import React, { useState } from "react";

const POSTS = [
  { id: "p1", title: "Spring Curves for Micro-Interactions", tag: "Motion" as const, readTime: "4 min" },
  { id: "p2", title: "Isolating 58 Theme Tokens in React", tag: "Systems" as const, readTime: "6 min" },
];

export interface BlogSectionProps {
  className?: string;
}

/**
 * Editorial article list with category tag filter and read-time badges.
 */
export function BlogSection({ className = "" }: BlogSectionProps) {
  const [tag, setTag] = useState<"All" | "Motion" | "Systems">("All");
  const visible = tag === "All" ? POSTS : POSTS.filter((p) => p.tag === tag);

  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 space-y-3 text-left ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[var(--mm-fg)]">Journal</span>
        <div role="group" aria-label="Filter articles" className="flex gap-1">
          {(["All", "Motion", "Systems"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] cursor-pointer ${
                tag === t
                  ? "bg-[var(--mm-accent)] text-[var(--mm-accent-fg)] font-semibold"
                  : "border border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {visible.map((post) => (
          <article
            key={post.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] px-3 py-2.5"
          >
            <div>
              <p className="text-xs font-semibold text-[var(--mm-fg)]">{post.title}</p>
              <p className="font-mono text-[10px] text-[var(--mm-accent)]">{post.tag}</p>
            </div>
            <span className="font-mono text-[10px] text-[var(--mm-fg-muted)] shrink-0">
              {post.readTime}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
