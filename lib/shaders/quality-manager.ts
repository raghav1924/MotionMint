import type { ShaderQuality } from "./types";

const QUALITY_MAX_DPR: Record<ShaderQuality, number> = {
  low: 1,
  balanced: 1.5,
  medium: 1.5,
  high: 2,
  auto: 1.5,
};

export function resolveEffectiveDpr(quality: ShaderQuality, maxDpr: number): number {
  const deviceDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const isSmallViewport =
    typeof window !== "undefined" && window.innerWidth > 0 && window.innerWidth < 768;
  const autoCap = quality === "auto" && isSmallViewport ? 1.25 : QUALITY_MAX_DPR[quality];
  return Math.min(deviceDpr, autoCap, maxDpr);
}

export function createReducedMotionQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return null;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}
