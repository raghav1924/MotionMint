"use client";

import React from "react";
import { getThemeById } from "@/lib/themes/registry";
import { themeToInlineStyle } from "@/lib/themes/theme-utils";
import type { ComponentThemeMode } from "@/lib/themes/types";
import { cn } from "@/lib/utils";

export interface RenderJoyThemeProps {
  theme?: string;
  mode?: ComponentThemeMode;
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

/**
 * Isolated component-level theme scope.
 * Applies `--mm-*` design tokens, typography, geometry, surface, and recipe attributes
 * strictly to its descendants without mutating `document.documentElement`.
 */
export function RenderJoyTheme({
  theme = "minimalism",
  mode,
  children,
  className,
  padded = false,
}: RenderJoyThemeProps) {
  const def = getThemeById(theme);
  const resolvedMode: ComponentThemeMode = mode ?? def.colorScheme;
  const style = themeToInlineStyle(def, resolvedMode);

  return (
    <div
      data-mm-scope="true"
      data-theme={def.id}
      data-mm-theme={def.id}
      data-mm-mode={resolvedMode}
      data-mm-button-style={def.recipes.buttonStyle}
      data-mm-card-style={def.recipes.cardStyle}
      style={{
        ...style,
        fontFamily: "var(--mm-font-body)",
        backgroundImage:
          def.decoration.texture !== "none" ? def.decoration.texture : undefined,
        backgroundSize:
          def.decoration.texture !== "none" ? def.decoration.textureSize : undefined,
      }}
      className={cn(
        "mm-theme-scope relative bg-[var(--mm-bg)] text-[var(--mm-fg)] transition-colors duration-200",
        padded && "rounded-[var(--mm-radius-lg)] border border-[var(--mm-border)] p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
