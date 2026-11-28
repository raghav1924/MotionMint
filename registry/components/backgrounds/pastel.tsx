"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type SoftPastelBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Soft Pastel WebGL background component powered by the shared RenderJoy shader engine.
 */
export function SoftPastelBackground(props: SoftPastelBackgroundProps) {
  return <ShaderBackground preset="pastel" {...props} />;
}
