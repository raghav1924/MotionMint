"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type FlutedGlassBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Fluted Glass WebGL background component powered by the shared RenderJoy shader engine.
 */
export function FlutedGlassBackground(props: FlutedGlassBackgroundProps) {
  return <ShaderBackground preset="fluted-glass" {...props} />;
}
