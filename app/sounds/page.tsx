"use client";

import React, { useState } from "react";
import { Volume2, Square, Smartphone } from "lucide-react";
import { useMotionMint } from "@/components/site/providers";
import {
  getAudioCapabilities,
  playSoundEffect,
  stopAllSounds,
  triggerHapticPreset,
  type HapticPreset,
  type SoundEffect,
  type SoundPreset,
} from "@/lib/audio/sound-engine";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { CopyButton } from "@/registry/components/copy-button";
import { cn } from "@/lib/utils";

type SoundGroup = "UI Feedback" | "Status Feedback" | "Transitions";

const SOUND_CATALOG: {
  id: SoundEffect;
  group: SoundGroup;
  label: string;
  description: string;
}[] = [
  { id: "click", group: "UI Feedback", label: "Click", description: "Crisp tactile press for buttons." },
  { id: "hover", group: "UI Feedback", label: "Hover", description: "Subtle low-gain hover tick (opt-in)." },
  { id: "toggleOn", group: "UI Feedback", label: "Toggle On", description: "Ascending tone for switch activation." },
  { id: "toggleOff", group: "UI Feedback", label: "Toggle Off", description: "Descending tone for deactivation." },
  { id: "select", group: "UI Feedback", label: "Select", description: "Clean selection confirmation." },
  { id: "drag", group: "UI Feedback", label: "Drag", description: "Soft movement cue." },
  { id: "drop", group: "UI Feedback", label: "Drop", description: "Upward sweep for dropzones." },
  { id: "success", group: "Status Feedback", label: "Success", description: "Three-note triad for completion." },
  { id: "error", group: "Status Feedback", label: "Error", description: "Low sawtooth alert tone." },
  { id: "warning", group: "Status Feedback", label: "Warning", description: "Double-step caution tone." },
  { id: "notification", group: "Status Feedback", label: "Notification", description: "Two-note chime for alerts." },
  { id: "completion", group: "Status Feedback", label: "Completion", description: "Resolved task confirmation." },
  { id: "processing", group: "Status Feedback", label: "Processing", description: "Gentle background step cue." },
  { id: "transition", group: "Transitions", label: "Transition", description: "Smooth view transition sweep." },
  { id: "panelOpen", group: "Transitions", label: "Panel Open", description: "Rising drawer/modal cue." },
  { id: "panelClose", group: "Transitions", label: "Panel Close", description: "Settling drawer/modal cue." },
  { id: "focus", group: "Transitions", label: "Focus", description: "Minimal focus indicator tick." },
];

const PRESETS: SoundPreset[] = [
  "minimal",
  "soft",
  "playful",
  "futuristic",
  "mechanical",
  "digital",
];

const HAPTICS: { id: HapticPreset; label: string; pattern: string }[] = [
  { id: "tap", label: "Light Tap", pattern: "10ms" },
  { id: "selection", label: "Selection", pattern: "14ms" },
  { id: "success", label: "Success", pattern: "[12, 24, 18]ms" },
  { id: "warning", label: "Warning", pattern: "[20, 30, 20]ms" },
  { id: "error", label: "Error", pattern: "[30, 35, 30]ms" },
];

export default function SoundsPage() {
  const { soundEnabled, toggleSound, hapticsEnabled, setHapticsEnabled } = useMotionMint();
  const [group, setGroup] = useState<SoundGroup>("UI Feedback");
  const [preset, setPreset] = useState<SoundPreset>("minimal");
  const [volume, setVolume] = useState(0.8);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const capabilities = getAudioCapabilities();

  const handleAudition = (effect: SoundEffect) => {
    playSoundEffect(effect, { volume, preset });
    setLastPlayed(effect);
    if (hapticsEnabled) {
      triggerHapticPreset(effect === "error" ? "error" : "tap");
    }
  };

  const visibleEffects = SOUND_CATALOG.filter((item) => item.group === group);

  const hookSnippet = `import { useSound } from "@/lib/audio/use-sound";

const { play, stop, setVolume } = useSound({
  enabled: true,
  volume: ${volume.toFixed(1)},
  preset: "${preset}",
});

play("success");`;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--ws-accent)]">
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sound &amp; Haptics Lab</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ws-text-primary)] sm:text-3xl">
            Synthesized Web Audio &amp; Progressive Haptics
          </h1>
          <p className="text-sm text-[var(--ws-text-secondary)] max-w-2xl">
            Zero-asset Web Audio synthesis. Global component sound defaults to{" "}
            <strong>OFF</strong> and never auto-plays on page load.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            stopAllSounds();
            setLastPlayed(null);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-1.5 text-xs font-medium text-[var(--ws-text-primary)] hover:border-[var(--ws-accent)] cursor-pointer"
        >
          <Square className="h-3 w-3" aria-hidden="true" />
          Stop All
        </button>
      </div>

      {/* Global Controls & Capabilities */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[var(--ws-text-primary)]">
              Global Sound: {soundEnabled ? "ON" : "OFF"}
            </p>
            <p className="text-[11px] text-[var(--ws-text-muted)]">Off by default</p>
          </div>
          <SoundToggle checked={soundEnabled} onCheckedChange={toggleSound} showWaveform label="Global Sound" />
        </div>

        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[var(--ws-text-primary)]">
              Haptics: {hapticsEnabled ? "ON" : "OFF"}
            </p>
            <p className="text-[11px] text-[var(--ws-text-muted)]">
              {capabilities.supportsHaptics ? "Vibration API detected" : "Fallback mode (iOS/Desktop)"}
            </p>
          </div>
          <SoundToggle checked={hapticsEnabled} onCheckedChange={setHapticsEnabled} label="Global Haptics" />
        </div>

        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[var(--ws-text-primary)]">Audition Volume</span>
            <span className="font-mono text-[var(--ws-accent)]">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            aria-label="Sound volume"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-[var(--ws-accent)]"
          />
        </div>
      </div>

      {/* Presets & Group Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Sound categories" className="flex flex-wrap gap-1.5">
          {(["UI Feedback", "Status Feedback", "Transitions"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              aria-pressed={group === g}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer",
                group === g
                  ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)]"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        <div role="group" aria-label="Sound preset" className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-[var(--ws-text-muted)]">Preset:</span>
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPreset(p)}
              aria-pressed={preset === p}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs capitalize cursor-pointer",
                preset === p
                  ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)]"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Audition Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleEffects.map((item) => {
          const isRecent = lastPlayed === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleAudition(item.id)}
              className={cn(
                "rounded-xl border p-4 text-left flex flex-col justify-between gap-3 cursor-pointer transition-colors",
                isRecent
                  ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-surface)] hover:border-[var(--ws-border-strong)]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--ws-text-primary)]">{item.label}</span>
                <Volume2 className="h-4 w-4 text-[var(--ws-accent)]" aria-hidden="true" />
              </div>
              <p className="text-xs text-[var(--ws-text-secondary)]">{item.description}</p>
              <span className="font-mono text-[11px] text-[var(--ws-accent)]">
                play(&quot;{item.id}&quot;)
              </span>
            </button>
          );
        })}
      </div>

      {/* Haptic Presets + Developer Hook */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ws-text-primary)]">
            <Smartphone className="h-4 w-4 text-[var(--ws-accent)]" aria-hidden="true" />
            <span>Progressive Haptic Patterns</span>
          </div>
          <p className="text-xs text-[var(--ws-text-secondary)]">
            Supported on Android Chromium with user activation. iOS Safari does not
            natively expose <code className="font-mono">navigator.vibrate</code> and
            degrades silently.
          </p>
          <div className="flex flex-wrap gap-2">
            {HAPTICS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => triggerHapticPreset(h.id)}
                className="rounded-lg border border-[var(--ws-border)] bg-[var(--ws-bg)] px-3 py-1.5 text-xs text-[var(--ws-text-primary)] hover:border-[var(--ws-accent)] cursor-pointer"
              >
                {h.label} <span className="font-mono text-[10px] text-[var(--ws-text-muted)]">({h.pattern})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">Portable useSound() Hook</h2>
            <CopyButton value={hookSnippet} label="Copy Hook" />
          </div>
          <pre className="overflow-x-auto rounded-lg border border-[var(--ws-border)] bg-[var(--ws-bg)] p-3 font-mono text-[11px] text-[var(--ws-text-secondary)]">
            <code>{hookSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
