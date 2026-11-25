import type React from "react";
import type { ComponentThemeMode, ThemeDefinition, ThemeModeTokens } from "./types";

export function getThemeModeTokens(
  theme: ThemeDefinition,
  mode?: ComponentThemeMode
): ThemeModeTokens {
  const resolvedMode = mode ?? theme.colorScheme;
  return theme.modes[resolvedMode];
}

export function themeToCssVars(
  theme: ThemeDefinition,
  mode?: ComponentThemeMode
): Record<string, string> {
  const resolvedMode = mode ?? theme.colorScheme;
  const tokens = getThemeModeTokens(theme, resolvedMode);
  const c = tokens.colors;

  return {
    colorScheme: resolvedMode,
    "--mm-bg": c.bg,
    "--mm-surface": c.surface,
    "--mm-surface-elevated": c.surfaceElevated,
    "--mm-surface-subtle": c.surfaceSubtle,
    "--mm-fg": c.fg,
    "--mm-fg-muted": c.fgMuted,
    "--mm-fg-subtle": c.fgSubtle,
    "--mm-accent": c.accent,
    "--mm-accent-secondary": c.accentSecondary,
    "--mm-accent-fg": c.accentFg,
    "--mm-accent-soft": c.accentSoft,
    "--mm-border": c.border,
    "--mm-border-strong": c.borderStrong,
    "--mm-ring": c.ring,
    "--mm-success": c.success,
    "--mm-warning": c.warning,
    "--mm-error": c.error,
    "--mm-radius": theme.geometry.radiusMd,
    "--mm-radius-sm": theme.geometry.radiusSm,
    "--mm-radius-lg": theme.geometry.radiusLg,
    "--mm-border-width": theme.geometry.borderWidth,
    "--mm-shadow": tokens.shadow,
    "--mm-shadow-hover": tokens.shadowHover,
    "--mm-backdrop": tokens.backdrop,
    "--mm-surface-opacity": tokens.surfaceOpacity,
    "--mm-gradient": tokens.gradient,
    "--mm-font-display": theme.typography.fontDisplay,
    "--mm-font-body": theme.typography.fontBody,
    "--mm-font-mono": theme.typography.fontMono,
    "--mm-letter-spacing": theme.typography.letterSpacing,
    "--mm-heading-weight": theme.typography.headingWeight,
    "--mm-motion-duration": theme.motion.duration,
    "--mm-motion-easing": theme.motion.easing,
    "--mm-texture": theme.decoration.texture,
    "--mm-texture-size": theme.decoration.textureSize,
    "--mm-texture-opacity": theme.decoration.textureOpacity,
  };
}

export function themeToInlineStyle(
  theme: ThemeDefinition,
  mode?: ComponentThemeMode
): React.CSSProperties {
  return themeToCssVars(theme, mode) as unknown as React.CSSProperties;
}

/**
 * @deprecated Component themes must be applied via `<MotionMintTheme>` or
 * `themeToInlineStyle()` so they never mutate `document.documentElement`.
 */
export function applyThemeToDocument(_theme: ThemeDefinition): void {
  // Intentionally a no-op to prevent component themes from leaking into global site chrome.
}
