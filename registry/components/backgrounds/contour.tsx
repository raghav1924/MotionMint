"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type LiquidContourBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Liquid Contour WebGL background component powered by the shared RenderJoy shader engine.
 */
export function LiquidContourBackground(props: LiquidContourBackgroundProps) {
  return <ShaderBackground preset="contour" {...props} />;
}
