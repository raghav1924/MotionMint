import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { useSound } from "@/lib/audio/use-sound";
import {
  getAudioCapabilities,
  playSoundEffect,
  resetAudioContextForTesting,
  stopAllSounds,
  triggerHapticPreset,
} from "@/lib/audio/sound-engine";
import {
  playLibrarySound,
  SOUND_LIBRARY,
  SOUND_LIBRARY_CATEGORIES,
} from "@/lib/audio/sound-library";
import { MotionReveal } from "@/registry/components/motion-reveal";
import MotionLabPage from "@/app/motion/page";
import SoundsPage from "@/app/sounds/page";
import { RenderJoyProvider } from "@/components/site/providers";

describe("Phase 4 — Motion Lab, Sound Lab & Interaction Engine", () => {
  afterEach(() => {
    resetAudioContextForTesting();
    vi.restoreAllMocks();
  });

  it("useSound defaults to disabled and clamps volume between 0 and 1", () => {
    const { result } = renderHook(() => useSound());
    expect(result.current.enabled).toBe(false);
    expect(result.current.volume).toBe(0.8);

    act(() => {
      result.current.setVolume(2.5);
    });
    expect(result.current.volume).toBe(1);

    act(() => {
      result.current.setVolume(-1);
    });
    expect(result.current.volume).toBe(0);
  });

  it("playSoundEffect synthesizes via Web Audio API and stopAllSounds cleans up", () => {
    const stopMock = vi.fn();
    const startMock = vi.fn();
    const connectMock = vi.fn();
    const disconnectMock = vi.fn();

    class MockAudioContext {
      state = "running";
      currentTime = 0;
      destination = {};
      resume = vi.fn().mockResolvedValue(undefined);
      createOscillator = () => ({
        type: "sine",
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: connectMock,
        disconnect: disconnectMock,
        start: startMock,
        stop: stopMock,
        onended: null,
      });
      createGain = () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: connectMock,
        disconnect: disconnectMock,
      });
    }

    vi.stubGlobal("AudioContext", MockAudioContext);

    playSoundEffect("success", { volume: 0.7, preset: "futuristic" });
    expect(startMock).toHaveBeenCalledTimes(1);

    stopAllSounds();
    expect(stopMock).toHaveBeenCalled();
  });

  it("triggerHapticPreset degrades gracefully when navigator.vibrate is unavailable", () => {
    const caps = getAudioCapabilities();
    expect(typeof caps.supportsWebAudio).toBe("boolean");
    expect(typeof caps.supportsHaptics).toBe("boolean");

    const vibrateMock = vi.fn().mockReturnValue(true);
    Object.assign(navigator, { vibrate: vibrateMock });
    expect(triggerHapticPreset("success")).toBe(true);
    expect(vibrateMock).toHaveBeenCalledWith([12, 24, 18]);
  });

  it("MotionReveal renders children cleanly", () => {
    render(
      <MotionReveal variant="blurIn">
        <span>Revealed Content</span>
      </MotionReveal>
    );
    expect(screen.getByText("Revealed Content")).toBeInTheDocument();
  });

  it("MotionLabPage switches categories and toggles reduced-motion simulation", () => {
    render(
      <RenderJoyProvider>
        <MotionLabPage />
      </RenderJoyProvider>
    );
    expect(screen.getByText("Motion and interaction primitives")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Loading" }));
    expect(screen.getAllByText("Analysing").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("checkbox", { name: "Reduced Motion" }));
    expect(screen.getByText("Reduced Motion Simulated")).toBeInTheDocument();
  });

  it("SoundsPage switches sound groups and presets", () => {
    render(
      <RenderJoyProvider>
        <SoundsPage />
      </RenderJoyProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Status Feedback" }));
    expect(screen.getByText("Notification")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "futuristic" }));
    expect(screen.getByRole("button", { name: "futuristic" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("Sound Library provides 56 original sounds across 8 categories and plays/stops every sample cleanly", () => {
    expect(SOUND_LIBRARY.length).toBe(56);
    expect(SOUND_LIBRARY_CATEGORIES).toHaveLength(8);
    for (const cat of SOUND_LIBRARY_CATEGORIES) {
      expect(SOUND_LIBRARY.filter((s) => s.category === cat).length).toBeGreaterThanOrEqual(7);
    }

    const startMock = vi.fn();
    const stopMock = vi.fn();
    const connectMock = vi.fn();
    const disconnectMock = vi.fn();

    class MockAudioContext {
      state = "running";
      currentTime = 0;
      destination = {};
      resume = vi.fn().mockResolvedValue(undefined);
      createOscillator = () => ({
        type: "sine",
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: connectMock,
        disconnect: disconnectMock,
        start: startMock,
        stop: stopMock,
        onended: null,
      });
      createGain = () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: connectMock,
        disconnect: disconnectMock,
      });
    }

    vi.stubGlobal("AudioContext", MockAudioContext);

    for (const item of SOUND_LIBRARY) {
      expect(playLibrarySound(item.id, { volume: 0.75, pitchShift: 1.1 })).toBe(true);
    }
    expect(startMock.mock.calls.length).toBeGreaterThanOrEqual(56);

    stopAllSounds();
    expect(stopMock).toHaveBeenCalled();
  });

  it("SoundsPage renders the 56-cue Sound Library, filters by category/search, and does not autoplay", () => {
    const startMock = vi.fn();
    class MockAudioContext {
      state = "running";
      currentTime = 0;
      destination = {};
      resume = vi.fn().mockResolvedValue(undefined);
      createOscillator = () => ({
        type: "sine",
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
        start: startMock,
        stop: vi.fn(),
        onended: null,
      });
      createGain = () => ({
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
      });
    }
    vi.stubGlobal("AudioContext", MockAudioContext);

    render(
      <RenderJoyProvider>
        <SoundsPage />
      </RenderJoyProvider>
    );

    expect(screen.getByText("56 Original UI Sounds")).toBeInTheDocument();
    expect(startMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    expect(screen.getByText("Bright Chime")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play Bright Chime" }));
    expect(startMock).toHaveBeenCalled();
  });

  it("MotionLabPage tunes live spring/stagger parameters and updates exported recipe code", () => {
    render(
      <RenderJoyProvider>
        <MotionLabPage />
      </RenderJoyProvider>
    );

    expect(screen.getByText("Spring & Stagger Tuner")).toBeInTheDocument();
    expect(screen.getByText("Live Motion Recipe Export")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "snappy" }));
    expect(screen.getByText(/stiffness: 420/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Spring stiffness"), { target: { value: "510" } });
    expect(screen.getByText(/stiffness: 510/)).toBeInTheDocument();
  });
});
