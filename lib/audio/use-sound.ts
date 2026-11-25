"use client";

import { useCallback, useState } from "react";
import {
  getAudioCapabilities,
  playSoundEffect,
  stopAllSounds,
  type SoundEffect,
  type SoundPreset,
} from "@/lib/audio/sound-engine";

export interface UseSoundOptions {
  enabled?: boolean;
  volume?: number;
  preset?: SoundPreset;
}

/**
 * Portable hook for opt-in Web Audio UI sound effects.
 * Sound is OFF by default and never auto-plays on mount.
 */
export function useSound(initial?: UseSoundOptions) {
  const [enabled, setEnabled] = useState<boolean>(initial?.enabled ?? false);
  const [volume, setVolumeState] = useState<number>(initial?.volume ?? 0.8);
  const [preset, setPreset] = useState<SoundPreset>(initial?.preset ?? "minimal");

  const setVolume = useCallback((next: number) => {
    setVolumeState(Math.min(Math.max(next, 0), 1));
  }, []);

  const play = useCallback(
    (effect: SoundEffect, override?: UseSoundOptions) => {
      const isEnabled = override?.enabled ?? enabled;
      if (!isEnabled) return;
      playSoundEffect(effect, {
        volume: override?.volume ?? volume,
        preset: override?.preset ?? preset,
      });
    },
    [enabled, preset, volume]
  );

  const stop = useCallback(() => {
    stopAllSounds();
  }, []);

  return {
    enabled,
    setEnabled,
    volume,
    setVolume,
    preset,
    setPreset,
    play,
    stop,
    capabilities: getAudioCapabilities(),
  };
}
