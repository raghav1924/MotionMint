"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type KineticTorusProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Kinetic Torus WebGL background component powered by the shared RenderJoy shader engine.
 */
export function KineticTorus(props: KineticTorusProps) {
  return <ShaderBackground preset="kinetic-torus" {...props} />;
}
