"use client";

import React, { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface Particle {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function ParticleWordmark({
  text = BRAND.name,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const buildParticles = () => {
      const width = Math.min(container.clientWidth || 640, 720);
      const height = 110;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Offscreen text sampling
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) return;

      const fontSize = width < 440 ? 44 : 68;
      octx.fillStyle = "#ffffff";
      octx.font = `800 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText(text, width / 2, height / 2);

      const data = octx.getImageData(0, 0, width, height).data;
      const gap = width < 440 ? 4 : 5;
      const next: Particle[] = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 128) {
            next.push({
              ox: x,
              oy: y,
              x: x + (Math.random() - 0.5) * 18,
              y: y + (Math.random() - 0.5) * 18,
              vx: 0,
              vy: 0,
              size: width < 440 ? 1.6 : 1.9,
            });
          }
        }
      }
      particles = next;
    };

    buildParticles();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const render = () => {
      if (isVisible) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);

        const accent =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--mm-fg")
            .trim() || "#fafafa";
        ctx.fillStyle = accent;

        for (const p of particles) {
          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 64 && dist > 0.01) {
              const force = (64 - dist) / 64;
              p.vx += (dx / dist) * force * 3.2;
              p.vy += (dy / dist) * force * 3.2;
            }
          }

          // Spring back to origin
          p.vx += (p.ox - p.x) * 0.09;
          p.vy += (p.oy - p.y) * 0.09;
          p.vx *= 0.82;
          p.vy *= 0.82;
          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handleLeave = () => {
      pointer.active = false;
    };

    const handleShockwave = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0.01) {
          const impulse = ((140 - dist) / 140) * 14;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }
      }
    };

    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);
    canvas.addEventListener("click", handleShockwave);
    window.addEventListener("resize", buildParticles);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      canvas.removeEventListener("click", handleShockwave);
      window.removeEventListener("resize", buildParticles);
    };
  }, [text]);

  if (reducedMotion) {
    return (
      <div
        className={cn("text-center text-4xl sm:text-6xl font-extrabold tracking-tight", className)}
      >
        {text}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative flex w-full justify-center", className)}
    >
      <canvas
        ref={canvasRef}
        aria-label={`${text} interactive particle wordmark`}
        role="img"
        className="max-w-full cursor-crosshair touch-pan-y"
      />
      <span className="sr-only">{text}</span>
    </div>
  );
}
