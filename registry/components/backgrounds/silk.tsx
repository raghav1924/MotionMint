"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type SilkBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Silk WebGL background component powered by the shared RenderJoy shader engine.
 */
export function SilkBackground(props: SilkBackgroundProps) {
  return <ShaderBackground preset="silk" {...props} />;
}
