"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type ParticleHelixProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Particle Helix WebGL background component powered by the shared RenderJoy shader engine.
 */
export function ParticleHelix(props: ParticleHelixProps) {
  return <ShaderBackground preset="particle-helix" {...props} />;
}
