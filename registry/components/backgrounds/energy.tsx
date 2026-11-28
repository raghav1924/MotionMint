"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type EnergyBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Energy WebGL background component powered by the shared RenderJoy shader engine.
 */
export function EnergyBackground(props: EnergyBackgroundProps) {
  return <ShaderBackground preset="energy" {...props} />;
}
