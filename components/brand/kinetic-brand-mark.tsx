"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RenderJoyMark } from "@/components/brand/renderjoy-logo";
import { useRenderJoy } from "@/components/site/providers";
import { playSoundEffect } from "@/lib/audio/sound-engine";
import { cn } from "@/lib/utils";

interface ImpactWave {
  id: number;
  x: number;
  y: number;
}

/**
 * Interactive wrapper around the single-source RenderJoyMark SVG.
 * Adds bounded cursor-responsive parallax, click pulse + lightweight
 * radial impact wave, and opt-in Web Audio feedback (off by default).
 * All motion effects disable cleanly under prefers-reduced-motion.
 */
export function KineticBrandMark({
  size = 24,
  className,
  enableWave = true,
  onClick,
}: {
  size?: number;
  className?: string;
  enableWave?: boolean;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}) {
  const { soundEnabled } = useRenderJoy();
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, tilt: 0 });
  const [pulsing, setPulsing] = useState(false);
  const [waves, setWaves] = useState<ImpactWave[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({
        x: Math.max(-2.5, Math.min(2.5, nx * 2.5)),
        y: Math.max(-2.5, Math.min(2.5, ny * 2.5)),
        tilt: Math.max(-4, Math.min(4, nx * 4)),
      });
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0, tilt: 0 });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (soundEnabled) {
        playSoundEffect("click", { volume: 0.45, preset: "minimal" });
      }
      if (!reducedMotion) {
        setPulsing(true);
        window.setTimeout(() => setPulsing(false), 260);
        if (enableWave) {
          const rect = ref.current?.getBoundingClientRect();
          const x = e.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
          const y = e.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);
          const id = Date.now() + Math.random();
          setWaves((prev) => [...prev.slice(-2), { id, x, y }]);
          window.setTimeout(() => {
            setWaves((prev) => prev.filter((w) => w.id !== id));
          }, 700);
        }
      }
      onClick?.(e);
    },
    [enableWave, onClick, reducedMotion, soundEnabled]
  );

  return (
    <>
      <span
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center transition-transform duration-200 ease-out will-change-transform",
          className
        )}
        style={
          reducedMotion
            ? undefined
            : {
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.tilt}deg) scale(${pulsing ? 0.9 : 1})`,
              }
        }
      >
        <RenderJoyMark size={size} />
      </span>

      {enableWave &&
        !reducedMotion &&
        waves.map((wave) => (
          <span
            key={wave.id}
            aria-hidden="true"
            data-brand-impact-wave="true"
            className="pointer-events-none fixed z-[60] rounded-full border border-[var(--ws-text-primary)]/20 animate-[ping_650ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
            style={{
              left: wave.x - 24,
              top: wave.y - 24,
              width: 48,
              height: 48,
            }}
          />
        ))}
    </>
  );
}
