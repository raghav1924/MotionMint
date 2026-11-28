"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type AuroraBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Aurora WebGL background component powered by the shared RenderJoy shader engine.
 */
export function AuroraBackground(props: AuroraBackgroundProps) {
  return <ShaderBackground preset="aurora" {...props} />;
}
