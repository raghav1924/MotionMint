import React from "react";
import { cn } from "@/lib/utils";

export interface BounceDotsLoaderProps {
  size?: "sm" | "md" | "lg";
  rhythm?: "wave" | "elastic" | "pulse";
  label?: string;
  className?: string;
}

export function BounceDotsLoader({
  size = "md",
  rhythm = "wave",
  label = "Loading",
  className,
}: BounceDotsLoaderProps) {
  const dotSize = {
    sm: "h-1.5 w-1.5",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  }[size];

  const duration = rhythm === "elastic" ? "0.9s" : rhythm === "pulse" ? "1.35s" : "1.1s";
  const delayStep = rhythm === "pulse" ? 0.22 : 0.14;

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "rounded-[var(--mm-radius-sm,9999px)] bg-[var(--mm-accent,#10b981)]",
            dotSize
          )}
          style={{
            animation: `mm-bounce-dot ${duration} infinite ${
              rhythm === "elastic" ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-in-out"
            }`,
            animationDelay: `${i * delayStep}s`,
          }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
