"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useMotionMint } from "@/components/site/providers";

interface SculpturalSilkProps {
  /** Normalized scroll progress 0..1 */
  scrollProgress?: number;
  /** Normalized pointer offset -0.5..0.5 */
  pointerX?: number;
  pointerY?: number;
}

/**
 * Original MotionMint Sculptural Silk Ribbon Layer.
 * Renders flowing, luminous metallic/silk ribbon strands on Canvas 2D
 * with IntersectionObserver & tab-visibility pausing, plus a static SVG
 * fallback for reduced-motion and SSR.
 */
export function SculpturalSilk({
  scrollProgress = 0,
  pointerX = 0,
  pointerY = 0,
}: SculpturalSilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const { resolvedAppearance } = useMotionMint();
  const stateRef = useRef({ scrollProgress, pointerX, pointerY, isDark: resolvedAppearance === "dark" });

  stateRef.current = {
    scrollProgress,
    pointerX,
    pointerY,
    isDark: resolvedAppearance === "dark",
  };

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    let t = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
          )
        : null;
    observer?.observe(canvas);

    const renderFrame = () => {
      rafId = requestAnimationFrame(renderFrame);
      if (!isVisible || document.hidden) return;

      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      const { scrollProgress: sp, pointerX: px, pointerY: py, isDark } = stateRef.current;
      const strandCount = w < 768 ? 5 : 9;
      const spread = 1 + sp * 0.65;
      const centerY = h * 0.5 + py * 36 - sp * 24;

      for (let s = 0; s < strandCount; s++) {
        const ratio = s / Math.max(1, strandCount - 1);
        const phase = t + s * 0.55;
        const amp = (28 + s * 7) * spread;
        const yOffset = (ratio - 0.5) * 95 * spread;

        const grad = ctx.createLinearGradient(0, centerY - amp, w, centerY + amp);
        if (isDark) {
          grad.addColorStop(0, "rgba(255,255,255,0.03)");
          grad.addColorStop(0.35, `rgba(199,210,254,${0.12 + ratio * 0.14})`);
          grad.addColorStop(0.55, `rgba(223,255,0,${0.08 + (1 - ratio) * 0.1})`);
          grad.addColorStop(1, "rgba(255,255,255,0.02)");
        } else {
          grad.addColorStop(0, "rgba(17,24,39,0.02)");
          grad.addColorStop(0.38, `rgba(79,70,229,${0.09 + ratio * 0.1})`);
          grad.addColorStop(0.6, `rgba(17,24,39,${0.08 + (1 - ratio) * 0.08})`);
          grad.addColorStop(1, "rgba(17,24,39,0.02)");
        }

        ctx.beginPath();
        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * w;
          const nx = i / steps;
          const wave =
            Math.sin(nx * 4.2 + phase + px * 2.2) * amp * Math.sin(nx * Math.PI) +
            Math.cos(nx * 2.5 - phase * 0.7) * 18;
          const y = centerY + yOffset + wave;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25 + (1 - Math.abs(ratio - 0.5) * 2) * 1.4;
        ctx.stroke();
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer?.disconnect();
    };
  }, [prefersReduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Static / Reduced-Motion Sculptural SVG Ribbon */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full opacity-[0.16]"
        fill="none"
      >
        <path
          d="M-60,340 C220,160 460,470 760,260 C960,120 1110,280 1260,210"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M-60,370 C240,210 470,490 770,290 C970,155 1120,310 1260,245"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <path
          d="M-60,310 C200,130 450,440 750,230 C950,95 1100,250 1260,180"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {!prefersReduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
