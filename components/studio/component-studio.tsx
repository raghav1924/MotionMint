"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MotionConfig } from "motion/react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Code2,
  Volume2,
  VolumeX,
  Play,
  Columns2,
  Copy,
  Check,
} from "lucide-react";
import { CATALOG_ITEMS, type CatalogItem } from "@/lib/catalog";
import { INTERACTION_LABELS } from "@/lib/catalog-interactions";
import { ALL_THEMES } from "@/lib/themes/registry";
import { ComparisonWorkbench } from "./comparison-workbench";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";
import {
  getInstallCommand,
  isProductionRegistryConfigured,
  type PackageManager,
} from "@/lib/registry-config";
import { useRenderJoy } from "@/components/site/providers";
import { Drawer, ContextMenu } from "@/components/ui/overlay";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ProgressRing, ProgressBar } from "@/registry/components/progress-ring";
import { WiggleText } from "@/registry/components/wiggle-text";
import { SkeletonShimmer } from "@/registry/components/skeleton-shimmer";
import { Dropzone } from "@/registry/components/dropzone";
import { SwipeCardDeck, type DeckCardItem } from "@/registry/components/swipe-card-deck";
import { ThinkingLoader } from "@/registry/components/thinking-loader";
import { FlipCard } from "@/registry/components/flip-card";
import { AIPromptComposer } from "@/registry/components/ai-prompt-composer";
import { StreamingMessage } from "@/registry/components/streaming-message";
import { ToolCallCard } from "@/registry/components/tool-call-card";
import { AgentPlan } from "@/registry/components/agent-plan";
import { ApprovalCard } from "@/registry/components/approval-card";
import { InlineDiff } from "@/registry/components/inline-diff";
import { ReasoningTrace } from "@/registry/components/reasoning-trace";
import { AIChat } from "@/registry/components/ai-chat";
import { ImageGeneration } from "@/registry/components/image-generation";
import { ChatOrb } from "@/registry/components/chat-orb";
import { PixelImageGeneration } from "@/registry/components/pixel-image-generation";
import { SegmentedControl } from "@/registry/components/segmented-control";
import { NumberStepper } from "@/registry/components/number-stepper";
import { GlowInput } from "@/registry/components/glow-input";
import { EmailCapture } from "@/registry/components/email-capture";
import { DatePicker } from "@/registry/components/date-picker";
import { AnimatedSelect } from "@/registry/components/animated-select";
import { OTPInput } from "@/registry/components/otp-input";
import { MultiSelect } from "@/registry/components/multi-select";
import { CookieConsent } from "@/registry/components/cookie-consent";
import { CardStack } from "@/registry/components/card-stack";
import { DetentDrawer } from "@/registry/components/detent-drawer";
import { Notch } from "@/registry/components/notch";
import { PhysicalKnob } from "@/registry/components/physical-knob";
import { ReactionArc } from "@/registry/components/reaction-arc";
import { ReceiptPrinter } from "@/registry/components/receipt-printer";
import { RubberBandSelect } from "@/registry/components/rubber-band-select";
import { MorphingTray } from "@/registry/components/morphing-tray";
import { VisualKeyboard } from "@/registry/components/keyboard";
import { InfinityCanvas } from "@/registry/components/infinity-canvas";
import { ScratchCard } from "@/registry/components/scratch-card";
import { HalftonePopover } from "@/registry/components/halftone-popover";
import { CoverFlowCarousel } from "@/registry/components/cover-flow-carousel";
import { Tactile3DButton } from "@/registry/components/tactile-3d-button";
import { GlassButton } from "@/registry/components/glass-button";
import { ChampagneButton } from "@/registry/components/champagne-button";
import { SpotlightBento } from "@/registry/components/spotlight-bento";
import { SpatialDock } from "@/registry/components/spatial-dock";
import { KineticCard3D } from "@/registry/components/kinetic-card-3d";
import { SpotlightCommandPalette } from "@/registry/components/spotlight-command-palette";
import { DynamicIsland } from "@/registry/components/dynamic-island";
import { AuroraHero } from "@/registry/components/aurora-hero";
import { PricingCrown } from "@/registry/components/pricing-crown";
import { KineticMarquee } from "@/registry/components/kinetic-marquee";
import { MetricSparkline } from "@/registry/components/metric-sparkline";
import { SplitCompare } from "@/registry/components/split-compare";
import { FounderWall } from "@/registry/components/founder-wall";
import {
  ShaderBackground,
  SHADER_PRESETS,
  type ShaderPresetId,
  type ShaderQuality,
} from "@/registry/components/shader-background";
import {
  TabletPreviewFrame,
  MobileDeviceFrame,
} from "@/components/preview/device-frames";
import { ComponentDocs } from "@/components/documentation/component-docs";
import { RenderJoyTheme } from "@/components/theme/theme-scope";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const STUDIO_CARDS: DeckCardItem[] = [
  { id: "s1", tag: "01", title: "Art-Directed Stage", subtitle: "Preview components in spacious context, not cramped boxes." },
  { id: "s2", tag: "02", title: "29 Visual Systems", subtitle: "Switch from Swiss Design to Blueprint or Wabi Sabi in one click." },
  { id: "s3", tag: "03", title: "Tactile Physics", subtitle: "Drag left or right, or use your keyboard arrows." },
];

type ViewportMode = "desktop" | "tablet" | "mobile";

export function ComponentStudio({
  item,
  sourceCode,
}: {
  item: CatalogItem;
  sourceCode: string | null;
}) {
  const {
    skin,
    theme,
    themeMode,
    setThemeMode,
    setTheme,
    soundEnabled,
    toggleSound,
    viewportMode,
    setViewportMode,
    previewKey,
    refreshPreview,
    fullscreenPreview,
    setFullscreenPreview,
    setActiveComponentSlug,
  } = useRenderJoy();
  const [localResetKey, setLocalResetKey] = useState(0);
  const combinedResetKey = previewKey + localResetKey;
  const viewport = viewportMode;
  const setViewport = setViewportMode;
  const fullscreen = fullscreenPreview;
  const setFullscreen = (val: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof val === "function" ? val(fullscreenPreview) : val;
    setFullscreenPreview(next);
  };
  const setResetKey = (val: number | ((prev: number) => number)) => {
    setLocalResetKey(val);
    refreshPreview();
  };

  React.useEffect(() => {
    setActiveComponentSlug(item.slug);
    return () => setActiveComponentSlug(null);
  }, [item.slug, setActiveComponentSlug]);

  React.useEffect(() => {
    if (item.slug !== "shader-background" || typeof window === "undefined") return;
    const presetParam = new URLSearchParams(window.location.search).get("preset") as ShaderPresetId | null;
    if (presetParam && SHADER_PRESETS[presetParam]) {
      setShaderPreset(presetParam);
      setShaderColors(SHADER_PRESETS[presetParam].defaultColors);
      setShaderBgColor(SHADER_PRESETS[presetParam].defaultColors[2]);
    }
  }, [item.slug]);

  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);
  const [stageTab, setStageTab] = useState<"preview" | "code" | "compare">("preview");
  const [simReducedMotion, setSimReducedMotion] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  const [pkg, setPkg] = useState<PackageManager>("npm");
  const resolvedInstall = getInstallCommand(item.slug, pkg);
  const isProdRegistry = isProductionRegistryConfigured();

  // Live Inspector State
  const [variant, setVariant] = useState<"primary" | "secondary" | "outline" | "3d" | "glass" | "shimmer">("primary");
  const [jellyVariant, setJellyVariant] = useState<"primary" | "3d" | "glass" | "obsidian">("primary");
  const [tactileTone, setTactileTone] = useState<"obsidian" | "emerald" | "amber" | "ivory">("obsidian");
  const [glassFinish, setGlassFinish] = useState<"frost" | "obsidian" | "prism">("obsidian");
  const [coverReflections, setCoverReflections] = useState(true);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [buttonLabel, setButtonLabel] = useState("Primary Action");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [rhythm, setRhythm] = useState<"wave" | "elastic" | "pulse">("elastic");
  const [magneticStrength, setMagneticStrength] = useState(0.25);
  const [copyText, setCopyText] = useState(item.installCommand);
  const [toggleChecked, setToggleChecked] = useState(true);
  const [progressValue, setProgressValue] = useState(72);
  const [wiggleSplit, setWiggleSplit] = useState<"char" | "word">("char");
  const [wiggleIntensity, setWiggleIntensity] = useState<"subtle" | "medium" | "playful">("medium");
  const [wiggleTrigger, setWiggleTrigger] = useState<"hover" | "click" | "always">("hover");
  const [skeletonVariant, setSkeletonVariant] = useState<"text" | "avatar" | "card" | "rect">("card");
  const [skeletonCount, setSkeletonCount] = useState(1);
  const [skeletonAnimate, setSkeletonAnimate] = useState(true);
  const [dropMultiple, setDropMultiple] = useState(true);
  const [thinkingVariant, setThinkingVariant] = useState<"orbit" | "pulse-grid" | "wave">("orbit");
  const [thinkingSpeedMs, setThinkingSpeedMs] = useState(1800);
  const [deckCount, setDeckCount] = useState(3);
  const [knobValue, setKnobValue] = useState(65);
  const [knobMin, setKnobMin] = useState(0);
  const [knobMax, setKnobMax] = useState(100);
  const [knobStep, setKnobStep] = useState(5);
  const [aiStreamStatus, setAiStreamStatus] = useState<"streaming" | "complete" | "error">("streaming");
  const [orbState, setOrbState] = useState<"idle" | "listening" | "speaking">("listening");
  const [pixelProgress, setPixelProgress] = useState(72);
  const [imageGenStatus, setImageGenStatus] = useState<"idle" | "generating" | "complete" | "error">("complete");
  const [shaderPreset, setShaderPreset] = useState<ShaderPresetId>("logo-flare");
  const [shaderColors, setShaderColors] = useState<[string, string, string]>(
    SHADER_PRESETS["logo-flare"].defaultColors
  );
  const [shaderSpeed, setShaderSpeed] = useState(0.7);
  const [shaderIntensity, setShaderIntensity] = useState(1);
  const [shaderDistortion, setShaderDistortion] = useState(1);
  const [shaderOpacity, setShaderOpacity] = useState(1);
  const [shaderInteractive, setShaderInteractive] = useState(true);
  const [shaderPointerStrength, setShaderPointerStrength] = useState(0.6);
  const [shaderScrollReactive, setShaderScrollReactive] = useState(false);
  const [shaderQuality, setShaderQuality] = useState<ShaderQuality>("medium");
  const [shaderBgColor, setShaderBgColor] = useState(
    SHADER_PRESETS["logo-flare"].defaultColors[2]
  );
  const [shaderRayCount, setShaderRayCount] = useState(14);
  const [shaderGlowRadius, setShaderGlowRadius] = useState(1);
  const [shaderLensStreak, setShaderLensStreak] = useState(0.85);
  const [shaderNoiseAmount, setShaderNoiseAmount] = useState(1);
  const [shaderShowLogo, setShaderShowLogo] = useState(true);

  const categories = Array.from(new Set(CATALOG_ITEMS.map((c) => c.category)));

  const aiPrompt = `Install and integrate the RenderJoy "${item.name}" component (${item.installCommand}). Respect prefers-reduced-motion and semantic --mm-* theme tokens.`;

  const renderStage = () => {
    switch (item.slug) {
      case "ripple-button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <RippleButton variant={variant} size={size} disabled={buttonDisabled}>
              {buttonLabel || "Primary Action"}
            </RippleButton>
            <RippleButton variant="3d" size={size} disabled={buttonDisabled}>
              3D Keycap
            </RippleButton>
            <RippleButton variant="glass" size={size} disabled={buttonDisabled}>
              Frosted Glass
            </RippleButton>
            <RippleButton variant="shimmer" size={size} disabled={buttonDisabled}>
              Obsidian Sheen
            </RippleButton>
          </div>
        );
      case "jelly-button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <JellyButton variant={jellyVariant} magneticStrength={magneticStrength}>
              Magnetic Jelly
            </JellyButton>
            <JellyButton variant="3d" magneticStrength={magneticStrength}>
              3D Magnetic
            </JellyButton>
            <JellyButton variant="glass" magneticStrength={magneticStrength}>
              Glass Magnetic
            </JellyButton>
          </div>
        );
      case "copy-button":
        return <CopyButton value={copyText} />;
      case "sound-toggle":
        return (
          <div className="flex items-center gap-3">
            <SoundToggle
              checked={toggleChecked}
              onCheckedChange={setToggleChecked}
              showWaveform
              label="Studio sound toggle"
            />
            <span className="text-sm font-medium">{toggleChecked ? "Audio Ready" : "Muted"}</span>
          </div>
        );
      case "bounce-dots-loader":
        return <BounceDotsLoader size={size} rhythm={rhythm} label="Loading studio preview" />;
      case "progress-ring":
        return (
          <div className="flex w-full max-w-sm flex-col items-center gap-5">
            <ProgressRing value={progressValue} size={92} strokeWidth={7} />
            <ProgressBar value={progressValue} showValue label="Pipeline Progress" />
          </div>
        );
      case "wiggle-text":
        return (
          <WiggleText
            text="Interfaces with character"
            splitBy={wiggleSplit}
            intensity={wiggleIntensity}
            trigger={wiggleTrigger}
            variant="accent"
            className="text-2xl sm:text-3xl"
          />
        );
      case "skeleton-shimmer":
        return (
          <div className="w-full max-w-sm">
            <SkeletonShimmer
              variant={skeletonVariant}
              count={skeletonCount}
              animate={skeletonAnimate}
            />
          </div>
        );
      case "dropzone":
        return (
          <div className="w-full max-w-md">
            <Dropzone
              accept=".png,.jpg,.jpeg,.pdf"
              maxSize={5 * 1024 * 1024}
              multiple={dropMultiple}
            />
          </div>
        );
      case "swipe-card-deck":
        return <SwipeCardDeck cards={STUDIO_CARDS.slice(0, deckCount)} />;
      case "thinking-loader":
        return <ThinkingLoader variant={thinkingVariant} intervalMs={thinkingSpeedMs} />;
      case "ai-prompt-composer":
        return (
          <div className="w-full max-w-lg">
            <AIPromptComposer />
          </div>
        );
      case "streaming-message":
        return (
          <div className="w-full max-w-lg">
            <StreamingMessage
              message={{
                id: "studio-msg",
                role: "assistant",
                content:
                  "This is a controlled StreamingMessage UI primitive. Toggle status in the Inspector.",
                status: aiStreamStatus,
              }}
              onRetry={() => setAiStreamStatus("streaming")}
            />
          </div>
        );
      case "tool-call-card":
        return (
          <div className="w-full max-w-lg">
            <ToolCallCard
              defaultExpanded
              toolCall={{
                id: "tc-studio",
                name: "registry_validate",
                status: "success",
                durationMs: 48,
                input: { items: 25 },
                output: { valid: true },
              }}
            />
          </div>
        );
      case "agent-plan":
        return (
          <div className="w-full max-w-md">
            <AgentPlan
              steps={[
                { id: "1", title: "Inspect workspace", status: "completed", detail: "Found 29 themes" },
                { id: "2", title: "Build AI primitives", status: "in_progress" },
                { id: "3", title: "Run consumer install test", status: "pending" },
              ]}
            />
          </div>
        );
      case "approval-card":
        return (
          <div className="w-full max-w-md">
            <ApprovalCard
              title="Deploy registry update"
              description="Publish verified components to public/r/."
              actionSummary="npx shadcn@latest build"
            />
          </div>
        );
      case "inline-diff":
        return (
          <div className="w-full max-w-lg">
            <InlineDiff
              filename="lib/brand.ts"
              lines={[
                { type: "context", content: "export const BRAND = {" },
                { type: "remove", content: '  version: "0.6.0",' },
                { type: "add", content: '  version: "0.7.0",' },
                { type: "context", content: "};" },
              ]}
            />
          </div>
        );
      case "reasoning-trace":
        return (
          <div className="w-full max-w-md">
            <ReasoningTrace
              defaultOpen
              durationLabel="140ms"
              entries={[
                "Validated component schema",
                "Checked --mm-* token contrast",
                "Verified prefers-reduced-motion",
              ]}
            />
          </div>
        );
      case "ai-chat":
        return (
          <AIChat
            demoNotice="Demo UI Mode — Controlled props, no live AI backend"
            initialMessages={[
              { id: "1", role: "user", content: "How do I install a component?", status: "complete" },
              { id: "2", role: "assistant", content: "Run npx shadcn@latest add @renderjoy/ai-chat.", status: "complete" },
            ]}
          />
        );
      case "image-generation":
        return (
          <ImageGeneration
            prompt="Minimal studio UI composition"
            status={imageGenStatus}
            progress={pixelProgress}
            onRegenerate={() => setImageGenStatus("generating")}
          />
        );
      case "chat-orb":
        return (
          <div className="flex flex-col items-center gap-3">
            <ChatOrb
              state={orbState}
              onToggle={() =>
                setOrbState((s) => (s === "idle" ? "listening" : s === "listening" ? "speaking" : "idle"))
              }
            />
            <span className="font-mono text-xs text-[var(--mm-fg-muted)]">State: {orbState}</span>
          </div>
        );
      case "pixel-image-generation":
        return <PixelImageGeneration progress={pixelProgress} />;
      case "segmented-control":
        return (
          <SegmentedControl
            size={size === "lg" ? "md" : size}
            options={[
              { value: "preview", label: "Preview" },
              { value: "code", label: "Code" },
              { value: "tokens", label: "Tokens" },
              { value: "disabled", label: "Locked", disabled: true },
            ]}
          />
        );
      case "number-stepper":
        return <NumberStepper defaultValue={5} min={0} max={25} variant="expanded" />;
      case "glow-input":
        return (
          <div className="w-full max-w-sm">
            <GlowInput
              label="API Endpoint"
              prefix="https://"
              placeholder="renderjoy.dev/r"
              helperText="Move your cursor over the border while focused."
            />
          </div>
        );
      case "email-capture":
        return <EmailCapture />;
      case "date-picker":
        return <DatePicker />;
      case "animated-select":
        return (
          <AnimatedSelect
            options={[
              { value: "dark", label: "Dark Mode UI", group: "Modern" },
              { value: "blueprint", label: "Blueprint", group: "Retro" },
              { value: "wabi", label: "Wabi Sabi", group: "Editorial" },
              { value: "disabled", label: "Pro Theme (Locked)", disabled: true },
            ]}
          />
        );
      case "otp-input":
        return <OTPInput length={6} />;
      case "multi-select":
        return (
          <MultiSelect
            maxSelected={3}
            defaultValue={["motion", "themes"]}
            options={[
              { value: "motion", label: "Spring Motion" },
              { value: "sound", label: "Web Audio" },
              { value: "themes", label: "29 Themes" },
              { value: "a11y", label: "WCAG AA" },
            ]}
          />
        );
      case "cookie-consent":
        return <CookieConsent />;
      case "card-stack":
        return (
          <CardStack
            cards={[
              { id: "cs1", title: "Spring Physics", subtitle: "Stiffness 320, Damping 26", badge: "01" },
              { id: "cs2", title: "Depth Layers", subtitle: "Configurable depth and rotation", badge: "02" },
              { id: "cs3", title: "Swipe or Keys", subtitle: "Drag or use Left/Right arrows", badge: "03" },
            ]}
          />
        );
      case "detent-drawer":
        return (
          <DetentDrawer title="Inspector Drawer" triggerLabel="Open Detent Drawer">
            <p className="text-xs text-[var(--mm-muted)]">
              Snap smoothly between Peek, Half, and Full detents or press Escape to close.
            </p>
          </DetentDrawer>
        );
      case "notch":
        return (
          <Notch
            state="processing"
            message="Build Passed"
            detail="47 registry items validated across 29 themes"
            actionLabel="Details"
          />
        );
      case "physical-knob":
        return (
          <PhysicalKnob
            label="Resonance"
            value={knobValue}
            onValueChange={setKnobValue}
            min={knobMin}
            max={knobMax}
            step={knobStep}
            unit="%"
          />
        );
      case "reaction-arc":
        return <ReactionArc />;
      case "receipt-printer":
        return (
          <ReceiptPrinter
            title="RenderJoy Studio"
            items={[
              { name: "Physical Knob", qty: 1, price: 0 },
              { name: "Card Stack", qty: 2, price: 12 },
              { name: "Notch Pill", qty: 1, price: 8 },
            ]}
          />
        );
      case "rubber-band-select":
        return (
          <RubberBandSelect
            options={[
              { value: "spring", label: "Spring Physics" },
              { value: "bezier", label: "Cubic Bezier" },
              { value: "stepped", label: "Stepped Detent" },
            ]}
            defaultValue={["spring"]}
          />
        );
      case "morphing-tray":
        return (
          <MorphingTray title="Export Preset" compactSummary="Next.js 16 + Tailwind v4">
            <p className="text-xs text-[var(--mm-muted)]">
              Install directly via the shadcn CLI with zero lock-in.
            </p>
          </MorphingTray>
        );
      case "keyboard":
        return <VisualKeyboard highlightedKeys={["M", "I", "N", "T"]} />;
      case "infinity-canvas":
        return <InfinityCanvas />;
      case "scratch-card":
        return (
          <ScratchCard width={260} height={120}>
            <div className="text-center">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--mm-accent)]">Reward Unlocked</p>
              <p className="text-base font-bold text-[var(--mm-fg)]">MINT-WAVE2B</p>
            </div>
          </ScratchCard>
        );
      case "halftone-popover":
        return (
          <HalftonePopover triggerLabel="Open Halftone" title="Halftone Surface">
            <p className="text-xs text-[var(--mm-muted)]">
              SVG dot-matrix backdrop with outside-click and Escape handling.
            </p>
          </HalftonePopover>
        );
      case "shader-background":
        return (
          <ShaderBackground
            preset={shaderPreset}
            colors={shaderColors}
            speed={shaderSpeed}
            intensity={shaderIntensity}
            distortion={shaderDistortion}
            opacity={shaderOpacity}
            interactive={shaderInteractive}
            pointerStrength={shaderPointerStrength}
            scrollReactive={shaderScrollReactive}
            quality={shaderQuality}
            backgroundColor={shaderBgColor}
            rayCount={shaderRayCount}
            glowRadius={shaderGlowRadius}
            lensStreak={shaderLensStreak}
            noiseAmount={shaderNoiseAmount}
            reducedMotion={simReducedMotion}
            logo={
              shaderPreset === "logo-flare" && shaderShowLogo ? (
                <svg
                  width="88"
                  height="88"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="text-white drop-shadow-[0_0_24px_rgba(147,197,253,0.65)]"
                >
                  <path
                    d="M18 18C18 14.6863 20.6863 12 24 12H50C69.8822 12 86 28.1178 86 48C86 61.1 79.05 72.58 68.62 78.92C64.28 81.56 58.8 78.42 58.8 73.34V52C58.8 42.6112 51.1888 35 41.8 35C34.5 35 28.8 40.4 28.8 47.6V73.5C28.8 77.0899 25.8899 80 22.3 80C19.9252 80 18 78.0748 18 75.7V18Z"
                    fill="currentColor"
                  />
                  <path
                    d="M37.5 52C37.5 47.0294 41.5294 43 46.5 43C51.4706 43 55.5 47.0294 55.5 52V71C55.5 80.3888 47.8888 88 38.5 88C33.1 88 28.3 85.48 25.18 81.55C31.3 80.6 37.5 76.2 37.5 69.5V52Z"
                    fill="currentColor"
                  />
                </svg>
              ) : undefined
            }
            className={cn(
              "flex w-full flex-col items-center justify-center p-6 text-center",
              viewport === "mobile"
                ? "h-[690px] rounded-none border-0"
                : viewport === "tablet"
                  ? "h-[500px] rounded-none border-0"
                  : "min-h-[72vh] sm:min-h-[660px] rounded-none border-0",
              shaderPreset === "pastel" ? "text-slate-900" : "text-white"
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col items-center gap-2.5",
                shaderPreset === "logo-flare" && shaderShowLogo
                  ? "justify-end pb-8"
                  : "justify-center"
              )}
            >
              <span
                className={cn(
                  "rounded-full border px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm",
                  shaderPreset === "pastel"
                    ? "border-slate-900/15 bg-white/60 text-slate-800"
                    : "border-white/20 bg-black/25 text-white"
                )}
              >
                {SHADER_PRESETS[shaderPreset].label} · {SHADER_PRESETS[shaderPreset].look}
              </span>
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Build something extraordinary.
              </h3>
              <p
                className={cn(
                  "max-w-sm text-xs",
                  shaderPreset === "pastel" ? "text-slate-700" : "text-white/80"
                )}
              >
                Your content, surrounded by generative motion.
              </p>
            </div>
          </ShaderBackground>
        );
      case "flip-card":
        return (
          <FlipCard
            front={
              <div className="flex h-full flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mm-accent)]">
                  Front Face
                </span>
                <div>
                  <p className="text-lg font-bold">Direction-Aware Flip</p>
                  <p className="mt-1 text-xs text-[var(--mm-fg-muted)]">
                    Click any edge (top, bottom, left, right) to flip along that axis.
                  </p>
                </div>
              </div>
            }
            back={
              <div className="flex h-full flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mm-accent)]">
                  Back Face
                </span>
                <p className="text-xs leading-relaxed text-[var(--mm-fg-muted)]">
                  Accessible button semantics, keyboard Enter/Space support, and automatic
                  reduced-motion crossfade.
                </p>
              </div>
            }
          />
        );
      case "cover-flow-carousel":
        return <CoverFlowCarousel showReflections={coverReflections} />;
      case "tactile-3d-button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Tactile3DButton tone={tactileTone} size={size}>
              {buttonLabel || "Push 3D"}
            </Tactile3DButton>
            <Tactile3DButton tone="emerald" size={size}>
              Emerald
            </Tactile3DButton>
            <Tactile3DButton tone="amber" size={size}>
              Amber
            </Tactile3DButton>
            <Tactile3DButton tone="ivory" size={size}>
              Ivory
            </Tactile3DButton>
          </div>
        );
      case "glass-button":
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlassButton finish={glassFinish} size={size}>
              {buttonLabel || "Glass Action"}
            </GlassButton>
            <GlassButton finish="frost" size={size}>
              Frost Pill
            </GlassButton>
            <GlassButton finish="prism" size={size}>
              Prism Glass
            </GlassButton>
          </div>
        );
      case "champagne-button":
        return <ChampagneButton label={buttonLabel || "Get Started"} strength={magneticStrength} />;
      case "spotlight-bento":
        return <SpotlightBento />;
      case "spatial-dock":
        return <SpatialDock />;
      case "kinetic-card-3d":
        return <KineticCard3D />;
      case "spotlight-command-palette":
        return <SpotlightCommandPalette />;
      case "dynamic-island":
        return <DynamicIsland />;
      case "aurora-hero":
        return <AuroraHero />;
      case "pricing-crown":
        return <PricingCrown />;
      case "kinetic-marquee":
        return <KineticMarquee />;
      case "metric-sparkline":
        return <MetricSparkline />;
      case "split-compare":
        return <SplitCompare />;
      case "founder-wall":
        return <FounderWall />;
      default:
        return (
          <div className="text-center space-y-2">
            <span className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-3 py-1 text-xs text-[var(--mm-fg-muted)]">
              Scheduled in Roadmap ({item.tier.toUpperCase()})
            </span>
          </div>
        );
    }
  };

  const renderInspectorControls = () => {
    switch (item.slug) {
      case "ripple-button":
        return (
          <div className="space-y-4 text-xs">
            <label className="block space-y-1.5">
              <span className="text-[var(--ws-text-secondary)]">Label</span>
              <input
                type="text"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                className="h-8 w-full rounded-md border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2.5 text-xs text-[var(--ws-text-primary)]"
              />
            </label>
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Variant</p>
              <div className="flex flex-wrap gap-1.5">
                {(["primary", "secondary", "outline", "3d", "glass", "shimmer"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer",
                      variant === v
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Size</p>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer",
                      size === sz
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-[var(--ws-text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={buttonDisabled}
                onChange={(e) => setButtonDisabled(e.target.checked)}
              />
              <span>Disabled state</span>
            </label>
          </div>
        );
      case "bounce-dots-loader":
        return (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <p className="text-[var(--mm-fg-muted)]">Rhythm</p>
              <div className="flex flex-wrap gap-1.5">
                {(["wave", "elastic", "pulse"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRhythm(r)}
                    className={cn(
                      "px-2.5 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                      rhythm === r
                        ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                        : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[var(--mm-fg-muted)]">Size</p>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={cn(
                      "px-2.5 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                      size === sz
                        ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                        : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "jelly-button":
        return (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Style</p>
              <div className="flex flex-wrap gap-1.5">
                {(["primary", "3d", "glass", "obsidian"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setJellyVariant(v)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer",
                      jellyVariant === v
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <label className="block space-y-2 text-xs text-[var(--mm-fg-muted)]">
              <span>Magnetic Pull ({magneticStrength.toFixed(2)})</span>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.05"
                value={magneticStrength}
                onChange={(e) => setMagneticStrength(Number(e.target.value))}
                className="w-full accent-[var(--mm-accent)]"
              />
            </label>
          </div>
        );
      case "tactile-3d-button":
        return (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Tone</p>
              <div className="flex flex-wrap gap-1.5">
                {(["obsidian", "emerald", "amber", "ivory"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTactileTone(t)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer capitalize",
                      tactileTone === t
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "glass-button":
        return (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Glass Finish</p>
              <div className="flex flex-wrap gap-1.5">
                {(["frost", "obsidian", "prism"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setGlassFinish(f)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer capitalize",
                      glassFinish === f
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case "cover-flow-carousel":
        return (
          <label className="flex items-center justify-between gap-2 text-xs text-[var(--ws-text-secondary)] cursor-pointer">
            <span>Mirrored Floor Reflections</span>
            <input
              type="checkbox"
              checked={coverReflections}
              onChange={(e) => setCoverReflections(e.target.checked)}
            />
          </label>
        );
      case "progress-ring":
        return (
          <label className="block space-y-2 text-xs text-[var(--mm-fg-muted)]">
            <span>Value ({progressValue}%)</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progressValue}
              onChange={(e) => setProgressValue(Number(e.target.value))}
              className="w-full accent-[var(--mm-accent)]"
            />
          </label>
        );
      case "copy-button":
        return (
          <label className="block space-y-2 text-xs text-[var(--mm-fg-muted)]">
            <span>Copy Value</span>
            <input
              type="text"
              value={copyText}
              onChange={(e) => setCopyText(e.target.value)}
              className="h-8 w-full rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-2.5 text-xs text-[var(--mm-fg)]"
            />
          </label>
        );
      case "wiggle-text":
        return (
          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {(["char", "word"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setWiggleSplit(s)}
                  className={cn(
                    "px-2 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                    wiggleSplit === s
                      ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                      : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["subtle", "medium", "playful"] as const).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setWiggleIntensity(i)}
                  className={cn(
                    "px-2 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                    wiggleIntensity === i
                      ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                      : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["hover", "click", "always"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setWiggleTrigger(t)}
                  className={cn(
                    "px-2 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                    wiggleTrigger === t
                      ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                      : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        );
      case "skeleton-shimmer":
        return (
          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {(["text", "avatar", "card", "rect"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSkeletonVariant(v)}
                  className={cn(
                    "px-2 py-1 rounded-[var(--mm-radius-sm)] border cursor-pointer",
                    skeletonVariant === v
                      ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                      : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <label className="block space-y-1 text-[var(--mm-fg-muted)]">
              <span>Count ({skeletonCount})</span>
              <input
                type="range"
                min="1"
                max="4"
                value={skeletonCount}
                onChange={(e) => setSkeletonCount(Number(e.target.value))}
                className="w-full accent-[var(--mm-accent)]"
              />
            </label>
            <label className="flex items-center gap-2 text-[var(--mm-fg-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={skeletonAnimate}
                onChange={(e) => setSkeletonAnimate(e.target.checked)}
                className="accent-[var(--mm-accent)]"
              />
              <span>Animate sweep</span>
            </label>
          </div>
        );
      case "dropzone":
        return (
          <label className="flex items-center gap-2 text-xs text-[var(--mm-fg-muted)] cursor-pointer">
            <input
              type="checkbox"
              checked={dropMultiple}
              onChange={(e) => setDropMultiple(e.target.checked)}
              className="accent-[var(--mm-accent)]"
            />
            <span>Allow multiple files</span>
          </label>
        );
      case "swipe-card-deck":
        return (
          <label className="block space-y-2 text-xs text-[var(--ws-text-secondary)]">
            <span>Card Count ({deckCount})</span>
            <input
              type="range"
              min="1"
              max="3"
              value={deckCount}
              onChange={(e) => setDeckCount(Number(e.target.value))}
              className="w-full"
            />
          </label>
        );
      case "physical-knob":
        return (
          <div className="space-y-3 text-xs text-[var(--ws-text-secondary)]">
            <label className="block space-y-1">
              <span>Value ({knobValue}%)</span>
              <input
                type="range"
                min={knobMin}
                max={knobMax}
                step={knobStep}
                value={knobValue}
                onChange={(e) => setKnobValue(Number(e.target.value))}
                className="w-full"
              />
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className="space-y-1">
                <span>Min</span>
                <input
                  type="number"
                  value={knobMin}
                  onChange={(e) => setKnobMin(Number(e.target.value))}
                  className="h-7 w-full rounded border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2 text-xs text-[var(--ws-text-primary)]"
                />
              </label>
              <label className="space-y-1">
                <span>Max</span>
                <input
                  type="number"
                  value={knobMax}
                  onChange={(e) => setKnobMax(Number(e.target.value))}
                  className="h-7 w-full rounded border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2 text-xs text-[var(--ws-text-primary)]"
                />
              </label>
              <label className="space-y-1">
                <span>Step</span>
                <input
                  type="number"
                  min={1}
                  value={knobStep}
                  onChange={(e) => setKnobStep(Math.max(1, Number(e.target.value)))}
                  className="h-7 w-full rounded border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2 text-xs text-[var(--ws-text-primary)]"
                />
              </label>
            </div>
          </div>
        );
      case "thinking-loader":
        return (
          <div className="space-y-3 text-xs">
            <div className="space-y-1.5">
              <p className="text-[var(--ws-text-secondary)]">Visual Style</p>
              <div className="flex flex-wrap gap-1.5">
                {(["orbit", "pulse-grid", "wave"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setThinkingVariant(v)}
                    className={cn(
                      "px-2.5 py-1 rounded-md border cursor-pointer",
                      thinkingVariant === v
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <label className="block space-y-1 text-[var(--ws-text-secondary)]">
              <span>Stage Interval ({thinkingSpeedMs}ms)</span>
              <input
                type="range"
                min="700"
                max="3000"
                step="100"
                value={thinkingSpeedMs}
                onChange={(e) => setThinkingSpeedMs(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>
        );
      case "streaming-message":
        return (
          <div className="space-y-1.5 text-xs">
            <p className="text-[var(--ws-text-secondary)]">Message Status</p>
            <div className="flex flex-wrap gap-1.5">
              {(["streaming", "complete", "error"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setAiStreamStatus(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md border cursor-pointer",
                    aiStreamStatus === s
                      ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                      : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case "chat-orb":
        return (
          <div className="space-y-1.5 text-xs">
            <p className="text-[var(--ws-text-secondary)]">Orb State</p>
            <div className="flex flex-wrap gap-1.5">
              {(["idle", "listening", "speaking"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setOrbState(s)}
                  className={cn(
                    "px-2.5 py-1 rounded-md border cursor-pointer",
                    orbState === s
                      ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                      : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      case "image-generation":
      case "pixel-image-generation":
        return (
          <div className="space-y-3 text-xs">
            {item.slug === "image-generation" && (
              <div className="flex flex-wrap gap-1.5">
                {(["idle", "generating", "complete", "error"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setImageGenStatus(s)}
                    className={cn(
                      "px-2 py-1 rounded-md border cursor-pointer",
                      imageGenStatus === s
                        ? "border-[var(--ws-accent)] bg-[var(--ws-accent-soft)] text-[var(--ws-accent)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <label className="block space-y-1 text-[var(--ws-text-secondary)]">
              <span>Progress ({pixelProgress}%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={pixelProgress}
                onChange={(e) => setPixelProgress(Number(e.target.value))}
                className="w-full accent-[var(--ws-accent)]"
              />
            </label>
          </div>
        );
      case "shader-background":
        return (
          <div className="grid gap-6 md:grid-cols-3 text-xs text-[var(--ws-text-secondary)]">
            <div className="space-y-1.5">
              <p className="font-medium text-[var(--ws-text-primary)]">Shader Preset</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(SHADER_PRESETS) as ShaderPresetId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setShaderPreset(id);
                      setShaderColors(SHADER_PRESETS[id].defaultColors);
                      setShaderBgColor(SHADER_PRESETS[id].defaultColors[2]);
                    }}
                    className={cn(
                      "rounded-md border px-2 py-1 text-[11px] font-medium capitalize cursor-pointer",
                      shaderPreset === id
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {SHADER_PRESETS[id].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--ws-text-primary)]">Palette</span>
                <button
                  type="button"
                  onClick={() => {
                    setShaderColors(SHADER_PRESETS[shaderPreset].defaultColors);
                    setShaderBgColor(SHADER_PRESETS[shaderPreset].defaultColors[2]);
                  }}
                  className="text-[10px] underline cursor-pointer"
                >
                  Reset palette
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {shaderColors.map((c, idx) => (
                  <label key={idx} className="flex flex-col items-center gap-1">
                    <input
                      type="color"
                      aria-label={`Shader color ${idx + 1}`}
                      value={c}
                      onChange={(e) => {
                        const next = [...shaderColors] as [string, string, string];
                        next[idx] = e.target.value;
                        setShaderColors(next);
                      }}
                      className="h-7 w-full cursor-pointer rounded border border-[var(--ws-border)] bg-transparent p-0.5"
                    />
                    <span className="font-mono text-[9px]">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            </div>

            <div className="space-y-3">
            <label className="block space-y-1">
              <span>Speed ({shaderSpeed.toFixed(2)})</span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.05"
                value={shaderSpeed}
                onChange={(e) => setShaderSpeed(Number(e.target.value))}
                className="w-full"
              />
            </label>

            <label className="block space-y-1">
              <span>Intensity ({shaderIntensity.toFixed(2)})</span>
              <input
                type="range"
                min="0.2"
                max="1.8"
                step="0.05"
                value={shaderIntensity}
                onChange={(e) => setShaderIntensity(Number(e.target.value))}
                className="w-full"
              />
            </label>

            <label className="block space-y-1">
              <span>Distortion ({shaderDistortion.toFixed(2)})</span>
              <input
                type="range"
                min="0.2"
                max="2"
                step="0.05"
                value={shaderDistortion}
                onChange={(e) => setShaderDistortion(Number(e.target.value))}
                className="w-full"
              />
            </label>

            <label className="block space-y-1">
              <span>Opacity ({Math.round(shaderOpacity * 100)}%)</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={shaderOpacity}
                onChange={(e) => setShaderOpacity(Number(e.target.value))}
                className="w-full"
              />
            </label>

            {shaderPreset === "logo-flare" && (
              <>
                <label className="block space-y-1">
                  <span>Ray Count ({shaderRayCount})</span>
                  <input
                    type="range"
                    min="6"
                    max="28"
                    step="1"
                    value={shaderRayCount}
                    onChange={(e) => setShaderRayCount(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block space-y-1">
                  <span>Glow Radius ({shaderGlowRadius.toFixed(2)})</span>
                  <input
                    type="range"
                    min="0.4"
                    max="1.8"
                    step="0.05"
                    value={shaderGlowRadius}
                    onChange={(e) => setShaderGlowRadius(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block space-y-1">
                  <span>Lens Streak ({shaderLensStreak.toFixed(2)})</span>
                  <input
                    type="range"
                    min="0"
                    max="1.6"
                    step="0.05"
                    value={shaderLensStreak}
                    onChange={(e) => setShaderLensStreak(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block space-y-1">
                  <span>Noise Amount ({shaderNoiseAmount.toFixed(2)})</span>
                  <input
                    type="range"
                    min="0"
                    max="1.5"
                    step="0.05"
                    value={shaderNoiseAmount}
                    onChange={(e) => setShaderNoiseAmount(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span>Foreground Logo</span>
                  <input
                    type="checkbox"
                    checked={shaderShowLogo}
                    onChange={(e) => setShaderShowLogo(e.target.checked)}
                  />
                </label>
              </>
            )}

            <label className="flex items-center justify-between gap-2 cursor-pointer">
              <span>Pointer Reactive</span>
              <input
                type="checkbox"
                checked={shaderInteractive}
                onChange={(e) => setShaderInteractive(e.target.checked)}
              />
            </label>

            {shaderInteractive && (
              <label className="block space-y-1">
                <span>Pointer Strength ({shaderPointerStrength.toFixed(2)})</span>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={shaderPointerStrength}
                  onChange={(e) => setShaderPointerStrength(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}

            <label className="flex items-center justify-between gap-2 cursor-pointer">
              <span>Scroll Reactive</span>
              <input
                type="checkbox"
                checked={shaderScrollReactive}
                onChange={(e) => setShaderScrollReactive(e.target.checked)}
              />
            </label>

            <div className="space-y-1.5">
              <p>Quality (DPR Cap)</p>
              <div className="flex gap-1.5">
                {(["low", "medium", "high"] as ShaderQuality[]).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setShaderQuality(q)}
                    className={cn(
                      "flex-1 rounded-md border py-1 capitalize cursor-pointer",
                      shaderQuality === q
                        ? "border-[var(--ws-text-primary)] bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "border-[var(--ws-border)] text-[var(--ws-text-secondary)]"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between gap-2">
              <span>Background Color</span>
              <input
                type="color"
                aria-label="Shader background color"
                value={shaderBgColor}
                onChange={(e) => setShaderBgColor(e.target.value)}
                className="h-7 w-12 cursor-pointer rounded border border-[var(--ws-border)] bg-transparent p-0.5"
              />
            </label>
            </div>
          </div>
        );
      default:
        return (
          <p className="text-xs text-[var(--mm-fg-muted)]">
            Interactive controls are tailored per component.
          </p>
        );
    }
  };

  return (
    <div
      className={cn(
        "w-full min-w-0",
        fullscreen && "fixed inset-0 z-40 bg-[var(--ws-bg)] overflow-y-auto pb-28"
      )}
    >
      {/* Pure Edge-to-Edge Canvas Stage at Very Top (Nothing Above Preview) */}
      <div className="w-full">
        {stageTab === "compare" ? (
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 pt-6">
            <ComparisonWorkbench
              title={`Compare ${item.name}`}
              renderSpecimen={() => (
                <MotionConfig reducedMotion={simReducedMotion ? "always" : "user"}>
                  {renderStage()}
                </MotionConfig>
              )}
            />
          </div>
        ) : stageTab === "code" ? (
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 pt-6">
            <div className="rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ws-border)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--ws-text-primary)]">
                    {item.sourcePath ?? `registry/components/${item.slug}.tsx`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (sourceCode) {
                      void navigator.clipboard?.writeText(sourceCode);
                      setCopiedSource(true);
                      setTimeout(() => setCopiedSource(false), 1500);
                    }
                  }}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
                >
                  {copiedSource ? (
                    <Check className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3 w-3" aria-hidden="true" />
                  )}
                  <span>{copiedSource ? "Copied" : "Copy Source"}</span>
                </button>
              </div>
              <pre className="max-h-[520px] overflow-auto rounded-xl border border-[var(--ws-border)] bg-[var(--ws-bg)] p-4 font-mono text-xs leading-relaxed text-[var(--ws-text-primary)]">
                <code>{sourceCode ?? `// Install via CLI:\n${resolvedInstall}`}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <ContextMenu
              className="flex w-full justify-center"
              items={[
                {
                  id: "ctx-reset",
                  label: "Reset Preview",
                  onSelect: () => setResetKey((k) => k + 1),
                },
                {
                  id: "ctx-inspector",
                  label: inspectorOpen ? "Hide Inspector" : "Show Inspector",
                  onSelect: () => setInspectorOpen((v) => !v),
                },
                {
                  id: "ctx-fullscreen",
                  label: fullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
                  onSelect: () => setFullscreen((f) => !f),
                },
                {
                  id: "ctx-copy-cli",
                  label: "Copy CLI Command",
                  onSelect: () => void navigator.clipboard?.writeText(resolvedInstall),
                },
              ]}
            >
              <div key={combinedResetKey} className="w-full flex flex-col items-center">
                <MotionConfig reducedMotion={simReducedMotion ? "always" : "user"}>
                  {item.slug === "shader-background" ? (
                    viewport === "mobile" ? (
                      <div className="w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)] bg-[radial-gradient(var(--ws-border)_1px,transparent_1px)] [background-size:20px_20px]">
                        <MobileDeviceFrame slug={item.slug} fullBleed>
                          {renderStage()}
                        </MobileDeviceFrame>
                      </div>
                    ) : viewport === "tablet" ? (
                      <div className="w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)] bg-[radial-gradient(var(--ws-border)_1px,transparent_1px)] [background-size:20px_20px]">
                        <TabletPreviewFrame slug={item.slug} fullBleed>
                          {renderStage()}
                        </TabletPreviewFrame>
                      </div>
                    ) : (
                      <div className="w-full border-b border-[var(--ws-border-subtle)]">
                        {renderStage()}
                      </div>
                    )
                  ) : viewport === "mobile" ? (
                    <div className="w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)] bg-[radial-gradient(var(--ws-border)_1px,transparent_1px)] [background-size:20px_20px]">
                      <MobileDeviceFrame slug={item.slug}>
                        <RenderJoyTheme theme={skin} mode={themeMode} padded className="w-full flex justify-center">
                          {renderStage()}
                        </RenderJoyTheme>
                      </MobileDeviceFrame>
                    </div>
                  ) : viewport === "tablet" ? (
                    <div className="w-full py-8 sm:py-12 px-4 flex justify-center border-b border-[var(--ws-border-subtle)] bg-[radial-gradient(var(--ws-border)_1px,transparent_1px)] [background-size:20px_20px]">
                      <TabletPreviewFrame slug={item.slug}>
                        <RenderJoyTheme theme={skin} mode={themeMode} padded className="w-full max-w-lg flex justify-center">
                          {renderStage()}
                        </RenderJoyTheme>
                      </TabletPreviewFrame>
                    </div>
                  ) : (
                    <div
                      data-testid="desktop-canvas-stage"
                      className="relative flex min-h-[72vh] sm:min-h-[660px] w-full items-center justify-center border-b border-[var(--ws-border-subtle)] bg-[var(--ws-preview-bg)] bg-[radial-gradient(var(--ws-border)_1.1px,transparent_1.1px)] [background-size:20px_20px] p-6 sm:p-12 overflow-x-auto"
                    >
                      <RenderJoyTheme theme={skin} mode={themeMode} padded className="relative z-10 w-full max-w-3xl flex justify-center">
                        {renderStage()}
                      </RenderJoyTheme>
                      {/* Glossy blurred bottom canvas fade */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--ws-bg)]/90 via-[var(--ws-bg)]/45 to-transparent backdrop-blur-[2px]"
                      />
                    </div>
                  )}
                </MotionConfig>
              </div>
            </ContextMenu>
          </div>
        )}
      </div>

      {/* Below-Canvas Workspace: Title, Controls, Inspector, Docs */}
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 pt-10 pb-24 space-y-8 min-w-0">
          {/* Centered Component Heading (Below Preview) */}
          <div className="relative flex flex-col items-center text-center space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <h1 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--ws-text-primary)]">
                {item.name}
              </h1>
              {item.tier === "pro" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-0.5 text-xs font-medium text-[var(--ws-text-secondary)]">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Pro
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--ws-text-secondary)] max-w-xl">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
              <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ws-text-secondary)]">
                {item.category}
              </span>
              {item.interactions.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--ws-border-subtle)] bg-[var(--ws-bg)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--ws-text-muted)]"
                >
                  {INTERACTION_LABELS[tag]}
                </span>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              {/* Stage Mode Switcher: Preview | Code | Compare */}
              <div
                role="tablist"
                aria-label="Studio stage mode"
                className="inline-flex h-8 items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-xs"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={stageTab === "preview"}
                  onClick={() => setStageTab("preview")}
                  className={cn(
                    "rounded-full px-3 py-1 font-medium transition-colors cursor-pointer",
                    stageTab === "preview"
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  Preview
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={stageTab === "code"}
                  onClick={() => setStageTab("code")}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-colors cursor-pointer",
                    stageTab === "code"
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  <Code2 className="h-3 w-3" aria-hidden="true" />
                  Code
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={stageTab === "compare"}
                  onClick={() => setStageTab("compare")}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-colors cursor-pointer",
                    stageTab === "compare"
                      ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                      : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                  )}
                >
                  <Columns2 className="h-3 w-3" aria-hidden="true" />
                  Compare
                </button>
              </div>

              <button
                type="button"
                onClick={() => setResetKey((k) => k + 1)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
              >
                <Play className="h-3 w-3" aria-hidden="true" />
                Replay
              </button>

              <button
                type="button"
                onClick={() => setInspectorOpen((v) => !v)}
                aria-expanded={inspectorOpen}
                className="inline-flex items-center gap-1.5 h-8 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-3 text-xs font-medium text-[var(--ws-text-primary)] hover:bg-[var(--ws-surface-hover)] cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                {inspectorOpen ? "Hide Inspector" : "Inspector"}
              </button>
              <select
                aria-label="Select studio theme"
                value={skin}
                onChange={(e) => setTheme(e.target.value)}
                className="h-8 rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] px-2.5 text-xs text-[var(--ws-text-primary)] cursor-pointer"
              >
                {ALL_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <div
                role="group"
                aria-label="Component theme mode"
                className="inline-flex h-8 items-center rounded-full border border-[var(--ws-border)] bg-[var(--ws-floating)] p-0.5 text-[11px]"
              >
                {(["light", "dark"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setThemeMode(m)}
                    aria-pressed={themeMode === m}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 capitalize transition-colors cursor-pointer",
                      themeMode === m
                        ? "bg-[var(--ws-text-primary)] text-[var(--ws-bg)]"
                        : "text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)]"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-[11px] text-[var(--ws-text-muted)]">
              <span className="rounded-full border border-[var(--ws-border)] bg-[var(--ws-surface)] px-2.5 py-0.5 text-[var(--ws-text-secondary)]">
                {item.interactionHint}
              </span>
              <span>· {item.accessibilityNotes}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 items-start">

            {/* Collapsible Bottom Inspector */}
            {inspectorOpen && stageTab === "preview" && (
              <aside
                aria-label="Component Inspector"
                className="block w-full rounded-2xl border border-[var(--ws-border)] bg-[var(--ws-surface)] p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[var(--ws-border)] pb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ws-text-secondary)]">
                    Inspector
                  </span>
                  <button
                    type="button"
                    onClick={() => setResetKey((k) => k + 1)}
                    className="inline-flex items-center gap-1 text-[11px] text-[var(--ws-text-secondary)] hover:text-[var(--ws-text-primary)] cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset
                  </button>
                </div>
                {renderInspectorControls()}

                <div className="border-t border-[var(--ws-border)] pt-3 space-y-2.5 text-xs">
                  <label className="flex items-center justify-between gap-2 text-[var(--ws-text-secondary)] cursor-pointer">
                    <span>Reduced Motion</span>
                    <input
                      type="checkbox"
                      checked={simReducedMotion}
                      onChange={(e) => setSimReducedMotion(e.target.checked)}
                    />
                  </label>
                  {item.soundSupported && (
                    <div className="flex items-center justify-between gap-2 text-[var(--ws-text-secondary)]">
                      <span>Sound Feedback</span>
                      <button
                        type="button"
                        onClick={toggleSound}
                        aria-pressed={soundEnabled}
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--ws-border)] bg-[var(--ws-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ws-text-primary)] cursor-pointer"
                      >
                        {soundEnabled ? (
                          <Volume2 className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <VolumeX className="h-3 w-3" aria-hidden="true" />
                        )}
                        {soundEnabled ? "On" : "Off"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="border-t border-[var(--ws-border)] pt-3 space-y-1.5 text-[11px] text-[var(--ws-text-muted)]">
                  <p className="font-medium text-[var(--ws-text-secondary)]">Dependencies</p>
                  <p className="font-mono text-[10px]">
                    {item.dependencies.length > 0 ? item.dependencies.join(", ") : "None"}
                  </p>
                </div>
              </aside>
            )}
          </div>

          <Drawer
            open={mobileInspectorOpen}
            onClose={() => setMobileInspectorOpen(false)}
            title="Component Inspector"
            side="bottom"
          >
            <div className="space-y-4">
              {renderInspectorControls()}
            </div>
          </Drawer>

          {/* Planes Documentation Column */}
          <ComponentDocs item={item} sourceCode={sourceCode} />
        </div>
    </div>
  );
}
