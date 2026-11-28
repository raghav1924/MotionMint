"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type FlowBackgroundProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Flow WebGL background component powered by the shared RenderJoy shader engine.
 */
export function FlowBackground(props: FlowBackgroundProps) {
  return <ShaderBackground preset="flow" {...props} />;
}
