# DESIGN_SYSTEM.md — MotionMint

## 1. Philosophy
MotionMint separates two independent visual layers:
1. **Application Appearance (`data-appearance="light" | "dark"`):** Controls the website and developer workspace chrome (`--ws-bg`, `--ws-surface`, `--ws-surface-elevated`, `--ws-surface-hover`, `--ws-floating`, `--ws-preview-bg`, `--ws-border`, `--ws-text-primary`, `--ws-text-secondary`, `--ws-text-muted`, `--ws-accent: #DFFF00`). Light-first (`#FFFFFF`) primary appearance with full Dark mode inversion (`#050506`), while `--ws-preview-bg` preserves crisp component preview legibility.
2. **29 Component Design Themes (`data-theme="..."`):** Controls showcased and installed components via `--mm-*` tokens without altering the surrounding workspace chrome.

## 2. Launch Skins (4 of 29 Catalogued Styles)
1. **Dark Mode (`dark`)** — Default site skin. Deep obsidian surfaces (`#09090b`), crisp `1px` hairline borders, subtle emerald/mint accent (`#10b981`), high-contrast typography.
2. **Bento (`bento`)** — Modular card-grid aesthetic, generous corner radii (`16px`–`20px`), soft elevated surfaces, structured 1px borders, clean light/neutral contrast.
3. **Glassmorphism (`glass`)** — Translucent layered surfaces (`backdrop-filter: blur(16px)`), luminous inner highlights, deep atmospheric backdrop.
4. **Neo-Brutalism (`neo-brutal`)** — High-contrast surfaces, crisp `2px` solid ink borders, hard offset drop shadows (`4px 4px 0px`), snappy mechanical motion.

*(Future skins from the 29-style catalogue—including Blueprint and Cybercore for Flow—will be added in later phases using the exact same token contract.)*

## 3. Semantic Token Contract (`--mm-*`)
Every skin defines:
- **Surfaces:** `--mm-bg`, `--mm-surface`, `--mm-surface-elevated`, `--mm-surface-subtle`
- **Text:** `--mm-fg`, `--mm-fg-muted`, `--mm-fg-subtle`
- **Brand / Accent:** `--mm-accent`, `--mm-accent-fg`, `--mm-accent-soft`
- **Borders & Rings:** `--mm-border`, `--mm-border-strong`, `--mm-ring`
- **Geometry & Depth:** `--mm-radius`, `--mm-radius-sm`, `--mm-radius-lg`, `--mm-border-width`, `--mm-shadow`, `--mm-shadow-hover`, `--mm-backdrop`

## 4. Motion Standards
- **CSS / WAAPI first** for simple transitions, shimmers, and keyframe loops.
- **`motion/react`** for spring physics, magnetic tracking, gesture feedback, and layout transitions.
- **Reduced Motion:** Respect `prefers-reduced-motion: reduce` globally and in every interactive component. Never rely on animation alone to convey state.

## 5. Sound & Haptic Standards
- **Default:** Sound is **OFF** globally until the user explicitly enables it via the Sound Toggle or Playground.
- **Trigger Policy:** Only fire on deliberate user actions (click, toggle, copy, drop, submit)—never on page load or casual hover by default.
- **Synthesis:** Use lightweight Web Audio API synthesis (`click`, `toggleOn`, `toggleOff`, `success`, `error`, `drop`) with clean envelope shaping and zero external MP3 network requests for core interactions.
- **Haptics:** Trigger `navigator.vibrate(...)` opportunistically on supported devices with silent no-op fallback.
