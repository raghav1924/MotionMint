import React from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * MotionMint Kinetic M Logomark.
 * Two continuous folded ribbon paths forming an unmistakable geometric M
 * with a precision diagonal cut — legible from 16px favicon to 160px footer scale.
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
      {/* Left ascending folded ribbon */}
      <path
        d="M4.5 25.5V9.2C4.5 7.7 6.3 6.9 7.4 7.9L16 15.8L16 21.4L9 14.9V25.5H4.5Z"
        fill="currentColor"
      />
      {/* Right descending folded ribbon */}
      <path
        d="M27.5 25.5V9.2C27.5 7.7 25.7 6.9 24.6 7.9L16 15.8L16 21.4L23 14.9V25.5H27.5Z"
        fill="currentColor"
        fillOpacity="0.62"
      />
      {/* Precision kinetic apex */}
      <path d="M13.2 13.2L16 10.6L18.8 13.2L16 15.8L13.2 13.2Z" fill="currentColor" />
    </svg>
  );
}

export function MotionMintWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline tracking-[-0.035em] select-none",
        className
      )}
    >
      <span className="font-semibold">{BRAND.name.slice(0, 6)}</span>
      <span className="font-normal opacity-70">{BRAND.name.slice(6)}</span>
    </span>
  );
}

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
    <span className={cn("inline-flex items-center gap-2", className)}>
      <MotionMintMark size={markSize} />
      <MotionMintWordmark className={cn("text-[15px]", wordmarkClassName)} />
    </span>
  );
}
