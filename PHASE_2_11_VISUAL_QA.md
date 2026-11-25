# PHASE_2_11_VISUAL_QA.md — Unified Application Shell & Workspace Redesign

*Last updated: 2026-11-25*

## 1. Architectural Changes Verified

- **Removed Legacy Shell:** Deleted `components/workspace/workspace-shell.tsx` and removed `isWorkspaceRoute()` branching from `components/site/app-shell.tsx`.
- **Unified Chrome Across All 5 Experiences:** `/components/[slug]`, `/themes`, `/motion`, `/sounds`, and `/flow` now share `AnnouncementBar`, `NavigationToggle`, `BrandFloatingButton`, `EditorialSidebar`, and `CommandPalette`.
- **Contextual `FloatingToolbar`:**
  - `/sounds` renders `Sound: ON/OFF` + `Stop All` + Appearance (omits irrelevant device-frame and package-install controls).
  - `/motion` renders `@motionmint/motion-reveal`, `PromptMenu`, `DeviceFrames` viewport switches, `Refresh`, `Fullscreen`, and Appearance.
  - `/flow` omits the component `FloatingToolbar` so the Flow top toolbar, palette, `@xyflow/react` canvas, inspector, and execution console stay unobstructed.
- **Redesigned Motion Lab & Sound Lab:** Replaced legacy dashboard grids with `WorkspacePage`/`WorkspaceHeader` and central interactive studio stages.

## 2. Automated & Build Verification

- `npm test`: **12 test files, 85 tests** (including rewritten `tests/workspace.test.tsx` verifying unified `AppShell`, `FloatingToolbar` contextual Sound Lab mode, and `/flow` unobstructed canvas).
- `npm run typecheck`: `tsc --noEmit` (exit `0`).
- `npm run registry:validate`: `50` registry items validated.
- `npx next build --webpack`: `59/59` static pages compiled and prerendered cleanly.

## 3. Browser Screenshot Status

- **Headless Browser Screenshots (`1440×900`, `1280×800`, `768×1024`, `390×844`):** **Not captured in this environment** — the browser subagent returned `RESOURCE_EXHAUSTED` (quota limit) and `playwright-core` is not installed in workspace `node_modules`.
- **Remaining Visual QA Step:** Capture Light and Dark screenshots across `/components/ripple-button`, `/themes`, `/motion`, `/sounds`, and `/flow` once browser quota or local Playwright is available.
