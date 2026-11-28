"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type ChromaticPrismProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Chromatic Prism WebGL background component powered by the shared RenderJoy shader engine.
 */
export function ChromaticPrism(props: ChromaticPrismProps) {
  return <ShaderBackground preset="prism" {...props} />;
}
