# ARCHITECTURE.md — MotionMint

## 1. Architectural Principle
MotionMint is structured as a **modular monolithic Next.js App Router application**. No Turborepo, external database, or authentication layer is introduced until a concrete milestone (Phase 7) requires persistent licensing.

## 2. Confirmed Technology Stack
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components by default; Turbopack dev |
| UI Runtime | React 19 + TypeScript | Strict mode enabled |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | CSS-first `@theme` + `--mm-*` semantic skin tokens |
| Animation | CSS / WAAPI + `motion` (`motion/react`) | Lightweight effects use CSS/WAAPI; physics/spring/layout use `motion/react` |
| Audio & Haptics | Native Web Audio API + `navigator.vibrate` | Zero external audio file dependencies for core synth; off by default |
| Icons | `lucide-react` | Tree-shakeable SVG icons |
| Flow *(Phase 6)* | `@xyflow/react` | MIT-licensed core; evaluated for Phase 6 |
| Testing | Vitest + React Testing Library + Playwright | Unit, interaction, a11y, and browser E2E |

## 3. Repository Structure
```text
MotionMint/
├── app/                      # Next.js App Router pages & layouts (Server Components by default)
│   ├── components/           # Catalogue & [slug] detail pages
│   ├── motion/               # Motion primitives route
│   ├── sounds/               # Sound Lab route
│   ├── flow/                 # Flow & Orchestrator preview route
│   ├── themes/               # Skin & token explorer route
│   ├── docs/                 # Documentation route
│   └── globals.css           # Tailwind v4 + 4-skin CSS variables
├── components/
│   ├── shell/                # AnnouncementBar, NavigationToggle, BrandFloatingButton, EditorialSidebar, FloatingToolbar, PromptMenu
│   ├── preview/              # DesktopBrowserFrame, TabletPreviewFrame, MobileDeviceFrame
│   ├── documentation/        # ComponentDocs (Installation, Usage/Props, Use Cases, Related)
│   ├── canvas/               # SpatialGallery (/canvas Infinity Canvas)
│   ├── site/                 # AppShell, Navbar, Footer, Providers, CatalogueBrowser
│   ├── shared/               # ComponentLivePreview, ComponentDetailWorkbench
│   └── studio/               # ComponentStudio (shared by /components/[slug] & /playground)
├── registry/                 # Publishable, self-contained component source files
│   ├── components/           # Free & Pro UI components
│   ├── motion/               # Motion primitives
│   └── lib/                  # Registry-portable helpers (e.g. sound synth hook)
├── lib/
│   ├── brand.ts              # Centralised product name, tagline, repo/registry metadata
│   ├── catalog.ts            # Typed component registry metadata, props, docs, tiers
│   ├── audio/                # Global sound engine (Web Audio synth + haptics + context)
│   ├── themes/               # Skin definitions & metadata
│   └── utils.ts              # `cn()` utility
├── public/r/                 # Generated shadcn-compatible registry JSON manifests
├── tests/                    # Vitest unit/component tests
└── *.md                      # Persistent architecture, roadmap, catalog, and ADR docs
```

## 4. Registry-First Distribution Model
- Components in `registry/` must be self-contained and only import from React, `motion/react`, `lucide-react`, or portable registry helpers (`@/lib/utils`, `@/lib/sound`).
- Each item maps to a `registry-item.json` manifest conforming to `https://ui.shadcn.com/schema/registry-item.json`.
- Paid (Pro) component source will be kept out of `public/r/` when monetisation is implemented; Phase 1–3 only publishes Free components.

## 5. Flow & Node Pipeline Orchestrator Boundary (Phase 6)
- **Flow UI Kit (`registry/flow/`):** Reusable canvas wrapper, node shells, handles, animated edges, controls, minimap, palette, inspector, and execution console UI.
- **Node Pipeline Orchestrator (`app/flow/` + adapter):** Flagship reference app consuming Flow UI Kit with a pluggable `ExecutionAdapter` interface (starting with a clearly labelled simulated adapter).
- **Prototype Audit Status:** `Unable to verify` — the referenced Google Drive link (`1-dJI0N4fstplb7EQs0018INJUWmXopIA`) is not accessible from the sandboxed environment. User will provide the local folder/archive prior to Phase 6.
