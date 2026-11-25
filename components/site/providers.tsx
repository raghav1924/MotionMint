"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DEFAULT_THEME_ID, getThemeById, resolveThemeId } from "@/lib/themes/registry";
import type { ComponentThemeMode, ThemeDefinition, ThemeId } from "@/lib/themes/types";
import { playSoundEffect, type SoundEffect } from "@/lib/audio/sound-engine";
import {
  setGlobalFeedbackConfig,
  triggerInteractionFeedback,
} from "@/lib/audio/feedback-store";

export type AppearanceMode = "dark" | "light" | "system";
export type PreviewViewport = "desktop" | "tablet" | "mobile";

const THEME_STORAGE_KEY = "motionmint-theme";
const APPEARANCE_STORAGE_KEY = "motionmint-appearance";

interface MotionMintContextValue {
  appearance: AppearanceMode;
  resolvedAppearance: "dark" | "light";
  setAppearance: (mode: AppearanceMode) => void;
  skin: ThemeId;
  theme: ThemeDefinition;
  themeMode: ComponentThemeMode;
  setThemeMode: (mode: ComponentThemeMode) => void;
  setSkin: (skinOrTheme: string) => void;
  setTheme: (themeId: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  playFeedback: (effect: SoundEffect, options?: { sound?: boolean; haptic?: boolean }) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  viewportMode: PreviewViewport;
  setViewportMode: (mode: PreviewViewport) => void;
  previewKey: number;
  refreshPreview: () => void;
  fullscreenPreview: boolean;
  setFullscreenPreview: (open: boolean) => void;
  activeComponentSlug: string | null;
  setActiveComponentSlug: (slug: string | null) => void;
}

const MotionMintContext = createContext<MotionMintContextValue | null>(null);

export function MotionMintProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearanceState] = useState<AppearanceMode>("light");
  const [resolvedAppearance, setResolvedAppearance] = useState<"dark" | "light">("light");
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [themeMode, setThemeMode] = useState<ComponentThemeMode>("light");
  // Sound must be OFF by default per product requirements
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(true);
  const [commandOpen, setCommandOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<PreviewViewport>("desktop");
  const [previewKey, setPreviewKey] = useState<number>(0);
  const [fullscreenPreview, setFullscreenPreview] = useState<boolean>(false);
  const [activeComponentSlug, setActiveComponentSlug] = useState<string | null>(null);

  // Hydrate appearance + theme from URL / localStorage
  useEffect(() => {
    let initialTheme: ThemeId = DEFAULT_THEME_ID;
    let initialAppearance: AppearanceMode = "light";
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      if (urlTheme) {
        initialTheme = resolveThemeId(urlTheme);
      } else {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
          initialTheme = resolveThemeId(storedTheme);
        }
      }
      const storedApp = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
      if (storedApp === "dark" || storedApp === "light" || storedApp === "system") {
        initialAppearance = storedApp;
      }
    } catch {
      // Ignore storage/URL errors
    }
    setThemeId(initialTheme);
    setAppearanceState(initialAppearance);
  }, []);

  // Resolve system appearance & apply data-appearance to <html>
  useEffect(() => {
    const resolve = (): "dark" | "light" => {
      if (appearance === "system") {
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
        return prefersDark ? "dark" : "light";
      }
      return appearance;
    };

    const nextResolved = resolve();
    setResolvedAppearance(nextResolved);
    document.documentElement.setAttribute("data-appearance", nextResolved);

    try {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
    } catch {
      // Ignore storage errors
    }

    if (appearance === "system" && typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => {
        const updated = mq.matches ? "dark" : "light";
        setResolvedAppearance(updated);
        document.documentElement.setAttribute("data-appearance", updated);
      };
      mq.addEventListener?.("change", listener);
      return () => mq.removeEventListener?.("change", listener);
    }
  }, [appearance]);

  // Persist component theme id without mutating document.documentElement
  useEffect(() => {
    const def = getThemeById(themeId);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, def.id);
    } catch {
      // Ignore storage errors
    }
  }, [themeId]);

  // Sync audio feedback store
  useEffect(() => {
    setGlobalFeedbackConfig({ soundEnabled, hapticsEnabled });
  }, [soundEnabled, hapticsEnabled]);

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const setAppearance = useCallback((mode: AppearanceMode) => {
    setAppearanceState(mode);
  }, []);

  const setTheme = useCallback((next: string) => {
    setThemeId(resolveThemeId(next));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setGlobalFeedbackConfig({ soundEnabled: next });
      if (next) {
        playSoundEffect("toggleOn");
      }
      return next;
    });
  }, []);

  const playFeedback = useCallback(
    (effect: SoundEffect, options?: { sound?: boolean; haptic?: boolean }) => {
      triggerInteractionFeedback(effect, options);
    },
    []
  );

  const refreshPreview = useCallback(() => {
    setPreviewKey((k) => k + 1);
  }, []);

  const activeTheme = getThemeById(themeId);

  return (
    <MotionMintContext.Provider
      value={{
        appearance,
        resolvedAppearance,
        setAppearance,
        skin: themeId,
        theme: activeTheme,
        themeMode,
        setThemeMode,
        setSkin: setTheme,
        setTheme,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        hapticsEnabled,
        setHapticsEnabled,
        playFeedback,
        commandOpen,
        setCommandOpen,
        sidebarOpen,
        setSidebarOpen,
        viewportMode,
        setViewportMode,
        previewKey,
        refreshPreview,
        fullscreenPreview,
        setFullscreenPreview,
        activeComponentSlug,
        setActiveComponentSlug,
      }}
    >
      {children}
    </MotionMintContext.Provider>
  );
}

export function useMotionMint(): MotionMintContextValue {
  const ctx = useContext(MotionMintContext);
  if (!ctx) {
    return {
      appearance: "light",
      resolvedAppearance: "light",
      setAppearance: () => {},
      skin: DEFAULT_THEME_ID,
      theme: getThemeById(DEFAULT_THEME_ID),
      themeMode: "light",
      setThemeMode: () => {},
      setSkin: () => {},
      setTheme: () => {},
      soundEnabled: false,
      setSoundEnabled: () => {},
      toggleSound: () => {},
      hapticsEnabled: false,
      setHapticsEnabled: () => {},
      playFeedback: () => {},
      commandOpen: false,
      setCommandOpen: () => {},
      sidebarOpen: false,
      setSidebarOpen: () => {},
      viewportMode: "desktop",
      setViewportMode: () => {},
      previewKey: 0,
      refreshPreview: () => {},
      fullscreenPreview: false,
      setFullscreenPreview: () => {},
      activeComponentSlug: null,
      setActiveComponentSlug: () => {},
    };
  }
  return ctx;
}
