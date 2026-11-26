import React from "react";
import { cn } from "@/lib/utils";

/**
 * Bespoke "RJ" geometric monogram mark:
 * crisp architectural R paired with an interlocking J curve.
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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* R stem + bowl + leg */}
      <path
        d="M5 26V6H12.5C15.5376 6 18 8.46243 18 11.5C18 14.5376 15.5376 17 12.5 17H5"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 17L17.5 26"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      {/* Interlocking J */}
      <path
        d="M26 6V19.5C26 23.0899 23.0899 26 19.5 26C18.2 26 17.0 25.6 16.0 24.9"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
        opacity="0.72"
      />
      <circle cx="26" cy="6" r="1.6" fill="currentColor" />
    </svg>
  );
}

/**
 * Editorial wordmark highlighting R and J together.
 */
export function MotionMintWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-semibold tracking-[-0.035em] leading-none select-none",
        className
      )}
    >
      <span>R</span>
      <span className="mx-[0.04em] font-normal opacity-55">&amp;</span>
      <span>J</span>
      <span className="ml-[0.28em] font-normal opacity-65">Studio</span>
    </span>
  );
}

/**
 * Horizontal brand lockup: RJ Monogram + R&J Studio Wordmark.
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
