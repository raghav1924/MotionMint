"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type BioTerrainProps = Omit<ShaderBackgroundProps, "preset" | "flareOrigin" | "rayCount" | "glowRadius" | "lensStreak" | "logo">;

/**
 * Standalone Bio Terrain WebGL background component powered by the shared RenderJoy shader engine.
 */
export function BioTerrain(props: BioTerrainProps) {
  return <ShaderBackground preset="bio-terrain" {...props} />;
}
