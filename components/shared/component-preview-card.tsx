"use client";

import React, { useState } from "react";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ProgressRing } from "@/registry/components/progress-ring";
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
import { ShaderBackground, SHADER_PRESETS, type ShaderPresetId } from "@/registry/components/shader-background";
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
import { AdvancedUploadFlow } from "@/registry/components/advanced-upload-flow";
import { PaymentSuccessFlow } from "@/registry/components/payment-success-flow";
import { AnimatedCharts } from "@/registry/components/animated-charts";
import { BentoDashboardBlock } from "@/registry/components/bento-dashboard-block";
import { RetroMusicPlayer } from "@/registry/components/retro-music-player";
import { AlbumCover } from "@/registry/components/album-cover";
import { PhotoStack } from "@/registry/components/photo-stack";
import { HoverReveal } from "@/registry/components/hover-reveal";
import { FocusScaleCarousel } from "@/registry/components/focus-scale-carousel";
import { FanCarousel } from "@/registry/components/fan-carousel";
import { RingGallery } from "@/registry/components/ring-gallery";
import { ParallaxCarousel } from "@/registry/components/parallax-carousel";
import { RippleGrid } from "@/registry/components/ripple-grid";
import { PendulumWave } from "@/registry/components/pendulum-wave";
import { ScrambleText } from "@/registry/components/scramble-text";
import { SplitTextReveal } from "@/registry/components/split-text-reveal";

const DEMO_CARDS: DeckCardItem[] = [
  {
    id: "c1",
    tag: "Motion",
    title: "Spring Physics",
    subtitle: "Natural drag inertia with zero-config reduced-motion fallback.",
  },
  {
    id: "c2",
    tag: "Themes",
    title: "29 Visual Systems",
    subtitle: "Every component adapts across Blueprint, Wabi Sabi, Cyberpunk, and more.",
  },
  {
    id: "c3",
    tag: "Audio",
    title: "Opt-in Web Audio",
    subtitle: "Synthesized tactile feedback that respects user gesture and silence.",
  },
];

export function ComponentLivePreview({
  slug,
  shaderPreset = "silk",
}: {
  slug: string;
  shaderPreset?: ShaderPresetId;
}) {
  const [toggleOn, setToggleOn] = useState(true);
  const [progress, setProgress] = useState(68);

  switch (slug) {
    case "ripple-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <RippleButton variant="primary" size="sm">Primary</RippleButton>
          <RippleButton variant="3d" size="sm">3D Push</RippleButton>
          <RippleButton variant="glass" size="sm">Glass</RippleButton>
        </div>
      );
    case "jelly-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <JellyButton variant="primary">Magnetic</JellyButton>
          <JellyButton variant="3d">3D Jelly</JellyButton>
        </div>
      );
    case "copy-button":
      return (
        <div className="flex items-center justify-center gap-3">
          <CopyButton value="npx shadcn add @renderjoy/ripple-button" />
        </div>
      );
    case "sound-toggle":
      return (
        <div className="flex items-center justify-center gap-3">
          <SoundToggle
            checked={toggleOn}
            onCheckedChange={setToggleOn}
            showWaveform
            label="Demo toggle"
          />
          <span className="text-xs font-medium text-[var(--mm-fg-muted)]">
            {toggleOn ? "Enabled" : "Disabled"}
          </span>
        </div>
      );
    case "bounce-dots-loader":
      return (
        <div className="flex items-center justify-center gap-5">
          <BounceDotsLoader size="sm" rhythm="wave" label="Loading small" />
          <BounceDotsLoader size="md" rhythm="elastic" label="Loading medium" />
          <BounceDotsLoader size="lg" rhythm="pulse" label="Loading large" />
        </div>
      );
    case "progress-ring":
      return (
        <div className="flex items-center justify-center gap-4">
          <ProgressRing value={progress} size={68} />
          <button
            type="button"
            onClick={() => setProgress((p) => (p >= 100 ? 15 : Math.min(100, p + 17)))}
            className="rounded-[var(--mm-radius-sm)] border border-[var(--mm-border-strong)] bg-[var(--mm-surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--mm-fg)] hover:border-[var(--mm-accent)] cursor-pointer"
          >
            Advance +17%
          </button>
        </div>
      );
    case "wiggle-text":
      return (
        <div className="text-center">
          <WiggleText text="Hover to wiggle" variant="accent" className="text-lg" />
        </div>
      );
    case "skeleton-shimmer":
      return (
        <div className="w-full max-w-[220px]">
          <SkeletonShimmer variant="text" count={2} />
        </div>
      );
    case "dropzone":
      return (
        <div className="w-full">
          <Dropzone
            accept=".png,.jpg,.pdf"
            maxSize={2 * 1024 * 1024}
            label="Drop or select file"
            className="text-xs"
          />
        </div>
      );
    case "swipe-card-deck":
      return <SwipeCardDeck cards={DEMO_CARDS} />;
    case "thinking-loader":
      return <ThinkingLoader variant="orbit" />;
    case "ai-prompt-composer":
      return <AIPromptComposer />;
    case "streaming-message":
      return (
        <StreamingMessage
          message={{
            id: "demo-1",
            role: "assistant",
            content: "Streaming response preview with accessible live region.",
            status: "streaming",
          }}
        />
      );
    case "tool-call-card":
      return (
        <ToolCallCard
          toolCall={{
            id: "tc-1",
            name: "search_registry",
            status: "success",
            durationMs: 42,
            input: { query: "swipe-card-deck" },
            output: { matches: 1 },
          }}
        />
      );
    case "agent-plan":
      return (
        <AgentPlan
          steps={[
            { id: "1", title: "Audit tokens", status: "completed" },
            { id: "2", title: "Build UI primitives", status: "in_progress" },
            { id: "3", title: "Verify tests", status: "pending" },
          ]}
        />
      );
    case "approval-card":
      return (
        <ApprovalCard
          title="Publish registry update"
          description="Approve writing 11 AI manifests to public/r/."
        />
      );
    case "inline-diff":
      return (
        <InlineDiff
          filename="lib/brand.ts"
          lines={[
            { type: "context", content: "export const BRAND = {" },
            { type: "remove", content: '  version: "0.1.0",' },
            { type: "add", content: '  version: "0.7.0",' },
          ]}
        />
      );
    case "reasoning-trace":
      return (
        <ReasoningTrace
          durationLabel="120ms"
          entries={["Parsed component schema", "Validated 29 theme tokens"]}
        />
      );
    case "ai-chat":
      return (
        <AIChat
          demoNotice="Sample UI Demo (No live AI backend)"
          initialMessages={[
            { id: "1", role: "user", content: "Show me a spring button.", status: "complete" },
            { id: "2", role: "assistant", content: "Try JellyButton with magneticStrength=0.3.", status: "complete" },
          ]}
        />
      );
    case "image-generation":
      return <ImageGeneration prompt="Minimal obsidian UI stage" status="complete" />;
    case "chat-orb":
      return <ChatOrb state="listening" />;
    case "pixel-image-generation":
      return <PixelImageGeneration progress={72} />;
    case "segmented-control":
      return (
        <SegmentedControl
          options={[
            { value: "design", label: "Design" },
            { value: "code", label: "Code" },
            { value: "tokens", label: "Tokens" },
          ]}
        />
      );
    case "number-stepper":
      return <NumberStepper defaultValue={4} min={0} max={20} />;
    case "glow-input":
      return <GlowInput label="Workspace Name" placeholder="renderjoy-app" />;
    case "email-capture":
      return <EmailCapture />;
    case "date-picker":
      return <DatePicker />;
    case "animated-select":
      return (
        <AnimatedSelect
          options={[
            { value: "next", label: "Next.js 16" },
            { value: "vite", label: "Vite + React" },
            { value: "remix", label: "React Router" },
          ]}
        />
      );
    case "otp-input":
      return <OTPInput length={4} />;
    case "multi-select":
      return (
        <MultiSelect
          options={[
            { value: "motion", label: "Motion" },
            { value: "sound", label: "Web Audio" },
            { value: "themes", label: "29 Themes" },
          ]}
          defaultValue={["motion"]}
        />
      );
    case "cookie-consent":
      return <CookieConsent />;
    case "card-stack":
      return (
        <CardStack
          cards={[
            { id: "cs1", title: "Spring Physics", subtitle: "Stiffness 320, Damping 26", badge: "01" },
            { id: "cs2", title: "Depth Layers", subtitle: "Configurable rotation & scale", badge: "02" },
            { id: "cs3", title: "Swipe or Keys", subtitle: "Accessible deck cycling", badge: "03" },
          ]}
        />
      );
    case "detent-drawer":
      return (
        <DetentDrawer title="Inspector" triggerLabel="Open Drawer">
          <p className="text-xs text-[var(--mm-muted)]">Snap between Peek, Half, and Full detents.</p>
        </DetentDrawer>
      );
    case "notch":
      return <Notch state="processing" message="Synced" detail="Registry ready (47 items)" actionLabel="Inspect" />;
    case "physical-knob":
      return <PhysicalKnob label="Gain" defaultValue={65} unit="%" />;
    case "reaction-arc":
      return <ReactionArc />;
    case "receipt-printer":
      return (
        <ReceiptPrinter
          title="RenderJoy"
          items={[
            { name: "Physical Knob", qty: 1, price: 0 },
            { name: "Card Stack", qty: 2, price: 12 },
          ]}
        />
      );
    case "rubber-band-select":
      return (
        <RubberBandSelect
          options={[
            { value: "spring", label: "Spring" },
            { value: "ease", label: "Bezier" },
            { value: "step", label: "Stepped" },
          ]}
          defaultValue={["spring"]}
        />
      );
    case "morphing-tray":
      return (
        <MorphingTray title="Export Preset" compactSummary="Next.js + Tailwind">
          <p className="text-xs text-[var(--mm-muted)]">Self-contained source copied directly into your repo.</p>
        </MorphingTray>
      );
    case "keyboard":
      return (
        <VisualKeyboard
          rows={[
            ["Q", "W", "E", "R"],
            ["A", "S", "D", "F"],
          ]}
          highlightedKeys={["W"]}
        />
      );
    case "infinity-canvas":
      return <InfinityCanvas />;
    case "scratch-card":
      return (
        <ScratchCard width={240} height={110}>
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--mm-accent)]">Unlocked</p>
            <p className="text-sm font-semibold text-[var(--mm-fg)]">MINT-WAVE2B</p>
          </div>
        </ScratchCard>
      );
    case "halftone-popover":
      return (
        <HalftonePopover triggerLabel="Inspect" title="Halftone Layer">
          <p className="text-xs text-[var(--mm-muted)]">Expressive SVG dot-matrix backdrop.</p>
        </HalftonePopover>
      );
    case "shader-background": {
      const meta = SHADER_PRESETS[shaderPreset] ?? SHADER_PRESETS.silk;
      return (
        <ShaderBackground
          preset={meta.id}
          speed={0.7}
          intensity={1}
          interactive
          className={`flex h-[180px] w-full items-center justify-center rounded-xl border border-white/10 p-4 text-center ${
            meta.id === "pastel" ? "text-slate-900" : "text-white"
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">
              {meta.look} · WebGL
            </span>
            <p className="text-sm font-semibold tracking-tight">{meta.label}</p>
          </div>
        </ShaderBackground>
      );
    }
    case "flip-card":
      return (
        <FlipCard
          front={
            <div className="flex h-full flex-col justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mm-accent)]">
                Front Face
              </span>
              <div>
                <p className="text-base font-bold">Direction-Aware Flip</p>
                <p className="mt-1 text-xs text-[var(--mm-fg-muted)]">
                  Click any edge to flip along that axis.
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
                Supports keyboard Enter/Space, touch tap, and instant reduced-motion
                crossfade.
              </p>
            </div>
          }
        />
      );
    case "cover-flow-carousel":
      return <CoverFlowCarousel className="scale-[0.72] origin-center -my-12" />;
    case "tactile-3d-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Tactile3DButton tone="obsidian">Push 3D</Tactile3DButton>
          <Tactile3DButton tone="emerald">Emerald</Tactile3DButton>
        </div>
      );
    case "glass-button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <GlassButton finish="obsidian">Obsidian</GlassButton>
          <GlassButton finish="prism">Prism</GlassButton>
        </div>
      );
    case "champagne-button":
      return <ChampagneButton label="Get Started" />;
    case "spotlight-bento":
      return <SpotlightBento className="scale-[0.65] origin-center -my-16" />;
    case "spatial-dock":
      return <SpatialDock className="scale-[0.82]" />;
    case "kinetic-card-3d":
      return <KineticCard3D className="scale-[0.85]" />;
    case "spotlight-command-palette":
      return <SpotlightCommandPalette className="scale-[0.78] -my-8" />;
    case "dynamic-island":
      return <DynamicIsland />;
    case "aurora-hero":
      return <AuroraHero className="scale-[0.65] origin-center -my-16" />;
    case "pricing-crown":
      return <PricingCrown className="scale-[0.68] origin-center -my-14" />;
    case "kinetic-marquee":
      return <KineticMarquee />;
    case "metric-sparkline":
      return <MetricSparkline className="scale-[0.85]" />;
    case "split-compare":
      return <SplitCompare className="scale-[0.82]" />;
    case "founder-wall":
      return <FounderWall className="scale-[0.72] -my-8" />;
    case "advanced-upload-flow":
      return <AdvancedUploadFlow className="scale-[0.78] -my-6" />;
    case "payment-success-flow":
      return <PaymentSuccessFlow className="scale-[0.82] -my-4" />;
    case "animated-charts":
      return <AnimatedCharts className="scale-[0.8] -my-4" />;
    case "bento-dashboard-block":
      return <BentoDashboardBlock className="scale-[0.72] -my-8" />;
    case "retro-music-player":
      return <RetroMusicPlayer className="scale-[0.84]" />;
    case "album-cover":
      return <AlbumCover className="scale-[0.9]" />;
    case "photo-stack":
      return <PhotoStack className="scale-[0.82]" />;
    case "hover-reveal":
      return <HoverReveal className="scale-[0.84] -my-4" />;
    case "focus-scale-carousel":
      return <FocusScaleCarousel className="scale-[0.82]" />;
    case "fan-carousel":
      return <FanCarousel className="scale-[0.84]" />;
    case "ring-gallery":
      return <RingGallery className="scale-[0.88]" />;
    case "parallax-carousel":
      return <ParallaxCarousel className="scale-[0.86]" />;
    case "ripple-grid":
      return <RippleGrid className="scale-[0.86]" />;
    case "pendulum-wave":
      return <PendulumWave className="scale-[0.84]" />;
    case "scramble-text":
      return <ScrambleText />;
    case "split-text-reveal":
      return <SplitTextReveal className="scale-[0.86]" />;
    default:
      if (slug in SHADER_PRESETS) {
        const meta = SHADER_PRESETS[slug as ShaderPresetId];
        return (
          <ShaderBackground
            preset={meta.id}
            speed={0.7}
            intensity={1}
            interactive
            className={`flex h-[180px] w-full items-center justify-center rounded-xl border border-white/10 p-4 text-center ${
              meta.id === "pastel" ? "text-slate-900" : "text-white"
            }`}
          >
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                {meta.look} · WebGL
              </span>
              <p className="text-sm font-semibold tracking-tight">{meta.label}</p>
            </div>
          </ShaderBackground>
        );
      }
      return (
        <span className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-3 py-1 text-xs text-[var(--mm-fg-muted)]">
          Scheduled in Roadmap
        </span>
      );
  }
}
