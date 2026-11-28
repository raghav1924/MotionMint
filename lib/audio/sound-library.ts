"use client";

import {
  getSharedAudioContext,
  registerActiveOscillator,
  type SoundPreset,
} from "@/lib/audio/sound-engine";

export type SoundLibraryCategory =
  | "Actions"
  | "Feedback"
  | "Navigation"
  | "Notifications"
  | "Selection"
  | "Movement"
  | "Progress"
  | "System";

export const SOUND_LIBRARY_CATEGORIES: SoundLibraryCategory[] = [
  "Actions",
  "Feedback",
  "Navigation",
  "Notifications",
  "Selection",
  "Movement",
  "Progress",
  "System",
];

export interface SoundSynthStep {
  wave: OscillatorType;
  startHz: number;
  endHz?: number;
  delayMs?: number;
  durationMs: number;
  gain: number;
}

export interface SoundLibraryItem {
  id: string;
  name: string;
  category: SoundLibraryCategory;
  description: string;
  durationMs: number;
  tags: string[];
  recipe: SoundSynthStep[];
}

export interface PlayLibrarySoundOptions {
  volume?: number;
  pitchShift?: number;
  preset?: SoundPreset;
}

const PRESET_COLOR: Record<SoundPreset, { pitchMult: number; gainMult: number; waveOverride?: OscillatorType }> = {
  minimal: { pitchMult: 1, gainMult: 0.9 },
  soft: { pitchMult: 0.88, gainMult: 0.72, waveOverride: "sine" },
  playful: { pitchMult: 1.15, gainMult: 1 },
  futuristic: { pitchMult: 1.28, gainMult: 0.75 },
  mechanical: { pitchMult: 0.82, gainMult: 0.65, waveOverride: "square" },
  digital: { pitchMult: 1.2, gainMult: 0.7, waveOverride: "triangle" },
};

export const SOUND_LIBRARY: SoundLibraryItem[] = [
  // 1. Actions (7)
  {
    id: "action-tap",
    name: "Crisp Tap",
    category: "Actions",
    description: "Short percussive transient for primary button presses.",
    durationMs: 42,
    tags: ["button", "tactile"],
    recipe: [{ wave: "sine", startHz: 720, endHz: 260, durationMs: 42, gain: 0.14 }],
  },
  {
    id: "action-press",
    name: "Keycap Press",
    category: "Actions",
    description: "Warm mechanical downstroke with quick low-mid settle.",
    durationMs: 58,
    tags: ["key", "3d"],
    recipe: [
      { wave: "triangle", startHz: 440, endHz: 170, durationMs: 38, gain: 0.13 },
      { wave: "sine", startHz: 980, endHz: 520, delayMs: 12, durationMs: 28, gain: 0.06 },
    ],
  },
  {
    id: "action-thump",
    name: "Soft Thump",
    category: "Actions",
    description: "Low-end physical thump for heavy cards and drawers.",
    durationMs: 85,
    tags: ["bass", "physical"],
    recipe: [{ wave: "sine", startHz: 210, endHz: 68, durationMs: 85, gain: 0.2 }],
  },
  {
    id: "action-knock",
    name: "Wood Knock",
    category: "Actions",
    description: "Resonant hollow knock for tactile controls.",
    durationMs: 70,
    tags: ["organic", "wood"],
    recipe: [
      { wave: "triangle", startHz: 360, endHz: 220, durationMs: 65, gain: 0.14 },
      { wave: "sine", startHz: 710, endHz: 540, durationMs: 35, gain: 0.06 },
    ],
  },
  {
    id: "action-flick",
    name: "Quick Flick",
    category: "Actions",
    description: "Light upward flick for swipe gestures and dismissals.",
    durationMs: 55,
    tags: ["swipe", "gesture"],
    recipe: [{ wave: "sine", startHz: 380, endHz: 920, durationMs: 55, gain: 0.1 }],
  },
  {
    id: "action-snap",
    name: "Magnetic Snap",
    category: "Actions",
    description: "Tight two-stage snap when elements lock into position.",
    durationMs: 48,
    tags: ["snap", "dock"],
    recipe: [
      { wave: "triangle", startHz: 1120, endHz: 640, durationMs: 22, gain: 0.11 },
      { wave: "sine", startHz: 840, endHz: 420, delayMs: 18, durationMs: 30, gain: 0.09 },
    ],
  },
  {
    id: "action-release",
    name: "Spring Release",
    category: "Actions",
    description: "Gentle upward rebound when releasing a pressed control.",
    durationMs: 50,
    tags: ["release", "spring"],
    recipe: [{ wave: "sine", startHz: 420, endHz: 690, durationMs: 50, gain: 0.08 }],
  },

  // 2. Feedback (7)
  {
    id: "feedback-accept",
    name: "Accept Pulse",
    category: "Feedback",
    description: "Clean major third confirmation for accepted actions.",
    durationMs: 150,
    tags: ["confirm", "positive"],
    recipe: [
      { wave: "sine", startHz: 523.25, durationMs: 70, gain: 0.11 },
      { wave: "sine", startHz: 659.25, delayMs: 65, durationMs: 85, gain: 0.12 },
    ],
  },
  {
    id: "feedback-success",
    name: "Success Triad",
    category: "Feedback",
    description: "Uplifting three-note triad for completed workflows.",
    durationMs: 240,
    tags: ["triad", "done"],
    recipe: [
      { wave: "sine", startHz: 523.25, durationMs: 75, gain: 0.1 },
      { wave: "sine", startHz: 659.25, delayMs: 65, durationMs: 75, gain: 0.11 },
      { wave: "sine", startHz: 783.99, delayMs: 130, durationMs: 110, gain: 0.13 },
    ],
  },
  {
    id: "feedback-error",
    name: "Error Buzz",
    category: "Feedback",
    description: "Low descending sawtooth alert for validation errors.",
    durationMs: 210,
    tags: ["error", "alert"],
    recipe: [
      { wave: "sawtooth", startHz: 220, endHz: 155, durationMs: 110, gain: 0.08 },
      { wave: "sawtooth", startHz: 185, endHz: 120, delayMs: 95, durationMs: 115, gain: 0.08 },
    ],
  },
  {
    id: "feedback-warning",
    name: "Caution Double",
    category: "Feedback",
    description: "Two-pulse amber warning cue with neutral pitch.",
    durationMs: 190,
    tags: ["warning", "caution"],
    recipe: [
      { wave: "triangle", startHz: 440, durationMs: 75, gain: 0.1 },
      { wave: "triangle", startHz: 392, delayMs: 95, durationMs: 95, gain: 0.1 },
    ],
  },
  {
    id: "feedback-reject",
    name: "Soft Reject",
    category: "Feedback",
    description: "Muted downward fifth for blocked or invalid drops.",
    durationMs: 135,
    tags: ["blocked", "deny"],
    recipe: [
      { wave: "triangle", startHz: 340, endHz: 220, durationMs: 135, gain: 0.1 },
    ],
  },
  {
    id: "feedback-retry",
    name: "Retry Bounce",
    category: "Feedback",
    description: "Quick double-hop cue indicating a retry attempt.",
    durationMs: 140,
    tags: ["retry", "loop"],
    recipe: [
      { wave: "sine", startHz: 440, endHz: 520, durationMs: 55, gain: 0.09 },
      { wave: "sine", startHz: 520, endHz: 660, delayMs: 70, durationMs: 70, gain: 0.1 },
    ],
  },
  {
    id: "feedback-undo",
    name: "Undo Rewind",
    category: "Feedback",
    description: "Smooth descending glide for undo/revert actions.",
    durationMs: 130,
    tags: ["undo", "revert"],
    recipe: [
      { wave: "sine", startHz: 660, endHz: 390, durationMs: 130, gain: 0.1 },
    ],
  },

  // 3. Navigation (7)
  {
    id: "nav-open",
    name: "Drawer Open",
    category: "Navigation",
    description: "Airy rising sweep for opening modals and command palettes.",
    durationMs: 140,
    tags: ["modal", "open"],
    recipe: [{ wave: "sine", startHz: 300, endHz: 620, durationMs: 140, gain: 0.1 }],
  },
  {
    id: "nav-close",
    name: "Drawer Close",
    category: "Navigation",
    description: "Settling downward sweep when dismissing overlays.",
    durationMs: 120,
    tags: ["modal", "close"],
    recipe: [{ wave: "sine", startHz: 560, endHz: 260, durationMs: 120, gain: 0.09 }],
  },
  {
    id: "nav-forward",
    name: "Step Forward",
    category: "Navigation",
    description: "Bright ascending step for advancing multi-step flows.",
    durationMs: 90,
    tags: ["next", "route"],
    recipe: [{ wave: "triangle", startHz: 480, endHz: 720, durationMs: 90, gain: 0.09 }],
  },
  {
    id: "nav-back",
    name: "Step Back",
    category: "Navigation",
    description: "Gentle descending step for returning to previous views.",
    durationMs: 90,
    tags: ["back", "route"],
    recipe: [{ wave: "triangle", startHz: 640, endHz: 420, durationMs: 90, gain: 0.09 }],
  },
  {
    id: "nav-switch",
    name: "Tab Switch",
    category: "Navigation",
    description: "Crisp mid-range tick for segmented controls and tabs.",
    durationMs: 45,
    tags: ["tabs", "segment"],
    recipe: [{ wave: "sine", startHz: 620, endHz: 780, durationMs: 45, gain: 0.09 }],
  },
  {
    id: "nav-expand",
    name: "Accordion Expand",
    category: "Navigation",
    description: "Two-step harmonic lift when expanding collapsible groups.",
    durationMs: 125,
    tags: ["accordion", "expand"],
    recipe: [
      { wave: "sine", startHz: 392, durationMs: 55, gain: 0.08 },
      { wave: "sine", startHz: 587.33, delayMs: 45, durationMs: 80, gain: 0.09 },
    ],
  },
  {
    id: "nav-collapse",
    name: "Accordion Collapse",
    category: "Navigation",
    description: "Compact downward interval when collapsing sections.",
    durationMs: 110,
    tags: ["accordion", "collapse"],
    recipe: [
      { wave: "sine", startHz: 587.33, durationMs: 45, gain: 0.08 },
      { wave: "sine", startHz: 392, delayMs: 40, durationMs: 70, gain: 0.08 },
    ],
  },

  // 4. Notifications (7)
  {
    id: "notify-ping",
    name: "Soft Ping",
    category: "Notifications",
    description: "Delicate high sine ping for non-intrusive toast alerts.",
    durationMs: 180,
    tags: ["toast", "subtle"],
    recipe: [{ wave: "sine", startHz: 1046.5, endHz: 987.77, durationMs: 180, gain: 0.09 }],
  },
  {
    id: "notify-chime",
    name: "Bright Chime",
    category: "Notifications",
    description: "Clear fifth-interval bell chime for incoming updates.",
    durationMs: 260,
    tags: ["bell", "chime"],
    recipe: [
      { wave: "sine", startHz: 659.25, durationMs: 120, gain: 0.1 },
      { wave: "sine", startHz: 987.77, delayMs: 85, durationMs: 175, gain: 0.11 },
    ],
  },
  {
    id: "notify-message",
    name: "Chat Bubble",
    category: "Notifications",
    description: "Warm pop-chime tailored for AI and chat replies.",
    durationMs: 145,
    tags: ["chat", "ai"],
    recipe: [
      { wave: "sine", startHz: 520, endHz: 780, durationMs: 60, gain: 0.1 },
      { wave: "sine", startHz: 1040, delayMs: 55, durationMs: 90, gain: 0.08 },
    ],
  },
  {
    id: "notify-reminder",
    name: "Gentle Reminder",
    category: "Notifications",
    description: "Calm two-note motif for scheduled reminders.",
    durationMs: 240,
    tags: ["calendar", "calm"],
    recipe: [
      { wave: "triangle", startHz: 587.33, durationMs: 100, gain: 0.08 },
      { wave: "sine", startHz: 880, delayMs: 90, durationMs: 150, gain: 0.09 },
    ],
  },
  {
    id: "notify-alert",
    name: "Priority Alert",
    category: "Notifications",
    description: "Distinctive three-pulse beacon for urgent notifications.",
    durationMs: 270,
    tags: ["urgent", "beacon"],
    recipe: [
      { wave: "triangle", startHz: 880, durationMs: 60, gain: 0.1 },
      { wave: "triangle", startHz: 880, delayMs: 90, durationMs: 60, gain: 0.1 },
      { wave: "triangle", startHz: 1174.66, delayMs: 180, durationMs: 90, gain: 0.11 },
    ],
  },
  {
    id: "notify-incoming",
    name: "Incoming Signal",
    category: "Notifications",
    description: "Soft shimmer tone for live stream or webhook arrivals.",
    durationMs: 200,
    tags: ["stream", "live"],
    recipe: [
      { wave: "sine", startHz: 740, endHz: 1110, durationMs: 110, gain: 0.08 },
      { wave: "sine", startHz: 1110, delayMs: 85, durationMs: 115, gain: 0.07 },
    ],
  },
  {
    id: "notify-complete",
    name: "Task Bell",
    category: "Notifications",
    description: "Clean resolved harmonic for background job completion.",
    durationMs: 230,
    tags: ["job", "bell"],
    recipe: [
      { wave: "sine", startHz: 587.33, durationMs: 80, gain: 0.09 },
      { wave: "sine", startHz: 880, delayMs: 70, durationMs: 160, gain: 0.1 },
    ],
  },

  // 5. Selection (7)
  {
    id: "select-tick",
    name: "Dial Tick",
    category: "Selection",
    description: "Ultra-short rotary tick for knobs, sliders, and steppers.",
    durationMs: 24,
    tags: ["knob", "detent"],
    recipe: [{ wave: "triangle", startHz: 1320, endHz: 880, durationMs: 24, gain: 0.09 }],
  },
  {
    id: "select-choose",
    name: "Item Select",
    category: "Selection",
    description: "Clear upward blip when picking an option from a list.",
    durationMs: 55,
    tags: ["list", "picker"],
    recipe: [{ wave: "sine", startHz: 540, endHz: 760, durationMs: 55, gain: 0.1 }],
  },
  {
    id: "select-deselect",
    name: "Item Deselect",
    category: "Selection",
    description: "Soft downward blip when clearing a selected chip.",
    durationMs: 50,
    tags: ["chip", "clear"],
    recipe: [{ wave: "sine", startHz: 680, endHz: 460, durationMs: 50, gain: 0.09 }],
  },
  {
    id: "select-lock",
    name: "State Lock",
    category: "Selection",
    description: "Crisp double-click latch for locking pins or layers.",
    durationMs: 75,
    tags: ["lock", "pin"],
    recipe: [
      { wave: "square", startHz: 520, durationMs: 22, gain: 0.05 },
      { wave: "sine", startHz: 820, delayMs: 32, durationMs: 40, gain: 0.09 },
    ],
  },
  {
    id: "select-unlock",
    name: "State Unlock",
    category: "Selection",
    description: "Open upward latch release for unlocking controls.",
    durationMs: 80,
    tags: ["unlock", "release"],
    recipe: [
      { wave: "sine", startHz: 620, durationMs: 26, gain: 0.08 },
      { wave: "sine", startHz: 960, delayMs: 34, durationMs: 46, gain: 0.09 },
    ],
  },
  {
    id: "select-check",
    name: "Checkbox Check",
    category: "Selection",
    description: "Snappy crisp checkmark confirmation.",
    durationMs: 65,
    tags: ["checkbox", "form"],
    recipe: [{ wave: "sine", startHz: 600, endHz: 940, durationMs: 65, gain: 0.1 }],
  },
  {
    id: "select-mark",
    name: "Bookmark Mark",
    category: "Selection",
    description: "Warm resonant pop for starring or bookmarking items.",
    durationMs: 85,
    tags: ["star", "save"],
    recipe: [
      { wave: "sine", startHz: 493.88, endHz: 739.99, durationMs: 85, gain: 0.1 },
    ],
  },

  // 6. Movement (7)
  {
    id: "move-drag-start",
    name: "Drag Lift",
    category: "Movement",
    description: "Light upward breath when picking up a draggable card.",
    durationMs: 65,
    tags: ["drag", "lift"],
    recipe: [{ wave: "sine", startHz: 320, endHz: 470, durationMs: 65, gain: 0.08 }],
  },
  {
    id: "move-drag-end",
    name: "Drag Settle",
    category: "Movement",
    description: "Soft settling drop when releasing a dragged element.",
    durationMs: 75,
    tags: ["drag", "settle"],
    recipe: [{ wave: "sine", startHz: 430, endHz: 240, durationMs: 75, gain: 0.1 }],
  },
  {
    id: "move-drop",
    name: "Dropzone Catch",
    category: "Movement",
    description: "Satisfying upward catch for file dropzones.",
    durationMs: 95,
    tags: ["dropzone", "upload"],
    recipe: [
      { wave: "triangle", startHz: 290, endHz: 540, durationMs: 95, gain: 0.11 },
    ],
  },
  {
    id: "move-slide",
    name: "Carousel Slide",
    category: "Movement",
    description: "Silky mid-band glide for cover-flow and card stacks.",
    durationMs: 80,
    tags: ["carousel", "glide"],
    recipe: [{ wave: "sine", startHz: 360, endHz: 510, durationMs: 80, gain: 0.07 }],
  },
  {
    id: "move-float",
    name: "Spatial Float",
    category: "Movement",
    description: "Ambient low-gain shimmer for floating dock hover.",
    durationMs: 120,
    tags: ["dock", "ambient"],
    recipe: [{ wave: "sine", startHz: 540, endHz: 610, durationMs: 120, gain: 0.06 }],
  },
  {
    id: "move-grid-snap",
    name: "Grid Snap",
    category: "Movement",
    description: "Precision micro-click when snapping to canvas gridlines.",
    durationMs: 32,
    tags: ["canvas", "grid"],
    recipe: [{ wave: "triangle", startHz: 960, endHz: 620, durationMs: 32, gain: 0.09 }],
  },
  {
    id: "move-reorder",
    name: "List Reorder",
    category: "Movement",
    description: "Subtle step tone as an item crosses a sibling slot.",
    durationMs: 40,
    tags: ["sortable", "list"],
    recipe: [{ wave: "sine", startHz: 480, endHz: 560, durationMs: 40, gain: 0.07 }],
  },

  // 7. Progress (7)
  {
    id: "progress-begin",
    name: "Task Begin",
    category: "Progress",
    description: "Clean rising fourth announcing a new pipeline run.",
    durationMs: 125,
    tags: ["start", "pipeline"],
    recipe: [
      { wave: "sine", startHz: 392, durationMs: 55, gain: 0.09 },
      { wave: "sine", startHz: 523.25, delayMs: 50, durationMs: 75, gain: 0.1 },
    ],
  },
  {
    id: "progress-step",
    name: "Milestone Step",
    category: "Progress",
    description: "Neutral precision blip for each completed DAG node.",
    durationMs: 50,
    tags: ["step", "node"],
    recipe: [{ wave: "sine", startHz: 680, endHz: 740, durationMs: 50, gain: 0.08 }],
  },
  {
    id: "progress-rise",
    name: "Charge Rise",
    category: "Progress",
    description: "Smooth ascending pitch ramp for upload progress.",
    durationMs: 170,
    tags: ["upload", "ramp"],
    recipe: [{ wave: "sine", startHz: 330, endHz: 660, durationMs: 170, gain: 0.09 }],
  },
  {
    id: "progress-fill",
    name: "Ring Fill",
    category: "Progress",
    description: "Warm harmonic swell as a progress ring reaches 100%.",
    durationMs: 190,
    tags: ["ring", "meter"],
    recipe: [
      { wave: "triangle", startHz: 440, endHz: 660, durationMs: 110, gain: 0.08 },
      { wave: "sine", startHz: 880, delayMs: 95, durationMs: 95, gain: 0.09 },
    ],
  },
  {
    id: "progress-settle",
    name: "Progress Settle",
    category: "Progress",
    description: "Soft settling tone when counters finish animating.",
    durationMs: 110,
    tags: ["counter", "settle"],
    recipe: [{ wave: "sine", startHz: 520, endHz: 440, durationMs: 110, gain: 0.08 }],
  },
  {
    id: "progress-finish",
    name: "Pipeline Finish",
    category: "Progress",
    description: "Full four-note celebratory cadence for finished runs.",
    durationMs: 280,
    tags: ["complete", "cadence"],
    recipe: [
      { wave: "sine", startHz: 440, durationMs: 60, gain: 0.09 },
      { wave: "sine", startHz: 554.37, delayMs: 55, durationMs: 60, gain: 0.09 },
      { wave: "sine", startHz: 659.25, delayMs: 110, durationMs: 65, gain: 0.1 },
      { wave: "sine", startHz: 880, delayMs: 170, durationMs: 110, gain: 0.12 },
    ],
  },
  {
    id: "progress-pulse",
    name: "Thinking Pulse",
    category: "Progress",
    description: "Low-gain rhythmic pulse for AI reasoning traces.",
    durationMs: 95,
    tags: ["ai", "thinking"],
    recipe: [{ wave: "sine", startHz: 415, endHz: 465, durationMs: 95, gain: 0.06 }],
  },

  // 8. System (7)
  {
    id: "system-wake",
    name: "System Wake",
    category: "System",
    description: "Gentle two-octave shimmer when waking an interactive studio.",
    durationMs: 200,
    tags: ["wake", "studio"],
    recipe: [
      { wave: "sine", startHz: 330, durationMs: 90, gain: 0.08 },
      { wave: "sine", startHz: 660, delayMs: 75, durationMs: 125, gain: 0.09 },
    ],
  },
  {
    id: "system-boot",
    name: "Engine Boot",
    category: "System",
    description: "Clean harmonic triad for workspace initialization.",
    durationMs: 260,
    tags: ["boot", "init"],
    recipe: [
      { wave: "triangle", startHz: 293.66, durationMs: 80, gain: 0.08 },
      { wave: "sine", startHz: 440, delayMs: 75, durationMs: 85, gain: 0.09 },
      { wave: "sine", startHz: 587.33, delayMs: 150, durationMs: 110, gain: 0.1 },
    ],
  },
  {
    id: "system-sync",
    name: "Cloud Sync",
    category: "System",
    description: "Crisp alternating two-tone sync confirmation.",
    durationMs: 150,
    tags: ["sync", "cloud"],
    recipe: [
      { wave: "sine", startHz: 587.33, durationMs: 60, gain: 0.09 },
      { wave: "sine", startHz: 783.99, delayMs: 65, durationMs: 85, gain: 0.09 },
    ],
  },
  {
    id: "system-save",
    name: "Snapshot Save",
    category: "System",
    description: "Compact confirmation chord for saving board or theme state.",
    durationMs: 140,
    tags: ["save", "persist"],
    recipe: [
      { wave: "sine", startHz: 493.88, durationMs: 65, gain: 0.09 },
      { wave: "sine", startHz: 739.99, delayMs: 50, durationMs: 90, gain: 0.1 },
    ],
  },
  {
    id: "system-export",
    name: "Bundle Export",
    category: "System",
    description: "Ascending telemetry sweep for CLI or JSON exports.",
    durationMs: 165,
    tags: ["export", "cli"],
    recipe: [
      { wave: "triangle", startHz: 440, endHz: 660, durationMs: 75, gain: 0.09 },
      { wave: "sine", startHz: 880, delayMs: 70, durationMs: 95, gain: 0.1 },
    ],
  },
  {
    id: "system-connect",
    name: "Port Connect",
    category: "System",
    description: "Tactile plug-in confirmation when wiring Flow ports.",
    durationMs: 110,
    tags: ["flow", "edge"],
    recipe: [
      { wave: "sine", startHz: 392, endHz: 587.33, durationMs: 55, gain: 0.1 },
      { wave: "sine", startHz: 783.99, delayMs: 45, durationMs: 65, gain: 0.09 },
    ],
  },
  {
    id: "system-copy",
    name: "Clipboard Copy",
    category: "System",
    description: "Bright twin-tick confirmation for copy-to-clipboard buttons.",
    durationMs: 95,
    tags: ["copy", "clipboard"],
    recipe: [
      { wave: "sine", startHz: 880, durationMs: 35, gain: 0.09 },
      { wave: "sine", startHz: 1174.66, delayMs: 42, durationMs: 53, gain: 0.1 },
    ],
  },
];

export function playLibrarySound(
  id: string,
  options?: PlayLibrarySoundOptions
): boolean {
  const item = SOUND_LIBRARY.find((s) => s.id === id);
  if (!item) return false;

  const ctx = getSharedAudioContext();
  if (!ctx) return false;

  const volume = Math.min(Math.max(options?.volume ?? 0.8, 0), 1);
  if (volume === 0) return false;

  const pitchShift = Math.min(Math.max(options?.pitchShift ?? 1, 0.5), 2);
  const presetColor = PRESET_COLOR[options?.preset ?? "minimal"];
  const now = ctx.currentTime;

  for (const step of item.recipe) {
    const startSec = now + (step.delayMs ?? 0) / 1000;
    const durSec = Math.max(0.015, step.durationMs / 1000);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = presetColor.waveOverride ?? step.wave;

    const startHz = Math.max(55, Math.min(step.startHz * pitchShift * presetColor.pitchMult, 3600));
    const endHz = step.endHz
      ? Math.max(55, Math.min(step.endHz * pitchShift * presetColor.pitchMult, 3600))
      : null;

    osc.frequency.setValueAtTime(startHz, startSec);
    if (endHz) {
      osc.frequency.exponentialRampToValueAtTime(endHz, startSec + durSec);
    }

    const peak = Math.max(0.001, step.gain * volume * presetColor.gainMult);
    gain.gain.setValueAtTime(peak, startSec);
    gain.gain.exponentialRampToValueAtTime(0.0008, startSec + durSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    registerActiveOscillator(osc, gain);

    osc.start(startSec);
    osc.stop(startSec + durSec);
  }

  return true;
}

export function getLibrarySnippet(id: string): string {
  return `import { playLibrarySound } from "@/lib/audio/sound-library";\n\n// Trigger inside a user interaction handler:\nplayLibrarySound("${id}", { volume: 0.8 });`;
}
