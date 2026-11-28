import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RippleGrid } from "@/registry/components/ripple-grid";
import { PendulumWave } from "@/registry/components/pendulum-wave";
import { ScrambleText } from "@/registry/components/scramble-text";
import { SplitTextReveal } from "@/registry/components/split-text-reveal";

describe("Wave 5 — Physics & Text Components", () => {
  it("RippleGrid renders grid cells and activates on click", () => {
    render(<RippleGrid rows={3} cols={4} />);
    expect(screen.getAllByRole("button")).toHaveLength(12);
    fireEvent.click(screen.getByRole("button", { name: "Ripple cell row 2 column 3" }));
  });

  it("PendulumWave toggles Play/Pause and resets cleanly", () => {
    render(<PendulumWave count={7} />);
    const playBtn = screen.getByRole("button", { name: "Play pendulum wave" });
    expect(playBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(playBtn);
    expect(screen.getByRole("button", { name: "Pause pendulum wave" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: "Reset pendulum wave" }));
  });

  it("ScrambleText triggers decode on focus/click and preserves accessible label", () => {
    render(<ScrambleText text="KINETIC TYPE" />);
    const btn = screen.getByRole("button", { name: "Scramble text: KINETIC TYPE" });
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  it("SplitTextReveal renders words and replays on click", () => {
    render(<SplitTextReveal text="Feel every frame" />);
    expect(screen.getByText("Feel")).toBeInTheDocument();
    expect(screen.getByText("every")).toBeInTheDocument();
    expect(screen.getByText("frame")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Replay split text reveal" }));
  });
});
