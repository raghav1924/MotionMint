"use client";

import React, { useMemo, useState } from "react";
import { Play, Search, Square, Smartphone, Volume2 } from "lucide-react";
import { useRenderJoy } from "@/components/site/providers";
import { WorkspacePage, WorkspaceHeader } from "@/components/workspace/workspace-page";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import {
  getAudioCapabilities,
  playSoundEffect,
  stopAllSounds,
  triggerHapticPreset,
  type HapticPreset,
  type SoundEffect,
  type SoundPreset,
} from "@/lib/audio/sound-engine";
import {
  getLibrarySnippet,
  playLibrarySound,
  SOUND_LIBRARY,
  SOUND_LIBRARY_CATEGORIES,
  type SoundLibraryCategory,
} from "@/lib/audio/sound-library";
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

const WAVEFORM_BARS = [24, 48, 72, 38, 86, 60, 92, 54, 78, 42, 66, 30];

export default function SoundsPage() {
  const { soundEnabled, toggleSound, hapticsEnabled, setHapticsEnabled } = useRenderJoy();
  const [group, setGroup] = useState<SoundGroup>("UI Feedback");
  const [preset, setPreset] = useState<SoundPreset>("minimal");
  const [volume, setVolume] = useState(0.8);
  const [pitchShift, setPitchShift] = useState(1);
  const [libraryCategory, setLibraryCategory] = useState<"All" | SoundLibraryCategory>("All");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [selectedEffect, setSelectedEffect] = useState<SoundEffect>("click");
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const capabilities = getAudioCapabilities();

  const handleAudition = (effect: SoundEffect) => {
    setSelectedEffect(effect);
    playSoundEffect(effect, { volume, preset });
    setLastPlayed(effect);
    if (hapticsEnabled) {
      triggerHapticPreset(effect === "error" ? "error" : "tap");
    }
  };

  const handleLibraryAudition = (id: string) => {
    playLibrarySound(id, { volume, pitchShift, preset });
    setLastPlayed(id);
    if (hapticsEnabled) {
      triggerHapticPreset("tap");
    }
  };

  const visibleEffects = SOUND_CATALOG.filter((item) => item.group === group);

  const visibleLibrary = useMemo(() => {
    const q = libraryQuery.trim().toLowerCase();
    return SOUND_LIBRARY.filter((item) => {
      if (libraryCategory !== "All" && item.category !== libraryCategory) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.category.toLowerCase().includes(q) &&
        !item.tags.some((t) => t.includes(q))
      ) {
        return false;
      }
      return true;
    });
  }, [libraryCategory, libraryQuery]);

  const hookSnippet = `import { useSound } from "@/lib/audio/use-sound";

const { play, stop, setVolume } = useSound({
  enabled: true,
  volume: ${volume.toFixed(1)},
  preset: "${preset}",
});

play("${selectedEffect}");`;

  return (
    <WorkspacePage>
      <WorkspaceHeader
        eyebrow="SOUND & HAPTICS LAB"
        title="Sound that gives interfaces personality."
        description="Zero-asset Web Audio synthesis and progressive haptics. Sound defaults to OFF globally and never auto-plays."
        actions={
          <button
            type="button"
            onClick={() => {
              stopAllSounds();
              setLastPlayed(null);
            }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3.5 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
          >
            <Square className="h-3 w-3" aria-hidden="true" />
            Stop All
          </button>
        }
      />

      {/* Dominant Interactive Sound Studio Stage */}
      <section className="rounded-[24px] border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 sm:p-7 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)]">
              <Volume2 className="h-4 w-4 text-[var(--ws-text-primary)]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ws-text-primary)]">
                Audition Studio · {selectedEffect}
              </p>
              <p className="font-mono text-[11px] text-[var(--ws-text-muted)]">
                Preset: {preset} · Volume: {Math.round(volume * 100)}%
                {lastPlayed ? ` · Last cue: ${lastPlayed}` : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <RenderJoyTheme theme="minimalism" mode="light" className="rounded-full">
              <SoundToggle />
            </RenderJoyTheme>
            <button
              type="button"
              onClick={() => handleAudition(selectedEffect)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--ws-text-primary)] px-4 text-xs font-medium text-[var(--ws-bg)] hover:opacity-90 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Play {selectedEffect}
            </button>
          </div>
        </div>

        {/* Waveform Visualization & Master Controls */}
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] items-center rounded-2xl border border-[var(--ws-border-subtle)] bg-[var(--ws-floating)] p-5">
          <div
            aria-hidden="true"
            className="flex h-24 items-center justify-center gap-2 rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] px-4"
          >
            {WAVEFORM_BARS.map((height, idx) => (
              <span
                key={idx}
                className={cn(
                  "w-2 rounded-full transition-all duration-300",
                  lastPlayed
                    ? "bg-[var(--ws-text-primary)]"
                    : "bg-[var(--ws-border-strong)]"
                )}
                style={{
                  height: `${lastPlayed ? height : Math.max(18, Math.round(height * 0.4))}%`,
                }}
              />
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--ws-text-secondary)]">Master Volume</span>
                <span className="font-mono text-[var(--ws-text-primary)]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Master volume"
                className="w-full accent-[var(--ws-text-primary)] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <span className="block text-xs font-medium text-[var(--ws-text-secondary)]">
                Synthesis Preset (6)
              </span>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sound presets">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPreset(p)}
                    aria-pressed={preset === p}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs capitalize transition-colors cursor-pointer",
                      preset === p
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sound Cue Explorer */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Sound categories" className="flex flex-wrap gap-1.5">
            {(["UI Feedback", "Status Feedback", "Transitions"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                aria-pressed={group === g}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                  group === g
                    ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                    : "border-[var(--ws-border)] bg-[var(--ws-floating)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className="text-xs font-mono text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
          >
            Global Component Sound: <strong>{soundEnabled ? "ON" : "OFF"}</strong>
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleEffects.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleAudition(item.id)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer",
                lastPlayed === item.id
                  ? "border-[var(--ws-text-primary)] bg-[var(--ws-surface)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-floating)] hover:border-[var(--ws-border-strong)]"
              )}
            >
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-semibold text-[var(--ws-text-primary)]">{item.label}</p>
                <p className="text-xs text-[var(--ws-text-secondary)] truncate">
                  {item.description}
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)]">
                <Play className="h-3.5 w-3.5 text-[var(--ws-text-primary)]" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Original Sound Library (56 Sounds across 8 Categories) */}
      <section className="space-y-4 rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ws-text-muted)]">
              ORIGINAL SYNTHESIS LIBRARY
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-[var(--ws-text-primary)]">
              {SOUND_LIBRARY.length} Original UI Sounds
            </h2>
            <p className="text-xs text-[var(--ws-text-secondary)]">
              Multi-step Web Audio synthesis across 8 interaction categories. Click any cue to audition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-[var(--ws-text-secondary)]">
              <span>Pitch {pitchShift.toFixed(2)}×</span>
              <input
                type="range"
                aria-label="Library pitch multiplier"
                min="0.75"
                max="1.35"
                step="0.05"
                value={pitchShift}
                onChange={(e) => setPitchShift(Number(e.target.value))}
                className="w-24 accent-[var(--ws-text-primary)]"
              />
            </label>

            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--ws-text-muted)]" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search sound library"
                value={libraryQuery}
                onChange={(e) => setLibraryQuery(e.target.value)}
                placeholder="Search 56 sounds…"
                className="h-8 w-48 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] pl-8 pr-3 text-xs text-[var(--ws-text-primary)] placeholder:text-[var(--ws-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
              />
            </div>
          </div>
        </div>

        <div role="group" aria-label="Sound library categories" className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setLibraryCategory("All")}
            aria-pressed={libraryCategory === "All"}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium cursor-pointer transition-colors",
              libraryCategory === "All"
                ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
            )}
          >
            All ({SOUND_LIBRARY.length})
          </button>
          {SOUND_LIBRARY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setLibraryCategory(cat)}
              aria-pressed={libraryCategory === cat}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium cursor-pointer transition-colors",
                libraryCategory === cat
                  ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-surface)] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleLibrary.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex flex-col justify-between gap-3 rounded-2xl border p-4 transition-all",
                lastPlayed === item.id
                  ? "border-[var(--ws-text-primary)] bg-[var(--ws-surface)]"
                  : "border-[var(--ws-border)] bg-[var(--ws-surface)]/70 hover:border-[var(--ws-border-strong)]"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-[var(--ws-text-primary)]">
                      {item.name}
                    </p>
                    <span className="rounded bg-[var(--ws-bg)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--ws-text-muted)]">
                      {item.durationMs}ms
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ws-text-secondary)]">{item.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleLibraryAudition(item.id)}
                  aria-label={`Play ${item.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] text-[var(--ws-text-primary)] hover:border-[var(--ws-border-strong)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ws-ring)]"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-[var(--ws-border-subtle)] pt-2.5">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="rounded-md bg-[var(--ws-bg)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--ws-text-secondary)]">
                    {item.category}
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--ws-bg)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--ws-text-muted)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <CopyButton value={getLibrarySnippet(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Haptics, Capabilities & Developer API */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-[var(--ws-text-secondary)]" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
                Progressive Haptics
              </h2>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-[var(--ws-text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={hapticsEnabled}
                onChange={(e) => setHapticsEnabled(e.target.checked)}
                className="accent-[var(--ws-text-primary)]"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {HAPTICS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => triggerHapticPreset(h.id)}
                className="rounded-xl border border-[var(--ws-border)] bg-[var(--ws-surface)] px-3 py-2 text-left text-xs hover:border-[var(--ws-border-strong)] cursor-pointer"
              >
                <div className="font-medium text-[var(--ws-text-primary)]">{h.label}</div>
                <div className="font-mono text-[10px] text-[var(--ws-text-muted)]">
                  {h.pattern}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-[var(--ws-border-subtle)] pt-3 font-mono text-[11px] text-[var(--ws-text-muted)]">
            <span>Web Audio: {capabilities.supportsWebAudio ? "Supported" : "Unavailable"}</span>
            <span>Vibration: {capabilities.supportsHaptics ? "Supported" : "Fallback"}</span>
          </div>
        </div>

        <div className="rounded-[22px] border border-[var(--ws-border)] bg-[var(--ws-floating)] p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--ws-text-primary)]">
              useSound() Developer API
            </h2>
            <CopyButton value={hookSnippet} />
          </div>
          <pre className="overflow-x-auto rounded-xl border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-4 font-mono text-xs text-[var(--ws-text-primary)]">
            <code>{hookSnippet}</code>
          </pre>
        </div>
      </section>
    </WorkspacePage>
  );
}
