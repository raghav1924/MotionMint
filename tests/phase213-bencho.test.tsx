import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionMintProvider } from "@/components/site/providers";
import { CATALOG_ITEMS, getCatalogItem } from "@/lib/catalog";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";
import { ComponentStudio } from "@/components/studio/component-studio";
import { ThemeStudio } from "@/components/theme/theme-studio";

vi.mock("next/navigation", () => ({
  usePathname: () => "/components",
  useRouter: () => ({ push: vi.fn() }),
}));

beforeAll(() => {
  if (typeof globalThis.IntersectionObserver === "undefined") {
    globalThis.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  }
});

describe("Phase 2.13 — Bencho-Inspired Interactive Component Experience", () => {
  it("populates typed interaction metadata and capabilities across all 45 implemented components", () => {
    const implemented = CATALOG_ITEMS.filter((c) => c.status === "implemented");
    expect(implemented).toHaveLength(45);
    for (const item of implemented) {
      expect(item.interactions.length).toBeGreaterThan(0);
      expect(item.interactionHint.length).toBeGreaterThan(0);
      expect(item.livePreview).toBe(true);
      expect(item.comparisonSupported).toBe(true);
    }
  });

  it("filters /components by interaction taxonomy pills", () => {
    render(
      <MotionMintProvider>
        <CatalogueBrowser />
      </MotionMintProvider>
    );

    const swipeBtn = screen.getByRole("button", { name: "Swipe" });
    fireEvent.click(swipeBtn);
    expect(swipeBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Swipe Card Deck")).toBeInTheDocument();
  });

  it("supports real property tuning, Code view, and Comparison Workbench in ComponentStudio", () => {
    const ripple = getCatalogItem("ripple-button");
    expect(ripple).toBeDefined();

    render(
      <MotionMintProvider>
        <ComponentStudio item={ripple!} sourceCode={"export function RippleButton() { return null; }"} />
      </MotionMintProvider>
    );

    // Live property tuning updates preview
    const labelInput = screen.getByLabelText("Label");
    fireEvent.change(labelInput, { target: { value: "Launch Experiment" } });
    expect(screen.getByRole("button", { name: "Launch Experiment" })).toBeInTheDocument();

    // Switch to Code view
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    expect(screen.getByText(/export function RippleButton/)).toBeInTheDocument();

    // Switch to Compare workbench and reset all specimens
    fireEvent.click(screen.getByRole("tab", { name: "Compare" }));
    expect(screen.getByText("Compare Ripple Button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset All Specimens" })).toBeInTheDocument();
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
  });

  it("renders ComparisonWorkbench inside ThemeStudio without leaking theme variables", () => {
    render(
      <MotionMintProvider>
        <ThemeStudio />
      </MotionMintProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Compare Mode/i }));
    expect(screen.getByRole("button", { name: "Reset All Specimens" })).toBeInTheDocument();
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
  });
});
