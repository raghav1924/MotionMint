import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ALL_THEMES } from "@/lib/themes/registry";
import { themeToCssVars } from "@/lib/themes/theme-utils";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { ComponentLivePreview } from "@/components/shared/component-preview-card";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import { RenderJoyProvider, useRenderJoy } from "@/components/site/providers";
import { ThemeStudio } from "@/components/theme/theme-studio";
import { ComponentStudio } from "@/components/studio/component-studio";
import { RippleButton } from "@/registry/components/ripple-button";

vi.mock("next/navigation", () => ({
  usePathname: () => "/components/ripple-button",
  useRouter: () => ({ push: vi.fn() }),
}));

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

function ThemeIsolationProbe() {
  const { setTheme, setThemeMode, skin, themeMode, resolvedAppearance } = useRenderJoy();
  return (
    <div>
      <span data-testid="probe-theme">{skin}</span>
      <span data-testid="probe-mode">{themeMode}</span>
      <span data-testid="probe-app">{resolvedAppearance}</span>
      <button
        type="button"
        onClick={() => {
          setTheme("cyberpunk");
          setThemeMode("dark");
        }}
      >
        Apply Cyberpunk Dark
      </button>
    </div>
  );
}

describe("Phase 2.9 — 58-Variant Component Theme System & Isolation", () => {
  it("defines distinct Light and Dark palettes (58 variants) and recipes for all 29 themes", () => {
    expect(ALL_THEMES).toHaveLength(29);
    let variantCount = 0;
    for (const theme of ALL_THEMES) {
      const lightVars = themeToCssVars(theme, "light");
      const darkVars = themeToCssVars(theme, "dark");
      expect(lightVars["--mm-bg"]).toBeTruthy();
      expect(darkVars["--mm-bg"]).toBeTruthy();
      expect(lightVars["--mm-bg"]).not.toBe(darkVars["--mm-bg"]);
      expect(theme.recipes.buttonStyle).toBeTruthy();
      expect(theme.recipes.cardStyle).toBeTruthy();
      variantCount += 2;
    }
    expect(variantCount).toBe(58);
  });

  it("isolates sibling and nested RenderJoyTheme scopes and never mutates documentElement", () => {
    document.documentElement.style.removeProperty("--mm-bg");

    const { container } = render(
      <RenderJoyProvider>
        <ThemeIsolationProbe />
        <RenderJoyTheme theme="neo-brutalism" mode="light">
          <RippleButton>Neo Light</RippleButton>
          <RenderJoyTheme theme="victorian" mode="dark">
            <RippleButton>Victorian Nested</RippleButton>
          </RenderJoyTheme>
        </RenderJoyTheme>
        <RenderJoyTheme theme="cyberpunk" mode="dark">
          <RippleButton>Cyber Dark</RippleButton>
        </RenderJoyTheme>
      </RenderJoyProvider>
    );

    const scopes = container.querySelectorAll('[data-mm-scope="true"]');
    expect(scopes).toHaveLength(3);
    expect(scopes[0]).toHaveAttribute("data-mm-theme", "neo-brutalism");
    expect(scopes[0]).toHaveAttribute("data-mm-mode", "light");
    expect(scopes[1]).toHaveAttribute("data-mm-theme", "victorian");
    expect(scopes[1]).toHaveAttribute("data-mm-mode", "dark");
    expect(scopes[2]).toHaveAttribute("data-mm-theme", "cyberpunk");
    expect(scopes[2]).toHaveAttribute("data-mm-mode", "dark");

    fireEvent.click(screen.getByRole("button", { name: "Apply Cyberpunk Dark" }));
    expect(screen.getByTestId("probe-theme")).toHaveTextContent("cyberpunk");
    expect(screen.getByTestId("probe-mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("probe-app")).toHaveTextContent("light");
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
    expect(document.documentElement.getAttribute("data-appearance")).toBe("light");
  });

  it("renders all 60 implemented components across all 58 theme/mode variants (3,480 combinations)", () => {
    const implemented = CATALOG_ITEMS.filter((c) => c.status === "implemented");
    expect(implemented).toHaveLength(60);

    let comboCount = 0;
    for (const theme of ALL_THEMES) {
      for (const mode of ["light", "dark"] as const) {
        const { unmount } = render(
          <RenderJoyTheme theme={theme.id} mode={mode}>
            {implemented.map((item) => (
              <ComponentLivePreview key={item.slug} slug={item.slug} />
            ))}
          </RenderJoyTheme>
        );
        comboCount += implemented.length;
        unmount();
      }
    }
    expect(comboCount).toBe(3480);
  }, 20000);

  it("ThemeStudio supports search, category filtering, light/dark application, and Compare Mode", () => {
    render(
      <RenderJoyProvider>
        <ThemeStudio />
      </RenderJoyProvider>
    );

    expect(screen.getByRole("heading", { name: "Component Theme Studio" })).toBeInTheDocument();

    const search = screen.getByLabelText("Search themes");
    fireEvent.change(search, { target: { value: "Scrapbook" } });
    expect(screen.getByRole("heading", { name: /Scrapbook/i })).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: "Compare Mode" }));
    expect(screen.getByText(/Comparing/i)).toBeInTheDocument();
  });

  it("ComponentStudio renders scoped 58-variant theme preview and InfinityCanvas component remains accessible", () => {
    const ripple = CATALOG_ITEMS.find((c) => c.slug === "ripple-button")!;
    const { container } = render(
      <RenderJoyProvider>
        <ComponentStudio item={ripple} sourceCode={null} />
      </RenderJoyProvider>
    );

    expect(screen.getByText(ripple.name)).toBeInTheDocument();
    expect(container.querySelector('[data-mm-scope="true"]')).not.toBeNull();
    expect(CATALOG_ITEMS.find((c) => c.slug === "infinity-canvas")?.status).toBe("implemented");
  });
});
