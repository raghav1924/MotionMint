export type ThemeCategory =
  | "Modern"
  | "Minimal & Editorial"
  | "Tactile & Dimensional"
  | "Retro & Futuristic"
  | "Expressive & Artistic";

export type ComponentThemeMode = "light" | "dark";

export type ThemeId =
  | "minimalism"
  | "maximalism"
  | "swiss-design"
  | "brutalism"
  | "surrealism"
  | "neo-brutalism"
  | "neo-classical"
  | "neumorphism"
  | "scrapbook"
  | "glassmorphism"
  | "claymorphism"
  | "bento-grid"
  | "pixel-art"
  | "blueprint"
  | "luxury-typography"
  | "editorial-design"
  | "y2k-aesthetic"
  | "ethereal"
  | "bohemian"
  | "dark-mode"
  | "cyberpunk"
  | "anthropomorphic"
  | "victorian"
  | "cybercore"
  | "synthwave"
  | "graffiti"
  | "gothic"
  | "mixed-media"
  | "wabi-sabi";

export interface ThemeColorTokens {
  bg: string;
  surface: string;
  surfaceElevated: string;
  surfaceSubtle: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  accent: string;
  accentSecondary: string;
  accentFg: string;
  accentSoft: string;
  border: string;
  borderStrong: string;
  ring: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeModeTokens {
  colors: ThemeColorTokens;
  shadow: string;
  shadowHover: string;
  backdrop: string;
  surfaceOpacity: string;
  gradient: string;
}

export interface ComponentThemeRecipes {
  buttonStyle: "minimal" | "offset-shadow" | "bevel" | "engraved" | "neon" | "pill" | "extruded" | "stamped";
  cardStyle: "hairline" | "hard-frame" | "paper-collage" | "glass" | "grid-ruled" | "ornamental" | "hud" | "organic";
  inputStyle: "underline" | "boxed" | "recessed" | "terminal" | "framed" | "soft";
  controlStyle: "clean" | "tactile" | "mechanical" | "playful" | "schematic";
  aiStyle: "clean" | "telemetry" | "editorial" | "luminous" | "collage";
  mediaStyle: "framed" | "polaroid" | "crt" | "arch" | "floating";
}

export interface BaseThemeDefinition {
  id: ThemeId;
  name: string;
  shortLabel: string;
  category: ThemeCategory;
  colorScheme: ComponentThemeMode;
  description: string;
  motionPersonality: string;
  decorativeNote: string;
  colors: ThemeColorTokens;
  typography: {
    fontDisplay: string;
    fontBody: string;
    fontMono: string;
    letterSpacing: string;
    headingWeight: string;
  };
  geometry: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    borderWidth: string;
  };
  surface: {
    shadow: string;
    shadowHover: string;
    backdrop: string;
    surfaceOpacity: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  decoration: {
    texture: string;
    textureSize: string;
    textureOpacity: string;
  };
}

export interface ThemeDefinition extends BaseThemeDefinition {
  modes: {
    light: ThemeModeTokens;
    dark: ThemeModeTokens;
  };
  recipes: ComponentThemeRecipes;
}
