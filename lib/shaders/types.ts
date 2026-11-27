export type ShaderPresetId =
  | "logo-flare"
  | "silk"
  | "liquid-gold"
  | "contour"
  | "mercury"
  | "pastel"
  | "aurora"
  | "flow"
  | "noise"
  | "liquid-drops"
  | "ripple"
  | "energy"
  | "fluted-glass"
  | "topography"
  | "prism"
  | "kinetic-torus"
  | "particle-helix"
  | "bio-terrain";

export type ShaderLookCategory = "premium" | "simple" | "modern";

export type ShaderQuality = "low" | "balanced" | "medium" | "high" | "auto";

export type ShaderInteractionMode = boolean | "pointer" | "scroll" | "both";

export interface ShaderPresetMeta {
  id: ShaderPresetId;
  label: string;
  look: ShaderLookCategory;
  description: string;
  defaultColors: [string, string, string];
  index: number;
}

export interface FlareOrigin {
  x: number;
  y: number;
}

export interface ShaderRenderConfig {
  presetIndex: number;
  colors: [string, string, string];
  speed: number;
  intensity: number;
  distortion: number;
  interactive: ShaderInteractionMode;
  pointerStrength: number;
  scrollReactive: boolean;
  scrollStrength: number;
  flareOrigin: FlareOrigin;
  rayCount: number;
  glowRadius: number;
  lensStreak: number;
  noiseAmount: number;
  quality: ShaderQuality;
  maxDpr: number;
  reducedMotion?: boolean;
}

export interface RippleImpulse {
  x: number;
  y: number;
  startTime: number;
  intensity: number;
}
