import {
  resolveComponentCapabilities,
  type InteractionType,
} from "./catalog-interactions";

export type { InteractionType };
export type ComponentTier = "free" | "pro";
export type ComponentStatus = "implemented" | "planned";
export type ComponentCategory =
  | "Signature"
  | "Backgrounds"
  | "AI"
  | "Buttons"
  | "Controls"
  | "Loaders"
  | "Feedback"
  | "Actions"
  | "Typography"
  | "Inputs"
  | "Flows"
  | "Data Viz"
  | "Blocks";

export interface PropDoc {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface CatalogItem {
  slug: string;
  name: string;
  category: ComponentCategory;
  tier: ComponentTier;
  status: ComponentStatus;
  description: string;
  dependencies: string[];
  supportsSound: boolean;
  supportsHaptics: boolean;
  accessibilityNotes: string;
  installCommand: string;
  sourcePath?: string;
  useCases?: UseCase[];
  props: PropDoc[];
  interactions: InteractionType[];
  interactionHint: string;
  livePreview: boolean;
  adjustable: boolean;
  comparisonSupported: boolean;
  soundSupported: boolean;
  motionSupported: boolean;
  isNew?: boolean;
}

type RawCatalogItem = Omit<
  CatalogItem,
  | "interactions"
  | "interactionHint"
  | "livePreview"
  | "adjustable"
  | "comparisonSupported"
  | "soundSupported"
  | "motionSupported"
  | "isNew"
>;

const RAW_CATALOG_ITEMS: RawCatalogItem[] = [
  {
    slug: "ripple-button",
    name: "Ripple Button",
    category: "Buttons",
    tier: "free",
    status: "implemented",
    description:
      "Tactile button with pointer-origin ripple expansion, keyboard support, and optional Web Audio click + haptic feedback.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      "Native <button> semantics, visible focus-visible ring, respects prefers-reduced-motion, and never relies on audio alone.",
    installCommand: "npx shadcn add @rjstudio/ripple-button",
    sourcePath: "registry/components/ripple-button.tsx",
    useCases: [
      { title: "CTA buttons", description: "Primary calls-to-action where tactile confirmation reinforces each click." },
      { title: "Form submission", description: "Submit or confirm actions with satisfying pointer-origin ripple feedback." },
    ],
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "outline"',
        defaultValue: '"primary"',
        description: "Visual style token mapping.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Button height and horizontal padding.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global MotionMint sound setting.",
      },
      {
        name: "haptic",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global haptic vibration setting.",
      },
    ],
  },
  {
    slug: "jelly-button",
    name: "Jelly / Magnetic Button",
    category: "Buttons",
    tier: "free",
    status: "implemented",
    description:
      "Spring-physics magnetic button with subtle cursor attraction and squash-and-stretch press feedback.",
    dependencies: ["motion", "react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      "Disables magnetic/spring transforms automatically when prefers-reduced-motion is enabled.",
    installCommand: "npx shadcn add @rjstudio/jelly-button",
    sourcePath: "registry/components/jelly-button.tsx",
    useCases: [
      { title: "Playful interfaces", description: "Consumer apps, games, or onboarding flows where delight matters." },
      { title: "Mobile-first UIs", description: "Touch targets that spring back and reward finger taps naturally." },
    ],
    props: [
      {
        name: "magneticStrength",
        type: "number",
        defaultValue: "0.25",
        description: "Controls pointer attraction pull factor.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
      {
        name: "haptic",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global haptic setting.",
      },
    ],
  },
  {
    slug: "copy-button",
    name: "Animated Copy Button",
    category: "Actions",
    tier: "free",
    status: "implemented",
    description:
      "Clipboard copy button with immediate icon/label confirmation and optional success chime.",
    dependencies: ["lucide-react", "react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      "Updates aria-label on copy state change and communicates success visually without requiring sound.",
    installCommand: "npx shadcn add @rjstudio/copy-button",
    sourcePath: "registry/components/copy-button.tsx",
    useCases: [
      { title: "Code snippets", description: "One-click copy on install commands, API keys, and code blocks." },
      { title: "Share links", description: "Copy referral links or shareable URLs without leaving the page." },
    ],
    props: [
      {
        name: "value",
        type: "string",
        defaultValue: "required",
        description: "Text written to navigator.clipboard.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Copy"',
        description: "Idle button label.",
      },
      {
        name: "copiedLabel",
        type: "string",
        defaultValue: '"Copied"',
        description: "Confirmation label after successful copy.",
      },
      {
        name: "errorLabel",
        type: "string",
        defaultValue: '"Failed"',
        description: "Visual fallback label when clipboard write fails.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
      {
        name: "haptic",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global haptic setting.",
      },
    ],
  },
  {
    slug: "sound-toggle",
    name: "Sound & Haptic Toggle",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description:
      "Accessible switch with spring thumb transition and distinct on/off synthesized audio cues.",
    dependencies: ["motion", "react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      'Uses role="switch" with aria-checked, aria-label, and keyboard Enter/Space support.',
    installCommand: "npx shadcn add @rjstudio/sound-toggle",
    sourcePath: "registry/components/sound-toggle.tsx",
    useCases: [
      { title: "Media-rich apps", description: "Let users mute ambient sounds, notifications, or interaction audio globally." },
      { title: "Game UIs", description: "Classic mute/unmute control styled to match branded game interfaces." },
    ],
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "undefined",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "Initial uncontrolled state.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        defaultValue: "undefined",
        description: "Callback fired when toggled.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Toggle setting"',
        description: "Accessible switch label.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
      {
        name: "haptic",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global haptic setting.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
    ],
  },
  {
    slug: "bounce-dots-loader",
    name: "Bounce Dots Loader",
    category: "Loaders",
    tier: "free",
    status: "implemented",
    description:
      "Lightweight CSS-keyframe three-dot loader with zero JS animation overhead.",
    dependencies: ["react"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      'Exposes role="status" and screen-reader-only text; respects prefers-reduced-motion.',
    installCommand: "npx shadcn add @rjstudio/bounce-dots-loader",
    sourcePath: "registry/components/bounce-dots-loader.tsx",
    useCases: [
      { title: "Chat interfaces", description: "Typing indicator while an AI or remote user composes a reply." },
      { title: "Async content", description: "Non-blocking loading state for feed items, media, or remote data." },
    ],
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Diameter of each dot.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Loading"',
        description: "Screen-reader status label.",
      },
    ],
  },
  {
    slug: "progress-ring",
    name: "Progress Ring & Bar",
    category: "Feedback",
    tier: "free",
    status: "implemented",
    description:
      "Crisp SVG progress ring and linear progress bar with smooth easing and tabular percentage readout.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      'Uses role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax.',
    installCommand: "npx shadcn add @rjstudio/progress-ring",
    sourcePath: "registry/components/progress-ring.tsx",
    useCases: [
      { title: "File upload progress", description: "Show upload or processing completion as a satisfying ring fill." },
      { title: "Skill or score meters", description: "Profile pages, assessments, and dashboards displaying percentage values." },
    ],
    props: [
      {
        name: "value",
        type: "number",
        defaultValue: "required",
        description: "Current progress value.",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "100",
        description: "Maximum progress value.",
      },
      {
        name: "size",
        type: "number",
        defaultValue: "64",
        description: "SVG width and height in pixels (ProgressRing).",
      },
      {
        name: "strokeWidth",
        type: "number",
        defaultValue: "6",
        description: "Ring stroke thickness in pixels (ProgressRing).",
      },
      {
        name: "showValue",
        type: "boolean",
        defaultValue: "true",
        description: "Displays percentage readout.",
      },
      {
        name: "label",
        type: "string",
        defaultValue: '"Progress"',
        description: "Accessible progressbar label.",
      },
    ],
  },
  {
    slug: "wiggle-text",
    name: "Wiggle Text",
    category: "Typography",
    tier: "free",
    status: "implemented",
    description:
      "Lightweight CSS-animated character or word wiggle typography primitive with configurable intensity and trigger.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      "Sets aria-label on the semantic wrapper and aria-hidden on split segments so screen readers read full words naturally; respects prefers-reduced-motion.",
    installCommand: "npx shadcn add @rjstudio/wiggle-text",
    sourcePath: "registry/components/wiggle-text.tsx",
    useCases: [
      { title: "Error labels", description: "Shake a field label or message to draw attention after validation failure." },
      { title: "Promotional callouts", description: "Animate headline words to create lively, eye-catching marketing copy." },
    ],
    props: [
      {
        name: "text",
        type: "string",
        defaultValue: "required",
        description: "Text content to render and animate.",
      },
      {
        name: "as",
        type: '"span" | "p" | "h1" | "h2" | "h3" | "h4"',
        defaultValue: '"span"',
        description: "Semantic HTML element.",
      },
      {
        name: "splitBy",
        type: '"char" | "word"',
        defaultValue: '"char"',
        description: "Animates per character or per word.",
      },
      {
        name: "intensity",
        type: '"subtle" | "medium" | "playful"',
        defaultValue: '"medium"',
        description: "Controls rotation and vertical lift.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "420",
        description: "Animation duration in milliseconds.",
      },
      {
        name: "trigger",
        type: '"hover" | "click" | "always"',
        defaultValue: '"hover"',
        description: "When the wiggle animation runs.",
      },
      {
        name: "variant",
        type: '"default" | "accent" | "underline"',
        defaultValue: '"default"',
        description: "Visual typography variant.",
      },
    ],
  },
  {
    slug: "skeleton-shimmer",
    name: "Skeleton Shimmer",
    category: "Loaders",
    tier: "free",
    status: "implemented",
    description:
      "Composable CSS shimmer placeholders for text, avatars, cards, and rectangles with reduced-motion fallback.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      'Exposes role="status" with screen-reader label while marking visual shimmer blocks aria-hidden; disables shimmer under prefers-reduced-motion.',
    installCommand: "npx shadcn add @rjstudio/skeleton-shimmer",
    sourcePath: "registry/components/skeleton-shimmer.tsx",
    useCases: [
      { title: "List loading states", description: "Placeholder cards while feed items, search results, or posts load." },
      { title: "Profile previews", description: "Avatar and name shimmer before user data resolves from an API." },
    ],
    props: [
      {
        name: "variant",
        type: '"text" | "avatar" | "card" | "rect"',
        defaultValue: '"text"',
        description: "Skeleton layout preset.",
      },
      {
        name: "count",
        type: "number",
        defaultValue: "1",
        description: "Number of skeleton items to render (1–12).",
      },
      {
        name: "width",
        type: "string | number",
        defaultValue: "undefined",
        description: "Optional width override.",
      },
      {
        name: "height",
        type: "string | number",
        defaultValue: "undefined",
        description: "Optional height override.",
      },
      {
        name: "animate",
        type: "boolean",
        defaultValue: "true",
        description: "Toggles shimmer sweep animation.",
      },
    ],
  },
  {
    slug: "dropzone",
    name: "Basic Dropzone",
    category: "Inputs",
    tier: "free",
    status: "implemented",
    description:
      "Accessible click-and-drag file selection dropzone with type/size validation, file list removal, and optional audio/haptic cues.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      'Keyboard Enter/Space activation, aria-disabled support, and role="alert" validation messages; strictly handles file selection without faking server uploads.',
    installCommand: "npx shadcn add @rjstudio/dropzone",
    sourcePath: "registry/components/dropzone.tsx",
    useCases: [
      { title: "File upload", description: "Drag-and-drop or click-to-browse for images, documents, and assets." },
      { title: "Media import", description: "Creative tools where users drop photos, videos, or audio into a workspace." },
    ],
    props: [
      {
        name: "accept",
        type: "string | string[]",
        defaultValue: "undefined",
        description: "Accepted file extensions or MIME types.",
      },
      {
        name: "maxSize",
        type: "number",
        defaultValue: "5242880",
        description: "Maximum file size in bytes (default 5 MB).",
      },
      {
        name: "multiple",
        type: "boolean",
        defaultValue: "false",
        description: "Allows selecting multiple files.",
      },
      {
        name: "onFilesChange",
        type: "(files: File[]) => void",
        defaultValue: "undefined",
        description: "Callback invoked when selected files change.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
      {
        name: "haptic",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global haptic setting.",
      },
    ],
  },
  {
    slug: "swipe-card-deck",
    name: "Swipe Card Deck",
    category: "Signature",
    tier: "free",
    status: "implemented",
    description:
      "Layered tactile card stack with spring drag/swipe gestures, card rotation, undo history, and keyboard arrow navigation.",
    dependencies: ["motion", "lucide-react", "react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      "Supports ArrowLeft/ArrowRight keyboard swiping, Cmd/Ctrl+Z undo, and prefers-reduced-motion instant transitions.",
    installCommand: "npx shadcn add @rjstudio/swipe-card-deck",
    sourcePath: "registry/components/swipe-card-deck.tsx",
    useCases: [
      { title: "Onboarding slides", description: "Walk new users through feature highlights one card at a time." },
      { title: "Tinder-style decisions", description: "Swipe left/right to accept or dismiss options, recommendations, or tasks." },
    ],
    props: [
      {
        name: "cards",
        type: "DeckCardItem[]",
        defaultValue: "required",
        description: "Array of cards rendered in the stack.",
      },
      {
        name: "onCardDismiss",
        type: "(card, direction) => void",
        defaultValue: "undefined",
        description: "Callback when a card is swiped left or right.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
    ],
  },
  {
    slug: "thinking-loader",
    name: "Thinking Loader",
    category: "Signature",
    tier: "free",
    status: "implemented",
    description:
      "Expressive multi-stage status indicator with orbit, pulse-grid, and wave styles for async application states.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      'Uses role="status" and aria-live="polite" to announce application stage transitions cleanly.',
    installCommand: "npx shadcn add @rjstudio/thinking-loader",
    sourcePath: "registry/components/thinking-loader.tsx",
    useCases: [
      { title: "AI response wait", description: "Show the model is working while generating a streamed or batch response." },
      { title: "Background processing", description: "Long-running server tasks where a simple spinner feels too passive." },
    ],
    props: [
      {
        name: "stages",
        type: "string[]",
        defaultValue: "4 default stages",
        description: "Status labels cycled at intervalMs.",
      },
      {
        name: "variant",
        type: '"orbit" | "pulse-grid" | "wave"',
        defaultValue: '"orbit"',
        description: "Visual indicator style.",
      },
      {
        name: "intervalMs",
        type: "number",
        defaultValue: "2000",
        description: "Duration per stage in milliseconds.",
      },
    ],
  },
  {
    slug: "flip-card",
    name: "Direction-Aware Flip Card",
    category: "Signature",
    tier: "free",
    status: "implemented",
    description:
      "3D perspective card that detects pointer entry direction and flips along the natural axis with keyboard and reduced-motion fallbacks.",
    dependencies: ["motion", "react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes:
      'Button semantics with aria-pressed state, keyboard Enter/Space flip, and instant crossfade under prefers-reduced-motion.',
    installCommand: "npx shadcn add @rjstudio/flip-card",
    sourcePath: "registry/components/flip-card.tsx",
    useCases: [
      { title: "Flashcards", description: "Educational apps where flipping reveals an answer, translation, or definition." },
      { title: "Product cards", description: "E-commerce tiles that flip to show size guides, specs, or related items." },
    ],
    props: [
      {
        name: "front",
        type: "ReactNode",
        defaultValue: "required",
        description: "Front face content.",
      },
      {
        name: "back",
        type: "ReactNode",
        defaultValue: "required",
        description: "Back face content.",
      },
      {
        name: "sound",
        type: "boolean",
        defaultValue: "global",
        description: "Overrides the global sound setting.",
      },
    ],
  },
  {
    slug: "ai-prompt-composer",
    name: "AI Prompt Composer",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Accessible prompt input with Enter-to-send, Shift+Enter newline, mode selector, and stop-streaming state.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Keyboard Enter submission, aria-label on textarea/buttons, disabled & streaming states.",
    installCommand: "npx shadcn@latest add @rjstudio/ai-prompt-composer",
    sourcePath: "registry/components/ai-prompt-composer.tsx",
    useCases: [
      { title: "Prompt builder", description: "Let users craft, refine, and submit structured prompts with live token count." },
      { title: "AI sidebar", description: "Collapsible composer attached to a document editor or creative workspace." },
    ],
    props: [
      { name: "onSubmit", type: "(prompt: string) => void", defaultValue: "undefined", description: "Called when prompt is submitted." },
      { name: "isStreaming", type: "boolean", defaultValue: "false", description: "Switches send button to stop button." },
    ],
  },
  {
    slug: "streaming-message",
    name: "Streaming Message",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Role-aware message bubble with streaming cursor, error state, and retry callback.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: 'Uses aria-live="polite" during streaming and article role.',
    installCommand: "npx shadcn@latest add @rjstudio/streaming-message",
    sourcePath: "registry/components/streaming-message.tsx",
    useCases: [
      { title: "AI chat replies", description: "Stream token-by-token output from LLMs with a smooth cursor blink." },
      { title: "Live feed updates", description: "Progressively reveal news items, logs, or notifications as they arrive." },
    ],
    props: [
      { name: "message", type: "AIMessage", defaultValue: "required", description: "Message object with role, content, and status." },
      { name: "onRetry", type: "() => void", defaultValue: "undefined", description: "Retry handler when status is error." },
    ],
  },
  {
    slug: "tool-call-card",
    name: "Tool Call Card",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Collapsible tool execution card displaying status, duration, and formatted input/output JSON.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Uses aria-expanded on the collapsible header.",
    installCommand: "npx shadcn@latest add @rjstudio/tool-call-card",
    sourcePath: "registry/components/tool-call-card.tsx",
    useCases: [
      { title: "AI agent trace", description: "Display function calls an agent made alongside inputs, outputs, and status." },
      { title: "Debug panel", description: "Developer tools that surface tool execution details during AI runs." },
    ],
    props: [
      { name: "toolCall", type: "AIToolCall", defaultValue: "required", description: "Tool call metadata and status." },
      { name: "defaultExpanded", type: "boolean", defaultValue: "false", description: "Initial expanded state." },
    ],
  },
  {
    slug: "agent-plan",
    name: "Agent Plan",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Ordered multi-step execution plan showing pending, in-progress, completed, failed, and skipped steps.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Semantic ordered list with progress counter.",
    installCommand: "npx shadcn@latest add @rjstudio/agent-plan",
    sourcePath: "registry/components/agent-plan.tsx",
    useCases: [
      { title: "AI task planner", description: "Show the step-by-step plan an agent will follow before it executes." },
      { title: "Workflow preview", description: "Pre-flight checklist UI for multi-step automation pipelines." },
    ],
    props: [
      { name: "steps", type: "AgentPlanStep[]", defaultValue: "required", description: "Ordered list of plan steps." },
      { name: "title", type: "string", defaultValue: '"Execution Plan"', description: "Header title." },
    ],
  },
  {
    slug: "approval-card",
    name: "Approval Card",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Human-in-the-loop confirmation gate with approve/reject callbacks and audio/haptic cues.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: 'Uses region landmark and role="status" after decision.',
    installCommand: "npx shadcn@latest add @rjstudio/approval-card",
    sourcePath: "registry/components/approval-card.tsx",
    useCases: [
      { title: "Human-in-the-loop", description: "Pause AI execution and present the action for a human to approve or reject." },
      { title: "Dangerous action confirm", description: "Destructive or irreversible operations that require an explicit sign-off." },
    ],
    props: [
      { name: "title", type: "string", defaultValue: "required", description: "Action title." },
      { name: "description", type: "string", defaultValue: "required", description: "Explanation of the pending action." },
    ],
  },
  {
    slug: "inline-diff",
    name: "Inline Diff",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Code diff viewer with line-level add/remove highlighting, counts, and accept/discard actions.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Monospace readable diff with +/- prefixes (never color-only).",
    installCommand: "npx shadcn@latest add @rjstudio/inline-diff",
    sourcePath: "registry/components/inline-diff.tsx",
    useCases: [
      { title: "AI code suggestions", description: "Display proposed code changes inline with added/removed line highlighting." },
      { title: "Document edits", description: "Track changes in collaborative writing or AI-assisted content generation." },
    ],
    props: [
      { name: "filename", type: "string", defaultValue: "required", description: "Target file path." },
      { name: "lines", type: "DiffLine[]", defaultValue: "required", description: "Diff lines array." },
    ],
  },
  {
    slug: "reasoning-trace",
    name: "Reasoning Trace",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Collapsible execution trace log for developer-supplied step summaries.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Collapsible button with aria-expanded and numbered list.",
    installCommand: "npx shadcn@latest add @rjstudio/reasoning-trace",
    sourcePath: "registry/components/reasoning-trace.tsx",
    useCases: [
      { title: "Chain-of-thought display", description: "Unfold the step-by-step reasoning an AI model produced for a decision." },
      { title: "Explainability panel", description: "Show users why an AI made a particular recommendation or classification." },
    ],
    props: [
      { name: "entries", type: "string[]", defaultValue: "required", description: "Trace entries to display." },
      { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state." },
    ],
  },
  {
    slug: "ai-chat",
    name: "AI Chat",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Composable conversation container combining StreamingMessage, ThinkingLoader, and AIPromptComposer.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Clearly labels demo mode and supports full keyboard submission.",
    installCommand: "npx shadcn@latest add @rjstudio/ai-chat",
    sourcePath: "registry/components/ai-chat.tsx",
    useCases: [
      { title: "In-product assistant", description: "Embedded conversation UI for a product copilot or support chatbot." },
      { title: "Playground interface", description: "Full-featured chat surface for experimenting with LLM API responses." },
    ],
    props: [
      { name: "initialMessages", type: "AIMessage[]", defaultValue: "[]", description: "Initial conversation messages." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Shows ThinkingLoader." },
    ],
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "State-driven media generation preview supporting idle, generating progress, complete, and error states.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: 'Uses role="status" for progress and role="alert" for failure.',
    installCommand: "npx shadcn@latest add @rjstudio/image-generation",
    sourcePath: "registry/components/image-generation.tsx",
    useCases: [
      { title: "AI creative studio", description: "Prompt → image workflow with loading state, seed display, and retry." },
      { title: "Asset generator", description: "Design tools that produce icons, backgrounds, or illustrations on demand." },
    ],
    props: [
      { name: "prompt", type: "string", defaultValue: "required", description: "Prompt caption." },
      { name: "status", type: '"idle" | "generating" | "complete" | "error"', defaultValue: "required", description: "Current generation state." },
    ],
  },
  {
    slug: "chat-orb",
    name: "Chat Orb",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Interactive voice-state orb button with idle, listening, and speaking states.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Button semantics with aria-pressed and motion-safe pulse.",
    installCommand: "npx shadcn@latest add @rjstudio/chat-orb",
    sourcePath: "registry/components/chat-orb.tsx",
    useCases: [
      { title: "Floating AI assistant", description: "Persistent orb button that expands into a chat panel from any page." },
      { title: "Voice interface", description: "Pulsing orb visualiser for voice input or wake-word listening state." },
    ],
    props: [
      { name: "state", type: '"idle" | "listening" | "speaking"', defaultValue: '"idle"', description: "Current orb state." },
    ],
  },
  {
    slug: "pixel-image-generation",
    name: "Pixel Image Generation",
    category: "AI",
    tier: "free",
    status: "implemented",
    description: "Progressive pixel-grid synthesis preview driven by numeric progress.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: 'Exposes role="img" with descriptive progress aria-label.',
    installCommand: "npx shadcn@latest add @rjstudio/pixel-image-generation",
    sourcePath: "registry/components/pixel-image-generation.tsx",
    useCases: [
      { title: "Retro AI generator", description: "Produce pixel-art sprites or scenes from text prompts in a game aesthetic." },
      { title: "404 or empty state", description: "A small, friendly pixel scene for pages with no content yet." },
    ],
    props: [
      { name: "progress", type: "number", defaultValue: "75", description: "Completion percentage (0–100)." },
      { name: "gridSize", type: "number", defaultValue: "8", description: "Grid dimensions (N×N)." },
    ],
  },
  {
    slug: "segmented-control",
    name: "Segmented Control",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Single-selection pill control with animated indicator, disabled options, and keyboard arrow navigation.",
    dependencies: ["motion", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: 'Uses role="radiogroup" and role="radio" with ArrowLeft/ArrowRight navigation.',
    installCommand: "npx shadcn@latest add @rjstudio/segmented-control",
    sourcePath: "registry/components/segmented-control.tsx",
    useCases: [
      { title: "View switcher", description: "Toggle between Grid, List, and Map views or comparable layout options." },
      { title: "Filter tabs", description: "Switch between All, Active, and Archived states in a list or dashboard." },
    ],
    props: [
      { name: "options", type: "SegmentedOption[]", defaultValue: "required", description: "Selectable options." },
      { name: "value", type: "string", defaultValue: "undefined", description: "Controlled selected value." },
      { name: "size", type: '"sm" | "md"', defaultValue: '"md"', description: "Control height." },
    ],
  },
  {
    slug: "number-stepper",
    name: "Number Stepper",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Numeric stepper with increment/decrement buttons, direct input, min/max clamping, and ArrowUp/Down support.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Keyboard ArrowUp/Down support, disabled boundary buttons, and aria-label.",
    installCommand: "npx shadcn@latest add @rjstudio/number-stepper",
    sourcePath: "registry/components/number-stepper.tsx",
    useCases: [
      { title: "Quantity selector", description: "Increment or decrement item counts in a cart, seat picker, or booking form." },
      { title: "Settings input", description: "Adjust numeric preferences like font size, columns, or retry attempts." },
    ],
    props: [
      { name: "min", type: "number", defaultValue: "0", description: "Minimum value." },
      { name: "max", type: "number", defaultValue: "100", description: "Maximum value." },
      { name: "step", type: "number", defaultValue: "1", description: "Step increment." },
      { name: "variant", type: '"compact" | "expanded"', defaultValue: '"compact"', description: "Sizing preset." },
    ],
  },
  {
    slug: "glow-input",
    name: "Glow Input",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Focus-responsive input with optional pointer-tracking radial border glow, prefix/suffix slots, and error states.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Associates label, helper/error text via aria-describedby and sets aria-invalid.",
    installCommand: "npx shadcn@latest add @rjstudio/glow-input",
    sourcePath: "registry/components/glow-input.tsx",
    useCases: [
      { title: "Search bar", description: "Prominent search field with an ambient glow to draw user focus." },
      { title: "AI prompt input", description: "Single-line entry point for AI queries with an energised focused state." },
    ],
    props: [
      { name: "label", type: "string", defaultValue: "undefined", description: "Accessible input label." },
      { name: "error", type: "string", defaultValue: "undefined", description: "Validation error message." },
      { name: "enableCursorGlow", type: "boolean", defaultValue: "true", description: "Enables pointer-tracking border glow." },
    ],
  },
  {
    slug: "email-capture",
    name: "Email Capture",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Validated email capture form with loading, success, and error states via explicit onSubmit callback.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: 'Sets aria-invalid and role="alert" on invalid email submission.',
    installCommand: "npx shadcn@latest add @rjstudio/email-capture",
    sourcePath: "registry/components/email-capture.tsx",
    useCases: [
      { title: "Waitlist signup", description: "Pre-launch landing pages where capturing an email is the primary CTA." },
      { title: "Newsletter footer", description: "Lightweight inline form in a site footer or marketing section." },
    ],
    props: [
      { name: "onSubmit", type: "(email: string) => Promise<void> | void", defaultValue: "undefined", description: "Explicit submission callback." },
      { name: "submitLabel", type: "string", defaultValue: '"Subscribe"', description: "Button label." },
    ],
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Zero-dependency calendar date picker with min/max bounds, month navigation, and Intl formatting.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Escape & outside-click dismissal, aria-haspopup dialog, and formatted day labels.",
    installCommand: "npx shadcn@latest add @rjstudio/date-picker",
    sourcePath: "registry/components/date-picker.tsx",
    useCases: [
      { title: "Booking forms", description: "Hotel, restaurant, or appointment scheduling with calendar selection." },
      { title: "Filter by date", description: "Dashboard date-range filters for reports, analytics, or activity feeds." },
    ],
    props: [
      { name: "minDate", type: "Date", defaultValue: "undefined", description: "Earliest selectable date." },
      { name: "maxDate", type: "Date", defaultValue: "undefined", description: "Latest selectable date." },
      { name: "locale", type: "string", defaultValue: '"en-US"', description: "Intl locale string." },
    ],
  },
  {
    slug: "animated-select",
    name: "Animated Select",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Searchable combobox select with animated dropdown, grouped options, disabled items, and keyboard navigation.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: 'Uses combobox/listbox ARIA roles with ArrowUp/ArrowDown/Enter/Escape support.',
    installCommand: "npx shadcn@latest add @rjstudio/animated-select",
    sourcePath: "registry/components/animated-select.tsx",
    useCases: [
      { title: "Country or currency picker", description: "Select from long lists with smooth open/close animation and keyboard nav." },
      { title: "Preference dropdowns", description: "Theme, language, or timezone selectors with elevated visual polish." },
    ],
    props: [
      { name: "options", type: "SelectOption[]", defaultValue: "required", description: "Select options." },
      { name: "searchable", type: "boolean", defaultValue: "true", description: "Enables inline search." },
    ],
  },
  {
    slug: "otp-input",
    name: "OTP Input",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Multi-cell verification code input with auto-focus progression, backspace navigation, and clipboard paste.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Per-cell aria-labels, ArrowLeft/Right navigation, and numeric/alphanumeric modes.",
    installCommand: "npx shadcn@latest add @rjstudio/otp-input",
    sourcePath: "registry/components/otp-input.tsx",
    useCases: [
      { title: "Two-factor auth", description: "Verification code entry for SMS or authenticator app 2FA flows." },
      { title: "Email confirmation", description: "One-time code sent to email during signup or account recovery." },
    ],
    props: [
      { name: "length", type: "number", defaultValue: "6", description: "Number of code cells." },
      { name: "alphanumeric", type: "boolean", defaultValue: "false", description: "Allows letters and digits." },
      { name: "status", type: '"idle" | "error" | "success"', defaultValue: '"idle"', description: "Visual verification state." },
    ],
  },
  {
    slug: "multi-select",
    name: "Multi Select",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Multi-value selector with removable chips, search, select/clear all, and maxSelected limit.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: 'Uses aria-multiselectable="true" and removable chip buttons with aria-label.',
    installCommand: "npx shadcn@latest add @rjstudio/multi-select",
    sourcePath: "registry/components/multi-select.tsx",
    useCases: [
      { title: "Tag assignment", description: "Let users attach multiple labels, categories, or skills to a record." },
      { title: "Filter combination", description: "Advanced search panels where several values may be active simultaneously." },
    ],
    props: [
      { name: "options", type: "MultiSelectOption[]", defaultValue: "required", description: "Selectable options." },
      { name: "maxSelected", type: "number", defaultValue: "undefined", description: "Maximum number of selected items." },
    ],
  },
  {
    slug: "cookie-consent",
    name: "Cookie Consent",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Configurable consent panel with Accept All, Reject Optional, and category customisation callbacks.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Never auto-loads scripts; exposes explicit onSavePreferences callback.",
    installCommand: "npx shadcn@latest add @rjstudio/cookie-consent",
    sourcePath: "registry/components/cookie-consent.tsx",
    useCases: [
      { title: "GDPR compliance", description: "Collect and record user consent for analytics, marketing, and functional cookies." },
      { title: "Privacy-first launch", description: "Satisfy EU and CCPA requirements before enabling third-party scripts." },
    ],
    props: [
      { name: "onSavePreferences", type: "(prefs: CookiePreferences) => void", defaultValue: "undefined", description: "Callback fired on consent save." },
      { name: "storageKey", type: "string", defaultValue: "undefined", description: "Optional localStorage key." },
    ],
  },
  {
    slug: "card-stack",
    name: "Card Stack",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Layered interactive card stack with drag/swipe cycling, configurable depth and rotation, and keyboard navigation.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Keyboard Left/Right arrows cycle cards; includes explicit previous, next, and reset buttons.",
    installCommand: "npx shadcn@latest add @rjstudio/card-stack",
    sourcePath: "registry/components/card-stack.tsx",
    useCases: [
      { title: "Feature showcase", description: "Layer product screenshots or feature cards in a tactile depth stack." },
      { title: "Testimonials", description: "Stackable quote cards users can browse by dragging or pressing arrow keys." },
    ],
    props: [
      { name: "cards", type: "StackCardItem[]", defaultValue: "required", description: "Array of cards rendered in the stack." },
      { name: "maxVisibleDepth", type: "number", defaultValue: "3", description: "Maximum visible depth layers behind the front card." },
      { name: "rotationStep", type: "number", defaultValue: "4", description: "Rotation angle step in degrees per depth layer." },
    ],
  },
  {
    slug: "detent-drawer",
    name: "Detent Drawer",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Snap-point drawer with Peek, Half, and Full detents, drag snapping, and keyboard Escape dismissal.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Dialog role with aria-modal, Escape key dismissal, and explicit detent snap buttons.",
    installCommand: "npx shadcn@latest add @rjstudio/detent-drawer",
    sourcePath: "registry/components/detent-drawer.tsx",
    useCases: [
      { title: "Mobile bottom sheet", description: "iOS-style drawer that snaps to 25 %, 60 %, and 100 % height positions." },
      { title: "Filter panel", description: "Slide-up filter or sort controls on mobile with detented height steps." },
    ],
    props: [
      { name: "detent", type: "'peek' | 'half' | 'full'", defaultValue: "'half'", description: "Controlled snap detent height." },
      { name: "side", type: "'bottom' | 'right'", defaultValue: "'bottom'", description: "Drawer anchor edge." },
      { name: "title", type: "string", defaultValue: "'Detent Drawer'", description: "Accessible dialog heading." },
    ],
  },
  {
    slug: "notch",
    name: "Notch",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Dynamic Island-inspired morphing status pill with idle, active, success, and alert states.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Toggle button exposes aria-expanded state and aria-live status announcements.",
    installCommand: "npx shadcn@latest add @rjstudio/notch",
    sourcePath: "registry/components/notch.tsx",
    useCases: [
      { title: "Dynamic Island-style notifications", description: "Pill-shaped notch that expands to reveal activity, timers, or alerts." },
      { title: "Live activity bar", description: "Persistent status strip showing music playback, navigation, or call state." },
    ],
    props: [
      { name: "state", type: "'idle' | 'active' | 'success' | 'alert'", defaultValue: "'idle'", description: "Visual status tone." },
      { name: "message", type: "string", defaultValue: "required", description: "Primary pill label." },
      { name: "detail", type: "string", defaultValue: "undefined", description: "Expanded detail text." },
    ],
  },
  {
    slug: "physical-knob",
    name: "Physical Knob",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Tactile rotary dial with pointer drag rotation, tick marks, detent snapping, and double-click reset.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Implements role='slider' with aria-valuemin/max/now and Arrow/Home/End keyboard steps.",
    installCommand: "npx shadcn@latest add @rjstudio/physical-knob",
    sourcePath: "registry/components/physical-knob.tsx",
    useCases: [
      { title: "Audio controls", description: "Rotatable knob for volume, pan, EQ gain, or any continuous parameter." },
      { title: "Creative tool parameter", description: "Tactile dial input in a synthesizer, generative art, or visualiser UI." },
    ],
    props: [
      { name: "min", type: "number", defaultValue: "0", description: "Minimum dial value." },
      { name: "max", type: "number", defaultValue: "100", description: "Maximum dial value." },
      { name: "step", type: "number", defaultValue: "5", description: "Step increment per tick." },
    ],
  },
  {
    slug: "reaction-arc",
    name: "Reaction Arc",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Radial fan-out reaction picker with spring-staggered arc geometry and keyboard selection.",
    dependencies: ["motion", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Toolbar/button semantics with aria-expanded, aria-pressed, and Escape key closure.",
    installCommand: "npx shadcn@latest add @rjstudio/reaction-arc",
    sourcePath: "registry/components/reaction-arc.tsx",
    useCases: [
      { title: "Post reactions", description: "Emoji picker arc that fans out on hover or long-press above a feed item." },
      { title: "Quick actions radial", description: "Context-sensitive arc menu providing shortcuts without cluttering the UI." },
    ],
    props: [
      { name: "reactions", type: "ReactionItem[]", defaultValue: "DEFAULT_REACTIONS", description: "Custom emoji/label reactions." },
      { name: "value", type: "string", defaultValue: "undefined", description: "Controlled selected reaction id." },
    ],
  },
  {
    slug: "receipt-printer",
    name: "Receipt Printer",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Thermal-style animated receipt feed with line-by-line printing, totals, and serrated edge.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Semantic line item table with Reprint button and reduced-motion instant reveal.",
    installCommand: "npx shadcn@latest add @rjstudio/receipt-printer",
    sourcePath: "registry/components/receipt-printer.tsx",
    useCases: [
      { title: "Order confirmation", description: "Thermal-print animation reveals order details with satisfying line-by-line reveal." },
      { title: "AI summary printout", description: "Style structured output as a receipt to reinforce a lightweight, ephemeral feel." },
    ],
    props: [
      { name: "items", type: "ReceiptLineItem[]", defaultValue: "required", description: "Line items with qty and unitPrice." },
      { name: "currency", type: "string", defaultValue: "'$'", description: "Currency prefix symbol." },
      { name: "animate", type: "boolean", defaultValue: "true", description: "Enable sequential print reveal." },
    ],
  },
  {
    slug: "rubber-band-select",
    name: "Rubber Band Select",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Elastic drag-to-select list with rubber-band resistance, single/multi select, and keyboard fallback.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Listbox role with aria-multiselectable, aria-selected, and click/keyboard toggling.",
    installCommand: "npx shadcn@latest add @rjstudio/rubber-band-select",
    sourcePath: "registry/components/rubber-band-select.tsx",
    useCases: [
      { title: "Canvas multi-select", description: "Drag a selection rectangle across items in a spatial or grid canvas." },
      { title: "Image gallery picker", description: "Let users lasso multiple thumbnails before applying a batch action." },
    ],
    props: [
      { name: "options", type: "RubberBandOption[]", defaultValue: "required", description: "Selectable options." },
      { name: "multiple", type: "boolean", defaultValue: "true", description: "Allow multiple selections." },
    ],
  },
  {
    slug: "morphing-tray",
    name: "Morphing Tray",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Compact-to-expanded contextual surface morphing seamlessly between summary and full controls.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Exposes aria-expanded toggle and collapses on Escape key.",
    installCommand: "npx shadcn@latest add @rjstudio/morphing-tray",
    sourcePath: "registry/components/morphing-tray.tsx",
    useCases: [
      { title: "Context menu", description: "Tray that reshapes to match the actions available for the selected object." },
      { title: "Adaptive toolbar", description: "Floating toolbar that morphs between compact and expanded states." },
    ],
    props: [
      { name: "title", type: "string", defaultValue: "required", description: "Tray header title." },
      { name: "compactSummary", type: "string", defaultValue: "undefined", description: "Summary shown while collapsed." },
      { name: "defaultExpanded", type: "boolean", defaultValue: "false", description: "Initial expansion state." },
    ],
  },
  {
    slug: "keyboard",
    name: "Keyboard",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Interactive visual mechanical keyboard with physical keystroke highlights, click triggers, and key-cap depth.",
    dependencies: ["react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Every key cap is a native button with keyboard focus ring and aria-pressed state.",
    installCommand: "npx shadcn@latest add @rjstudio/keyboard",
    sourcePath: "registry/components/keyboard.tsx",
    useCases: [
      { title: "Shortcut reference", description: "Interactive keyboard diagram that highlights active modifier combinations." },
      { title: "Typing game", description: "Visual keyboard for educational or gamified typing practice interfaces." },
    ],
    props: [
      { name: "rows", type: "string[][]", defaultValue: "DEFAULT_ROWS", description: "Custom key rows." },
      { name: "trackPhysicalKeys", type: "boolean", defaultValue: "true", description: "Mirror physical keyboard presses." },
    ],
  },
  {
    slug: "infinity-canvas",
    name: "Infinity Canvas",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Pan-and-zoom spatial workspace with draggable nodes, dot grid, zoom controls, and viewport reset.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Toolbar exposes Zoom In, Zoom Out, Add Node, and Reset View buttons.",
    installCommand: "npx shadcn@latest add @rjstudio/infinity-canvas",
    sourcePath: "registry/components/infinity-canvas.tsx",
    useCases: [
      { title: "Spatial component gallery", description: "Pan and zoom across a freeform grid of component previews or design assets." },
      { title: "Whiteboard surface", description: "Infinite workspace for diagrams, sticky notes, or creative brainstorming." },
    ],
    props: [
      { name: "items", type: "CanvasObject[]", defaultValue: "DEFAULT_ITEMS", description: "Initial positioned canvas nodes." },
      { name: "onItemsChange", type: "(items: CanvasObject[]) => void", defaultValue: "undefined", description: "Callback when nodes move or are added." },
    ],
  },
  {
    slug: "scratch-card",
    name: "Scratch Card",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "HTML5 canvas scratch-to-reveal foil surface with automatic threshold completion and accessible reveal fallback.",
    dependencies: ["lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Includes accessible Reveal and Reset buttons for keyboard and assistive technology users.",
    installCommand: "npx shadcn@latest add @rjstudio/scratch-card",
    sourcePath: "registry/components/scratch-card.tsx",
    useCases: [
      { title: "Promotional reward reveal", description: "Gamified discount or prize reveal that users uncover by scratching." },
      { title: "Onboarding surprise", description: "Hidden welcome message or feature unlock that rewards user action." },
    ],
    props: [
      { name: "threshold", type: "number", defaultValue: "45", description: "Scratch percentage required to auto-reveal." },
      { name: "onReveal", type: "() => void", defaultValue: "undefined", description: "Fired once the hidden reward is revealed." },
    ],
  },
  {
    slug: "halftone-popover",
    name: "Halftone Popover",
    category: "Controls",
    tier: "free",
    status: "implemented",
    description: "Expressive popover featuring an SVG halftone dot matrix backdrop, click-outside handling, and Escape dismissal.",
    dependencies: ["motion", "lucide-react", "react", "clsx", "tailwind-merge"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "Trigger exposes aria-expanded/aria-haspopup; dialog closes on Escape or outside pointer down.",
    installCommand: "npx shadcn@latest add @rjstudio/halftone-popover",
    sourcePath: "registry/components/halftone-popover.tsx",
    useCases: [
      { title: "Tooltip with character", description: "Rich informational popover with a halftone-print aesthetic for creative tools." },
      { title: "Contextual help", description: "Explain a UI element inline without modal interruption using print-inspired style." },
    ],
    props: [
      { name: "triggerLabel", type: "string", defaultValue: "'Open Halftone'", description: "Trigger button text." },
      { name: "dotSpacing", type: "number", defaultValue: "10", description: "SVG halftone pattern grid spacing in pixels." },
    ],
  },
  {
    slug: "advanced-upload-flow",
    name: "Advanced Upload Flow",
    category: "Flows",
    tier: "pro",
    status: "planned",
    description: "Multi-file upload experience with previews, progress rings, and retry.",
    dependencies: ["motion", "lucide-react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Live-region upload status announcements.",
    installCommand: "npx shadcn add @rjstudio-pro/advanced-upload-flow",
    props: [],
  },
  {
    slug: "payment-success-flow",
    name: "Payment Success Flow",
    category: "Flows",
    tier: "pro",
    status: "planned",
    description: "Animated receipt reveal, confirmation chime, and copyable invoice ID.",
    dependencies: ["motion", "lucide-react"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Non-audio confirmation summary and focus management.",
    installCommand: "npx shadcn add @rjstudio-pro/payment-success-flow",
    props: [],
  },
  {
    slug: "cover-flow-carousel",
    name: "Cover-Flow Carousel",
    category: "Blocks",
    tier: "pro",
    status: "planned",
    description: "3D perspective card carousel with keyboard and drag navigation.",
    dependencies: ["motion"],
    supportsSound: true,
    supportsHaptics: true,
    accessibilityNotes: "Arrow-key navigation and aria-roledescription.",
    installCommand: "npx shadcn add @rjstudio-pro/cover-flow-carousel",
    props: [],
  },
  {
    slug: "animated-charts",
    name: "Animated Charts",
    category: "Data Viz",
    tier: "pro",
    status: "planned",
    description: "Gauge, donut, and bar visualisations with accessible data tables.",
    dependencies: ["motion", "react"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes: "SVG aria-labels and tabular fallback values.",
    installCommand: "npx shadcn add @rjstudio-pro/animated-charts",
    props: [],
  },
  {
    slug: "bento-dashboard-block",
    name: "Bento Dashboard Block",
    category: "Blocks",
    tier: "pro",
    status: "planned",
    description: "Complete responsive SaaS analytics bento layout.",
    dependencies: ["motion", "lucide-react"],
    supportsSound: true,
    supportsHaptics: false,
    accessibilityNotes: "Semantic landmarks and keyboard-accessible widgets.",
    installCommand: "npx shadcn add @rjstudio-pro/bento-dashboard-block",
    props: [],
  },
  {
    slug: "shader-background",
    name: "Shader Background",
    category: "Backgrounds",
    tier: "free",
    status: "implemented",
    description:
      "Raw WebGL GPU-powered generative canvas background with 9 presets across Premium (Silk, Liquid Satin, Liquid Contour, Mercury), Simple (Soft Pastel, Aurora, Flow), and Modern (Noise, Energy) looks.",
    dependencies: ["react"],
    supportsSound: false,
    supportsHaptics: false,
    accessibilityNotes:
      "Canvas marked aria-hidden; respects prefers-reduced-motion with static frame rendering, pauses offscreen and on hidden tabs, and falls back to CSS gradients if WebGL is unavailable.",
    installCommand: "npx shadcn add @rjstudio/shader-background",
    sourcePath: "registry/components/shader-background.tsx",
    useCases: [
      { title: "Hero & Landing Sections", description: "Layer generative fluid motion behind editorial headlines and CTAs." },
      { title: "Interactive Feature Cards", description: "Add subtle pointer-reactive depth inside cards, modals, or empty states." },
    ],
    props: [
      { name: "preset", type: '"silk" | "aurora" | "mercury" | "flow" | "noise" | "energy"', defaultValue: '"silk"', description: "Built-in GLSL shader preset." },
      { name: "colors", type: "string[]", defaultValue: "preset palette", description: "Three hex colors [primary, secondary, background] for the shader." },
      { name: "speed", type: "number", defaultValue: "0.7", description: "Animation time multiplier." },
      { name: "intensity", type: "number", defaultValue: "1", description: "Color luminance and highlight intensity." },
      { name: "distortion", type: "number", defaultValue: "1", description: "Domain warp and turbulence scale." },
      { name: "opacity", type: "number", defaultValue: "1", description: "Canvas opacity (0 to 1)." },
      { name: "interactive", type: "boolean", defaultValue: "true", description: "Enables pointer-position distortion." },
      { name: "pointerStrength", type: "number", defaultValue: "0.6", description: "Strength of pointer displacement." },
      { name: "scrollReactive", type: "boolean", defaultValue: "false", description: "Shifts shader phase with page scroll." },
      { name: "quality", type: '"low" | "medium" | "high"', defaultValue: '"medium"', description: "Adaptive DPR cap (1, 1.5, or 2)." },
      { name: "maxDpr", type: "number", defaultValue: "1.5", description: "Maximum devicePixelRatio cap." },
      { name: "backgroundColor", type: "string", defaultValue: "preset base", description: "Container base background color." },
      { name: "reducedMotion", type: "boolean", defaultValue: "system", description: "Forces static frame rendering when true." },
    ],
  },
];

export const CATALOG_ITEMS: CatalogItem[] = RAW_CATALOG_ITEMS.map((item) => ({
  ...item,
  ...resolveComponentCapabilities({
    slug: item.slug,
    status: item.status,
    supportsSound: item.supportsSound,
  }),
}));

export function getCatalogItem(slug: string): CatalogItem | undefined {
  return CATALOG_ITEMS.find((item) => item.slug === slug);
}
