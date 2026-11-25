import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionMintProvider } from "@/components/site/providers";
import HomePage from "@/app/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  if (typeof globalThis.IntersectionObserver === "undefined") {
    globalThis.IntersectionObserver = class IntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  }
});

describe("Phase 2.10 — Cinematic Homepage & Brand Experience", () => {
  it("renders all core homepage sections with accurate counts and interactive theme/DX/pricing controls", () => {
    render(
      <MotionMintProvider>
        <HomePage />
      </MotionMintProvider>
    );

    // Hero
    expect(
      screen.getByRole("heading", { name: "Interfaces should feel alive." })
    ).toBeInTheDocument();
    expect(screen.getByText(/Beautiful React components\. Extraordinary interactions\./i)).toBeInTheDocument();
    const heroWrapper = document.querySelector('[data-hero-scroll-stage]');
    expect(heroWrapper).toHaveAttribute("data-hero-scroll-stage", "reveal");
    expect(screen.getAllByRole("link", { name: /Explore Components/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Explore Themes/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Discover MotionMint Flow/i })).toBeInTheDocument();

    // Capability strip
    expect(screen.getByText("shadcn-compatible registry (50 items)")).toBeInTheDocument();

    // Theme differentiator — switching component theme never mutates documentElement
    fireEvent.click(screen.getByRole("button", { name: "Cyberpunk" }));
    fireEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
    expect(screen.getByText(/Cyberpunk · Dark/i)).toBeInTheDocument();

    // Flow showcase
    expect(screen.getByText("Simulated Execution Demo")).toBeInTheDocument();
    expect(screen.getByText(/Kahn DAG Valid/i)).toBeInTheDocument();

    // Developer DX package manager tab switch
    fireEvent.click(screen.getByRole("tab", { name: "npm" }));
    expect(screen.getByText(/npx shadcn@latest add @motionmint\/ripple-button/i)).toBeInTheDocument();

    // Pricing effort estimator
    expect(screen.getByText("48 hrs")).toBeInTheDocument();
    expect(screen.getByText("Open Core")).toBeInTheDocument();
    expect(screen.getByText("Pro Ecosystem")).toBeInTheDocument();

    // FAQ
    expect(screen.getByText("What is MotionMint Flow?")).toBeInTheDocument();
  });
});
