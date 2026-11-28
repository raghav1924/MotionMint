import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FocusScaleCarousel } from "@/registry/components/focus-scale-carousel";
import { FanCarousel } from "@/registry/components/fan-carousel";
import { RingGallery } from "@/registry/components/ring-gallery";
import { ParallaxCarousel } from "@/registry/components/parallax-carousel";

describe("Wave 4 — Carousels & Galleries", () => {
  it("FocusScaleCarousel steps through slides via buttons and keyboard arrows", () => {
    render(<FocusScaleCarousel />);
    expect(screen.getByText("Spring Curves (2/4)")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next focus slide" }));
    expect(screen.getByText("Shader Passes (3/4)")).toBeInTheDocument();

    const carousel = screen.getByLabelText("Focus scale carousel");
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
    expect(screen.getByText("Spring Curves (2/4)")).toBeInTheDocument();
  });

  it("FanCarousel brings clicked card to active state", () => {
    render(<FanCarousel />);
    expect(screen.getByText("Active: Cyberpunk")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Blueprint" }));
    expect(screen.getByText("Active: Blueprint")).toBeInTheDocument();
  });

  it("RingGallery rotates active orbital node", () => {
    render(<RingGallery />);
    fireEvent.click(screen.getByRole("button", { name: "Select Aurora" }));
    expect(screen.getByRole("button", { name: "Select Aurora" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    fireEvent.click(screen.getByRole("button", { name: "Rotate ring gallery" }));
    expect(screen.getByRole("button", { name: "Select Silk" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("ParallaxCarousel advances foreground and background layers", () => {
    render(<ParallaxCarousel />);
    expect(screen.getByText("Layered Parallax Stage")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next parallax slide" }));
    expect(screen.getByText("Offset Foreground Badge")).toBeInTheDocument();
  });
});
