"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { mountShaderEngine } from "@/lib/shaders/renderer";
import { buildSvgDistanceField, type LogoSdfTextureData } from "@/lib/shaders/logo-sdf";
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
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoSdfRef = useRef<LogoSdfTextureData | null>(null);
  const logoExtentRef = useRef<number>(0.36);
  const lastSvgMarkupRef = useRef<string | null>(null);
  const mountedRef = useRef(true);
  const [webglFailed, setWebglFailed] = useState(false);
  const [entered, setEntered] = useState(false);

  const hasLogo = Boolean(logo);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    setEntered(false);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, preset, hasLogo]);

  const measureLogoExtent = () => {
    const container = containerRef.current;
    const svg = logoWrapperRef.current?.querySelector("svg");
    if (!container || !svg) {
      logoExtentRef.current = 0.36;
      return;
    }
    const cRect = container.getBoundingClientRect();
    if (cRect.height <= 0) return;
    const attrW = parseFloat(svg.getAttribute("width") || "0");
    const attrH = parseFloat(svg.getAttribute("height") || "0");
    const sRect = svg.getBoundingClientRect();
    const w = svg.clientWidth || attrW || sRect.width;
    const h = svg.clientHeight || attrH || sRect.height;
    const maxDim = Math.max(w, h);
    if (maxDim > 0) {
      logoExtentRef.current = Math.max(0.12, maxDim / cRect.height / 0.48);
    }
  };

  useEffect(() => {
    const svg = hasLogo ? logoWrapperRef.current?.querySelector("svg") ?? null : null;
    const nextMarkup = svg ? svg.outerHTML : null;
    if (nextMarkup === lastSvgMarkupRef.current) {
      measureLogoExtent();
      return;
    }
    lastSvgMarkupRef.current = nextMarkup;

    if (!svg || !nextMarkup) {
      logoSdfRef.current = null;
      logoExtentRef.current = 0.36;
      return;
    }

    measureLogoExtent();
    buildSvgDistanceField(svg, 128).then((sdf) => {
      if (mountedRef.current && lastSvgMarkupRef.current === nextMarkup) {
        logoSdfRef.current = sdf;
      }
    });
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureLogoExtent());
    ro.observe(container);
    return () => ro.disconnect();
  }, [hasLogo]);

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

    return mountShaderEngine(
      container,
      canvas,
      configRef,
      {
        onFallback: () => setWebglFailed(true),
        onRestored: () => setWebglFailed(false),
      },
      logoSdfRef,
      logoExtentRef
    );
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
          ref={logoWrapperRef}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-[5] flex items-center justify-center transition-all duration-[1450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            entered ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-[8px]"
          }`}
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
