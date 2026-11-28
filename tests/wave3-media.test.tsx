import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RetroMusicPlayer } from "@/registry/components/retro-music-player";
import { AlbumCover } from "@/registry/components/album-cover";
import { PhotoStack } from "@/registry/components/photo-stack";
import { HoverReveal } from "@/registry/components/hover-reveal";

describe("Wave 3 — Media Components", () => {
  it("RetroMusicPlayer toggles play/pause and switches tracks without autoplaying", () => {
    render(<RetroMusicPlayer />);
    const playBtn = screen.getByRole("button", { name: "Play track" });
    expect(playBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(playBtn);
    expect(screen.getByRole("button", { name: "Pause track" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: "Next track" }));
    expect(screen.getByText("Glass Telemetry")).toBeInTheDocument();
  });

  it("AlbumCover toggles ejected vinyl state on click", () => {
    render(<AlbumCover title="Neon Dusk" />);
    const sleeve = screen.getByRole("button", { name: /Neon Dusk/i });
    expect(sleeve).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(sleeve);
    expect(sleeve).toHaveAttribute("aria-pressed", "true");
  });

  it("PhotoStack cycles photos via buttons and keyboard arrows", () => {
    render(<PhotoStack />);
    expect(screen.getByText("1/3")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next photo" }));
    expect(screen.getByText("2/3")).toBeInTheDocument();

    const stack = screen.getByLabelText(/Photo stack/i);
    fireEvent.keyDown(stack, { key: "ArrowLeft" });
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  it("HoverReveal updates preview summary on focus/hover", () => {
    render(<HoverReveal />);
    fireEvent.focus(screen.getByRole("button", { name: /Physical Knob/i }));
    expect(
      screen.getByText(/Rotary dial with detent ticks and keyboard increments/i)
    ).toBeInTheDocument();
  });
});
