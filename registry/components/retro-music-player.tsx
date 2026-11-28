"use client";

import React, { useState } from "react";
import { Disc3, Pause, Play, SkipBack, SkipForward } from "lucide-react";

export interface RetroTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export interface RetroMusicPlayerProps {
  tracks?: RetroTrack[];
  className?: string;
}

const DEFAULT_TRACKS: RetroTrack[] = [
  { id: "t1", title: "Midnight Shader", artist: "RenderJoy FM", duration: "03:42" },
  { id: "t2", title: "Glass Telemetry", artist: "Kinetic Lab", duration: "04:15" },
  { id: "t3", title: "Analog Spring", artist: "Mono Synth", duration: "02:58" },
];

/**
 * Tactile retro music player with track switching and visual playback meters.
 * Never auto-plays audio on mount.
 */
export function RetroMusicPlayer({
  tracks = DEFAULT_TRACKS,
  className = "",
}: RetroMusicPlayerProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const track = tracks[index] ?? tracks[0];

  const prevTrack = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length);
  const nextTrack = () => setIndex((i) => (i + 1) % tracks.length);

  return (
    <div
      className={`w-full max-w-sm rounded-2xl border border-[var(--mm-border)] bg-[var(--mm-surface)] p-4 text-[var(--mm-fg)] shadow-sm space-y-4 ${className}`.trim()}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--mm-border)] bg-[var(--mm-bg)] ${
            playing ? "animate-spin [animation-duration:4s] motion-reduce:animate-none" : ""
          }`}
        >
          <Disc3 className="h-6 w-6 text-[var(--mm-accent)]" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{track.title}</p>
          <p className="truncate text-xs text-[var(--mm-fg-muted)]">
            {track.artist} · {track.duration}
          </p>
        </div>
        <div className="flex items-end gap-0.5 h-5" aria-hidden="true">
          {[45, 85, 60, 95].map((h, i) => (
            <span
              key={i}
              style={{ height: playing ? `${h}%` : "22%" }}
              className="w-1 rounded-full bg-[var(--mm-accent)] transition-all duration-300"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--mm-border)] pt-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mm-fg-muted)]">
          {playing ? "Playing" : "Paused"} · {index + 1}/{tracks.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevTrack}
            aria-label="Previous track"
            className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] p-1.5 hover:opacity-80 cursor-pointer"
          >
            <SkipBack className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause track" : "Play track"}
            aria-pressed={playing}
            className="rounded-lg bg-[var(--mm-accent)] px-3 py-1.5 text-xs font-medium text-[var(--mm-accent-fg)] hover:opacity-90 cursor-pointer"
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={nextTrack}
            aria-label="Next track"
            className="rounded-lg border border-[var(--mm-border)] bg-[var(--mm-bg)] p-1.5 hover:opacity-80 cursor-pointer"
          >
            <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
