"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type RippleBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Ripple WebGL background component powered by the shared RenderJoy shader engine.
 */
export function RippleBackground(props: RippleBackgroundProps) {
  return <ShaderBackground preset="ripple" {...props} />;
}
