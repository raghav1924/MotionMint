import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RenderJoyProvider } from "@/components/site/providers";
import { BenchWorkspace } from "@/components/bench/bench-workspace";

describe("Phase B2 — RenderJoy Bench Full-Canvas Workspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  it("renders starter side-by-side specimens, supports adding/duplicating/removing, and persists locally", () => {
    const { container, unmount } = render(
      <RenderJoyProvider>
        <BenchWorkspace />
      </RenderJoyProvider>
    );

    expect(container.querySelectorAll("[data-bench-specimen]").length).toBe(4);
    expect(document.documentElement.style.getPropertyValue("--mm-bg")).toBe("");

    // Zoom in and out
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("110%")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Fit view" }));
    expect(screen.getByText("100%")).toBeInTheDocument();

    // Add a new specimen
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: /3D Tactile Push Button/i }));
    expect(container.querySelectorAll("[data-bench-specimen]").length).toBe(5);

    // Change selected specimen theme & mode in Inspector
    fireEvent.change(screen.getByLabelText("Specimen theme"), {
      target: { value: "glassmorphism" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Specimen dark mode" }));

    // Duplicate and remove
    fireEvent.click(screen.getByRole("button", { name: "Duplicate" }));
    expect(container.querySelectorAll("[data-bench-specimen]").length).toBe(6);
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(container.querySelectorAll("[data-bench-specimen]").length).toBe(5);

    // Unmount and remount to verify localStorage persistence
    unmount();
    const { container: remounted } = render(
      <RenderJoyProvider>
        <BenchWorkspace />
      </RenderJoyProvider>
    );
    expect(remounted.querySelectorAll("[data-bench-specimen]").length).toBe(5);
  });
});
