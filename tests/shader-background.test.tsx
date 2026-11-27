import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  ShaderBackground,
  SHADER_PRESETS,
  type ShaderPresetId,
} from "@/registry/components/shader-background";
import * as logoSdfModule from "@/lib/shaders/logo-sdf";
import {
  buildSdfFromAlpha,
  computeEuclideanDistanceField,
} from "@/lib/shaders/logo-sdf";
import { getCatalogItem } from "@/lib/catalog";
import { MotionMintProvider } from "@/components/site/providers";
import { ComponentStudio } from "@/components/studio/component-studio";

vi.mock("next/navigation", () => ({
  usePathname: () => "/components/shader-background",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ShaderBackground — Raw WebGL Generative Canvas", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all 6 presets and falls back gracefully to CSS gradients when WebGL is unavailable", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const presets = Object.keys(SHADER_PRESETS) as ShaderPresetId[];
    expect(presets).toEqual([
      "logo-flare",
      "silk",
      "liquid-gold",
      "contour",
      "mercury",
      "pastel",
      "aurora",
      "flow",
      "noise",
      "liquid-drops",
      "ripple",
      "energy",
      "fluted-glass",
      "topography",
      "prism",
      "kinetic-torus",
      "particle-helix",
      "bio-terrain",
    ]);

    for (const preset of presets) {
      const { container, unmount } = render(
        <ShaderBackground preset={preset}>
          <span>{preset}</span>
        </ShaderBackground>
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveAttribute("data-shader-preset", preset);
      expect(root).toHaveAttribute("data-fallback", "css");
      expect(root.style.backgroundImage).toContain("radial-gradient");
      unmount();
    }
  });

  it("cleans up WebGL shaders, program, buffer, and observers on unmount without leaking", () => {
    const deleteBuffer = vi.fn();
    const deleteProgram = vi.fn();
    const deleteShader = vi.fn();
    const disconnect = vi.fn();

    globalThis.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect = disconnect;
    } as unknown as typeof IntersectionObserver;

    const mockGl = {
      VERTEX_SHADER: 35633,
      FRAGMENT_SHADER: 35632,
      COMPILE_STATUS: 35713,
      LINK_STATUS: 35714,
      ARRAY_BUFFER: 34962,
      STATIC_DRAW: 35044,
      FLOAT: 5126,
      TRIANGLES: 4,
      createShader: vi.fn(() => ({})),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn(() => true),
      deleteShader,
      createProgram: vi.fn(() => ({})),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn(() => true),
      deleteProgram,
      useProgram: vi.fn(),
      createBuffer: vi.fn(() => ({})),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      deleteBuffer,
      getAttribLocation: vi.fn(() => 0),
      enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      getUniformLocation: vi.fn(() => ({})),
      viewport: vi.fn(),
      uniform1f: vi.fn(),
      uniform2f: vi.fn(),
      uniform3f: vi.fn(),
      uniform1i: vi.fn(),
      drawArrays: vi.fn(),
    };

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      mockGl as unknown as RenderingContext
    );

    for (let i = 0; i < 3; i++) {
      const { unmount } = render(<ShaderBackground preset="aurora" />);
      unmount();
    }

    expect(deleteBuffer).toHaveBeenCalledTimes(3);
    expect(deleteProgram).toHaveBeenCalledTimes(3);
    expect(deleteShader).toHaveBeenCalledTimes(6);
    expect(disconnect).toHaveBeenCalledTimes(3);
  });

  it("renders static frame in reducedMotion mode without continuous RAF loop", () => {
    const rafSpy = vi.spyOn(window, "requestAnimationFrame");
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    render(<ShaderBackground preset="silk" reducedMotion />);
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("integrates into ComponentStudio with live preset and palette controls", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const item = getCatalogItem("shader-background");
    expect(item).toBeDefined();
    expect(item?.category).toBe("Backgrounds");

    render(
      <MotionMintProvider>
        <ComponentStudio item={item!} sourceCode="export function ShaderBackground() {}" />
      </MotionMintProvider>
    );

    expect(screen.getByRole("heading", { name: "Shader Background" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Aurora" }));
    expect(document.querySelector('[data-shader-preset="aurora"]')).toBeInTheDocument();
  });

  it("computes exact 2D Euclidean distance field for empty and non-empty logo masks", () => {
    const size = 16;
    const emptyAlpha = new Uint8Array(size * size);
    const emptySdf = buildSdfFromAlpha(emptyAlpha, size);
    expect(emptySdf.size).toBe(size);
    expect(emptySdf.data.length).toBe(size * size * 4);
    // Center should be near 0 distance, corner near 255
    const centerIdx = ((size / 2) * size + size / 2) * 4;
    expect(emptySdf.data[centerIdx]).toBe(0);
    expect(emptySdf.data[0]).toBe(255);

    const mask = new Uint8Array(size * size);
    // Single bright pixel at (8, 8)
    mask[8 * size + 8] = 1;
    const dist = computeEuclideanDistanceField(mask, size, size);
    expect(dist[8 * size + 8]).toBe(0);
    expect(dist[8 * size + 9]).toBeCloseTo(1, 5);
    expect(dist[9 * size + 9]).toBeCloseTo(Math.SQRT2, 4);

    const alpha = new Uint8Array(size * size);
    alpha[8 * size + 8] = 255;
    const sdf = buildSdfFromAlpha(alpha, size);
    expect(sdf.data[(8 * size + 8) * 4]).toBe(0);
    expect(sdf.data[(8 * size + 8) * 4 + 1]).toBe(255);
    expect(sdf.data[(8 * size + 8) * 4 + 2]).toBe(255);
    expect(sdf.data[0]).toBe(255);
  });

  it("does not re-trigger logo entry animation or SDF rebuild on unrelated prop re-renders", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const sdfSpy = vi
      .spyOn(logoSdfModule, "buildSvgDistanceField")
      .mockResolvedValue(null);

    let rafCb: FrameRequestCallback | null = null;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCb = cb;
      return 1;
    });

    const { rerender, container } = render(
      <ShaderBackground
        preset="logo-flare"
        intensity={1}
        logo={
          <svg width="88" height="88" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        }
      />
    );

    act(() => {
      rafCb?.(16);
    });

    const logoWrapper = container.querySelector('[aria-hidden="true"].transition-all');
    expect(logoWrapper).toHaveClass("opacity-100");
    expect(sdfSpy).toHaveBeenCalledTimes(1);

    // Re-render with a new inline JSX <svg> instance and updated slider prop
    rerender(
      <ShaderBackground
        preset="logo-flare"
        intensity={1.4}
        rayCount={20}
        logo={
          <svg width="88" height="88" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        }
      />
    );

    expect(logoWrapper).toHaveClass("opacity-100");
    expect(sdfSpy).toHaveBeenCalledTimes(1);
  });

  it("binds fallback texture and u_logoExtent uniform in WebGL mode and cleans up textures", () => {
    const createTexture = vi.fn(() => ({}));
    const bindTexture = vi.fn();
    const texImage2D = vi.fn();
    const deleteTexture = vi.fn();
    const uniform1f = vi.fn();
    const logoExtentLoc = { name: "u_logoExtent" };

    const mockGl = {
      VERTEX_SHADER: 35633,
      FRAGMENT_SHADER: 35632,
      COMPILE_STATUS: 35713,
      LINK_STATUS: 35714,
      ARRAY_BUFFER: 34962,
      STATIC_DRAW: 35044,
      FLOAT: 5126,
      TRIANGLES: 4,
      TEXTURE0: 33984,
      TEXTURE_2D: 3553,
      TEXTURE_WRAP_S: 10242,
      TEXTURE_WRAP_T: 10243,
      TEXTURE_MIN_FILTER: 10241,
      TEXTURE_MAG_FILTER: 10240,
      CLAMP_TO_EDGE: 33071,
      LINEAR: 9729,
      RGBA: 6408,
      UNSIGNED_BYTE: 5121,
      createShader: vi.fn(() => ({})),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn(() => true),
      deleteShader: vi.fn(),
      createProgram: vi.fn(() => ({})),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn(() => true),
      deleteProgram: vi.fn(),
      useProgram: vi.fn(),
      createBuffer: vi.fn(() => ({})),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      deleteBuffer: vi.fn(),
      createTexture,
      activeTexture: vi.fn(),
      bindTexture,
      texParameteri: vi.fn(),
      texImage2D,
      deleteTexture,
      getAttribLocation: vi.fn(() => 0),
      enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      getUniformLocation: vi.fn((_p: unknown, name: string) =>
        name === "u_logoExtent" ? logoExtentLoc : {}
      ),
      viewport: vi.fn(),
      uniform1f,
      uniform2f: vi.fn(),
      uniform3f: vi.fn(),
      uniform1i: vi.fn(),
      drawArrays: vi.fn(),
    };

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
      mockGl as unknown as RenderingContext
    );

    const { unmount } = render(<ShaderBackground preset="logo-flare" />);
    expect(createTexture).toHaveBeenCalledTimes(1);
    expect(bindTexture).toHaveBeenCalled();
    expect(texImage2D).toHaveBeenCalled();
    expect(uniform1f).toHaveBeenCalledWith(logoExtentLoc, 0.36);

    unmount();
    expect(deleteTexture).toHaveBeenCalledTimes(1);
  });
});
