"use client";

import {
  playSoundEffect,
  triggerHapticPreset,
  type SoundEffect,
  type SoundPreset,
} from "@/lib/audio/sound-engine";

interface FeedbackConfig {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  volume: number;
  preset: SoundPreset;
}

const config: FeedbackConfig = {
  soundEnabled: false,
  hapticsEnabled: false,
  volume: 0.8,
  preset: "minimal",
};

export function setGlobalFeedbackConfig(next: Partial<FeedbackConfig>): void {
  if (typeof next.soundEnabled === "boolean") {
    config.soundEnabled = next.soundEnabled;
  }
  if (typeof next.hapticsEnabled === "boolean") {
    config.hapticsEnabled = next.hapticsEnabled;
  }
  if (typeof next.volume === "number") {
    config.volume = Math.min(Math.max(next.volume, 0), 1);
  }
  if (next.preset) {
    config.preset = next.preset;
  }
}

export function getGlobalFeedbackConfig(): Readonly<FeedbackConfig> {
  return config;
}

export function triggerInteractionFeedback(
  effect: SoundEffect,
  overrides?: { sound?: boolean; haptic?: boolean; volume?: number; preset?: SoundPreset }
): void {
  const shouldPlaySound = overrides?.sound ?? config.soundEnabled;
  const shouldHaptic = overrides?.haptic ?? config.hapticsEnabled;

  if (shouldPlaySound) {
    playSoundEffect(effect, {
      volume: overrides?.volume ?? config.volume,
      preset: overrides?.preset ?? config.preset,
    });
  }
  if (shouldHaptic) {
    triggerHapticPreset(
      effect === "error"
        ? "error"
        : effect === "warning"
          ? "warning"
          : effect === "success" || effect === "completion"
            ? "success"
            : effect === "select"
              ? "selection"
              : "tap"
    );
  }
}
