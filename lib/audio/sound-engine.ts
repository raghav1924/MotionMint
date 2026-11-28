"use client";

export type SoundEffect =
  | "click"
  | "hover"
  | "toggleOn"
  | "toggleOff"
  | "select"
  | "drag"
  | "drop"
  | "success"
  | "error"
  | "warning"
  | "notification"
  | "completion"
  | "processing"
  | "transition"
  | "panelOpen"
  | "panelClose"
  | "focus";

export type SoundPreset =
  | "minimal"
  | "soft"
  | "playful"
  | "futuristic"
  | "mechanical"
  | "digital";

export type HapticPreset = "tap" | "selection" | "success" | "warning" | "error";

export interface SoundPlayOptions {
  volume?: number;
  preset?: SoundPreset;
}

export interface AudioCapabilities {
  supportsWebAudio: boolean;
  supportsHaptics: boolean;
  contextState: AudioContextState | "unavailable";
}

let sharedAudioCtx: AudioContext | null = null;
const activeOscillators = new Set<OscillatorNode>();

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === "suspended") {
    void sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function getSharedAudioContext(): AudioContext | null {
  return getAudioContext();
}

export function resetAudioContextForTesting(): void {
  stopAllSounds();
  sharedAudioCtx = null;
}

export function registerActiveOscillator(
  osc: OscillatorNode,
  gain?: GainNode
): void {
  activeOscillators.add(osc);
  osc.onended = () => {
    activeOscillators.delete(osc);
    try {
      osc.disconnect();
      gain?.disconnect();
    } catch {
      // Ignore already disconnected nodes
    }
  };
}

export function getAudioCapabilities(): AudioCapabilities {
  const supportsWebAudio =
    typeof window !== "undefined" &&
    Boolean(
      window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
    );
  const supportsHaptics =
    typeof navigator !== "undefined" && typeof navigator.vibrate === "function";

  return {
    supportsWebAudio,
    supportsHaptics,
    contextState: sharedAudioCtx ? sharedAudioCtx.state : supportsWebAudio ? "suspended" : "unavailable",
  };
}

export function triggerHaptic(pattern: number | number[] = 12): boolean {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    try {
      return navigator.vibrate(pattern);
    } catch {
      return false;
    }
  }
  return false;
}

export function triggerHapticPreset(preset: HapticPreset): boolean {
  switch (preset) {
    case "tap":
      return triggerHaptic(10);
    case "selection":
      return triggerHaptic(14);
    case "success":
      return triggerHaptic([12, 24, 18]);
    case "warning":
      return triggerHaptic([20, 30, 20]);
    case "error":
      return triggerHaptic([30, 35, 30]);
  }
}

export function stopAllSounds(): void {
  for (const osc of activeOscillators) {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // Ignore already stopped oscillators
    }
  }
  activeOscillators.clear();
}

const PRESET_PROFILES: Record<
  SoundPreset,
  { wave: OscillatorType; pitchMult: number; gainMult: number }
> = {
  minimal: { wave: "sine", pitchMult: 1, gainMult: 0.85 },
  soft: { wave: "sine", pitchMult: 0.88, gainMult: 0.7 },
  playful: { wave: "triangle", pitchMult: 1.18, gainMult: 1 },
  futuristic: { wave: "sawtooth", pitchMult: 1.32, gainMult: 0.65 },
  mechanical: { wave: "square", pitchMult: 0.78, gainMult: 0.55 },
  digital: { wave: "square", pitchMult: 1.25, gainMult: 0.6 },
};

export function playSoundEffect(
  effect: SoundEffect,
  options?: SoundPlayOptions
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const volume = Math.min(Math.max(options?.volume ?? 0.8, 0), 1);
  if (volume === 0) return;

  const preset = options?.preset ?? "minimal";
  const profile = PRESET_PROFILES[preset];

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  activeOscillators.add(osc);
  osc.onended = () => {
    activeOscillators.delete(osc);
    osc.disconnect();
    gain.disconnect();
  };

  const f = (hz: number) => Math.max(60, Math.min(hz * profile.pitchMult, 3200));
  const v = (base: number) => Math.max(0.001, base * volume * profile.gainMult);

  switch (effect) {
    case "click":
    case "select": {
      osc.type = effect === "select" ? "sine" : profile.wave;
      osc.frequency.setValueAtTime(f(effect === "select" ? 580 : 520), now);
      osc.frequency.exponentialRampToValueAtTime(f(180), now + 0.045);
      gain.gain.setValueAtTime(v(0.08), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }
    case "hover":
    case "focus": {
      osc.type = "sine";
      osc.frequency.setValueAtTime(f(420), now);
      osc.frequency.exponentialRampToValueAtTime(f(480), now + 0.025);
      gain.gain.setValueAtTime(v(0.025), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.035);
      break;
    }
    case "toggleOn":
    case "panelOpen": {
      osc.type = profile.wave;
      osc.frequency.setValueAtTime(f(440), now);
      osc.frequency.exponentialRampToValueAtTime(f(760), now + 0.07);
      gain.gain.setValueAtTime(v(0.07), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.085);
      break;
    }
    case "toggleOff":
    case "panelClose": {
      osc.type = profile.wave;
      osc.frequency.setValueAtTime(f(620), now);
      osc.frequency.exponentialRampToValueAtTime(f(320), now + 0.07);
      gain.gain.setValueAtTime(v(0.06), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.085);
      break;
    }
    case "success":
    case "completion": {
      osc.type = "sine";
      osc.frequency.setValueAtTime(f(523.25), now);
      osc.frequency.setValueAtTime(f(659.25), now + 0.06);
      osc.frequency.setValueAtTime(f(783.99), now + 0.12);
      gain.gain.setValueAtTime(v(0.08), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.start(now);
      osc.stop(now + 0.25);
      break;
    }
    case "notification": {
      osc.type = "sine";
      osc.frequency.setValueAtTime(f(660), now);
      osc.frequency.setValueAtTime(f(880), now + 0.07);
      gain.gain.setValueAtTime(v(0.07), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.19);
      break;
    }
    case "warning": {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f(380), now);
      osc.frequency.setValueAtTime(f(320), now + 0.07);
      gain.gain.setValueAtTime(v(0.07), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.17);
      break;
    }
    case "error": {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f(240), now);
      osc.frequency.exponentialRampToValueAtTime(f(140), now + 0.14);
      gain.gain.setValueAtTime(v(0.06), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.16);
      break;
    }
    case "drag":
    case "processing":
    case "transition": {
      osc.type = "sine";
      osc.frequency.setValueAtTime(f(280), now);
      osc.frequency.exponentialRampToValueAtTime(f(420), now + 0.08);
      gain.gain.setValueAtTime(v(0.05), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    }
    case "drop": {
      osc.type = profile.wave;
      osc.frequency.setValueAtTime(f(300), now);
      osc.frequency.exponentialRampToValueAtTime(f(560), now + 0.09);
      gain.gain.setValueAtTime(v(0.08), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.start(now);
      osc.stop(now + 0.12);
      break;
    }
  }
}
