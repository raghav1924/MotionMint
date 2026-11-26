import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  ShaderBackground,
  SHADER_PRESETS,
  type ShaderPresetId,
} from "@/registry/components/shader-background";
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
    expect(presets).toEqual(["silk", "aurora", "mercury", "flow", "noise", "energy"]);

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
});
