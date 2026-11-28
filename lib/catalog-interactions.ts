export type InteractionType =
  | "hover"
  | "drag"
  | "press"
  | "swipe"
  | "type"
  | "select"
  | "scroll"
  | "loading"
  | "focus"
  | "drop"
  | "hold"
  | "keyboard";

export interface ComponentCapabilities {
  interactions: InteractionType[];
  interactionHint: string;
  livePreview: boolean;
  adjustable: boolean;
  comparisonSupported: boolean;
  soundSupported: boolean;
  motionSupported: boolean;
  isNew?: boolean;
}

export const INTERACTION_LABELS: Record<InteractionType, string> = {
  hover: "Hover",
  drag: "Drag",
  press: "Press",
  swipe: "Swipe",
  type: "Type",
  select: "Select",
  scroll: "Scroll",
  loading: "Loading",
  focus: "Focus",
  drop: "Drop",
  hold: "Hold",
  keyboard: "Keyboard",
};

export const ALL_INTERACTION_TYPES: InteractionType[] = [
  "hover",
  "press",
  "drag",
  "swipe",
  "type",
  "select",
  "loading",
  "scroll",
  "focus",
  "drop",
  "hold",
  "keyboard",
];

type CapabilityOverride = Partial<ComponentCapabilities> & {
  interactions: InteractionType[];
  interactionHint: string;
};

const CAPABILITY_MAP: Record<string, CapabilityOverride> = {
  "ripple-button": {
    interactions: ["press", "hover", "focus", "keyboard"],
    interactionHint: "Press to trigger pointer-origin ripple",
    adjustable: true,
  },
  "jelly-button": {
    interactions: ["hover", "press", "keyboard"],
    interactionHint: "Hover to attract, press for spring squash",
    adjustable: true,
  },
  "copy-button": {
    interactions: ["press", "hover", "keyboard"],
    interactionHint: "Press to copy and confirm state",
    adjustable: true,
  },
  "sound-toggle": {
    interactions: ["press", "keyboard", "focus"],
    interactionHint: "Press to toggle global audio cues",
    adjustable: true,
  },
  "bounce-dots-loader": {
    interactions: ["loading"],
    interactionHint: "Continuous rhythmic loading sequence",
    adjustable: true,
  },
  "progress-ring": {
    interactions: ["loading", "press"],
    interactionHint: "Tune progress value in the inspector",
    adjustable: true,
  },
  "wiggle-text": {
    interactions: ["hover"],
    interactionHint: "Hover across letters to ripple",
    adjustable: true,
  },
  "skeleton-shimmer": {
    interactions: ["loading"],
    interactionHint: "Animated shimmer placeholder sweep",
    adjustable: true,
  },
  dropzone: {
    interactions: ["drop", "drag", "press", "keyboard"],
    interactionHint: "Drop files or click to browse",
    adjustable: true,
  },
  "swipe-card-deck": {
    interactions: ["drag", "swipe", "keyboard", "press"],
    interactionHint: "Drag cards left/right or use arrow keys",
    adjustable: true,
    isNew: true,
  },
  "thinking-loader": {
    interactions: ["loading"],
    interactionHint: "Multi-stage AI reasoning pulse",
    adjustable: true,
    isNew: true,
  },
  "flip-card": {
    interactions: ["hover", "press", "keyboard"],
    interactionHint: "Click or press Enter to flip 3D surface",
    adjustable: true,
  },
  "ai-prompt-composer": {
    interactions: ["type", "press", "focus", "keyboard"],
    interactionHint: "Type a prompt or press Send",
    adjustable: true,
    isNew: true,
  },
  "streaming-message": {
    interactions: ["loading", "press"],
    interactionHint: "Watch token stream or replay sequence",
    adjustable: true,
  },
  "tool-call-card": {
    interactions: ["press", "loading", "keyboard"],
    interactionHint: "Expand inspectable tool payload",
    adjustable: true,
  },
  "agent-plan": {
    interactions: ["loading", "press", "select"],
    interactionHint: "Toggle step progress and details",
    adjustable: true,
  },
  "approval-card": {
    interactions: ["press", "keyboard", "focus"],
    interactionHint: "Approve or reject proposed action",
    adjustable: true,
  },
  "inline-diff": {
    interactions: ["select", "press"],
    interactionHint: "Switch unified or split diff view",
    adjustable: true,
  },
  "reasoning-trace": {
    interactions: ["press", "scroll", "keyboard"],
    interactionHint: "Expand trace steps to inspect reasoning",
    adjustable: true,
  },
  "ai-chat": {
    interactions: ["type", "press", "scroll"],
    interactionHint: "Type a message and scroll conversation",
    adjustable: true,
  },
  "image-generation": {
    interactions: ["loading", "press"],
    interactionHint: "Trigger simulated generation pass",
    adjustable: true,
  },
  "chat-orb": {
    interactions: ["hover", "press", "loading"],
    interactionHint: "Switch idle, listening, and speaking states",
    adjustable: true,
  },
  "pixel-image-generation": {
    interactions: ["loading", "press"],
    interactionHint: "Progressive pixel grid reveal",
    adjustable: true,
  },
  "segmented-control": {
    interactions: ["select", "press", "keyboard"],
    interactionHint: "Select segment or navigate with arrows",
    adjustable: true,
  },
  "number-stepper": {
    interactions: ["press", "hold", "keyboard"],
    interactionHint: "Press or hold +/- to adjust count",
    adjustable: true,
  },
  "glow-input": {
    interactions: ["type", "focus", "hover"],
    interactionHint: "Focus and type to see perimeter glow",
    adjustable: true,
  },
  "email-capture": {
    interactions: ["type", "press", "focus"],
    interactionHint: "Type email and submit capture bar",
    adjustable: true,
  },
  "date-picker": {
    interactions: ["select", "press", "keyboard"],
    interactionHint: "Select date on calendar grid",
    adjustable: true,
  },
  "animated-select": {
    interactions: ["select", "press", "keyboard"],
    interactionHint: "Open menu and choose an option",
    adjustable: true,
  },
  "otp-input": {
    interactions: ["type", "focus", "keyboard"],
    interactionHint: "Type digits to advance slots",
    adjustable: true,
  },
  "multi-select": {
    interactions: ["select", "press", "type", "keyboard"],
    interactionHint: "Select multiple tags or filter options",
    adjustable: true,
  },
  "cookie-consent": {
    interactions: ["press", "select"],
    interactionHint: "Toggle preferences or accept consent",
    adjustable: true,
  },
  "card-stack": {
    interactions: ["drag", "swipe", "press"],
    interactionHint: "Drag or click to cycle stacked cards",
    adjustable: true,
  },
  "detent-drawer": {
    interactions: ["drag", "swipe", "press"],
    interactionHint: "Drag handle between snap detents",
    adjustable: true,
  },
  notch: {
    interactions: ["hover", "press", "select"],
    interactionHint: "Hover or click notch to expand activity",
    adjustable: true,
  },
  "physical-knob": {
    interactions: ["drag", "keyboard", "hover"],
    interactionHint: "Drag radially or use arrow keys to dial",
    adjustable: true,
    isNew: true,
  },
  "reaction-arc": {
    interactions: ["press", "hover", "select"],
    interactionHint: "Press trigger to fan radial reactions",
    adjustable: true,
    isNew: true,
  },
  "receipt-printer": {
    interactions: ["press", "scroll"],
    interactionHint: "Press Print to feed animated receipt",
    adjustable: true,
  },
  "rubber-band-select": {
    interactions: ["drag", "select"],
    interactionHint: "Drag marquee box to select items",
    adjustable: true,
  },
  "morphing-tray": {
    interactions: ["press", "select"],
    interactionHint: "Click tray actions to morph height",
    adjustable: true,
  },
  keyboard: {
    interactions: ["press", "keyboard", "hover"],
    interactionHint: "Click keys or type on your keyboard",
    adjustable: true,
  },
  "infinity-canvas": {
    interactions: ["drag", "scroll"],
    interactionHint: "Drag to pan and scroll to zoom",
    adjustable: true,
  },
  "scratch-card": {
    interactions: ["drag", "hover"],
    interactionHint: "Drag pointer across foil to reveal",
    adjustable: true,
  },
  "halftone-popover": {
    interactions: ["hover", "press", "focus"],
    interactionHint: "Click or hover trigger to open popover",
    adjustable: true,
  },
  "shader-background": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across canvas to distort",
    adjustable: true,
    isNew: true,
  },
  "logo-flare": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to shift volumetric flare",
    adjustable: true,
    isNew: true,
  },
  silk: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across silk folds",
    adjustable: true,
    isNew: true,
  },
  "liquid-gold": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to bend liquid satin",
    adjustable: true,
    isNew: true,
  },
  contour: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to warp contour bands",
    adjustable: true,
    isNew: true,
  },
  mercury: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across liquid chrome",
    adjustable: true,
    isNew: true,
  },
  pastel: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to shift pastel sweep",
    adjustable: true,
    isNew: true,
  },
  aurora: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to bend northern lights",
    adjustable: true,
    isNew: true,
  },
  flow: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across fluid gradient",
    adjustable: true,
    isNew: true,
  },
  noise: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to disturb FBM grain",
    adjustable: true,
    isNew: true,
  },
  "liquid-drops": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to refract droplets",
    adjustable: true,
    isNew: true,
  },
  ripple: {
    interactions: ["hover", "press", "scroll"],
    interactionHint: "Click or move pointer to spawn ripples",
    adjustable: true,
    isNew: true,
  },
  energy: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to energize grid",
    adjustable: true,
    isNew: true,
  },
  "fluted-glass": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across ribbed glass",
    adjustable: true,
    isNew: true,
  },
  topography: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to shift contour bands",
    adjustable: true,
    isNew: true,
  },
  prism: {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to refract spectral caustics",
    adjustable: true,
    isNew: true,
  },
  "kinetic-torus": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to tilt 3D rim light",
    adjustable: true,
    isNew: true,
  },
  "particle-helix": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer to orbit 3D helix",
    adjustable: true,
    isNew: true,
  },
  "bio-terrain": {
    interactions: ["hover", "scroll"],
    interactionHint: "Move pointer across organic terrain",
    adjustable: true,
    isNew: true,
  },
};

export function resolveComponentCapabilities(params: {
  slug: string;
  status: "implemented" | "planned";
  supportsSound: boolean;
}): ComponentCapabilities {
  const override = CAPABILITY_MAP[params.slug];
  if (params.status !== "implemented") {
    return {
      interactions: override?.interactions ?? ["press"],
      interactionHint: override?.interactionHint ?? "Planned component",
      livePreview: false,
      adjustable: false,
      comparisonSupported: false,
      soundSupported: params.supportsSound,
      motionSupported: true,
      isNew: false,
    };
  }

  return {
    interactions: override?.interactions ?? ["press", "hover"],
    interactionHint: override?.interactionHint ?? "Interact live with the preview",
    livePreview: true,
    adjustable: override?.adjustable ?? false,
    comparisonSupported: true,
    soundSupported: params.supportsSound,
    motionSupported: true,
    isNew: override?.isNew ?? false,
  };
}
