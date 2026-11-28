"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type LiquidSatinBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Liquid Satin WebGL background component powered by the shared RenderJoy shader engine.
 */
export function LiquidSatinBackground(props: LiquidSatinBackgroundProps) {
  return <ShaderBackground preset="liquid-gold" {...props} />;
}
