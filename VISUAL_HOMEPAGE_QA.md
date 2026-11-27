# VISUAL_HOMEPAGE_QA.md — RenderJoy Phase 2.10.1

*Last updated: 2026-11-25*

## 1. Live Headless Chrome Playwright Verification

Verified in headless Google Chrome via `playwright-core` against production build (`http://localhost:3005`):

- **Navbar & Homepage Toolbar Corrections:**
  - `select[aria-label="Select theme"]` count on `/`: **`0`** (global `Minimalism` dropdown removed; only Light / Dark / System appearance remains).
  - `[role="toolbar"][aria-label="Floating workspace controls"]` count on `/`: **`0`** (component-preview `FloatingToolbar` hidden on public homepage).
- **Sculptural Silk Canvas & Reduced Motion:**
  - `1440×900` silk canvas bounding box: `1440 × 899` (`[data-testid="sculptural-silk-canvas"]`).
  - `prefers-reduced-motion: reduce`: `rmCanvasCount = 0` (renders static pearl-silver SVG sculptural fallback immediately).
- **4-Stage Scroll Progression & Reversal:**
  - `0%` → `"reveal"`
  - `35%` of scroll range → `"reveal"` / `"formation"`
  - `65%` of scroll range → `"formation"`
  - `95%` of scroll range → `"exhibition"`
  - Scroll back to `0` → `"reveal"` (clean reversal verified)
- **Responsive Overflow Check (`documentElement.scrollWidth > window.innerWidth`):**
  - `1440×900`: `false` (0 overflow)
  - `1280×800`: `false` (0 overflow)
  - `768×1024`: `false` (0 overflow)
  - `390×844`: `false` (0 overflow)
- **Errors:** `pageErrors = []`; 1 `404` asset resource (`/favicon.ico` not present).

## 2. Visual Fixes Applied After First Screenshot Review

1. **Eliminated Canvas Quad Seams:** Replaced per-quad stroked segments in `components/home/sculptural-silk.tsx` with continuous quadratic Bezier top/bottom envelopes filled with multi-stop metallic pearl/silver gradients and smooth specular crest strokes.
2. **Dark Mode Specimen Harmony:** Updated `ThinkingLoader` and `PhysicalKnob` hero specimens to follow `resolvedAppearance` (`light`/`dark`) instead of hardcoded `light`.
3. **Mobile Overflow Fix:** Added `overflow-x-clip` to `app/page.tsx` root, bringing `390×844` horizontal overflow to `false`.
4. **Scroll Offset Tuning:** Updated `CinematicHero` `useScroll` to `offset: ["start start", "end end"]` on `lg:h-[165vh]` so stages progress evenly across `65vh`.

## 3. Captured Screenshots

Stored in `/Users/jatinsharma/.gemini/antigravity/brain/cadf2884-4299-4258-86b0-0f37c000757a/scratch/phase2101-screenshots/`:
- `hero-1440-initial-light.png`
- `hero-1440-scroll-25.png`, `hero-1440-scroll-50.png`, `hero-1440-scroll-75.png`, `hero-1440-exhibition-100.png`
- `hero-1440-pointer-left.png`, `hero-1440-pointer-right.png`
- `hero-1440-dark.png`
- `hero-1440-reduced-motion.png`
- `hero-1280x800.png`, `hero-768x1024.png`, `hero-390x844.png`
