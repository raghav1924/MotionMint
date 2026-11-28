"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type TopographyBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Topography WebGL background component powered by the shared RenderJoy shader engine.
 */
export function TopographyBackground(props: TopographyBackgroundProps) {
  return <ShaderBackground preset="topography" {...props} />;
}
