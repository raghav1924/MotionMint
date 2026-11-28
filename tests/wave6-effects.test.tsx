import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AsciiWebgl } from "@/registry/components/ascii-webgl";
import { DitherField } from "@/registry/components/dither-field";
import { PixelTrail } from "@/registry/components/pixel-trail";
import { RetroCrt } from "@/registry/components/retro-crt";

describe("Wave 6 — Visual Effects Components", () => {
  it("AsciiWebgl renders character matrix and children cleanly", () => {
    const { container } = render(
      <AsciiWebgl cols={16} rows={6}>
        <span>Matrix Overlay</span>
      </AsciiWebgl>
    );
    expect(container.querySelector("pre")).toBeInTheDocument();
    expect(screen.getByText("Matrix Overlay")).toBeInTheDocument();
  });

  it("DitherField renders ordered Bayer matrix", () => {
    const { container } = render(<DitherField cols={8} rows={4} />);
    expect(container.querySelectorAll("span").length).toBe(32);
  });

  it("PixelTrail activates cells on hover/focus/click", () => {
    render(<PixelTrail cols={4} rows={3} />);
    const cell = screen.getByRole("button", { name: "Pixel cell 5" });
    fireEvent.click(cell);
    expect(cell).toHaveClass("scale-105");
  });

  it("RetroCrt toggles scanlines overlay", () => {
    const { container } = render(<RetroCrt label="CH-09" />);
    expect(container.querySelector('[data-crt-scanlines="true"]')).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Scanlines: ON/i }));
    expect(container.querySelector('[data-crt-scanlines="true"]')).not.toBeInTheDocument();
  });
});
