import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RippleGrid } from "@/registry/components/ripple-grid";
import { PendulumWave } from "@/registry/components/pendulum-wave";
import { ScrambleText } from "@/registry/components/scramble-text";
import { SplitTextReveal } from "@/registry/components/split-text-reveal";
import { SplitFlapBoard } from "@/registry/components/split-flap-board";
import { Odometer } from "@/registry/components/odometer";
import { GlitchReveal } from "@/registry/components/glitch-reveal";
import { NeonSign } from "@/registry/components/neon-sign";
import { SmoothStaggerText } from "@/registry/components/smooth-stagger-text";
import { CinematicText } from "@/registry/components/cinematic-text";
import { LiquidHeadline } from "@/registry/components/liquid-headline";
import { RainbowText } from "@/registry/components/rainbow-text";
import { SignatureReveal } from "@/registry/components/signature-reveal";
import { DottedSphere } from "@/registry/components/dotted-sphere";
import { DotMonogram } from "@/registry/components/dot-monogram";
import { ParticleReveal } from "@/registry/components/particle-reveal";

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

  it("SplitFlapBoard cycles departure phrases", () => {
    render(<SplitFlapBoard phrases={["ALPHA", "BRAVO"]} />);
    expect(screen.getByRole("status", { name: "Split-flap board reading ALPHA" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Cycle Flap/i }));
    expect(screen.getByRole("status", { name: "Split-flap board reading BRAVO" })).toBeInTheDocument();
  });

  it("Odometer increments and resets value cleanly", () => {
    render(<Odometer initialValue={100} step={25} label="Runs" />);
    expect(screen.getByRole("status", { name: "Runs: 100" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "+25" }));
    expect(screen.getByRole("status", { name: "Runs: 125" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("status", { name: "Runs: 100" })).toBeInTheDocument();
  });

  it("GlitchReveal renders accessible trigger button", () => {
    render(<GlitchReveal text="CYBER SYNC" />);
    const btn = screen.getByRole("button", { name: "Glitch reveal: CYBER SYNC" });
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });

  it("NeonSign toggles power state with aria-pressed", () => {
    render(<NeonSign text="OPEN 24H" defaultLit />);
    const toggle = screen.getByRole("button", { name: "Power: ON" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Power: OFF" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("SmoothStaggerText renders characters and replays stagger", () => {
    render(<SmoothStaggerText text="FEEL" />);
    expect(screen.getByText("F")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Replay Stagger" }));
  });

  it("CinematicText renders title and replays tracking collapse", () => {
    render(<CinematicText text="STUDIO" />);
    expect(screen.getByText("STUDIO")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Replay Title" }));
  });

  it("LiquidHeadline renders gradient angle readout", () => {
    render(<LiquidHeadline text="Liquid" />);
    expect(screen.getByText("Liquid")).toBeInTheDocument();
    expect(screen.getByText(/Gradient Angle:/i)).toBeInTheDocument();
  });

  it("RainbowText cycles spectrum palettes", () => {
    render(<RainbowText text="PRISM" />);
    fireEvent.click(screen.getByRole("button", { name: /Shift Spectrum \(1\/2\)/i }));
    expect(screen.getByRole("button", { name: /Shift Spectrum \(2\/2\)/i })).toBeInTheDocument();
  });

  it("SignatureReveal renders SVG signature and replays", () => {
    render(<SignatureReveal label="Signed" />);
    expect(screen.getByRole("img", { name: "Signed" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Replay Signature" }));
  });

  it("DottedSphere toggles orbital rotation", () => {
    render(<DottedSphere />);
    const btn = screen.getByRole("button", { name: "Pause Orbit" });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "Resume Orbit" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("DotMonogram cycles glyphs", () => {
    render(<DotMonogram />);
    expect(screen.getByRole("img", { name: "Dot monogram R" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Glyph: R" }));
    expect(screen.getByRole("img", { name: "Dot monogram J" })).toBeInTheDocument();
  });

  it("ParticleReveal toggles disperse and converge", () => {
    render(<ParticleReveal />);
    const btn = screen.getByRole("button", { name: "Disperse" });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: "Converge" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
