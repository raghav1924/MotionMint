"use client";

import React from "react";
import {
  ShaderBackground,
  type ShaderBackgroundProps,
} from "@/registry/components/shader-background";

export type LogoFlareProps = Omit<ShaderBackgroundProps, "preset">;

/**
 * Standalone Logo Flare WebGL background component powered by the shared RenderJoy shader engine.
 */
export function LogoFlare(props: LogoFlareProps) {
  return <ShaderBackground preset="logo-flare" {...props} />;
}
