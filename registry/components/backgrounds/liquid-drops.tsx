"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type LiquidDropsProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Liquid Drops WebGL background component powered by the shared RenderJoy shader engine.
 */
export function LiquidDrops(props: LiquidDropsProps) {
  return <ShaderBackground preset="liquid-drops" {...props} />;
}
