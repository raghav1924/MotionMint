import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonShimmerProps {
  variant?: "text" | "avatar" | "card" | "rect";
  width?: string | number;
  height?: string | number;
  count?: number;
  animate?: boolean;
  label?: string;
  className?: string;
}

function ShimmerBlock({
  animate,
  className,
  style,
}: {
  animate: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "relative overflow-hidden bg-[var(--mm-surface-elevated,#18181c)]",
        "border border-[var(--mm-border,rgba(255,255,255,0.08))]",
        className
      )}
    >
      {animate && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full motion-reduce:hidden"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--mm-accent-soft, rgba(16,185,129,0.12)) 50%, transparent 100%)",
            animation: "mm-shimmer 1.6s infinite ease-in-out",
          }}
        />
      )}
    </div>
  );
}

export function SkeletonShimmer({
  variant = "text",
  width,
  height,
  count = 1,
  animate = true,
  label = "Loading content",
  className,
}: SkeletonShimmerProps) {
  const safeCount = Math.max(1, Math.min(count, 12));

  if (variant === "avatar") {
    const dim = width ?? height ?? 44;
    return (
      <div role="status" aria-label={label} className={cn("inline-flex items-center gap-2", className)}>
        {Array.from({ length: safeCount }).map((_, i) => (
          <ShimmerBlock
            key={i}
            animate={animate}
            className="rounded-full shrink-0"
            style={{ width: dim, height: dim }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div role="status" aria-label={label} className={cn("grid gap-3", className)}>
        {Array.from({ length: safeCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-[var(--mm-radius,14px)] border border-[var(--mm-border,rgba(255,255,255,0.09))] bg-[var(--mm-surface,#111114)] p-4 space-y-3"
            style={{ width: width ?? "100%" }}
          >
            <div className="flex items-center gap-3">
              <ShimmerBlock animate={animate} className="h-9 w-9 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <ShimmerBlock animate={animate} className="h-3.5 w-2/3 rounded-[var(--mm-radius-sm,8px)]" />
                <ShimmerBlock animate={animate} className="h-2.5 w-1/3 rounded-[var(--mm-radius-sm,8px)]" />
              </div>
            </div>
            <ShimmerBlock
              animate={animate}
              className="w-full rounded-[var(--mm-radius-sm,8px)]"
              style={{ height: height ?? 64 }}
            />
          </div>
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  if (variant === "rect") {
    return (
      <div role="status" aria-label={label} className={cn("space-y-2.5", className)}>
        {Array.from({ length: safeCount }).map((_, i) => (
          <ShimmerBlock
            key={i}
            animate={animate}
            className="rounded-[var(--mm-radius-sm,8px)]"
            style={{ width: width ?? "100%", height: height ?? 80 }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // Default: "text"
  return (
    <div role="status" aria-label={label} className={cn("w-full space-y-2", className)}>
      {Array.from({ length: safeCount }).map((_, i) => {
        const isLastLine = safeCount > 1 && i === safeCount - 1;
        return (
          <ShimmerBlock
            key={i}
            animate={animate}
            className="rounded-[var(--mm-radius-sm,8px)]"
            style={{
              width: width ?? (isLastLine ? "70%" : "100%"),
              height: height ?? 14,
            }}
          />
        );
      })}
      <span className="sr-only">{label}</span>
    </div>
  );
}
