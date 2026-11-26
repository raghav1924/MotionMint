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
  | "particle-helix"
  | "bio-terrain";

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
  "bio-terrain": {
    id: "bio-terrain",
    label: "Bio Terrain",
    look: "modern",
    description: "Organic mossy terrain island with glowing veins and HUD reticles.",
    defaultColors: ["#84CC16", "#166534", "#9CA3AF"],
    index: 14,
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
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return value;
}

vec3 acesFilm(vec3 x) {
  float a = 2.51;
  float b = 0.03;
  float c = 2.43;
  float d = 0.59;
  float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float liquidHeight(vec2 p, float t, float dist) {
  vec2 q = vec2(
    fbm(p + vec2(t * 0.12, -t * 0.09)),
    fbm(p + vec2(5.2, 1.3) + vec2(-t * 0.1, t * 0.11))
  );
  return fbm(p + q * (1.85 * dist) + vec2(t * 0.08, -t * 0.07));
}

float torusSculptureSDF(vec3 pos, float t, float dist) {
  float ang = atan(pos.y, pos.x);
  float rMajor = 0.62;
  vec2 q = vec2(length(pos.xy) - rMajor, pos.z);
  float twist = ang * 4.0 + t * 0.85;
  float c = cos(twist);
  float s = sin(twist);
  vec2 rq = mat2(c, -s, s, c) * q;
  float finWave = sin(ang * 28.0 + atan(rq.y, rq.x) * 2.0);
  float fins = 0.038 * smoothstep(-1.0, 1.0, finWave);
  float box = length(max(abs(rq) - vec2(0.24 + 0.04 * dist, 0.068), 0.0)) - 0.036;
  return (box + fins) * 0.58;
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
    // 03 — Mercury: studio environment-mapped liquid chrome
    float e = 0.018;
    float h = liquidHeight(p * 1.05, t * 0.85, u_distortion);
    float hx = liquidHeight((p + vec2(e, 0.0)) * 1.05, t * 0.85, u_distortion);
    float hy = liquidHeight((p + vec2(0.0, e)) * 1.05, t * 0.85, u_distortion);
    vec3 n = normalize(vec3((h - hx) / e * 0.65, (h - hy) / e * 0.65, 1.0));
    vec3 refl = reflect(vec3(0.0, 0.0, -1.0), n);
    float sky = smoothstep(-0.25, 0.65, refl.y);
    float softbox = smoothstep(0.65, 0.98, dot(refl, normalize(vec3(-0.35, 0.6, 0.7))));
    float rim = pow(1.0 - max(n.z, 0.0), 3.0);
    col = mix(u_color2, u_color1, sky * 0.95);
    col = mix(col, u_color0, clamp((softbox * 0.95 + rim * 0.45) * u_intensity, 0.0, 1.0));
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
    // 07 — Liquid Satin: ultra-creamy 3D studio satin cloth folds
    float e = 0.032;
    float h = liquidHeight(p * 0.62, t * 0.75, u_distortion);
    float hx = liquidHeight((p + vec2(e, 0.0)) * 0.62, t * 0.75, u_distortion);
    float hy = liquidHeight((p + vec2(0.0, e)) * 0.62, t * 0.75, u_distortion);
    vec3 normal = normalize(vec3((h - hx) / e * 0.72, (h - hy) / e * 0.72, 1.0));
    vec3 lightDir = normalize(vec3(0.45, 0.65, 1.0));
    float diff = clamp(dot(normal, lightDir), 0.0, 1.0);
    float spec = pow(clamp(dot(normal, normalize(lightDir + vec3(0.0, 0.0, 1.0))), 0.0, 1.0), 18.0);
    float fresnel = pow(1.0 - max(normal.z, 0.0), 2.5);
    float fold = smoothstep(0.36, 0.66, h);
    col = mix(u_color2, u_color0, smoothstep(0.14, 0.78, diff) * 1.05 * u_intensity);
    col = mix(col, u_color1, smoothstep(0.44, 0.78, fold + spec * 0.25) * 0.92);
    col += (u_color1 * spec * 0.35 + u_color0 * fresnel * 0.25) * u_intensity;
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
    // 12 — Chromatic Prism: macro optical glass caustics with 5-band spectral dispersion
    vec2 q = p * 0.36;
    float e = 0.05;
    float h = liquidHeight(q, t * 0.75, u_distortion);
    float hx = liquidHeight(q + vec2(e, 0.0), t * 0.75, u_distortion);
    float hy = liquidHeight(q + vec2(0.0, e), t * 0.75, u_distortion);
    vec2 grad = vec2(hx - h, hy - h) / e;
    vec2 dir = normalize(grad + 0.0001);
    float dispScale = 0.065 + 0.045 * u_distortion;

    float lR = smoothstep(0.48, 0.68, liquidHeight(q + dir * dispScale * 1.4, t * 0.75, u_distortion));
    float lY = smoothstep(0.48, 0.68, liquidHeight(q + dir * dispScale * 0.7, t * 0.75, u_distortion));
    float lG = smoothstep(0.48, 0.68, h);
    float lC = smoothstep(0.48, 0.68, liquidHeight(q - dir * dispScale * 0.7, t * 0.75, u_distortion));
    float lB = smoothstep(0.48, 0.68, liquidHeight(q - dir * dispScale * 1.4, t * 0.75, u_distortion));

    vec3 glass = vec3(
      lR * 0.75 + lY * 0.35,
      lY * 0.25 + lG * 0.55 + lC * 0.25,
      lC * 0.35 + lB * 0.75
    );
    float core = smoothstep(0.56, 0.78, h);
    col = mix(u_color2, glass * 1.15 * u_intensity, clamp(length(glass) * 0.9, 0.0, 1.0));
    col = mix(col, u_color0 * 1.1, core * 0.92 * u_intensity);
  } else if (u_preset == 12) {
    // 13 — Kinetic Torus: 48-step raymarched 3D sculpture with AO & studio rim light
    vec2 tilt = (u_mouse - 0.5) * u_pointerStrength * 0.9;
    vec3 ro = vec3(0.0, 0.0, 2.02);
    vec3 rd = normalize(vec3(uv * 1.12, -1.55));

    float rx = 0.38 + tilt.y;
    float ry = t * 0.32 + tilt.x;
    mat2 rotX = mat2(cos(rx), -sin(rx), sin(rx), cos(rx));
    mat2 rotY = mat2(cos(ry), -sin(ry), sin(ry), cos(ry));

    float distAcc = 0.0;
    bool hit = false;
    vec3 hitPos = vec3(0.0);
    for (int i = 0; i < 48; i++) {
      vec3 sp = ro + rd * distAcc;
      sp.yz = rotX * sp.yz;
      sp.xz = rotY * sp.xz;
      float d = torusSculptureSDF(sp, t, u_distortion);
      if (d < 0.0025) {
        hit = true;
        hitPos = sp;
        break;
      }
      distAcc += d;
      if (distAcc > 4.0) break;
    }

    col = u_color2;
    if (hit) {
      float eps = 0.004;
      vec3 n = normalize(vec3(
        torusSculptureSDF(hitPos + vec3(eps, 0.0, 0.0), t, u_distortion) - torusSculptureSDF(hitPos - vec3(eps, 0.0, 0.0), t, u_distortion),
        torusSculptureSDF(hitPos + vec3(0.0, eps, 0.0), t, u_distortion) - torusSculptureSDF(hitPos - vec3(0.0, eps, 0.0), t, u_distortion),
        torusSculptureSDF(hitPos + vec3(0.0, 0.0, eps), t, u_distortion) - torusSculptureSDF(hitPos - vec3(0.0, 0.0, eps), t, u_distortion)
      ));
      float ao = clamp(torusSculptureSDF(hitPos + n * 0.06, t, u_distortion) / 0.06, 0.18, 1.0);
      vec3 lightA = normalize(vec3(-0.6, 0.85, 0.7));
      vec3 lightB = normalize(vec3(0.75, -0.45, 0.5));
      float diffA = max(dot(n, lightA), 0.0);
      float diffB = max(dot(n, lightB), 0.0);
      vec3 viewDir = normalize(-rd);
      float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);
      float spec = pow(max(dot(n, normalize(lightA + viewDir)), 0.0), 22.0);
      col = (u_color2 * 0.35
          + u_color0 * (diffA * 0.78 + fresnel * 0.65) * u_intensity
          + u_color1 * (diffB * 0.5 + spec * 0.75) * u_intensity) * ao;
    }
  } else if (u_preset == 13) {
    // 14 — Particle Helix: 3D depth-of-field bokeh particle double-helix
    float a = -0.52;
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 huv = rot * (uv + (u_mouse - 0.5) * u_pointerStrength * 0.14);

    col = u_color2;
    for (int layer = 0; layer < 2; layer++) {
      float fl = float(layer);
      float density = 48.0 + fl * 18.0 + u_distortion * 10.0;
      vec2 cellId = floor(huv * density + fl * 13.7);
      vec2 cellUv = fract(huv * density + fl * 13.7) - 0.5;
      vec2 jitterOffset = (vec2(hash(cellId), hash(cellId + 31.4)) - 0.5) * 0.42;
      vec2 cp = (cellId + jitterOffset) / density;

      float phase = cp.x * (4.4 + u_distortion * 1.2) + t * 0.95;
      float s1 = sin(phase) * 0.25;
      float s2 = sin(phase + 3.14159265) * 0.25;
      float z1 = 0.5 + 0.5 * cos(phase);
      float z2 = 0.5 + 0.5 * cos(phase + 3.14159265);

      float d1 = abs(cp.y - s1);
      float d2 = abs(cp.y - s2);
      float band1 = smoothstep(0.11, 0.01, d1);
      float band2 = smoothstep(0.11, 0.01, d2);
      float depth = mix(z2, z1, step(d1, d2));
      float mask = max(band1, band2);

      float rand = hash(cellId + 7.1);
      float bokehBlur = mix(0.28, 0.08, depth);
      float dotR = mix(0.26, 0.14, depth) * (0.7 + 0.3 * rand);
      float dot = smoothstep(dotR + bokehBlur, dotR - bokehBlur * 0.35, length(cellUv - jitterOffset));
      float alpha = dot * mask * step(0.18, rand + mask * 0.65) * (0.35 + 0.65 * depth) * (1.0 - fl * 0.35);
      vec3 pCol = mix(u_color1, u_color0, clamp(depth * u_intensity, 0.0, 1.0));
      col = mix(col, pCol, clamp(alpha, 0.0, 1.0));
    }
  } else {
    // 15 — Bio Terrain: organic mossy crag with AO, glowing veins & HUD reticles
    vec2 shift = (u_mouse - 0.5) * u_pointerStrength * 0.12;
    vec2 iuv = uv + shift;
    float edgeNoise = (fbm(iuv * 3.8 + vec2(0.0, t * 0.03)) - 0.5) * (0.42 + 0.12 * u_distortion);
    float islandDist = length(iuv * vec2(0.84, 1.24)) + edgeNoise;
    float islandMask = smoothstep(0.46, 0.435, islandDist);

    float h = liquidHeight(iuv * 2.8, t * 0.28, u_distortion);
    float hx = liquidHeight((iuv + vec2(0.014, 0.0)) * 2.8, t * 0.28, u_distortion);
    float hy = liquidHeight((iuv + vec2(0.0, 0.014)) * 2.8, t * 0.28, u_distortion);
    vec3 n = normalize(vec3((h - hx) * 20.0, (h - hy) * 20.0, 1.0));
    float light = clamp(dot(n, normalize(vec3(-0.45, 0.72, 0.8))), 0.1, 1.0);
    float ao = smoothstep(0.22, 0.68, h);

    vec3 rock = vec3(0.06, 0.07, 0.06);
    vec3 moss = mix(u_color1, u_color0 * 0.82, smoothstep(0.48, 0.82, h));
    vec3 terrain = mix(rock, moss, smoothstep(0.3, 0.6, h)) * light * (0.4 + 0.6 * ao);

    float veinField = sin(fbm(iuv * 3.5 - vec2(t * 0.07, t * 0.05)) * 12.0);
    float veins = smoothstep(0.94, 0.995, abs(veinField)) * smoothstep(0.36, 0.72, h);
    terrain += u_color0 * veins * 1.45 * u_intensity;

    float dropShadow = smoothstep(0.58, 0.41, length((iuv - vec2(0.025, -0.045)) * vec2(0.84, 1.24)) + edgeNoise);
    col = mix(u_color2, u_color2 * 0.72, dropShadow * 0.5);
    col = mix(col, terrain, islandMask);

    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 boxCenter = vec2(sin(t * 0.22 + fi * 2.1) * 0.22, cos(t * 0.18 + fi * 1.7) * 0.14);
      vec2 boxHalf = vec2(0.11 + fi * 0.035);
      vec2 bd = abs(iuv - boxCenter) - boxHalf;
      float boxDist = abs(max(bd.x, bd.y));
      float stroke = smoothstep(0.003, 0.0008, boxDist) * step(min(bd.x, bd.y), 0.0);
      vec3 hudCol = mix(vec3(1.0), u_color0, step(1.5, fi));
      col = mix(col, hudCol, stroke * 0.6);
    }
  }

  col = acesFilm(col);
  float dither = (hash(v_uv * u_resolution + fract(t) * 37.0) - 0.5) * 0.012;
  gl_FragColor = vec4(clamp(col + dither, 0.0, 1.0), 1.0);
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
