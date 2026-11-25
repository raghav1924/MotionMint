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
  const [hasEntered, setHasEntered] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "220px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {hasEntered
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
