export interface ShaderUniformLocations {
  time: WebGLUniformLocation | null;
  resolution: WebGLUniformLocation | null;
  mouse: WebGLUniformLocation | null;
  scroll: WebGLUniformLocation | null;
  intensity: WebGLUniformLocation | null;
  distortion: WebGLUniformLocation | null;
  pointerStrength: WebGLUniformLocation | null;
  color0: WebGLUniformLocation | null;
  color1: WebGLUniformLocation | null;
  color2: WebGLUniformLocation | null;
  preset: WebGLUniformLocation | null;
  flareOrigin: WebGLUniformLocation | null;
  rayCount: WebGLUniformLocation | null;
  glowRadius: WebGLUniformLocation | null;
  lensStreak: WebGLUniformLocation | null;
  noiseAmount: WebGLUniformLocation | null;
  ripple0: WebGLUniformLocation | null;
  ripple1: WebGLUniformLocation | null;
  ripple2: WebGLUniformLocation | null;
  ripple3: WebGLUniformLocation | null;
}

export function resolveUniformLocations(
  gl: WebGLRenderingContext,
  program: WebGLProgram
): ShaderUniformLocations {
  return {
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
    flareOrigin: gl.getUniformLocation(program, "u_flareOrigin"),
    rayCount: gl.getUniformLocation(program, "u_rayCount"),
    glowRadius: gl.getUniformLocation(program, "u_glowRadius"),
    lensStreak: gl.getUniformLocation(program, "u_lensStreak"),
    noiseAmount: gl.getUniformLocation(program, "u_noiseAmount"),
    ripple0: gl.getUniformLocation(program, "u_ripple0"),
    ripple1: gl.getUniformLocation(program, "u_ripple1"),
    ripple2: gl.getUniformLocation(program, "u_ripple2"),
    ripple3: gl.getUniformLocation(program, "u_ripple3"),
  };
}

export function parseHexToRgb(
  hex: string,
  fallback: [number, number, number]
): [number, number, number] {
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
