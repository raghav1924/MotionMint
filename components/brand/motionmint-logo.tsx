import React from "react";
import { cn } from "@/lib/utils";

/**
 * RenderJoy ("Tangential Wing") symbol — designed in Figma:
 * sculptural single-silhouette mark subtly encoding R and J via
 * tangential canopy & nested pendulum separated by an intentional negative-space arch.
 */
export function MotionMintMark({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path
        d="M18 18C18 14.6863 20.6863 12 24 12H50C69.8822 12 86 28.1178 86 48C86 61.1 79.05 72.58 68.62 78.92C64.28 81.56 58.8 78.42 58.8 73.34V52C58.8 42.6112 51.1888 35 41.8 35C34.5 35 28.8 40.4 28.8 47.6V73.5C28.8 77.0899 25.8899 80 22.3 80C19.9252 80 18 78.0748 18 75.7V18Z"
        fill="currentColor"
      />
      <path
        d="M37.5 52C37.5 47.0294 41.5294 43 46.5 43C51.4706 43 55.5 47.0294 55.5 52V71C55.5 80.3888 47.8888 88 38.5 88C33.1 88 28.3 85.48 25.18 81.55C31.3 80.6 37.5 76.2 37.5 69.5V52Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Understated geometric sans-serif wordmark for RenderJoy.
 */
export function MotionMintWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-medium tracking-[-0.035em] leading-none select-none",
        className
      )}
    >
      RenderJoy
    </span>
  );
}

/**
 * Horizontal brand lockup: Tangential Wing symbol + RenderJoy wordmark.
 */
export function MotionMintLogo({
  markSize = 22,
  className,
  wordmarkClassName,
}: {
  markSize?: number;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MotionMintMark size={markSize} />
      <MotionMintWordmark className={cn("text-[15px]", wordmarkClassName)} />
    </span>
  );
}
