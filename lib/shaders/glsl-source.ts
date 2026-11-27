export const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
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
uniform vec2 u_flareOrigin;
uniform float u_rayCount;
uniform float u_glowRadius;
uniform float u_lensStreak;
uniform float u_noiseAmount;
uniform vec4 u_ripple0;
uniform vec4 u_ripple1;
uniform vec4 u_ripple2;
uniform vec4 u_ripple3;

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

float rippleWave(vec2 uv, vec4 rData, float t, float aspect) {
  if (rData.w <= 0.001) return 0.0;
  float age = t - rData.z;
  if (age < 0.0 || age > 3.5) return 0.0;
  vec2 origin = (rData.xy - 0.5) * vec2(aspect, 1.0);
  float dist = length(uv - origin);
  float radius = age * 0.45;
  float ring = exp(-pow((dist - radius) * 14.0, 2.0));
  float decay = exp(-age * 1.15);
  return ring * decay * rData.w;
}

void main() {
  float aspectRatio = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 aspect = vec2(aspectRatio, 1.0);
  vec2 uv = (v_uv - 0.5) * aspect;
  vec2 mouse = (u_mouse - 0.5) * aspect;

  float distToMouse = length(uv - mouse);
  float pointerWarp = exp(-distToMouse * 2.4) * u_pointerStrength;
  vec2 p = uv * (1.8 + u_distortion * 0.8);
  p += normalize(uv - mouse + 0.0001) * pointerWarp * 0.45;
  p.y += u_scroll * 0.35;

  float t = u_time;
  vec3 col = u_color2;

  if (u_preset == 15) {
    // 15 — Logo Flare (Flagship): Polar volumetric beams + Gaussian bloom + lens streak
    vec2 origin = (u_flareOrigin - 0.5) * aspect + mouse * (0.18 * u_pointerStrength);
    origin.y -= u_scroll * 0.14;
    vec2 delta = uv - origin;
    float r = length(delta);
    float angle = atan(delta.y, delta.x);

    float rayN = max(4.0, u_rayCount);
    float n1 = fbm(vec2(cos(angle) * 2.5 + t * 0.08, sin(angle) * 2.5 - t * 0.06));
    float n2 = fbm(vec2(angle * 3.0 + t * 0.12, r * 2.2 - t * 0.15));

    float primaryBeams = pow(0.5 + 0.5 * cos(angle * rayN + n1 * 2.4 * u_distortion + t * 0.18), 3.6);
    float secondaryBeams = pow(0.5 + 0.5 * cos(angle * (rayN * 0.5) - n2 * 1.8 - t * 0.11), 6.0);
    float fineRays = pow(0.5 + 0.5 * cos(angle * (rayN * 2.1) + n1 * 3.8 + t * 0.25), 8.0) * 0.55;

    float radialAtten = exp(-r * (1.65 / max(0.35, u_glowRadius)));
    float beamField = (primaryBeams * 0.7 + secondaryBeams * 0.85 + fineRays) * radialAtten;
    beamField *= (0.72 + 0.48 * n2 * u_noiseAmount);

    // Central blue-white Gaussian bloom
    float coreBloom = exp(-r * r / (0.045 * max(0.25, u_glowRadius)));
    float midBloom = exp(-r * 2.6 / max(0.4, u_glowRadius));

    // Horizontal optical lens streak
    float streakH = exp(-abs(delta.y) * 26.0) * exp(-abs(delta.x) * 2.2) * u_lensStreak;
    float streakSecondary = exp(-length(delta - vec2(-origin.x * 0.35, 0.0)) * 7.0) * 0.25 * u_lensStreak;

    float atmosphere = fbm(uv * 2.4 + vec2(t * 0.05, -t * 0.04)) * 0.16 * u_noiseAmount;
    float vignette = smoothstep(1.25, 0.22, r);

    vec3 deepBase = mix(u_color2 * 0.45, u_color2, vignette) + u_color1 * atmosphere;
    vec3 rayColor = mix(u_color1, u_color0, clamp(beamField * 1.15, 0.0, 1.0));
    vec3 hotCore = mix(u_color0, vec3(0.92, 0.97, 1.0), 0.72);

    col = deepBase;
    col += rayColor * beamField * 1.35 * u_intensity;
    col += mix(u_color1, u_color0, 0.65) * midBloom * 0.75 * u_intensity;
    col += hotCore * (coreBloom * 1.45 + streakH + streakSecondary) * u_intensity;
  } else if (u_preset == 16) {
    // 16 — Liquid Drops: refractive droplets with surface tension
    vec2 g = uv * (3.2 + u_distortion * 1.4);
    float dropField = 0.0;
    vec2 gradSum = vec2(0.0);
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 center = vec2(
        sin(t * (0.28 + fi * 0.05) + fi * 2.1) * 0.9,
        cos(t * (0.22 + fi * 0.04) + fi * 1.7) * 0.6
      );
      center += (mouse - center) * 0.22 * u_pointerStrength;
      vec2 d = g * 0.42 - center;
      float r = length(d);
      float blob = exp(-r * r * (3.6 - fi * 0.25));
      dropField += blob;
      gradSum += d * blob;
    }
    float ridge = smoothstep(0.32, 0.72, dropField);
    float spec = pow(clamp(dot(normalize(vec3(gradSum * 3.0, 1.0)), normalize(vec3(0.4, 0.6, 1.0))), 0.0, 1.0), 18.0);
    col = mix(u_color2, u_color1, ridge * 0.85 * u_intensity);
    col = mix(col, u_color0, clamp((spec * 0.9 + smoothstep(0.65, 1.1, dropField) * 0.5) * u_intensity, 0.0, 1.0));
  } else if (u_preset == 17) {
    // 17 — Ripple: pointer/click circular waves with decay
    float ambient = sin(length(uv - mouse) * 14.0 - t * 2.4) * 0.5 + 0.5;
    float hoverRing = ambient * exp(-length(uv - mouse) * 2.8) * 0.45 * u_pointerStrength;
    float clickWaves =
      rippleWave(uv, u_ripple0, t, aspectRatio) +
      rippleWave(uv, u_ripple1, t, aspectRatio) +
      rippleWave(uv, u_ripple2, t, aspectRatio) +
      rippleWave(uv, u_ripple3, t, aspectRatio);
    float wave = clamp(hoverRing + clickWaves * 1.15, 0.0, 1.4);
    float bgMist = fbm(p * 0.9 + vec2(t * 0.06, -t * 0.05)) * 0.35;
    col = mix(u_color2, u_color1, bgMist);
    col += mix(u_color1, u_color0, smoothstep(0.2, 0.9, wave)) * wave * u_intensity;
  } else if (u_preset == 0) {
    float q = fbm(p + vec2(t * 0.14, -t * 0.1));
    float r = fbm(p + q * (1.4 * u_distortion) + vec2(t * 0.18, t * 0.12));
    float ribbon = smoothstep(0.2, 0.85, sin((p.x * 1.4 + r * 3.2) + t * 0.3) * 0.5 + 0.5);
    col = mix(u_color2, u_color0, clamp(r * 1.15, 0.0, 1.0));
    col = mix(col, u_color1, ribbon * 0.72 * u_intensity);
  } else if (u_preset == 1) {
    float wave = sin(p.x * 2.2 + t * 0.28 + fbm(p * 1.2) * 2.5 * u_distortion);
    float curtain = smoothstep(-0.4, 0.9, wave) * smoothstep(0.95, -0.35, uv.y + 0.25);
    float glow = fbm(vec2(p.x * 0.9, p.y * 0.4 - t * 0.12));
    col = mix(u_color2, u_color0, curtain * 0.85 * u_intensity);
    col = mix(col, u_color1, glow * curtain * 0.9 * u_intensity);
  } else if (u_preset == 2) {
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
    float f1 = fbm(p * 0.9 + vec2(t * 0.1, t * 0.08));
    float f2 = fbm(p * 1.4 + vec2(-t * 0.12, f1 * 1.6 * u_distortion));
    col = mix(u_color2, u_color0, smoothstep(0.15, 0.85, f1) * u_intensity);
    col = mix(col, u_color1, smoothstep(0.3, 0.9, f2) * 0.8 * u_intensity);
  } else if (u_preset == 4) {
    float n = fbm(p * 1.6 + vec2(t * 0.09, -t * 0.07) * u_distortion);
    float grain = (hash(v_uv * u_resolution + fract(t) * 100.0) - 0.5) * 0.09;
    col = mix(u_color2, u_color0, smoothstep(0.2, 0.8, n) * u_intensity);
    col = mix(col, u_color1, smoothstep(0.45, 0.95, n) * 0.75 * u_intensity);
    col += grain;
  } else if (u_preset == 5) {
    vec2 warped = p + vec2(fbm(p + t * 0.2), fbm(p - t * 0.2)) * 0.55 * u_distortion;
    float gridX = abs(sin(warped.x * 4.5));
    float gridY = abs(sin(warped.y * 4.5));
    float field = pow(1.0 - min(gridX, gridY), 4.0) * u_intensity;
    float pulse = 0.5 + 0.5 * sin(t * 0.9 - length(uv) * 3.0);
    col = mix(u_color2, u_color0, clamp(field * 0.75, 0.0, 1.0));
    col = mix(col, u_color1, clamp(field * pulse, 0.0, 1.0));
  } else if (u_preset == 6) {
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
    float h = liquidHeight(p * 1.05, t * 0.85, u_distortion);
    float bands = sin(h * 18.0);
    float primaryMask = smoothstep(-0.15, 0.35, bands);
    float goldMask = smoothstep(0.65, 0.96, bands);
    float crevice = smoothstep(-0.85, -0.35, bands);
    col = mix(u_color2, u_color0, primaryMask * crevice * u_intensity);
    col = mix(col, u_color1, goldMask * 0.95 * u_intensity);
  } else if (u_preset == 8) {
    vec2 dir = vec2(p.x * 0.7 + p.y * 0.45, p.y * 0.85 - p.x * 0.25);
    float brush = fbm(vec2(dir.x * 0.7 + t * 0.08, dir.y * 2.4 - t * 0.05) * u_distortion);
    float sweep = smoothstep(-0.7, 0.75, uv.x * 0.85 + (brush - 0.5) * 0.65);
    float coreGlow = smoothstep(0.72, 0.08, length(uv - vec2(-0.08, -0.15)) - (brush - 0.5) * 0.25);
    col = mix(u_color0, u_color2, sweep);
    col = mix(col, u_color1, clamp(coreGlow * 0.88 * u_intensity, 0.0, 1.0));
  } else if (u_preset == 9) {
    float ribCount = 16.0 + u_distortion * 6.0;
    float ribPhase = fract(v_uv.x * ribCount) - 0.5;
    float lensOffset = sin(ribPhase * 3.14159265) * (0.09 + 0.05 * u_distortion);
    vec2 baseUv = uv * 1.15 + vec2(pointerWarp * 0.25, u_scroll * 0.25);
    float hR = liquidHeight(baseUv + vec2(lensOffset * 1.25, 0.0), t * 0.85, 0.9);
    float hG = liquidHeight(baseUv + vec2(lensOffset * 1.0, 0.0), t * 0.85, 0.9);
    float hB = liquidHeight(baseUv + vec2(lensOffset * 0.75, 0.0), t * 0.85, 0.9);
    vec3 glassSample = vec3(smoothstep(0.24, 0.78, hR), smoothstep(0.24, 0.78, hG), smoothstep(0.24, 0.78, hB));
    vec3 tinted = mix(u_color2, mix(u_color1, u_color0, glassSample), clamp(glassSample * u_intensity, 0.0, 1.0));
    float ridge = pow(clamp(abs(ribPhase) * 2.0, 0.0, 1.0), 5.0);
    float groove = smoothstep(0.42, 0.5, abs(ribPhase));
    col = mix(tinted, u_color2 * 0.6, groove * 0.55);
    col += u_color0 * ridge * 0.18 * u_intensity;
  } else if (u_preset == 10) {
    float elev = fbm(p * 0.85 + vec2(t * 0.09, -t * 0.07)) + 0.45 * fbm(p * 0.55 - vec2(t * 0.06, t * 0.08));
    float wave = sin(elev * (11.0 + u_distortion * 5.0));
    float bandMask = smoothstep(0.14, 0.21, wave);
    col = mix(u_color2, u_color0, bandMask * clamp(u_intensity, 0.4, 1.0));
  } else if (u_preset == 11) {
    vec2 q = p * 0.36;
    float e = 0.05;
    float h = liquidHeight(q, t * 0.75, u_distortion);
    float hx = liquidHeight(q + vec2(e, 0.0), t * 0.75, u_distortion);
    float hy = liquidHeight(q + vec2(0.0, e), t * 0.75, u_distortion);
    vec2 dir = normalize(vec2(hx - h, hy - h) / e + 0.0001);
    float dispScale = 0.065 + 0.045 * u_distortion;
    float lR = smoothstep(0.48, 0.68, liquidHeight(q + dir * dispScale * 1.4, t * 0.75, u_distortion));
    float lY = smoothstep(0.48, 0.68, liquidHeight(q + dir * dispScale * 0.7, t * 0.75, u_distortion));
    float lG = smoothstep(0.48, 0.68, h);
    float lC = smoothstep(0.48, 0.68, liquidHeight(q - dir * dispScale * 0.7, t * 0.75, u_distortion));
    float lB = smoothstep(0.48, 0.68, liquidHeight(q - dir * dispScale * 1.4, t * 0.75, u_distortion));
    vec3 glass = vec3(lR * 0.75 + lY * 0.35, lY * 0.25 + lG * 0.55 + lC * 0.25, lC * 0.35 + lB * 0.75);
    float core = smoothstep(0.56, 0.78, h);
    col = mix(u_color2, glass * 1.15 * u_intensity, clamp(length(glass) * 0.9, 0.0, 1.0));
    col = mix(col, u_color0 * 1.1, core * 0.92 * u_intensity);
  } else if (u_preset == 12) {
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
      if (d < 0.0025) { hit = true; hitPos = sp; break; }
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
      col = (u_color2 * 0.35 + u_color0 * (diffA * 0.78 + fresnel * 0.65) * u_intensity + u_color1 * (diffB * 0.5 + spec * 0.75) * u_intensity) * ao;
    }
  } else if (u_preset == 13) {
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
      float mask = max(smoothstep(0.11, 0.01, d1), smoothstep(0.11, 0.01, d2));
      float depth = mix(z2, z1, step(d1, d2));
      float rand = hash(cellId + 7.1);
      float bokehBlur = mix(0.28, 0.08, depth);
      float dotR = mix(0.26, 0.14, depth) * (0.7 + 0.3 * rand);
      float dot = smoothstep(dotR + bokehBlur, dotR - bokehBlur * 0.35, length(cellUv - jitterOffset));
      float alpha = dot * mask * step(0.18, rand + mask * 0.65) * (0.35 + 0.65 * depth) * (1.0 - fl * 0.35);
      vec3 pCol = mix(u_color1, u_color0, clamp(depth * u_intensity, 0.0, 1.0));
      col = mix(col, pCol, clamp(alpha, 0.0, 1.0));
    }
  } else {
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
  }

  col = acesFilm(col);
  float dither = (hash(v_uv * u_resolution + fract(t) * 37.0) - 0.5) * 0.012;
  gl_FragColor = vec4(clamp(col + dither, 0.0, 1.0), 1.0);
}
`;
