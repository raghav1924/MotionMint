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

interface RibbonLayer {
  yRatio: number;
  amp: number;
  freq: number;
  speed: number;
  thickness: number;
  phase: number;
  depth: number;
  tint: "silver" | "pearl" | "iridescent";
}

const RIBBON_LAYERS: RibbonLayer[] = [
  { yRatio: 0.56, amp: 105, freq: 1.4, speed: 0.65, thickness: 150, phase: 0.0, depth: 0.5, tint: "silver" },
  { yRatio: 0.44, amp: 130, freq: 1.65, speed: 0.85, thickness: 185, phase: 1.35, depth: 0.8, tint: "pearl" },
  { yRatio: 0.52, amp: 92, freq: 1.9, speed: 1.05, thickness: 120, phase: 2.7, depth: 1.0, tint: "iridescent" },
];

/**
 * Original MotionMint Sculptural Silk Ribbon Layer.
 * Renders continuous, seamless 3D-shaded metallic pearl / silver silk ribbons
 * using smooth filled top/bottom envelopes and layered specular highlights,
 * plus a rich SVG gradient sculpture for SSR and reduced-motion.
 */
export function SculpturalSilk({
  scrollProgress = 0,
  pointerX = 0,
  pointerY = 0,
}: SculpturalSilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const { resolvedAppearance } = useMotionMint();
  const stateRef = useRef({
    scrollProgress,
    pointerX,
    pointerY,
    isDark: resolvedAppearance === "dark",
  });

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
            { threshold: 0.02 }
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

      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      const { scrollProgress: sp, pointerX: px, pointerY: py, isDark } = stateRef.current;
      const steps = w < 768 ? 56 : 96;
      const layers = w < 768 ? RIBBON_LAYERS.slice(0, 2) : RIBBON_LAYERS;

      // Ambient studio spotlight
      const glow = ctx.createRadialGradient(
        w * (0.5 + px * 0.16),
        h * (0.48 + py * 0.12),
        20,
        w * 0.5,
        h * 0.5,
        w * 0.62
      );
      if (isDark) {
        glow.addColorStop(0, "rgba(165, 180, 252, 0.16)");
        glow.addColorStop(0.55, "rgba(99, 102, 241, 0.07)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        glow.addColorStop(0, "rgba(199, 210, 254, 0.36)");
        glow.addColorStop(0.55, "rgba(226, 232, 240, 0.24)");
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      for (const layer of layers) {
        const phase = t * layer.speed + layer.phase;
        const spread = 1 + sp * 0.42;
        const yShift = py * 44 * layer.depth - sp * 34 * layer.depth;
        const twistShift = px * 1.15 + sp * 1.25;
        const scaleFactor = w < 768 ? 0.62 : 1;

        const topPts: { x: number; y: number }[] = [];
        const botPts: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const x = -60 + u * (w + 120);
          const env = Math.sin(u * Math.PI);

          const centerY =
            h * layer.yRatio +
            yShift -
            (u - 0.5) * h * 0.2 +
            Math.sin(u * Math.PI * layer.freq + phase + px * 0.6 * layer.depth) *
              layer.amp *
              scaleFactor *
              spread *
              (0.35 + 0.65 * env) +
            Math.cos(u * Math.PI * 2.1 - phase * 0.6) * 26 * scaleFactor * env;

          const fold =
            0.32 +
            0.68 *
              Math.abs(
                Math.sin(u * Math.PI * 2.3 + phase * 0.7 + twistShift)
              );
          const halfThickness =
            layer.thickness * scaleFactor * fold * (0.45 + 0.55 * env) * 0.5;

          topPts.push({ x, y: centerY - halfThickness });
          botPts.push({ x, y: centerY + halfThickness });
        }

        // Seamless filled silk ribbon path
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y);
        for (let i = 1; i <= steps; i++) {
          const prev = topPts[i - 1];
          const curr = topPts[i];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) * 0.5, (prev.y + curr.y) * 0.5);
        }
        ctx.lineTo(topPts[steps].x, topPts[steps].y);
        for (let i = steps; i >= 1; i--) {
          const prev = botPts[i];
          const curr = botPts[i - 1];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) * 0.5, (prev.y + curr.y) * 0.5);
        }
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(
          0,
          h * (layer.yRatio - 0.28),
          w,
          h * (layer.yRatio + 0.28)
        );
        if (isDark) {
          if (layer.tint === "pearl") {
            ribbonGrad.addColorStop(0, "rgba(30, 41, 59, 0.35)");
            ribbonGrad.addColorStop(0.35, "rgba(226, 232, 240, 0.68)");
            ribbonGrad.addColorStop(0.55, "rgba(255, 255, 255, 0.85)");
            ribbonGrad.addColorStop(0.78, "rgba(148, 163, 184, 0.52)");
            ribbonGrad.addColorStop(1, "rgba(15, 23, 42, 0.3)");
          } else if (layer.tint === "iridescent") {
            ribbonGrad.addColorStop(0, "rgba(49, 46, 129, 0.28)");
            ribbonGrad.addColorStop(0.45, "rgba(199, 210, 254, 0.64)");
            ribbonGrad.addColorStop(0.7, "rgba(129, 140, 248, 0.42)");
            ribbonGrad.addColorStop(1, "rgba(30, 27, 75, 0.25)");
          } else {
            ribbonGrad.addColorStop(0, "rgba(15, 23, 42, 0.4)");
            ribbonGrad.addColorStop(0.45, "rgba(148, 163, 184, 0.55)");
            ribbonGrad.addColorStop(0.75, "rgba(71, 85, 105, 0.45)");
            ribbonGrad.addColorStop(1, "rgba(15, 23, 42, 0.3)");
          }
        } else {
          if (layer.tint === "pearl") {
            ribbonGrad.addColorStop(0, "rgba(203, 213, 225, 0.48)");
            ribbonGrad.addColorStop(0.32, "rgba(255, 255, 255, 0.96)");
            ribbonGrad.addColorStop(0.56, "rgba(226, 232, 240, 0.88)");
            ribbonGrad.addColorStop(0.8, "rgba(148, 163, 184, 0.62)");
            ribbonGrad.addColorStop(1, "rgba(226, 232, 240, 0.38)");
          } else if (layer.tint === "iridescent") {
            ribbonGrad.addColorStop(0, "rgba(199, 210, 254, 0.4)");
            ribbonGrad.addColorStop(0.45, "rgba(238, 242, 255, 0.92)");
            ribbonGrad.addColorStop(0.72, "rgba(165, 180, 252, 0.58)");
            ribbonGrad.addColorStop(1, "rgba(203, 213, 225, 0.35)");
          } else {
            ribbonGrad.addColorStop(0, "rgba(148, 163, 184, 0.42)");
            ribbonGrad.addColorStop(0.45, "rgba(241, 245, 249, 0.9)");
            ribbonGrad.addColorStop(0.75, "rgba(148, 163, 184, 0.56)");
            ribbonGrad.addColorStop(1, "rgba(203, 213, 225, 0.35)");
          }
        }

        ctx.save();
        ctx.shadowColor = isDark ? "rgba(0, 0, 0, 0.45)" : "rgba(100, 116, 139, 0.22)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = ribbonGrad;
        ctx.fill();
        ctx.restore();

        // Smooth specular crest highlight along top fold
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y + 1.5);
        for (let i = 1; i <= steps; i++) {
          const prev = topPts[i - 1];
          const curr = topPts[i];
          ctx.quadraticCurveTo(
            prev.x,
            prev.y + 1.5,
            (prev.x + curr.x) * 0.5,
            (prev.y + curr.y) * 0.5 + 1.5
          );
        }
        ctx.strokeStyle = isDark
          ? "rgba(255, 255, 255, 0.45)"
          : "rgba(255, 255, 255, 0.95)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Soft bottom shadow edge for 3D fold separation
        ctx.beginPath();
        ctx.moveTo(botPts[0].x, botPts[0].y);
        for (let i = 1; i <= steps; i++) {
          const prev = botPts[i - 1];
          const curr = botPts[i];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) * 0.5, (prev.y + curr.y) * 0.5);
        }
        ctx.strokeStyle = isDark
          ? "rgba(15, 23, 42, 0.65)"
          : "rgba(100, 116, 139, 0.28)";
        ctx.lineWidth = 1.2;
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
      {/* Static / Reduced-Motion / SSR Sculptural Pearl-Silk SVG Sculpture */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className={prefersReduced ? "h-full w-full opacity-95" : "h-full w-full opacity-40"}
      >
        <defs>
          <linearGradient id="mm-silk-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="mm-silk-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M-80,520 C220,260 520,640 860,360 C1120,145 1300,320 1520,220 L1520,380 C1280,470 1080,290 830,500 C500,770 210,410 -80,650 Z"
          fill="url(#mm-silk-a)"
        />
        <path
          d="M-80,380 C280,180 560,540 910,270 C1160,80 1320,220 1520,130 L1520,250 C1310,335 1130,190 880,385 C540,650 260,310 -80,490 Z"
          fill="url(#mm-silk-b)"
        />
      </svg>

      {!prefersReduced && (
        <canvas
          ref={canvasRef}
          data-testid="sculptural-silk-canvas"
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
