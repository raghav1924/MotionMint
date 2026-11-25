import { QUICK_THEMES, DEFAULT_THEME_ID } from "./registry";
import type { ThemeId } from "./types";

export type SkinId = ThemeId | "dark" | "bento" | "glass" | "neo-brutal";

export interface SkinDefinition {
  id: ThemeId;
  name: string;
  shortLabel: string;
  description: string;
  previewSwatches: [string, string, string];
}

export const LAUNCH_SKINS: SkinDefinition[] = QUICK_THEMES.slice(0, 4).map((t) => ({
  id: t.id,
  name: t.name,
  shortLabel: t.shortLabel,
  description: t.description,
  previewSwatches: [t.colors.bg, t.colors.surfaceElevated, t.colors.accent],
}));

export const DEFAULT_SKIN: ThemeId = DEFAULT_THEME_ID;
