# PHASE_A_UI_AUDIT.md — RenderJoy Shared UI, Shell, Preview & Inventory Audit

> **Audit Scope:** Tasks `A0.1`, `A0.2`, `A0.3`, `A0.4`  
> **Date:** 2026-11-28  
> **Baseline Verification:** `60` implemented components in `lib/catalog.ts`, `67` registry items in `registry.json` & `public/r/`, `75` static Next.js routes, `14/14` Vitest suites (`95/95` tests).

---

## 1. Route-to-Shell & Preview Mapping (A0.1)

| Route | Outer Shell | Top Chrome | Floating Utilities | Preview / Stage Primitive |
|---|---|---|---|---|
| `/` | `AppShell` | `AnnouncementBar` + `Navbar` + `Footer` | None | `CinematicHero`, `ExhibitionGallery`, `ThemesFlowSplit` |
| `/components` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`default`), `EditorialSidebar`, `CommandPalette` | `CatalogueBrowser` → `VisibilityPreview` → `ComponentLivePreview` |
| `/components/[slug]` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`component`), `EditorialSidebar`, `CommandPalette` | `ComponentStudio` → `<RenderJoyTheme>`, `MobileDeviceFrame`, `TabletPreviewFrame`, `ComponentDocs` |
| `/themes` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`themes`), `EditorialSidebar`, `CommandPalette` | `ThemeStudio` → `<RenderJoyTheme>`, `ComparisonWorkbench` |
| `/motion` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`motion`), `EditorialSidebar`, `CommandPalette` | `WorkspacePage` → `<RenderJoyTheme>`, `DesktopBrowserFrame` / `TabletPreviewFrame` / `MobileDeviceFrame` |
| `/sounds` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`sounds`), `EditorialSidebar`, `CommandPalette` | `WorkspacePage` → `SoundEngine` (`17` cues, `6` presets) |
| `/flow` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `EditorialSidebar`, `CommandPalette` *(no `FloatingToolbar`)* | `WorkspacePage` → `PipelineOrchestrator` (`@xyflow/react`) |
| `/docs`, `/docs/installation` | `AppShell` | `NavigationToggle` + `BrandFloatingButton` | `FloatingToolbar` (`default`), `EditorialSidebar`, `CommandPalette` | Static documentation views |

---

## 2. Prioritized Defect Register (P0 / P1 / P2)

### P0 — Critical UX & Architecture Defects
1. **Black Icon Container Around Brand Mark (`A2.14`, `A4.1`, `A4.2`):**
   - `components/shell/brand-floating-button.tsx:42` wraps `<RenderJoyMark />` inside a solid `bg-[#111111]` square (`h-11 w-11 rounded-[10px]`). Must render the logomark directly without a black box.
2. **Inspector Placement & Preview Visibility (`A2.5`, `A2.16`):**
   - `components/studio/component-studio.tsx` places the Inspector as a full-width panel *below* the `660px` stage, forcing users to scroll away from the specimen to tune props. Must use a compact floating inspector at the right so specimen and controls remain simultaneously visible.
3. **FloatingToolbar Scale, Missing Controls & Tooltips (`A2.1`–`A2.11`):**
   - `components/shell/floating-toolbar.tsx` lacks:
     - Home button (`RenderJoyMark` only)
     - Compact Inspect toggle
     - Separate **Replay** vs **Reset** controls
     - **Two independent appearance controls** (Global Website Appearance vs Component Theme Mode) + Component Theme picker
     - **Hide/Show Text** toggle for shader/background specimens
     - Tooltips on every icon button (`Command Palette`, `Copy prompt`, `Sound`, etc.)
     - Compact (~30% reduced) frosted-glass scale and glossy bottom canvas fade (`A1.5`, `A2.2`).

### P1 — Consistency, Performance & Discovery Defects
4. **Stale Hard-Coded Component Counts (`A0.3`):**
   - `components/shell/announcement-bar.tsx:19` hardcodes `44 components`.
   - `app/page.tsx:78` hardcodes `Browse 44 Components`.
   - Actual verified count in `lib/catalog.ts` is **60** implemented components (`67` items in `registry.json`). Must derive counts dynamically from `CATALOG_ITEMS`.
5. **Cross-Category Fill in Related Components (`A2.15`):**
   - `components/documentation/component-docs.tsx:33-36` fills `fallbackRelated` with unrelated categories when `< 3` same-category items exist. Must show same-category items only.
6. **Preview Header Clutter (`A2.12`):**
   - `components/studio/component-studio.tsx` renders the description paragraph and interaction tags in the preview header instead of keeping only the title, small category/brand mark, and Pro/free lock state.
7. **Offscreen Animation Pause Missing in `VisibilityPreview` (`A0.2`, `A1.3`):**
   - `components/shared/visibility-preview.tsx:32-33` calls `observer.disconnect()` after first intersection, so scrolled-offscreen animated/WebGL cards stay mounted and active.
8. **Legacy Unused `ComponentDetailWorkbench` (`A0.2`):**
   - `components/shared/component-detail-workbench.tsx` is unused by any route (only referenced by `tests/components.test.tsx`).
9. **Incomplete `LARGE_STAGE_SLUGS` in `CatalogueBrowser` (`A1.1`):**
   - `components/site/catalogue-browser.tsx:22-31` omits newly added wide/tall components (`cover-flow-carousel`, `spotlight-bento`, `aurora-hero`, `pricing-crown`), causing cramped card previews.
10. **Separate Background/WebGL Discoverability (`A3.2`, `A3.3`):**
    - `shader-background` currently bundles 18 distinct effects (`logo-flare`, `prism`, `fluted-glass`, `liquid-drops`, `ripple`, etc.) under one catalogue route instead of separately discoverable background components sharing `lib/shaders/`.

### P2 — Polish & Minor Gaps
11. **Dot-Grid Contrast (`A1.4`):**
    - Dot-grid contrast on Light (`var(--ws-border)`) and Dark surfaces can be tuned for crisp legibility without distraction.
12. **Footer Refinement (`A5.1`–`A5.4`):**
    - `components/site/footer.tsx` is clean and RenderJoy-branded, but lacks the subtle halftone/dot-field lower edge and grouped column hierarchy targeted in `A5`.

---

## 3. Verified Inventory Snapshot (A0.3)
- **Implemented Components (`lib/catalog.ts`):** `60`
- **Registry Items (`registry.json` & `public/r/`):** `67`
- **Total Inventory (`lib/inventory.ts`):** `214+` items across `22` categories
- **Static Routes (`next build`):** `75`
- **Automated Tests (`vitest`):** `14/14` files, `95/95` tests passing
