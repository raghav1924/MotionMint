import React from "react";

export function SilkBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Layered organic silk-like CSS/SVG gradients with reduced-motion static fallback */}
      <div
        className="absolute -top-1/3 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full blur-3xl opacity-35 motion-safe:animate-pulse"
        style={{
          background:
            "radial-gradient(ellipse at 40% 45%, var(--mm-accent-soft), transparent 65%), radial-gradient(ellipse at 70% 55%, rgba(56,189,248,0.16), transparent 60%)",
          animationDuration: "9s",
        }}
      />
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        className="absolute inset-x-0 top-0 h-full w-full opacity-25"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-100 320 C 200 180, 480 460, 780 260 C 980 130, 1140 280, 1320 200"
          stroke="var(--mm-accent)"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        <path
          d="M-100 370 C 240 230, 520 510, 820 310 C 1020 180, 1160 330, 1320 250"
          stroke="var(--mm-accent-secondary, var(--mm-accent))"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
}
