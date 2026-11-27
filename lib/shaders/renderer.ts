import { VERTEX_SHADER, FRAGMENT_SHADER } from "./glsl-source";
import { createShaderProgram, destroyShaderProgram } from "./shader-compiler";
import { resolveUniformLocations, parseHexToRgb } from "./uniform-manager";
import { resolveEffectiveDpr, createReducedMotionQuery } from "./quality-manager";
import { InteractionTracker } from "./interaction-manager";
import type { LogoSdfTextureData } from "./logo-sdf";
import type { ShaderRenderConfig } from "./types";

export interface ShaderRendererCallbacks {
  onFallback: () => void;
  onRestored: () => void;
}

export function mountShaderEngine(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  configRef: { current: ShaderRenderConfig },
  callbacks: ShaderRendererCallbacks,
  logoSdfRef?: { current: LogoSdfTextureData | null },
  logoExtentRef?: { current: number }
): () => void {
  const ctxOpts: WebGLContextAttributes = {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  };

  const gl2 = canvas.getContext("webgl2", ctxOpts) as WebGLRenderingContext | null;
  const gl = gl2 || (canvas.getContext("webgl", ctxOpts) as WebGLRenderingContext | null);

  if (!gl) {
    callbacks.onFallback();
    return () => {};
  }

  const compiled = createShaderProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER, Boolean(gl2));
  if (!compiled) {
    callbacks.onFallback();
    return () => {};
  }

  gl.useProgram(compiled.program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const posLoc = gl.getAttribLocation(compiled.program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uniforms = resolveUniformLocations(gl, compiled.program);
  const tracker = new InteractionTracker();

  let rafId: number | null = null;
  let isVisible = true;
  let isTabVisible = typeof document === "undefined" ? true : !document.hidden;
  let contextLost = false;
  let elapsed = 0;
  let wallElapsed = 0;
  let lastPresetIndex = configRef.current.presetIndex;
  let lastNow = performance.now();
  let logoTexture: WebGLTexture | null = null;
  let fallbackTexture: WebGLTexture | null = null;
  let lastUploadedSdf: LogoSdfTextureData | null = null;
  let hasLogoTexture = false;

  const ensureFallbackTexture = () => {
    if (fallbackTexture || typeof gl.createTexture !== "function") return;
    fallbackTexture = gl.createTexture();
    if (!fallbackTexture) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, fallbackTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([255, 0, 0, 255])
    );
  };

  const syncLogoTexture = (): boolean => {
    const nextSdf = logoSdfRef?.current ?? null;
    if (nextSdf === lastUploadedSdf) return false;
    lastUploadedSdf = nextSdf;
    const prevHasLogo = hasLogoTexture;

    if (!nextSdf || typeof gl.createTexture !== "function") {
      hasLogoTexture = false;
      ensureFallbackTexture();
      return false;
    }

    if (!logoTexture) {
      logoTexture = gl.createTexture();
    }
    if (!logoTexture) {
      hasLogoTexture = false;
      return false;
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, logoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      nextSdf.size,
      nextSdf.size,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      nextSdf.data
    );
    hasLogoTexture = true;
    return !prevHasLogo;
  };

  const mediaQuery = createReducedMotionQuery();
  const isReducedMotion = () =>
    Boolean(configRef.current.reducedMotion ?? mediaQuery?.matches);

  const resize = () => {
    const rect = container.getBoundingClientRect();
    const dpr = resolveEffectiveDpr(configRef.current.quality, configRef.current.maxDpr);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
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

    const cur = configRef.current;
    const logoJustActivated = syncLogoTexture();
    if (cur.presetIndex !== lastPresetIndex || (logoJustActivated && cur.presetIndex === 15)) {
      lastPresetIndex = cur.presetIndex;
      wallElapsed = 0;
    }
    if (!isReducedMotion()) {
      elapsed += dt * cur.speed;
      wallElapsed += dt;
    }
    const entryRaw = isReducedMotion() ? 1 : Math.min(1, wallElapsed / 1.45);
    const entryProgress = 1 - Math.pow(1 - entryRaw, 3);

    tracker.stepMouse(0.08);

    const ptrOn = tracker.isPointerEnabled(cur.interactive) && !isReducedMotion();
    const scrOn = tracker.isScrollEnabled(cur.interactive, cur.scrollReactive);

    const c0 = parseHexToRgb(cur.colors[0], [0.22, 0.74, 0.97]);
    const c1 = parseHexToRgb(cur.colors[1], [0.11, 0.31, 0.85]);
    const c2 = parseHexToRgb(cur.colors[2], [0.02, 0.04, 0.1]);

    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(
      uniforms.mouse,
      ptrOn ? tracker.currentMouse.x : 0.5,
      ptrOn ? tracker.currentMouse.y : 0.5
    );
    gl.uniform1f(uniforms.scroll, scrOn ? tracker.scrollProgress * cur.scrollStrength : 0);
    gl.uniform1f(uniforms.intensity, cur.intensity);
    gl.uniform1f(uniforms.distortion, cur.distortion);
    gl.uniform1f(uniforms.pointerStrength, ptrOn ? cur.pointerStrength : 0);
    gl.uniform3f(uniforms.color0, c0[0], c0[1], c0[2]);
    gl.uniform3f(uniforms.color1, c1[0], c1[1], c1[2]);
    gl.uniform3f(uniforms.color2, c2[0], c2[1], c2[2]);
    gl.uniform1i(uniforms.preset, cur.presetIndex);

    if (uniforms.flareOrigin) {
      gl.uniform2f(uniforms.flareOrigin, cur.flareOrigin.x, cur.flareOrigin.y);
    }
    if (uniforms.rayCount) gl.uniform1f(uniforms.rayCount, cur.rayCount);
    if (uniforms.glowRadius) gl.uniform1f(uniforms.glowRadius, cur.glowRadius);
    if (uniforms.lensStreak) gl.uniform1f(uniforms.lensStreak, cur.lensStreak);
    if (uniforms.noiseAmount) gl.uniform1f(uniforms.noiseAmount, cur.noiseAmount);
    if (uniforms.entry) gl.uniform1f(uniforms.entry, entryProgress);
    if (uniforms.logoMap) gl.uniform1i(uniforms.logoMap, 0);
    if (uniforms.hasLogo) gl.uniform1f(uniforms.hasLogo, hasLogoTexture ? 1 : 0);
    if (uniforms.logoExtent) gl.uniform1f(uniforms.logoExtent, logoExtentRef?.current ?? 0.36);
    if (typeof gl.activeTexture === "function") {
      const texToBind = hasLogoTexture ? logoTexture : (ensureFallbackTexture(), fallbackTexture);
      if (texToBind) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texToBind);
      }
    }

    const rLocs = [uniforms.ripple0, uniforms.ripple1, uniforms.ripple2, uniforms.ripple3];
    for (let i = 0; i < 4; i++) {
      const loc = rLocs[i];
      if (loc && gl.uniform4f) {
        const rp = tracker.ripples[i];
        gl.uniform4f(loc, rp.x, rp.y, rp.startTime, rp.intensity);
      }
    }

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
    if (!tracker.isPointerEnabled(configRef.current.interactive) || isReducedMotion()) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    tracker.targetMouse.x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    tracker.targetMouse.y = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!tracker.isPointerEnabled(configRef.current.interactive) || isReducedMotion()) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const ny = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
    tracker.pushRipple(nx, ny, elapsed, 1);
  };

  const onScroll = () => {
    if (!tracker.isScrollEnabled(configRef.current.interactive, configRef.current.scrollReactive)) {
      return;
    }
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    tracker.scrollProgress = window.scrollY / maxScroll;
  };

  const onVisibilityChange = () => {
    isTabVisible = !document.hidden;
    if (isTabVisible) startLoop();
    else stopLoop();
  };

  const onContextLost = (e: Event) => {
    e.preventDefault();
    contextLost = true;
    stopLoop();
    callbacks.onFallback();
  };

  const onContextRestored = () => {
    contextLost = false;
    callbacks.onRestored();
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
            if (isVisible) startLoop();
            else stopLoop();
          }
        })
      : null;
  intersectionObserver?.observe(container);

  container.addEventListener("pointermove", onPointerMove, { passive: true });
  container.addEventListener("pointerdown", onPointerDown, { passive: true });
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
    container.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    canvas.removeEventListener("webglcontextrestored", onContextRestored);

    if (logoTexture && typeof gl.deleteTexture === "function") {
      gl.deleteTexture(logoTexture);
    }
    if (fallbackTexture && typeof gl.deleteTexture === "function") {
      gl.deleteTexture(fallbackTexture);
    }
    if (buffer) gl.deleteBuffer(buffer);
    destroyShaderProgram(gl, compiled);
  };
}
