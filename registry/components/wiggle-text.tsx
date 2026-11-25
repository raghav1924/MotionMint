"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface WiggleTextProps {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
  splitBy?: "char" | "word";
  intensity?: "subtle" | "medium" | "playful";
  duration?: number;
  trigger?: "hover" | "click" | "always";
  variant?: "default" | "accent" | "underline";
  className?: string;
}

const INTENSITY_VARS = {
  subtle: { "--mm-wiggle-rot": "3deg", "--mm-wiggle-y": "-2px" },
  medium: { "--mm-wiggle-rot": "7deg", "--mm-wiggle-y": "-4px" },
  playful: { "--mm-wiggle-rot": "12deg", "--mm-wiggle-y": "-6px" },
} as const;

export function WiggleText({
  text,
  as: Component = "span",
  splitBy = "char",
  intensity = "medium",
  duration = 420,
  trigger = "hover",
  variant = "default",
  className,
}: WiggleTextProps) {
  const [active, setActive] = useState(trigger === "always");
  const isAnimating = trigger === "always" || active;

  const segments =
    splitBy === "word"
      ? text.split(/(\s+)/)
      : Array.from(text);

  const variantClasses = {
    default: "text-[var(--mm-fg,#fafafa)]",
    accent: "text-[var(--mm-accent,#10b981)]",
    underline:
      "text-[var(--mm-fg,#fafafa)] underline decoration-[var(--mm-accent,#10b981)] decoration-2 underline-offset-4",
  }[variant];

  const handleClick = () => {
    if (trigger === "click") {
      setActive(true);
    }
  };

  return (
    <Component
      aria-label={text}
      onMouseEnter={trigger === "hover" ? () => setActive(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setActive(false) : undefined}
      onClick={handleClick}
      onAnimationEnd={trigger === "click" ? () => setActive(false) : undefined}
      style={INTENSITY_VARS[intensity] as React.CSSProperties}
      className={cn(
        "inline-flex flex-wrap items-baseline font-semibold",
        trigger === "click" && "cursor-pointer",
        variantClasses,
        className
      )}
    >
      {segments.map((segment, index) => {
        if (/^\s+$/.test(segment)) {
          return (
            <span key={index} aria-hidden="true">
              {segment === " " ? "\u00A0" : segment}
            </span>
          );
        }

        return (
          <span
            key={index}
            aria-hidden="true"
            className="inline-block origin-bottom"
            style={
              isAnimating
                ? {
                    animationName: "mm-wiggle",
                    animationDuration: `${duration}ms`,
                    animationTimingFunction: "ease-in-out",
                    animationDelay: `${index * (splitBy === "word" ? 55 : 22)}ms`,
                    animationIterationCount: trigger === "always" ? "infinite" : 1,
                  }
                : undefined
            }
          >
            {segment}
          </span>
        );
      })}
    </Component>
  );
}
