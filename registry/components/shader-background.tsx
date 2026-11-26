"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type ShaderPresetId =
  | "silk"
  | "liquid-gold"
  | "contour"
  | "mercury"
  | "pastel"
  | "aurora"
  | "flow"
  | "noise"
  | "energy"
  | "fluted-glass"
  | "topography"
  | "prism"
  | "kinetic-torus"
  | "particle-helix";

export type ShaderLookCategory = "premium" | "simple" | "modern";
export type ShaderQuality = "low" | "medium" | "high";

export interface ShaderPresetMeta {
  id: ShaderPresetId;
  label: string;
  look: ShaderLookCategory;
  description: string;
  defaultColors: [string, string, string];
  index: number;
}

export const SHADER_PRESETS: Record<ShaderPresetId, ShaderPresetMeta> = {
  silk: {
    id: "silk",
    label: "Silk",
    look: "premium",
    description: "Flowing organic ribbons with soft specular highlights.",
    defaultColors: ["#6366F1", "#EC4899", "#0F172A"],
    index: 0,
  },
  "liquid-gold": {
    id: "liquid-gold",
    label: "Liquid Satin",
    look: "premium",
    description: "Glossy royal-violet and amber-gold 3D liquid folds.",
    defaultColors: ["#4F2BFF", "#F59E0B", "#160B38"],
    index: 6,
  },
  contour: {
    id: "contour",
    label: "Liquid Contour",
    look: "premium",
    description: "High-contrast cobalt and amber swirling topographic bands.",
    defaultColors: ["#1D4ED8", "#F59E0B", "#05070E"],
    index: 7,
  },
  mercury: {
    id: "mercury",
    label: "Mercury",
    look: "premium",
    description: "Chrome reflections and liquid metallic ridges.",
    defaultColors: ["#E2E8F0", "#64748B", "#0F172A"],
    index: 2,
  },
  pastel: {
    id: "pastel",
    label: "Soft Pastel",
    look: "simple",
    description: "Airy directional sweep of rose, pure white, and violet.",
    defaultColors: ["#FF7EB6", "#FFFFFF", "#8B5CF6"],
    index: 8,
  },
  aurora: {
    id: "aurora",
    label: "Aurora",
    look: "simple",
    description: "Soft flowing northern-lights color fields with gentle drift.",
    defaultColors: ["#10B981", "#06B6D4", "#090D16"],
    index: 1,
  },
  flow: {
    id: "flow",
    label: "Flow",
    look: "simple",
    description: "Clean, calm fluid gradients for editorial surfaces.",
    defaultColors: ["#3B82F6", "#8B5CF6", "#0B1120"],
    index: 3,
  },
  noise: {
    id: "noise",
    label: "Noise",
    look: "modern",
    description: "Procedural FBM noise, subtle grain, and organic distortion.",
    defaultColors: ["#F59E0B", "#EF4444", "#18181B"],
    index: 4,
  },
  energy: {
    id: "energy",
    label: "Energy",
    look: "modern",
    description: "Grid distortion, luminous interference fields, and pulse.",
    defaultColors: ["#22D3EE", "#A855F7", "#050510"],
    index: 5,
  },
  "fluted-glass": {
    id: "fluted-glass",
    label: "Fluted Glass",
    look: "modern",
    description: "Vertical ribbed glass refraction with subtle chromatic edges.",
    defaultColors: ["#F8FAFC", "#64748B", "#09090B"],
    index: 9,
  },
  topography: {
    id: "topography",
    label: "Topography",
    look: "simple",
    description: "Crisp flat vector-style organic contour bands in motion.",
    defaultColors: ["#1EA7D8", "#38BDF8", "#1446A0"],
    index: 10,
  },
  prism: {
    id: "prism",
    label: "Chromatic Prism",
    look: "premium",
    description: "Soft-focus optical glass caustics with spectral rainbow dispersion.",
    defaultColors: ["#F8FAFC", "#38BDF8", "#050507"],
    index: 11,
  },
  "kinetic-torus": {
    id: "kinetic-torus",
    label: "Kinetic Torus",
    look: "premium",
    description: "3D sculpted radial-ribbed torus rotating with studio rim lighting.",
    defaultColors: ["#8B5CF6", "#E2E8F0", "#070709"],
    index: 12,
  },
  "particle-helix": {
    id: "particle-helix",
    label: "Particle Helix",
    look: "modern",
    description: "Dotted 3D double-helix particle strand with depth shading.",
    defaultColors: ["#F8FAFC", "#94A3B8", "#06070A"],
    index: 13,
  },
};

export interface ShaderBackgroundProps {
  preset?: ShaderPresetId;
  colors?: string[];
  speed?: number;
  intensity?: number;
  distortion?: number;
  opacity?: number;
  interactive?: boolean;
  pointerStrength?: number;
  scrollReactive?: boolean;
  quality?: ShaderQuality;
  maxDpr?: number;
  backgroundColor?: string;
  reducedMotion?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const QUALITY_MAX_DPR: Record<ShaderQuality, number> = {
  low: 1,
  medium: 1.5,
  high: 2,
};

function parseHexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const cleaned = hex.trim().replace(/^#/, "");
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return [r / 255, g / 255, b / 255];
    }
  } else if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return [r / 255, g / 255, b / 255];
    }
  }
  return fallback;
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 v_uv;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_intensity;
uniform float u_distortion;
uniform float u_pointerStrength;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform int u_preset;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return value;
}

float liquidHeight(vec2 p, float t, float dist) {
  vec2 q = vec2(
    fbm(p + vec2(t * 0.14, -t * 0.1)),
    fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.11, t * 0.13))
  );
  return fbm(p + q * (1.75 * dist) + vec2(t * 0.09, -t * 0.08));
}

float torusSculptureSDF(vec3 pos, float t, float dist) {
  float ang = atan(pos.y, pos.x);
  float rMajor = 0.62;
  vec2 q = vec2(length(pos.xy) - rMajor, pos.z);
  float twist = ang * 3.0 + t * 0.9;
  float c = cos(twist);
  float s = sin(twist);
  vec2 rq = mat2(c, -s, s, c) * q;
  float fins = 0.045 * sin(ang * 24.0 + atan(rq.y, rq.x) * 2.0);
  float box = length(max(abs(rq) - vec2(0.22 + 0.04 * dist, 0.09), 0.0)) - 0.045;
  return (box + fins) * 0.65;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 uv = (v_uv - 0.5) * aspect;
  vec2 mouse = (u_mouse - 0.5) * aspect;

  float distToMouse = length(uv - mouse);
  float pointerWarp = exp(-distToMouse * 2.4) * u_pointerStrength;
  vec2 p = uv * (1.8 + u_distortion * 0.8);
  p += normalize(uv - mouse + 0.0001) * pointerWarp * 0.45;
  p.y += u_scroll * 0.35;

  float t = u_time;
  vec3 col = u_color2;

  if (u_preset == 0) {
    // 01 — Silk: flowing ribbons with soft highlights
    float q = fbm(p + vec2(t * 0.14, -t * 0.1));
    float r = fbm(p + q * (1.4 * u_distortion) + vec2(t * 0.18, t * 0.12));
    float ribbon = smoothstep(0.2, 0.85, sin((p.x * 1.4 + r * 3.2) + t * 0.3) * 0.5 + 0.5);
    col = mix(u_color2, u_color0, clamp(r * 1.15, 0.0, 1.0));
    col = mix(col, u_color1, ribbon * 0.72 * u_intensity);
  } else if (u_preset == 1) {
    // 02 — Aurora: vertical curtain waves
    float wave = sin(p.x * 2.2 + t * 0.28 + fbm(p * 1.2) * 2.5 * u_distortion);
    float curtain = smoothstep(-0.4, 0.9, wave) * smoothstep(0.95, -0.35, uv.y + 0.25);
    float glow = fbm(vec2(p.x * 0.9, p.y * 0.4 - t * 0.12));
    col = mix(u_color2, u_color0, curtain * 0.85 * u_intensity);
    col = mix(col, u_color1, glow * curtain * 0.9 * u_intensity);
  } else if (u_preset == 2) {
    // 03 — Mercury: liquid chrome reflections
    float n1 = fbm(p * 1.3 + t * 0.15);
    float n2 = fbm(p * 2.1 - t * 0.18 + n1 * u_distortion);
    float ridge = 1.0 - abs(sin((n1 + n2) * 4.2));
    float spec = pow(clamp(ridge, 0.0, 1.0), 3.0) * u_intensity;
    col = mix(u_color2, u_color1, clamp(n2 * 1.1, 0.0, 1.0));
    col = mix(col, u_color0, clamp(spec, 0.0, 1.0));
  } else if (u_preset == 3) {
    // 04 — Flow: evolving fluid gradients
    float f1 = fbm(p * 0.9 + vec2(t * 0.1, t * 0.08));
    float f2 = fbm(p * 1.4 + vec2(-t * 0.12, f1 * 1.6 * u_distortion));
    col = mix(u_color2, u_color0, smoothstep(0.15, 0.85, f1) * u_intensity);
    col = mix(col, u_color1, smoothstep(0.3, 0.9, f2) * 0.8 * u_intensity);
  } else if (u_preset == 4) {
    // 05 — Noise: organic FBM + subtle grain
    float n = fbm(p * 1.6 + vec2(t * 0.09, -t * 0.07) * u_distortion);
    float grain = (hash(v_uv * u_resolution + fract(t) * 100.0) - 0.5) * 0.09;
    col = mix(u_color2, u_color0, smoothstep(0.2, 0.8, n) * u_intensity);
    col = mix(col, u_color1, smoothstep(0.45, 0.95, n) * 0.75 * u_intensity);
    col += grain;
  } else if (u_preset == 5) {
    // 06 — Energy: luminous interference grid
    vec2 warped = p + vec2(fbm(p + t * 0.2), fbm(p - t * 0.2)) * 0.55 * u_distortion;
    float gridX = abs(sin(warped.x * 4.5));
    float gridY = abs(sin(warped.y * 4.5));
    float field = pow(1.0 - min(gridX, gridY), 4.0) * u_intensity;
    float pulse = 0.5 + 0.5 * sin(t * 0.9 - length(uv) * 3.0);
    col = mix(u_color2, u_color0, clamp(field * 0.75, 0.0, 1.0));
    col = mix(col, u_color1, clamp(field * pulse, 0.0, 1.0));
  } else if (u_preset == 6) {
    // 07 — Liquid Satin: glossy 3D folds with finite-difference normal shading
    float e = 0.025;
    float h = liquidHeight(p * 0.85, t, u_distortion);
    float hx = liquidHeight((p + vec2(e, 0.0)) * 0.85, t, u_distortion);
    float hy = liquidHeight((p + vec2(0.0, e)) * 0.85, t, u_distortion);
    vec3 normal = normalize(vec3((h - hx) / e, (h - hy) / e, 1.2));
    vec3 lightDir = normalize(vec3(0.45, 0.65, 1.0));
    float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
    float spec = pow(clamp(dot(normal, normalize(lightDir + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 14.0);
    float fold = smoothstep(0.32, 0.68, h);
    col = mix(u_color2, u_color0, smoothstep(0.18, 0.72, diff) * u_intensity);
    col = mix(col, u_color1, smoothstep(0.46, 0.82, fold + spec * 0.35) * 0.9);
    col += u_color1 * spec * 0.28 * u_intensity;
  } else if (u_preset == 7) {
    // 08 — Liquid Contour: bold swirling topographic bands
    float h = liquidHeight(p * 1.05, t * 0.85, u_distortion);
    float bands = sin(h * 18.0);
    float primaryMask = smoothstep(-0.15, 0.35, bands);
    float goldMask = smoothstep(0.65, 0.96, bands);
    float crevice = smoothstep(-0.85, -0.35, bands);
    col = mix(u_color2, u_color0, primaryMask * crevice * u_intensity);
    col = mix(col, u_color1, goldMask * 0.95 * u_intensity);
  } else if (u_preset == 8) {
    // 09 — Soft Pastel: airy modern brushed directional sweep
    vec2 dir = vec2(p.x * 0.7 + p.y * 0.45, p.y * 0.85 - p.x * 0.25);
    float brush = fbm(vec2(dir.x * 0.7 + t * 0.08, dir.y * 2.4 - t * 0.05) * u_distortion);
    float sweep = smoothstep(-0.7, 0.75, uv.x * 0.85 + (brush - 0.5) * 0.65);
    float coreGlow = smoothstep(0.72, 0.08, length(uv - vec2(-0.08, -0.15)) - (brush - 0.5) * 0.25);
    col = mix(u_color0, u_color2, sweep);
    col = mix(col, u_color1, clamp(coreGlow * 0.88 * u_intensity, 0.0, 1.0));
  } else if (u_preset == 9) {
    // 10 — Fluted Glass: vertical cylindrical glass ribs with chromatic refraction
    float ribCount = 16.0 + u_distortion * 6.0;
    float ribPos = v_uv.x * ribCount;
    float ribPhase = fract(ribPos) - 0.5;
    float lensOffset = sin(ribPhase * 3.14159265) * (0.09 + 0.05 * u_distortion);

    vec2 baseUv = uv * 1.15 + vec2(pointerWarp * 0.25, u_scroll * 0.25);
    float hR = liquidHeight(baseUv + vec2(lensOffset * 1.25, 0.0), t * 0.85, 0.9);
    float hG = liquidHeight(baseUv + vec2(lensOffset * 1.0, 0.0), t * 0.85, 0.9);
    float hB = liquidHeight(baseUv + vec2(lensOffset * 0.75, 0.0), t * 0.85, 0.9);

    vec3 glassSample = vec3(
      smoothstep(0.24, 0.78, hR),
      smoothstep(0.24, 0.78, hG),
      smoothstep(0.24, 0.78, hB)
    );
    vec3 tinted = mix(u_color2, mix(u_color1, u_color0, glassSample), clamp(glassSample * u_intensity, 0.0, 1.0));
    float ridge = pow(clamp(abs(ribPhase) * 2.0, 0.0, 1.0), 5.0);
    float groove = smoothstep(0.42, 0.5, abs(ribPhase));
    col = mix(tinted, u_color2 * 0.6, groove * 0.55);
    col += u_color0 * ridge * 0.18 * u_intensity;
  } else if (u_preset == 10) {
    // 11 — Topography: crisp flat vector-style organic contour bands
    float elev = fbm(p * 0.85 + vec2(t * 0.09, -t * 0.07))
               + 0.45 * fbm(p * 0.55 - vec2(t * 0.06, t * 0.08));
    float wave = sin(elev * (11.0 + u_distortion * 5.0));
    float bandMask = smoothstep(0.14, 0.21, wave);
    col = mix(u_color2, u_color0, bandMask * clamp(u_intensity, 0.4, 1.0));
  } else if (u_preset == 11) {
    // 12 — Chromatic Prism: soft-focus optical glass caustics with RGB dispersion
    vec2 q = p * 0.52;
    float e = 0.04;
    float h = liquidHeight(q, t * 0.9, u_distortion);
    float hx = liquidHeight(q + vec2(e, 0.0), t * 0.9, u_distortion);
    float hy = liquidHeight(q + vec2(0.0, e), t * 0.9, u_distortion);
    vec2 grad = vec2(hx - h, hy - h) / e;
    vec2 disp = normalize(grad + 0.0001) * (0.045 + 0.035 * u_distortion);

    float hR = liquidHeight(q + disp, t * 0.9, u_distortion);
    float hB = liquidHeight(q - disp, t * 0.9, u_distortion);

    vec3 caustic = vec3(
      smoothstep(0.45, 0.72, hR),
      smoothstep(0.45, 0.72, h),
      smoothstep(0.45, 0.72, hB)
    );
    float edgeMask = clamp(length(caustic - vec3(caustic.g)) * 3.5 + caustic.g * (1.0 - caustic.g) * 2.2, 0.0, 1.0);
    vec3 spectrum = 0.5 + 0.5 * cos(h * 11.0 + vec3(0.0, 2.1, 4.2));
    vec3 prismGlow = mix(caustic, spectrum, 0.38) * edgeMask * u_intensity;
    col = mix(u_color2, u_color0, caustic.g * 0.92 * u_intensity);
    col += prismGlow * 0.65;
  } else if (u_preset == 12) {
    // 13 — Kinetic Torus: 3D sculpted radial-ribbed torus with studio rim lighting
    vec2 tilt = (u_mouse - 0.5) * u_pointerStrength * 0.9;
    vec3 ro = vec3(0.0, 0.0, 2.05);
    vec3 rd = normalize(vec3(uv * 1.15, -1.55));

    float rx = 0.35 + tilt.y;
    float ry = t * 0.35 + tilt.x;
    mat2 rotX = mat2(cos(rx), -sin(rx), sin(rx), cos(rx));
    mat2 rotY = mat2(cos(ry), -sin(ry), sin(ry), cos(ry));

    float distAcc = 0.0;
    bool hit = false;
    vec3 hitPos = vec3(0.0);
    for (int i = 0; i < 32; i++) {
      vec3 sp = ro + rd * distAcc;
      sp.yz = rotX * sp.yz;
      sp.xz = rotY * sp.xz;
      float d = torusSculptureSDF(sp, t, u_distortion);
      if (d < 0.004) {
        hit = true;
        hitPos = sp;
        break;
      }
      distAcc += d;
      if (distAcc > 4.0) break;
    }

    col = u_color2;
    if (hit) {
      float eps = 0.006;
      vec3 n = normalize(vec3(
        torusSculptureSDF(hitPos + vec3(eps, 0.0, 0.0), t, u_distortion) - torusSculptureSDF(hitPos - vec3(eps, 0.0, 0.0), t, u_distortion),
        torusSculptureSDF(hitPos + vec3(0.0, eps, 0.0), t, u_distortion) - torusSculptureSDF(hitPos - vec3(0.0, eps, 0.0), t, u_distortion),
        torusSculptureSDF(hitPos + vec3(0.0, 0.0, eps), t, u_distortion) - torusSculptureSDF(hitPos - vec3(0.0, 0.0, eps), t, u_distortion)
      ));
      vec3 lightA = normalize(vec3(-0.6, 0.8, 0.7));
      vec3 lightB = normalize(vec3(0.7, -0.5, 0.5));
      float diffA = max(dot(n, lightA), 0.0);
      float diffB = max(dot(n, lightB), 0.0);
      float fresnel = pow(1.0 - max(dot(n, normalize(-rd)), 0.0), 2.8);
      col = u_color2 * 0.5
          + u_color0 * (diffA * 0.72 + fresnel * 0.55) * u_intensity
          + u_color1 * (diffB * 0.55 + pow(diffA, 6.0) * 0.45) * u_intensity;
    }
  } else {
    // 14 — Particle Helix: dotted 3D double-helix strand on deep obsidian
    float a = -0.52;
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 huv = rot * (uv + (u_mouse - 0.5) * u_pointerStrength * 0.14);

    float density = 42.0 + u_distortion * 12.0;
    vec2 cellId = floor(huv * density);
    vec2 cellUv = fract(huv * density) - 0.5;
    vec2 cp = cellId / density;

    float phase = cp.x * (4.6 + u_distortion * 1.4) + t * 1.1;
    float s1 = sin(phase) * 0.24;
    float s2 = sin(phase + 3.14159265) * 0.24;
    float z1 = 0.55 + 0.45 * cos(phase);
    float z2 = 0.55 + 0.45 * cos(phase + 3.14159265);

    float strand1 = smoothstep(0.11, 0.015, abs(cp.y - s1));
    float strand2 = smoothstep(0.11, 0.015, abs(cp.y - s2));
    float spanMask = smoothstep(max(abs(s1), abs(s2)) + 0.02, max(abs(s1), abs(s2)) - 0.02, abs(cp.y));
    float rungWave = smoothstep(0.55, 0.92, cos(cp.x * 24.0 + t * 1.1));
    float rung = spanMask * rungWave * 0.75;

    float jitter = hash(cellId);
    float densityMask = max(max(strand1, strand2), rung);
    float dotRadius = (0.14 + 0.24 * densityMask) * (0.65 + 0.35 * jitter);
    float dot = smoothstep(dotRadius, dotRadius * 0.35, length(cellUv));

    float depth = mix(z2, z1, step(abs(cp.y - s1), abs(cp.y - s2)));
    float alpha = dot * densityMask * step(0.15, jitter + densityMask * 0.65);
    vec3 particleCol = mix(u_color1, u_color0, clamp(depth * u_intensity, 0.0, 1.0));
    col = mix(u_color2, particleCol, clamp(alpha * (0.45 + 0.55 * depth), 0.0, 1.0));
  }

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderBackground({
  preset = "silk",
  colors,
  speed = 0.7,
  intensity = 1,
  distortion = 1,
  opacity = 1,
  interactive = true,
  pointerStrength = 0.6,
  scrollReactive = false,
  quality = "medium",
  maxDpr = 1.5,
  backgroundColor,
  reducedMotion,
  className = "",
  style,
  children,
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const presetMeta = SHADER_PRESETS[preset] ?? SHADER_PRESETS.silk;
  const resolvedColors = useMemo<[string, string, string]>(() => {
    const base = presetMeta.defaultColors;
    return [
      colors?.[0] ?? base[0],
      colors?.[1] ?? base[1],
      colors?.[2] ?? base[2],
    ];
  }, [colors, presetMeta]);

  // Live uniform refs so RAF loop reads updated props without recreating WebGL context
  const propsRef = useRef({
    presetIndex: presetMeta.index,
    colors: resolvedColors,
    speed,
    intensity,
    distortion,
    interactive,
    pointerStrength,
    scrollReactive,
    quality,
    maxDpr,
    reducedMotion,
  });

  propsRef.current = {
    presetIndex: presetMeta.index,
    colors: resolvedColors,
    speed,
    intensity,
    distortion,
    interactive,
    pointerStrength,
    scrollReactive,
    quality,
    maxDpr,
    reducedMotion,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || typeof window === "undefined") return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
      }) || null;

    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      setWebglFailed(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      setWebglFailed(true);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      setWebglFailed(true);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      scroll: gl.getUniformLocation(program, "u_scroll"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      distortion: gl.getUniformLocation(program, "u_distortion"),
      pointerStrength: gl.getUniformLocation(program, "u_pointerStrength"),
      color0: gl.getUniformLocation(program, "u_color0"),
      color1: gl.getUniformLocation(program, "u_color1"),
      color2: gl.getUniformLocation(program, "u_color2"),
      preset: gl.getUniformLocation(program, "u_preset"),
    };

    let rafId: number | null = null;
    let isVisible = true;
    let isTabVisible = typeof document === "undefined" ? true : !document.hidden;
    let contextLost = false;
    let elapsed = 0;
    let lastNow = performance.now();

    const targetMouse = { x: 0.5, y: 0.5 };
    const currentMouse = { x: 0.5, y: 0.5 };
    let scrollProgress = 0;

    const mediaQuery =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    const isReducedMotion = () =>
      Boolean(propsRef.current.reducedMotion ?? mediaQuery?.matches);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dprCap = Math.min(
        window.devicePixelRatio || 1,
        QUALITY_MAX_DPR[propsRef.current.quality],
        propsRef.current.maxDpr
      );
      const width = Math.max(1, Math.floor(rect.width * dprCap));
      const height = Math.max(1, Math.floor(rect.height * dprCap));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const drawFrame = (now: number) => {
      if (contextLost) return;

      const dt = Math.min(0.1, (now - lastNow) / 1000);
      lastNow = now;

      const cur = propsRef.current;
      if (!isReducedMotion()) {
        elapsed += dt * cur.speed;
      }

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;

      const c0 = parseHexToRgb(cur.colors[0], [0.39, 0.4, 0.95]);
      const c1 = parseHexToRgb(cur.colors[1], [0.93, 0.28, 0.6]);
      const c2 = parseHexToRgb(cur.colors[2], [0.06, 0.09, 0.16]);

      gl.uniform1f(uniforms.time, elapsed);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(
        uniforms.mouse,
        cur.interactive ? currentMouse.x : 0.5,
        cur.interactive ? currentMouse.y : 0.5
      );
      gl.uniform1f(uniforms.scroll, cur.scrollReactive ? scrollProgress : 0);
      gl.uniform1f(uniforms.intensity, cur.intensity);
      gl.uniform1f(uniforms.distortion, cur.distortion);
      gl.uniform1f(
        uniforms.pointerStrength,
        cur.interactive ? cur.pointerStrength : 0
      );
      gl.uniform3f(uniforms.color0, c0[0], c0[1], c0[2]);
      gl.uniform3f(uniforms.color1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uniforms.color2, c2[0], c2[1], c2[2]);
      gl.uniform1i(uniforms.preset, cur.presetIndex);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const startLoop = () => {
      if (rafId !== null || contextLost || !isVisible || !isTabVisible) return;
      if (isReducedMotion()) {
        drawFrame(performance.now());
        return;
      }
      lastNow = performance.now();
      const tick = (now: number) => {
        drawFrame(now);
        if (!contextLost && isVisible && isTabVisible && !isReducedMotion()) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = null;
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!propsRef.current.interactive) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetMouse.x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      targetMouse.y = Math.min(
        1,
        Math.max(0, 1 - (e.clientY - rect.top) / rect.height)
      );
      if (isReducedMotion()) {
        drawFrame(performance.now());
      }
    };

    const onScroll = () => {
      if (!propsRef.current.scrollReactive) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgress = window.scrollY / maxScroll;
      if (isReducedMotion()) {
        drawFrame(performance.now());
      }
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      stopLoop();
      setWebglFailed(true);
    };

    const onContextRestored = () => {
      contextLost = false;
      setWebglFailed(false);
      resize();
      startLoop();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize();
            drawFrame(performance.now());
          })
        : null;
    resizeObserver?.observe(container);

    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            for (const entry of entries) {
              isVisible = entry.isIntersecting;
              if (isVisible) {
                startLoop();
              } else {
                stopLoop();
              }
            }
          })
        : null;
    intersectionObserver?.observe(container);

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    resize();
    drawFrame(performance.now());
    startLoop();

    return () => {
      stopLoop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);

      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  const fallbackBackground = useMemo(() => {
    const [c0, c1, c2] = resolvedColors;
    return `radial-gradient(circle at 24% 30%, ${c0}cc 0%, transparent 56%), radial-gradient(circle at 78% 72%, ${c1}b8 0%, transparent 60%), linear-gradient(135deg, ${c2} 0%, ${c2} 100%)`;
  }, [resolvedColors]);

  return (
    <div
      ref={containerRef}
      data-shader-preset={preset}
      data-fallback={webglFailed ? "css" : "webgl"}
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        backgroundColor: backgroundColor ?? resolvedColors[2],
        backgroundImage: webglFailed ? fallbackBackground : undefined,
        ...style,
      }}
    >
      {!webglFailed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full block"
          style={{ opacity }}
        />
      )}
      {children ? (
        <div className="relative z-10 h-full w-full">{children}</div>
      ) : null}
    </div>
  );
}
