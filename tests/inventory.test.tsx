import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FULL_INVENTORY } from "@/lib/inventory";
import { CatalogueBrowser } from "@/components/site/catalogue-browser";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ParticleWordmark } from "@/components/site/particle-wordmark";

describe("Phase 2.6 — Complete Catalogue Inventory & Homepage Modules", () => {
  it("builds a complete typed inventory with 44 available items and 200+ total items", () => {
    expect(FULL_INVENTORY.length).toBeGreaterThan(200);
    const available = FULL_INVENTORY.filter((i) => i.status === "available");
    expect(available).toHaveLength(44);

    const planned = FULL_INVENTORY.filter((i) => i.status === "planned");
    expect(planned.length).toBeGreaterThan(160);
    expect(planned.every((p) => p.previewType === "roadmap")).toBe(true);

    const ids = new Set(FULL_INVENTORY.map((i) => i.id));
    expect(ids.size).toBe(FULL_INVENTORY.length);
  });

  it("CatalogueBrowser defaults to Available Now and switches to Full Inventory", () => {
    render(<CatalogueBrowser />);
    expect(screen.getByRole("button", { name: /Available Now \(44\)/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: /Full Inventory/i }));
    expect(screen.getByText(/Includes planned roadmap items/i)).toBeInTheDocument();
  });

  it("FaqAccordion toggles answers with aria-expanded", () => {
    render(<FaqAccordion />);
    const secondQ = screen.getByRole("button", { name: /Why is sound off by default/i });
    expect(secondQ).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(secondQ);
    expect(secondQ).toHaveAttribute("aria-expanded", "true");
  });

  it("ParticleWordmark renders static text fallback under prefers-reduced-motion", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    render(<ParticleWordmark text="MotionMint" />);
    expect(screen.getByText("MotionMint")).toBeInTheDocument();
  });
});
