"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { mountShaderEngine } from "@/lib/shaders/renderer";
import { SHADER_PRESETS } from "@/lib/shaders/presets";
import type {
  FlareOrigin,
  ShaderInteractionMode,
  ShaderLookCategory,
  ShaderPresetId,
  ShaderPresetMeta,
  ShaderQuality,
  ShaderRenderConfig,
} from "@/lib/shaders/types";

export { SHADER_PRESETS };
export type {
  FlareOrigin,
  ShaderInteractionMode,
  ShaderLookCategory,
  ShaderPresetId,
  ShaderPresetMeta,
  ShaderQuality,
};

export interface ShaderBackgroundProps {
  preset?: ShaderPresetId;
  colors?: string[];
  speed?: number;
  intensity?: number;
  distortion?: number;
  opacity?: number;
  interactive?: ShaderInteractionMode;
  pointerStrength?: number;
  scrollReactive?: boolean;
  scrollStrength?: number;
  flareOrigin?: FlareOrigin;
  rayCount?: number;
  glowRadius?: number;
  lensStreak?: number;
  noiseAmount?: number;
  quality?: ShaderQuality;
  maxDpr?: number;
  backgroundColor?: string;
  reducedMotion?: boolean;
  fallback?: React.ReactNode;
  logo?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function ShaderBackground({
  preset = "logo-flare",
  colors,
  speed = 0.7,
  intensity = 1,
  distortion = 1,
  opacity = 1,
  interactive = true,
  pointerStrength = 0.6,
  scrollReactive = false,
  scrollStrength = 1,
  flareOrigin = { x: 0.5, y: 0.5 },
  rayCount = 14,
  glowRadius = 1,
  lensStreak = 0.85,
  noiseAmount = 1,
  quality = "auto",
  maxDpr = 1.5,
  backgroundColor,
  reducedMotion,
  fallback,
  logo,
  className = "",
  style,
  children,
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const presetMeta = SHADER_PRESETS[preset] ?? SHADER_PRESETS["logo-flare"];
  const resolvedColors = useMemo<[string, string, string]>(() => {
    const base = presetMeta.defaultColors;
    return [
      colors?.[0] ?? base[0],
      colors?.[1] ?? base[1],
      colors?.[2] ?? base[2],
    ];
  }, [colors, presetMeta]);

  const configRef = useRef<ShaderRenderConfig>({
    presetIndex: presetMeta.index,
    colors: resolvedColors,
    speed,
    intensity,
    distortion,
    interactive,
    pointerStrength,
    scrollReactive,
    scrollStrength,
    flareOrigin,
    rayCount,
    glowRadius,
    lensStreak,
    noiseAmount,
    quality,
    maxDpr,
    reducedMotion,
  });

  configRef.current = {
    presetIndex: presetMeta.index,
    colors: resolvedColors,
    speed,
    intensity,
    distortion,
    interactive,
    pointerStrength,
    scrollReactive,
    scrollStrength,
    flareOrigin,
    rayCount,
    glowRadius,
    lensStreak,
    noiseAmount,
    quality,
    maxDpr,
    reducedMotion,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || typeof window === "undefined") return;

    return mountShaderEngine(container, canvas, configRef, {
      onFallback: () => setWebglFailed(true),
      onRestored: () => setWebglFailed(false),
    });
  }, []);

  const fallbackBackground = useMemo(() => {
    const [c0, c1, c2] = resolvedColors;
    return `radial-gradient(circle at 50% 45%, ${c0}cc 0%, transparent 56%), radial-gradient(circle at 75% 70%, ${c1}b8 0%, transparent 60%), linear-gradient(135deg, ${c2} 0%, ${c2} 100%)`;
  }, [resolvedColors]);

  return (
    <div
      ref={containerRef}
      data-shader-preset={preset}
      data-fallback={webglFailed ? "css" : "webgl"}
      className={`relative isolate overflow-hidden ${className}`.trim()}
      style={{
        backgroundColor: backgroundColor ?? resolvedColors[2],
        backgroundImage: webglFailed && !fallback ? fallbackBackground : undefined,
        ...style,
      }}
    >
      {webglFailed && fallback ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {fallback}
        </div>
      ) : !webglFailed ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block h-full w-full"
          style={{ opacity }}
        />
      ) : null}

      {logo ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center"
        >
          {logo}
        </div>
      ) : null}

      {children ? (
        <div className="relative z-10 h-full w-full">{children}</div>
      ) : null}
    </div>
  );
}
