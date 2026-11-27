"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function KineticCard3D({
  maxTiltDeg = 14,
  children,
  className,
}: {
  maxTiltDeg?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  const prefersReduced = useReducedMotion();

  return (
    <div style={{ perspective: "1000px" }} className="inline-block">
      <motion.div
        onMouseMove={(e) => {
          if (prefersReduced) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
          const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
          setTilt({
            rx: -ny * maxTiltDeg * 2,
            ry: nx * maxTiltDeg * 2,
            gx: (nx + 0.5) * 100,
            gy: (ny + 0.5) * 100,
            active: true,
          });
        }}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })}
        animate={prefersReduced ? undefined : { rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "relative w-72 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-6 text-white shadow-[0_24px_54px_-16px_rgba(0,0,0,0.65)]",
          className
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(200px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.22), transparent 65%)`,
          }}
        />
        {children ?? (
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                3D Tilt
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold tracking-tight">Kinetic Spatial Surface</h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Move your pointer across the card for perspective tilt and metallic glare.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
