"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Defers heavy preview mounting until near the viewport and tracks visibility
 * so offscreen continuous animations do not consume idle CPU.
 */
export function VisibilityPreview({
  children,
  fallback,
  className,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "220px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible
        ? children
        : fallback ?? (
            <div
              aria-hidden="true"
              className="h-16 w-28 animate-pulse rounded-xl bg-[var(--ws-surface)]"
            />
          )}
    </div>
  );
}
