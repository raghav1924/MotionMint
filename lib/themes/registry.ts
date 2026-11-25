import type { BaseThemeDefinition, ThemeDefinition, ThemeId } from "./types";
import { CORE_THEMES } from "./definitions/core-themes";
import { EXPRESSIVE_THEMES } from "./definitions/expressive-themes";
import { MODE_PALETTES } from "./definitions/mode-palettes";
import { THEME_RECIPES } from "./recipes";

function enrichTheme(base: BaseThemeDefinition): ThemeDefinition {
  return {
    ...base,
    modes: MODE_PALETTES[base.id],
    recipes: THEME_RECIPES[base.id],
  };
}

export const ALL_THEMES: ThemeDefinition[] = [
  ...CORE_THEMES,
  ...EXPRESSIVE_THEMES,
].map(enrichTheme);

export const DEFAULT_THEME_ID: ThemeId = "minimalism";

const LEGACY_ALIAS_MAP: Record<string, ThemeId> = {
  dark: "dark-mode",
  bento: "bento-grid",
  glass: "glassmorphism",
  "neo-brutal": "neo-brutalism",
};

export function resolveThemeId(input?: string | null): ThemeId {
  if (!input) return DEFAULT_THEME_ID;
  const normalized = input.trim().toLowerCase();
  if (normalized in LEGACY_ALIAS_MAP) {
    return LEGACY_ALIAS_MAP[normalized];
  }
  const found = ALL_THEMES.find((t) => t.id === normalized);
  return found ? found.id : DEFAULT_THEME_ID;
}

export function getThemeById(id?: string | null): ThemeDefinition {
  const resolved = resolveThemeId(id);
  return ALL_THEMES.find((t) => t.id === resolved) ?? ALL_THEMES[0];
}

export const QUICK_THEMES: ThemeDefinition[] = [
  getThemeById("minimalism"),
  getThemeById("neo-brutalism"),
  getThemeById("scrapbook"),
  getThemeById("blueprint"),
  getThemeById("cyberpunk"),
  getThemeById("victorian"),
];
