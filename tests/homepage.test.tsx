import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RenderJoyProvider } from "@/components/site/providers";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
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

describe("Phase 2.12 — Editorial Brand Identity & Homepage Redesign", () => {
  it("renders the 6-beat editorial homepage with interactive scoped Themes+Flow split", () => {
    render(
      <RenderJoyProvider>
        <Navbar />
        <HomePage />
        <Footer />
      </RenderJoyProvider>
    );

    // Editorial Navbar (no sound toggle or 29-theme dropdown in header)
    expect(screen.getByRole("link", { name: /RenderJoy home/i })).toBeInTheDocument();
    expect(screen.queryByText(/Sound Off/i)).not.toBeInTheDocument();

    // Hero
    expect(
      screen.getByRole("heading", { name: "Interfaces should feel alive." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/An expressive collection of React components, motion and interactions/i)
    ).toBeInTheDocument();
    const heroWrapper = document.querySelector("[data-hero-scroll-stage]");
    expect(heroWrapper).toHaveAttribute("data-hero-scroll-stage", "reveal");
    expect(screen.getAllByRole("link", { name: /Explore Components/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Discover Themes/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Discover RenderJoy Flow/i })).toBeInTheDocument();

    // Capability strip
    expect(screen.getByText("shadcn-compatible registry (50 items)")).toBeInTheDocument();

    // Selected Work Exhibition (5 curated pieces)
    expect(screen.getByRole("heading", { name: "Made to move." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore the library/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Swipe Card Deck" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI Prompt Composer" })).toBeInTheDocument();

    // Split Themes + Flow section
    expect(screen.getByRole("heading", { name: "29 languages. 58 expressions." })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cyberpunk" }));
    fireEvent.click(screen.getByRole("button", { name: "dark" }));
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");
    expect(screen.getByText(/Cyberpunk · dark/i)).toBeInTheDocument();

    expect(screen.getByText("Simulated Demo")).toBeInTheDocument();
    expect(screen.getByText(/DAG Valid \(/i)).toBeInTheDocument();

    // Compact Developer CTA
    expect(
      screen.getByRole("heading", { name: "Your next interface starts here." })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse 44 Components/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read Installation Docs/i })).toBeInTheDocument();

    // Editorial Footer
    expect(screen.getByRole("heading", { name: "Make something memorable." })).toBeInTheDocument();
  }, 15000);
});
