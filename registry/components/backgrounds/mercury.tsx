"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type MercuryBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Mercury WebGL background component powered by the shared RenderJoy shader engine.
 */
export function MercuryBackground(props: MercuryBackgroundProps) {
  return <ShaderBackground preset="mercury" {...props} />;
}
