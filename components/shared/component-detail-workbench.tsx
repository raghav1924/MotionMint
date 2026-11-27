"use client";

import React, { useState } from "react";
import { LAUNCH_SKINS } from "@/lib/themes/skins";
import { useRenderJoy } from "@/components/site/providers";
import { RippleButton } from "@/registry/components/ripple-button";
import { JellyButton } from "@/registry/components/jelly-button";
import { CopyButton } from "@/registry/components/copy-button";
import { SoundToggle } from "@/registry/components/sound-toggle";
import { BounceDotsLoader } from "@/registry/components/bounce-dots-loader";
import { ProgressRing, ProgressBar } from "@/registry/components/progress-ring";
import { WiggleText } from "@/registry/components/wiggle-text";
import { SkeletonShimmer } from "@/registry/components/skeleton-shimmer";
import { Dropzone } from "@/registry/components/dropzone";
import { cn } from "@/lib/utils";

type PackageManager = "npm" | "pnpm" | "bun";

export function ComponentDetailWorkbench({
  slug,
  installCommand,
}: {
  slug: string;
  installCommand: string;
}) {
  const { skin, setSkin } = useRenderJoy();
  const [pkg, setPkg] = useState<PackageManager>("npm");

  // Component-specific interactive control state
  const [variant, setVariant] = useState<"primary" | "secondary" | "outline">("primary");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [magneticStrength, setMagneticStrength] = useState(0.25);
  const [copyText, setCopyText] = useState(installCommand);
  const [toggleChecked, setToggleChecked] = useState(true);
  const [progressValue, setProgressValue] = useState(72);

  // WiggleText controls
  const [wiggleSplit, setWiggleSplit] = useState<"char" | "word">("char");
  const [wiggleIntensity, setWiggleIntensity] = useState<"subtle" | "medium" | "playful">("medium");
  const [wiggleTrigger, setWiggleTrigger] = useState<"hover" | "click" | "always">("hover");

  // SkeletonShimmer controls
  const [skeletonVariant, setSkeletonVariant] = useState<"text" | "avatar" | "card" | "rect">("card");
  const [skeletonCount, setSkeletonCount] = useState(1);
  const [skeletonAnimate, setSkeletonAnimate] = useState(true);

  // Dropzone controls
  const [dropMultiple, setDropMultiple] = useState(true);

  const resolvedInstall = installCommand.replace(
    /^npx /,
    pkg === "npm" ? "npx " : pkg === "pnpm" ? "pnpm dlx " : "bunx "
  );

  const renderPreview = () => {
    switch (slug) {
      case "ripple-button":
        return (
          <RippleButton variant={variant} size={size}>
            Interactive Ripple
          </RippleButton>
        );
      case "jelly-button":
        return <JellyButton magneticStrength={magneticStrength}>Magnetic Jelly</JellyButton>;
      case "copy-button":
        return <CopyButton value={copyText} />;
      case "sound-toggle":
        return (
          <div className="flex items-center gap-3">
            <SoundToggle
              checked={toggleChecked}
              onCheckedChange={setToggleChecked}
              label="Workbench toggle"
            />
            <span className="text-sm font-medium text-[var(--mm-fg)]">
              {toggleChecked ? "Active" : "Inactive"}
            </span>
          </div>
        );
      case "bounce-dots-loader":
        return <BounceDotsLoader size={size} label="Loading preview" />;
      case "progress-ring":
        return (
          <div className="flex w-full max-w-sm flex-col items-center gap-5">
            <ProgressRing value={progressValue} size={84} strokeWidth={7} />
            <ProgressBar value={progressValue} showValue label="Upload completion" />
          </div>
        );
      case "wiggle-text":
        return (
          <WiggleText
            text="UI with Feel — Hover or Click"
            splitBy={wiggleSplit}
            intensity={wiggleIntensity}
            trigger={wiggleTrigger}
            variant="accent"
            className="text-2xl"
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
      default:
        return (
          <span className="rounded-full border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-3 py-1 text-xs text-[var(--mm-fg-muted)]">
            Scheduled in Roadmap
          </span>
        );
    }
  };

  const renderControls = () => {
    switch (slug) {
      case "ripple-button":
        return (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--mm-fg-muted)]">Variant:</span>
              {(["primary", "secondary", "outline"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  aria-pressed={variant === v}
                  className={cn(
                    "px-2 py-1 text-xs rounded-[var(--mm-radius-sm)] border cursor-pointer",
                    variant === v
                      ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                      : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[var(--mm-fg-muted)]">Size:</span>
              {(["sm", "md", "lg"] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSize(sz)}
                  aria-pressed={size === sz}
                  className={cn(
                    "px-2 py-1 text-xs rounded-[var(--mm-radius-sm)] border cursor-pointer",
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
        );
      case "jelly-button":
        return (
          <label className="flex items-center gap-3 text-xs text-[var(--mm-fg-muted)]">
            <span>Magnetic pull ({magneticStrength.toFixed(2)}):</span>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.05"
              value={magneticStrength}
              onChange={(e) => setMagneticStrength(Number(e.target.value))}
              className="accent-[var(--mm-accent)]"
            />
          </label>
        );
      case "copy-button":
        return (
          <label className="flex items-center gap-2 text-xs text-[var(--mm-fg-muted)] w-full max-w-md">
            <span className="shrink-0">Value:</span>
            <input
              type="text"
              value={copyText}
              onChange={(e) => setCopyText(e.target.value)}
              className="h-8 flex-1 rounded-[var(--mm-radius-sm)] border border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-2.5 text-xs text-[var(--mm-fg)]"
            />
          </label>
        );
      case "bounce-dots-loader":
        return (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--mm-fg-muted)]">Size:</span>
            {(["sm", "md", "lg"] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSize(sz)}
                aria-pressed={size === sz}
                className={cn(
                  "px-2 py-1 text-xs rounded-[var(--mm-radius-sm)] border cursor-pointer",
                  size === sz
                    ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                    : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                )}
              >
                {sz}
              </button>
            ))}
          </div>
        );
      case "progress-ring":
        return (
          <label className="flex items-center gap-3 text-xs text-[var(--mm-fg-muted)]">
            <span>Value ({progressValue}%):</span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={progressValue}
              onChange={(e) => setProgressValue(Number(e.target.value))}
              className="accent-[var(--mm-accent)]"
            />
          </label>
        );
      case "wiggle-text":
        return (
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--mm-fg-muted)]">Split:</span>
              {(["char", "word"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setWiggleSplit(s)}
                  aria-pressed={wiggleSplit === s}
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
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--mm-fg-muted)]">Intensity:</span>
              {(["subtle", "medium", "playful"] as const).map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setWiggleIntensity(i)}
                  aria-pressed={wiggleIntensity === i}
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
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--mm-fg-muted)]">Trigger:</span>
              {(["hover", "click", "always"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setWiggleTrigger(t)}
                  aria-pressed={wiggleTrigger === t}
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
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--mm-fg-muted)]">Variant:</span>
              {(["text", "avatar", "card", "rect"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSkeletonVariant(v)}
                  aria-pressed={skeletonVariant === v}
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
            <label className="flex items-center gap-2 text-[var(--mm-fg-muted)]">
              <span>Count ({skeletonCount}):</span>
              <input
                type="range"
                min="1"
                max="4"
                value={skeletonCount}
                onChange={(e) => setSkeletonCount(Number(e.target.value))}
                className="accent-[var(--mm-accent)]"
              />
            </label>
            <label className="flex items-center gap-1.5 text-[var(--mm-fg-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={skeletonAnimate}
                onChange={(e) => setSkeletonAnimate(e.target.checked)}
                className="accent-[var(--mm-accent)]"
              />
              <span>Animate</span>
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
      default:
        return null;
    }
  };

  const controls = renderControls();

  return (
    <div className="space-y-8">
      {/* Interactive Preview + Skin Switcher */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--mm-fg)]">Interactive Preview</h2>
          <div
            role="group"
            aria-label="Preview skin switcher"
            className="flex flex-wrap items-center gap-1"
          >
            {LAUNCH_SKINS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSkin(s.id)}
                aria-pressed={skin === s.id}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-[var(--mm-radius-sm)] border cursor-pointer transition-colors",
                  skin === s.id
                    ? "border-[var(--mm-accent)] bg-[var(--mm-accent)] text-[var(--mm-accent-fg)]"
                    : "border-[var(--mm-border)] bg-[var(--mm-surface)] text-[var(--mm-fg-muted)] hover:text-[var(--mm-fg)]"
                )}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="mm-card overflow-hidden">
          <div className="flex min-h-[210px] items-center justify-center p-8">
            {renderPreview()}
          </div>
          {controls && (
            <div className="border-t border-[var(--mm-border)] bg-[var(--mm-surface-subtle)] px-5 py-3.5">
              {controls}
            </div>
          )}
        </div>
      </section>

      {/* Installation Command with Package Manager Tabs */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--mm-fg)]">Installation</h2>
          <div className="flex items-center gap-1" role="group" aria-label="Package manager">
            {(["npm", "pnpm", "bun"] as const).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setPkg(pm)}
                aria-pressed={pkg === pm}
                className={cn(
                  "px-2 py-0.5 text-xs font-mono rounded-[var(--mm-radius-sm)] border cursor-pointer",
                  pkg === pm
                    ? "border-[var(--mm-accent)] bg-[var(--mm-accent-soft)] text-[var(--mm-accent)]"
                    : "border-[var(--mm-border)] text-[var(--mm-fg-muted)]"
                )}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
        <div className="mm-card flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <code className="font-mono text-xs sm:text-sm text-[var(--mm-fg)]">
            {resolvedInstall}
          </code>
          <CopyButton value={resolvedInstall} label="Copy Command" />
        </div>
      </section>
    </div>
  );
}
