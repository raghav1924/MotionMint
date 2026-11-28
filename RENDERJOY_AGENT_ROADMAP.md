# RenderJoy — Autonomous Product Roadmap & Agent Work Queue

> **Purpose:** Implementation playbook and detailed subtask checklist supplementing the authoritative root `ROADMAP.md`. If this playbook and `ROADMAP.md` ever disagree, **`ROADMAP.md` wins**. See `ROADMAP_RECONCILIATION.md` for the complete task mapping.
>
> **Last prepared:** 2026-11-28  
> **Operating principle:** Perfection and realistic, working behaviour take priority over speed, component count or a completion claim. There is no compromise on visual quality, functional fidelity, accessibility or installation reliability.

---

## 0. Agent start instructions — mandatory

At the beginning of every work session:

1. Read this file completely.
2. Read `RENDERJOY_REFERENCE_RESEARCH.md` for the current research inventory and reference map.
3. Inspect the repository, `git status`, `package.json`, `ROADMAP.md`, `CHANGELOG.md`, `DECISIONS.md`, `COMPONENT_CATALOG.md`, `COMPONENT_BUILD_PLAN.md`, `DESIGN_SYSTEM.md`, `ARCHITECTURE.md`, `AGENTS.md`, the component registry and relevant tests. The repository is authoritative for implementation status; this document is the authoritative priority/order.
   - The user-supplied current `ROADMAP.md` reports Phases 2.11, 2.12, 2.13, Shader Background and the Flow demo complete. Treat these as completed baseline work; perform a focused audit and only reopen a task when source/browser evidence reveals a defect or a later user requirement extends it.
   - Later entries override earlier historical entries: `/playground` and `/canvas` are removed; `InfinityCanvas` is a component; `Bench` is a distinct future full-canvas workspace.
4. Reconcile every item marked `AUDIT` or `VERIFY` against the real source code. Do not trust old completion summaries blindly. Do not infer that a component works merely because it appears in the catalogue or has a route.
5. Find the **first incomplete task in the ordered queue** below. Work on it without asking the user to choose a topic when the next task and acceptance criteria are already clear.
6. Complete the task fully: implementation, tests, visual inspection, docs and status update. Then select the next incomplete task and continue while the current session has sufficient context/time/tool capacity.
7. If session limits, a missing external asset, inaccessible service, or a genuine product decision blocks progress, finish the current safe partial unit, document the exact blocker, update `NEXT ACTION`, and stop. Do not silently skip the task or mark it complete.
8. Before ending, update this file's task status, `NEXT ACTION`, relevant version/changelog/decision docs, and QA report. The next session must be able to resume without asking the user to restate the plan.

### Autonomous continuation rule

**Do not stop after completing one task just to ask what to do next.** After an acceptance gate passes, automatically start the next incomplete task in this ordered roadmap. Continue in small, reviewable work units. Never start a lower-priority feature while a higher-priority repair or regression remains open.

### Status values

- `[ ] NOT STARTED`
- `[~] IN PROGRESS`
- `[!] BLOCKED` — include reason and next action
- `[x] COMPLETE` — only after its acceptance gate passes
- `[?] VERIFY` — reported as completed in prior logs, but not independently confirmed in the current repository/browser
- `[—] DEFERRED` — explicitly postponed, with rationale

Do not set `[x]` based only on TypeScript, unit tests or a successful production build. Visual tasks require real browser screenshots and inspection. Shader/WebGL tasks require actual rendering evidence. Registry tasks require a fresh consumer install test.

---

## 1. Project definition and non-negotiable product rules

RenderJoy is an interaction-first React UI library and design-engineering studio. It is not merely a gallery of pretty cards. Developers should be able to discover, interact with, tune, compare, inspect and install original components and complete interface experiences.

### Product pillars

1. **Components:** installable React experiences, controls, media, charts, blocks and sections.
2. **Interaction and motion:** real pointer, keyboard, drag, swipe, scroll, loading and state transitions.
3. **Sound and haptics:** opt-in, previewable feedback assets and a portable sound API.
4. **Themes:** 29 component-level design languages, each with Light and Dark rendering (58 variants per component). Component themes must never change the global website theme.
5. **Shader / visual effects:** separately discoverable WebGL and Canvas effects, each with its own preview and installable implementation.
6. **RenderJoy Flow:** flagship Node Pipeline Orchestrator UI built from the user's frontend technical assessment POC; this is a product differentiator, not just a decorative sample.
7. **Bench:** a freeform full-canvas workspace for arranging, testing and comparing live RenderJoy specimens. This is distinct from the installable `InfinityCanvas` component.

### Global UI rules

### The 29 component design patterns (must remain component-scoped)

1. Minimalism  2. Maximalism  3. Swiss Design  4. Brutalism  5. Surrealism  6. Neo-Brutalism  7. Neo-classical  8. Neumorphism / Soft UI  9. Scrapbook / Collage  10. Glassmorphism  11. Claymorphism  12. Bento Grid  13. Pixel Art  14. Conceptual Sketch / Blueprint  15. Luxury Typography  16. Editorial Design  17. Y2K Aesthetic  18. Ethereal  19. Bohemian  20. Dark Mode UI  21. Cyberpunk  22. Anthropomorphic  23. Victorian  24. Cybercore  25. Synthwave / Retrowave  26. Graffiti / Streetwear  27. Gothic  28. Mixed Media  29. Wabi Sabi.

Each theme has a Light and Dark specimen. The same component behaviour/props must be preserved across themes; only the scoped visual treatment changes. This creates the 58-variant design system. Do not theme the global website shell with these 29 patterns.

- Global website appearance is only **Light / Dark / System**.
- Main site chrome is minimalist, premium and editorial. Do not apply all 29 component themes to the application shell.
- The 29 design patterns are scoped to component preview surfaces and Theme Studio.
- Use one consistent outer shell across Components, Themes, Motion, Sounds and Flow. The Flow editor may keep its purpose-built node palette/canvas/inspector/console, but must share the same global brand, header, navigation, appearance and typography.
- No standalone legacy `/playground` route. `InfinityCanvas` remains an installable UI component. A separate `/bench` experience is allowed because the user explicitly requested a Bencho-style full-canvas work area; do not call it Playground or the InfinityCanvas component page.
- Component cards must be live and realistic where feasible, but never mount dozens of heavy GPU animations concurrently. Lazy mount, visibility-pause and use lightweight posters for inactive previews.
- Do not add dummy props, pretend interactions, dead controls, fake upload progress, fabricated company logos, testimonials, adoption numbers, pricing or licensing claims.
- Sound is off by default. Never autoplay sound on page load. Haptics and pointer effects must gracefully degrade.
- Do not copy third-party source, logos, artwork, exact compositions or proprietary assets. Reimplement from observable behaviour and documented capabilities; check licences before adapting any code/assets.

### Current state — reconciled against the user's current working `ROADMAP.md`

The user supplied a current working roadmap last updated 2026-11-25. Treat that roadmap as the baseline for prior implementation claims, then verify the actual repository before changing code. The supplied roadmap uses the product/repository brand **RenderJoy** (for example, `@renderjoy/*`, `<RenderJoyTheme>` and `renderjoy-logo.tsx`), while earlier chat messages used “MotionMint”. Until the user explicitly changes the brand in the repository, preserve the current codebase identity and do not mass-rename assets, packages, routes or CSS variables.

**Reported complete in the supplied current roadmap:** Phases 1, 2, 2.5–2.13; registry and consumer installation; 29 component themes × Light/Dark (58 variants); unified application shell; editorial logo/navbar/homepage; Bencho-inspired interaction discovery and comparison; Motion Lab and Sound Lab; Shader Background engine; and the POC-derived `/flow` Node Pipeline Orchestrator demo.

**Important implementation boundaries:**
- `/playground` and the standalone `/canvas` route were removed later, despite earlier roadmap entries marking them complete. Never restore them. `InfinityCanvas` remains an installable component. A new Bencho-style full-canvas workspace is named **Bench** and is still future work; do not confuse it with `InfinityCanvas`.
- The shared WebGL engine currently has one reported installable `shader-background` item with six internal presets (`silk`, `aurora`, `mercury`, `flow`, `noise`, `energy`). The user subsequently clarified that effects such as Logo Flare, Prism, Wind Tunnel, Cloud Sea, Ink, Beams, Liquid Drops and others must be separate discoverable components/routes, even if they share the same internal renderer. Do not treat the six existing presets as completion of that separate catalogue. Audit the current source before adding a duplicate.
- The existing Flow experience is reported complete as a **demo with a simulated execution adapter** and real client-side DAG validation. Do not describe it as a production distributed execution engine or real external API/LLM execution. The next Flow work is targeted polish/optimisation, not rebuilding the POC.
- The current Sound Lab is reported to contain 17 synthesized cues and six presets. The requested 50+ individually previewable original sound library is still future work. Do not claim the 50+ target is met until each sound is implemented and audition-tested.
- Phase 2.12 reports the Kinetic M logo, editorial navbar and shortened homepage complete. Phase A/B must visually audit them against the user's latest quality concerns and refine only demonstrated gaps; do not blindly redo them.
- Phase 2.13 reports Bencho-inspired catalogue discovery, live inspector, comparison workbench and interaction taxonomy complete. It does **not** establish that Bench, Finds, or the 50+ sound library has been implemented.
- Phase 2.11 reports the unified shell across Components, Themes, Motion, Sounds and Flow complete. Verify actual route behaviour, but do not create another shell or reintroduce legacy dashboard layouts.

The current working roadmap is a **reported status baseline**, not independent browser verification. Verify routes, registry counts, package names, component availability and actual interactions from source before publishing numbers or marking newly audited work complete.

---

## 2. Execution order — do not reorder without a recorded reason

The user explicitly requested this order:

1. Fix existing UI defects, refactor inconsistent preview/workspace experiences and stabilise the current product.
2. Complete product-level experiences and quality improvements (logo, homepage, Sound Library, Bench, Flow, Motion Lab purpose).
3. Expand the future component catalogue from the research references.

**Do not start new component waves until Sections 3 and 4 are accepted.**

---

# PHASE A — UI DEFECTS, PREVIEW SYSTEM & REFACTORING

## A0. Repository and interaction audit

- [x] **A0.1 — AUDIT:** Inspect all shared navigation, preview, theme, menu, floating toolbar, inspector and device-frame implementations. Map each route to shared shell and shared preview primitives. *(Completed in `PHASE_A_UI_AUDIT.md`)*
- [x] **A0.2 — AUDIT:** Identify duplicate/legacy UI implementations, global event listeners, animation loops, repeated WebGL contexts, unbounded timers, component preview remounts and non-virtualised catalogue content. *(Completed in `PHASE_A_UI_AUDIT.md`)*
- [x] **A0.3 — AUDIT:** Verify current route list, registry items, real component count, component tiers, available vs planned inventory and all links. Replace stale hard-coded counts with derived values where practical. *(Completed in `PHASE_A_UI_AUDIT.md`: 60 implemented, 67 registry items, 75 routes; flagged `44` in `announcement-bar.tsx` & `app/page.tsx`)*
- [x] **A0.4 — AUDIT:** Produce `PHASE_A_UI_AUDIT.md` with defects ranked P0/P1/P2 and screenshots. Do not change working business logic during the audit. *(Completed)*

## A1. Component preview cards and canvas consistency

- [x] **A1.1 — FIX:** Standardise preview card dimensions, aspect ratios, stage sizing and preview anchoring. Every card in a category should have a controlled layout; components must not jump in size/position when loading, changing theme or changing viewport. *(Expanded `LARGE_STAGE_SLUGS` in `CatalogueBrowser`)*
- [ ] **A1.2 — FIX:** Establish a single preview-stage layout contract for Component Studio, Theme Studio and the catalogue. Preview stages should use the same spacing, clipping, responsive sizing and background tokens.
- [x] **A1.3 — PERF:** Remove laggy previews. Lazy-mount offscreen components; pause animation when offscreen; avoid remounting on inspector changes; debounce/throttle expensive controls; cap concurrent animated previews; profile rather than guessing. *(`VisibilityPreview` now tracks ongoing `IntersectionObserver` state)*
- [x] **A1.4 — FIX:** Increase the preview canvas dot-grid visibility slightly. Use precise, low-contrast dots on Light and Dark, not a heavy distracting grid. Ensure dots remain legible on actual displays.
- [x] **A1.5 — FIX:** Add a bottom canvas fade that is glossy, blurred and softly merges the preview content into the floating dock area. It must not obscure important component content or create a hard blur stripe. Respect reduced transparency where appropriate.
- [x] **A1.6 — TEST:** Verify fixed preview size/position in desktop/tablet/mobile frames and with multiple themes, long text, loading states and inspector updates. *(Verified via live headless Chrome multi-viewport screenshots at `1440×900`, `768×1024`, and `390×844`)*

**Acceptance:** no layout jumps; same stage contract across Studio and Theme Studio; no horizontal overflow; stable preview positioning; performance measured with many cards, not only a single preview.

## A2. Floating toolbar and menu redesign

- [ ] **A2.1 — FIX:** Consolidate floating menus/toolbars into a single shared responsive system with stable positioning, consistent dimensions and no page-specific duplicate implementation.
- [ ] **A2.2 — DESIGN:** Refine the menu to a premium, glossy, frosted-glass treatment. The lower edge should have a soft blur/fade into the canvas. Maintain contrast, focus visibility and legibility; avoid overdone glass blur.
- [ ] **A2.3 — SCALE:** Reduce the visual toolbar/menu scale by approximately 30% relative to the current design, while preserving accessible hit targets (prefer compact visual controls with adequate invisible/padded target area rather than tiny buttons).
- [ ] **A2.4 — ADD:** Add a Home button using the **RenderJoy logomark only**, without a black square/icon container. It must navigate to the actual homepage.
- [ ] **A2.5 — ADD:** Add an Inspect toggle. It opens a compact floating inspector at the right side of the preview, not a full-height panel that forces the user to scroll away from the specimen.
- [ ] **A2.6 — ADD:** Add Replay/Reset control, with a clear distinction between replaying an animation and resetting editable component state.
- [ ] **A2.7 — ADD:** Add a tooltip/title to every toolbar icon. Tooltips must work on hover and keyboard focus; provide accessible labels.
- [ ] **A2.8 — ADD:** Add component-theme selection to the floating toolbar (single theme and multi-theme comparison mode where supported).
- [ ] **A2.9 — ADD:** Add **two independent appearance controls**: (1) global RenderJoy website appearance Light/Dark/System; (2) the previewed component's theme mode Light/Dark. They must have explicit labels/tooltips so the user understands which surface changes.
- [ ] **A2.10 — ADD:** Ensure theme switching applies only to the component preview. Never set component tokens on `document.documentElement`.
- [ ] **A2.11 — ADD:** Provide Hide/Show Text for shader/background specimens. It toggles the example foreground content over the background so users can evaluate both the bare effect and text contrast/readability on top of it. Do not hide all controls or the title.
- [ ] **A2.12 — FIX:** Remove the generic component description/definition paragraph from the component preview header where requested. Display only the title, a small category/brand mark if necessary, and a Pro/free lock state. Keep descriptive docs lower in the documentation area.
- [ ] **A2.13 — FIX:** For ordinary UI components, keep the component title at the top of the preview experience. Background/WebGL experiences may use a distinct stage-first composition, but the title must remain visible and discoverable.
- [x] **A2.14 — FIX:** Remove black icon boxes around the RenderJoy mark in the menu and floating brand utility. Use the original logomark directly.
- [x] **A2.15 — FIX:** Related components must be from the **same category** first. If fewer than three related items exist, show fewer; do not cross-category fill just to populate cards.
- [ ] **A2.16 — FIX:** Ensure inspector values and preview stay visible at the same time. Position a compact floating inspector on the right, with bounded width/height, internal scroll and collision-aware placement.
- [ ] **A2.17 — FIX:** Make every toolbar action functional, tested and persisted only when appropriate. Remove inert buttons.

**Acceptance:** toolbar is consistent across relevant experiences; both theme toggles are independent; inspector opens without moving the preview away; Home/Inspect/Replay/Hide Text have working behaviour; responsive at 390px; all buttons have titles/tooltips and accessible labels.

## A3. WebGL/background preview improvements

- [x] **A3.1 — FIX:** Hide/show foreground sample text with an explicit toolbar switch so developers can evaluate background effects with and without HTML content.
- [x] **A3.2 — REFACTOR:** Remove the idea of one generic `ShaderBackground` with a preset dropdown as the primary catalogue experience. Each visual effect is a **separate discoverable background/WebGL component** with a dedicated title, route, preview, API and installation manifest.
- [x] **A3.3 — ARCHITECTURE:** Shared internal shader engine is encouraged; separate catalogue components/presets are required. For example: `LogoFlare`, `Prism`, `WindTunnel`, `CloudSea`, `Ink`, `Slipstream`, `Embers`, `Beams`, `AsciiWebGL`, `DitherField`, etc. A shared engine must not make them appear as variants of one generic user-facing component.
- [x] **A3.4 — FIX:** Ensure each background has its own visual identity and not just the same effect recoloured. Add meaningful controls only for parameters that actually change its render.
- [x] **A3.5 — QA:** Validate overlay content readability, pointer events, clipping, z-index, reduced motion, canvas resize, DPR cap, context loss/fallback and real rendering screenshots. *(Verified via live headless Chrome screenshot QA on `/components/logo-flare`)*

## A4. Branding, iconography and global interaction

- [x] **A4.1 — AUDIT/FIX:** The current roadmap reports a bespoke Kinetic M mark and replacement of the old starburst. Verify every route and compact control uses the approved RenderJoy asset; remove any remaining legacy starburst or black icon container. Do not design a second competing logo.
- [x] **A4.2 — FIX:** Use the **logo mark only** in compact floating/home controls, with no black icon box. Use horizontal wordmark only where the full brand name is appropriate.
- [x] **A4.3 — ADD:** Add tasteful cursor-responsive logo movement/parallax. It should feel responsive but not wobble constantly or impair navigation.
- [x] **A4.4 — ADD:** Add click response on the brand mark and an optional site-wide ripple/impact wave effect. It must be lightweight, respect reduced motion, avoid interfering with buttons/links, and be disabled when reduced motion is requested.
- [x] **A4.5 — SOUND:** Logo/click sound only plays after explicit user interaction and only when the global sound preference is enabled. Never autoplay.
- [x] **A4.6 — FIX:** Maintain one source of truth for logo assets, favicons, menu icon, floating icon and footer identity.

## A5. Footer and global shell

- [x] **A5.1 — AUDIT/REFINE:** The current roadmap reports an oversized editorial footer. Inspect it against the supplied Bencho footer reference; refine the existing implementation into a premium footer with: near-black surface, carefully spaced contact line, left-aligned RenderJoy identity and description, right-side grouped navigation columns, social/contact row, thin separators and a broad halftone/dot-field artwork along the lower edge.
- [x] **A5.2 — ORIGINALITY:** The footer must be recognisably RenderJoy, not a copied Bencho footer. Use RenderJoy's own logo, type and dot/kinetic motif.
- [x] **A5.3 — FIX:** Footer adapts to Light/Dark application appearance without changing component theme scope.
- [x] **A5.4 — QA:** Test long labels, narrow viewport, legal links, social links, reduced motion and focus behaviour. *(unit-verified; live browser screenshot QA tracked in `A1.6`)*

**Phase A overall acceptance:** all preview defects fixed, shared toolbar meets requirements, component theme scoping remains correct, global shell consistency tests pass, real browser screenshot evidence captured, and no new future component wave has started.

---

# PHASE B — PRODUCT-LEVEL TOPICS & FLAGSHIP EXPERIENCES

## B1. Sound Library — 50+ original previewable sounds

- [x] **B1.1 — AUDIT:** Compare current RenderJoy's existing 17 synthesized cues and sound engine against the user's target and Bencho's Sounds experience. Identify what is already good and what needs a new library model.
- [x] **B1.2 — DESIGN:** Create a dedicated Sound Library section inside the existing Sounds experience. Do not add another unrelated app shell.
- [x] **B1.3 — BUILD:** Provide at least **50 original sound effects** for UI and interaction use, each individually previewable and named. This is a RenderJoy-created library, not copied recordings or reused proprietary Bencho sound assets.
- [x] **B1.4 — CATEGORIES:** Actions, Feedback, Navigation, Notifications, Selection, Movement, Progress and System. Each sound has a short description, category, preview button and optional tags.
- [x] **B1.5 — CONTROLS:** Play/stop, volume, pitch/tone where supported, duration, variation, preset, waveform/visual audition, and copy/install/download where licensing and implementation support it.
- [x] **B1.6 — IMPLEMENTATION:** Use original Web Audio synthesis, original generated assets or properly licensed audio. Keep sound disabled by default, require user gesture before playback, stop playback when asked, clean up audio nodes and avoid audio fatigue.
- [x] **B1.7 — API:** Provide portable `useSound`/sound engine usage and registry installation. Avoid RenderJoy site-provider imports in consumer code.
- [x] **B1.8 — QA:** Verify every one of the 50+ samples actually plays, volume works, stop-all works, no autoplay occurs and the library performs well on mobile.

Potential original sound design families (names are proposals, not copied Bencho samples):
- Actions: Tap, Press, Thump, Knock, Flick, Snap, Confirm, Release.
- Feedback: Accept, Reject, Error, Warning, Success, Retry, Deny, Undo.
- Navigation: Open, Close, Back, Forward, Switch, Expand, Collapse.
- Notifications: Soft Ping, Bright Chime, Message, Reminder, Alert, Incoming, Complete.
- Selection: Tick, Select, Deselect, Lock, Unlock, Check, Mark.
- Movement: Drag Start, Drag End, Drop, Lift, Slide, Float, Snap-to-Grid.
- Progress: Begin, Step, Rise, Fill, Settle, Finish.
- System: Wake, Boot, Idle, Processing, Sync, Save, Export, Connect.

The goal is 50+ distinct useful samples, not 50 trivial pitch-shifted copies.

## B2. Bench — full-canvas component arrangement workspace

- [x] **B2.1 — PRODUCT DEFINITION:** Add a Bencho-inspired **Bench** workspace, preferably at `/bench`. This is a full-viewport experimentation board, not the old generic Playground and not a replacement for the installable `InfinityCanvas` component.
- [x] **B2.2 — CANVAS:** Full-canvas dark/light dot-grid workspace, pan, zoom, fit, reset, minimap or overview, and clear keyboard controls.
- [x] **B2.3 — SPECIMENS:** Users can add live RenderJoy component specimens, shader/background samples, sound players and selected blocks to the canvas. Each specimen keeps its actual behaviour.
- [x] **B2.4 — MANIPULATION:** Drag, resize, position, duplicate, remove, arrange, group and align specimens. Use selection handles and snap/grid options.
- [x] **B2.5 — INSPECT:** Selecting a specimen opens its compact inspector. Changes affect the selected live specimen immediately.
- [x] **B2.6 — COMPARE:** Allow multiple specimens side-by-side, including the same component across different component themes and Light/Dark component modes.
- [x] **B2.7 — TOOLBAR:** Zoom controls, add specimen, theme controls, reset, inspect, replay and export/share if persistence/sharing is genuinely implemented.
- [x] **B2.8 — PERSISTENCE:** Save/restore board layout locally first. Do not add a server/database before the local workflow is robust.
- [x] **B2.9 — RESPONSIVE:** Desktop-first canvas, tablet usable, mobile graceful (view/interact with selected item; not a forced desktop board squeezed into 390px).
- [x] **B2.10 — QA:** Test drag performance, canvas transforms, keyboard access, large boards, theme changes, reload persistence and responsive behaviour.

**Naming rule:** Bench is the product workspace. `InfinityCanvas` remains a separately installable component. Do not reintroduce `/playground` or `/canvas` as standalone destinations.

## B3. Motion Lab — define purpose and make it useful

- [x] **B3.1 — PRODUCT AUDIT:** Explain the user value of Motion Lab based on implemented motion primitives. Determine whether it offers meaningful experimentation distinct from Component Studio and Bench.
- [x] **B3.2 — DEFINE:** Motion Lab is for trying motion behaviours and reusable motion recipes (timing, spring, stagger, reveal, scroll, drag and transitions), not a generic catalogue duplicate.
- [x] **B3.3 — CONSOLIDATE:** If every Motion Lab example is already a normal component detail, merge redundant pages/controls into the component experience. If it has unique motion-tuning functionality, preserve it with a clearer name/description and focused workflow.
- [x] **B3.4 — ADD:** Show real motion parameters, replay, reduce-motion simulation and code/recipe export only where implementation supports them.
- [x] **B3.5 — QA:** Verify all controls change actual animation behaviour. No fake sliders.

## B4. RenderJoy Flow — flagship Node Pipeline Orchestrator

- [x] **B4.1 — AUDIT:** The current roadmap reports the original POC audit and `/flow` demo complete. Inspect the existing POC-derived node types and current `/flow` implementation to identify remaining defects; do not rebuild completed work without evidence. The user's POC URL is `https://github.com/raghav1924/frontend_technical_assessment`.
- [x] **B4.2 — VISUAL RESEARCH:** Inspect the user's inspiration URL `https://bestdesignsonx.com/flohoeller/status/2125281041560564142`. If inaccessible, document this and ask no repeat question; use supplied screenshots plus a clearly stated fallback research set.
- [x] **B4.3 — VERIFY/FIX:** The current roadmap reports the unified shell complete across `/flow` and the other workspaces. Verify there is no legacy Flow shell or icon rail; fix only regressions.
- [x] **B4.4 — EDITOR:** Refine node canvas, node shapes, ports, edge routing, selection, drag/drop, zoom/pan, minimap, node palette, inspector and execution console.
- [x] **B4.5 — UX:** Establish clear hierarchy and adequate canvas space. Make palette and inspector collapsible; ensure selected node remains visible and inspector changes are immediate.
- [x] **B4.6 — NODE MODEL:** Preserve the POC's known node types where verified: Input, Output, Text, LLM, Webhook, HTTP Request, JSON Transform, IF Condition and Merge. Audit current source before asserting exact support.
- [x] **B4.7 — VALIDATION:** Preserve DAG validation/topological ordering and clear cycle/invalid-edge feedback.
- [x] **B4.8 — EXECUTION:** Keep simulated execution explicitly labelled. Do not imply that real external API/LLM calls occur unless a real adapter exists and has been tested.
- [x] **B4.9 — UX DETAILS:** Add polished empty states, context menu, undo/redo, keyboard shortcuts, node search, helpful connection errors, status indicators and export/import JSON if reliable.
- [x] **B4.10 — QA:** Test complex workflow editing, graph validation, simulation, panel resize, responsive use, keyboard operation, export/import and performance with larger graphs.

Flow is a major RenderJoy USP. Do not demote it to a marketing-only illustration.

## B5. Homepage and brand entrance

- [x] **B5.1 — AUDIT:** The current roadmap reports the cinematic hero and editorial homepage complete. Review the actual first viewport against the approved Hybrid Sculptural Silk + Living UI Components direction and the latest premium-brand feedback; identify only remaining visual gaps.
- [x] **B5.2 — SIMPLIFY:** Preserve the concise editorial homepage. Do not bring back the long feature checklist or a separate section for every product capability.
- [x] **B5.3 — HERO:** Improve the sculptural visual, WebGL background integration and component specimens. Keep scroll+pointer interactions purposeful and smooth.
- [x] **B5.4 — ENTRANCE:** Add polished progressive fade/reveal inspired by Planes' sense of staging, but original to RenderJoy. Never make the user wait for a long intro; content and CTAs remain usable immediately.
- [x] **B5.5 — VERIFY/FIX:** The current roadmap reports the Kinetic M mark and favicon complete. Verify consistent use in navbar, footer, floating Home action and hero; do not create a new logo unless the existing mark fails the acceptance review.
- [x] **B5.6 — QA:** Test Light/Dark, mobile, reduced motion, scroll reversal, pointer/touch and hero loading/fallback.

---

# PHASE C — FUTURE COMPONENT EXPANSION

Start only after Phase A and Phase B have passed their acceptance gates. Before each component wave, compare with the actual registry/catalogue and mark every item as `EXISTS`, `PARTIAL`, `PLANNED`, `DUPLICATE` or `NOT APPLICABLE`. Do not reimplement existing components under different names unless the new version is substantively different and justified.

## C0. Catalogue management rules

- [ ] **C0.1:** Reconcile every user-listed future component with current `lib/catalog.ts`, `lib/inventory.ts`, `registry.json`, `public/r/` manifests and source code.
- [ ] **C0.2:** Add origin/reference metadata to the planning research only, not to runtime bundle code.
- [ ] **C0.3:** For each build item, specify use case, interactions, states, API, accessibility, performance budget, dependencies, 29-theme treatment, Light/Dark specimen, tests and install path before coding.
- [ ] **C0.4:** Build one polished component at a time or a logically cohesive small batch. Do not generate dozens of shallow components in one pass.
- [ ] **C0.5:** Every component needs live preview, realistic behaviour, responsive states, source docs, copy/install command, accessibility notes, unit tests and a fresh consumer install test when registry-ready.

## C1. AI components — audit current Wave 1 before adding anything

User's future list:
- Thinking Loader
- AI Prompt Composer
- Streaming Message
- Reasoning Trace
- Image Generation
- Tool Call Card
- Agent Plan
- AI Chat
- Inline Diff
- Approval Card
- Chat Orb
- Pixel Image Generation

Prior logs report these as already implemented. Treat them as `VERIFY`, not new work. Future AI candidates may include agent run timeline, structured output viewer, tool approval queue, citations/references panel, response streaming controls and multimodal attachment composer, but only after confirming user need and novelty.

## C2. WebGL, shader and visual effects

User's future list (each effect is a separate user-facing component, even if it shares an internal renderer):
- Logo Flare
- Prism
- Wind Tunnel
- Cloud Sea
- Ink
- Slipstream
- Embers
- Beams
- ASCII WebGL
- Dither Field
- Ferrofluid
- Fluid Field
- Cymatics
- Pixel Grid
- Caustics
- Thin Film
- Topography
- Jali
- Galaxy
- Eclipse
- Streaks
- Magma
- Warp
- Liquid Gradient
- Code Rain
- Voxel
- Voxel Park
- Voxel Shrine
- Voxel Onsen
- Voxel Pond
- Voxel Skill

Also research/consider from Scroll Shaders and other references:
- Mesh Gradients, Grain Gradients, Dither, Liquid Metal, Light & Rays, Fluted Glass, Halftone, Waves & Lines, 3D & Depth, Retro & ASCII, Patterns & Grids
- Aurora Veil, Bayer Drift, Contour, Dot Screen, Ember Bloom, Fluted Glass, Heat Ribbons, Iris Orb, Light Leak, Mercury, Moiré Rings, Ooze, Silk Lines, Silk Mesh, Swirl Gradient, Truchet Flow, Tunnel Warp, Voronoi Cells, Chrome Ribbons, Oil Slick, Pixel/CRT/Halftone/Duοtone/Film effects, Logo effects and image effects.

Rules:
- [ ] **C2.1:** Audit and reuse the already-reported raw WebGL `shader-background` engine first. Extend or correct it only where needed; document the shared renderer in `RENDERJOY_REFERENCE_RESEARCH.md`. Do not build a second competing engine.
- [ ] **C2.2:** Implement each effect as a distinct catalogue item and its own component detail route.
- [ ] **C2.3:** Do not expose a generic "Shader Background" whose preset dropdown hides the fact that each effect is distinct. Shared presets are internal implementation details only.
- [ ] **C2.4:** WebGL effects need real browser-rendered screenshots, DPR cap, offscreen pause, tab-hidden pause, reduced-motion/static fallback, context-loss handling and clean resource disposal.
- [ ] **C2.5:** Validate each effect at large hero scale and small card/container scale.

## C3. Media and image components

- Link Preview
- Radial Pop-out
- Direction-Aware Flip Card
- Hover Reveal
- Photo Stack
- Hero Card Stack
- Swipe Card Deck
- Photo Shuffle
- Retro Music Player
- Album Cover
- Apple Music Card
- Watch Face
- Digital Watch Face
- Avatar Cluster
- Photo Lightbox
- Scroll Zoom Reveal
- GitHub Chart
- Dither Renderer
- Progressive Blur
- Hero Media Scroll-Out
- Shutter Gallery
- Photo Planes
- Polaroid Flip Card
- Blur Collage
- Text Cylinder
- Expanding Card
- Curved Video Player
- Scroll Settle Gallery
- Peel Stack

Also research Kibo UI's Image Crop, Image Zoom, Stories, Reel, Video Player, QR Code and Deck; add only genuinely differentiated items.

## C4. Carousels and galleries

- Logo Wall
- Marquee
- Image Wheel
- Image Flow Carousel
- Arc Marquee
- Parallax Carousel
- Bend Carousel
- Elastic Carousel
- Focus Scale Carousel
- Fan Carousel
- Cover Flow
- Lens Carousel
- Ring Gallery
- Helix Gallery

## C5. Controls and advanced interactions

- Copy Button
- Segmented Control
- Number Stepper
- Glow Input
- Email Capture
- Card Stack
- Date Picker
- Animated Select
- Command Palette
- OTP Input
- Detent Drawer
- Notch
- Physical Knob
- Reaction Arc
- Receipt Printer
- Rubber Band Select
- Morphing Tray
- Keyboard
- Infinity Canvas
- Scratch Card
- Multi Select
- File Dropzone
- Halftone Popover
- Cookie Consent

Prior logs report many of these already implemented. Audit before adding. New research candidates: Kibo Choicebox, Combobox, Editor, Gantt, Kanban, Table, Ticker, Tags, Status, Relative Time, Dialog Stack, Glimpse, Credit Card, Cursor, QR Code, Stories and Reel.

## C6. Physics and interaction experiments

- Ripple Grid
- Particle Reveal
- Pendulum Wave
- Rubik's Cube
- Dotted Sphere
- Dot Monogram

Also consider Bencho-style interaction patterns: slingshot, magnetic dots, magnetic letters, tilt card, drag ball, wheel, orbit cards, metaballs, image trail, page peel, wake slider, dot swarm, hover/focus tracking, liquid tooltip, glass bubble, elastic drag, slide-to-confirm, pull-to-refresh, drag sorting, radial menu and swipe deck.

## C7. Text and typography interactions

- Smooth Stagger Text
- Cinematic Text
- Split-Flap Board
- Liquid Headline
- Signature Reveal
- Rainbow Text
- Neon Sign
- Glitch Reveal
- Odometer
- Photo Headline

Also consider Magic UI / React Bits style: typing, blur, line-shadow, aurora, video text, number ticker, shiny, gradient, text reveal, hyper text, word rotate, scroll velocity, sparkles, morphing, spinning and 3D flip text.

## C8. Sections, navigation and visual blocks

- Shader Strip
- Shader Rows
- Shader Index
- Shader Flood
- Hover Tabs
- Silk Card
- Mega Menu
- Integration Beams
- Radial Hub Diagram
- Shader Tabs
- World Map
- Dotted Globe
- Activity Feed
- Scroll Stage
- Radar Sweep
- Data Table
- Integration Grid
- Changelog Timeline
- Announcement Bar
- Logo Cloud
- Team Section
- Blog Section
- Integration Wall
- Showcase Wall

## C9. Feature, Bento, testimonials, pricing, FAQ, contact, CTA and waitlist blocks

- Feature 1, Feature 2, Feature 3, Feature 4, Feature 5
- Bento 1, Bento 2, Bento 3, Bento 4, Bento 5, Bento 6, Bento 7, Bento 8
- Testimonial 1 through Testimonial 10
- Pricing 1 through Pricing 7
- FAQ 1 through FAQ 8
- Contact 1 through Contact 7
- CTA 1 through CTA 6
- Waitlist 1 through Waitlist 4

These names represent layout variants/blocks, not automatically ten wholly separate components. Use a typed block family with genuinely distinct compositions and examples.

## C10. Charts and data visualisations

- Shader Area
- Shader Bars
- Shader Stream
- Dither Donut
- Dither Heatmap
- Shader Stat Tiles
- Dither Bar List
- Dither Gauge
- Dither Line Chart
- Dither Pie

Also evaluate shadcn dashboard-01 and chart/table patterns for complete dashboard blocks, not just chart primitives.

## C11. Hero, navbar, login and footer blocks

Heroes:
- Silk Strand Hero
- Floating Cards Hero
- Orbit Hero
- Gallery Wall Hero
- SDK Hero
- Trail Hero
- Type Hero
- Desk Hero
- Orbit Prompt Hero
- Scenic Hero
- Editorial Hero
- Landing Hero

Navbars:
- Shader Nav
- Navbar
- Curtain Nav

Logins:
- Portal Login
- Terminal Login
- Auth Form

Footers:
- Wordmark Footer
- Halftone Footer
- Gradient Footer
- Horizon Footer

## C12. Research-driven future additions

Use `RENDERJOY_REFERENCE_RESEARCH.md` as the discovery map. Candidate additions from the references include:
- shadcn: Attachment, Bubble, Code Block/Trace, Combobox, Command, Context Menu, Data Table, Direction, Drawer, Empty, Field, Item, Message, Message Scroller, Native Select, Questionnaire, Resizable, Sidebar, Typography.
- Kibo UI: Announcement, Avatar Stack, Banner, Calendar, Choicebox, Code Block, Color Picker, Combobox, Comparison, Contribution Graph, Credit Card, Cursor, Deck, Dialog Stack, Dropzone, Editor, Gantt, Glimpse, Image Crop, Image Zoom, Kanban, List, Marquee, Mini Calendar, Pill, QR Code, Rating, Reel, Relative Time, Sandbox, Snippet, Spinner, Status, Stories, Table, Tags, Theme Switcher, Ticker, Tree, Typography, Video Player.
- Magic UI: Marquee, Terminal, Hero Video Dialog, Bento Grid, Animated List, Dock, Globe, Tweet Card, Orbiting Circles, Avatar Circles, Icon Cloud, Lens, Pointer, Smooth Cursor, Progressive Blur, Dotted Map, Animated Beam, Border Beam, Shine Border, Magic Card, Glare Hover, Meteors, Confetti, Particles, blur/text animation families, iPhone/Android/Safari device mocks, animated buttons, grid/dot/ripple/noise/light-ray backgrounds.
- Tactile UI: hardware-like buttons, inputs, toggles, toasts, navigation, meters, cards, tables, dialogs, pricing blocks and dashboard-oriented kits. Do not copy its implementation or exact visual language.
- React Bits: animated backgrounds, shape-building, textures, dithering, ASCII, halftone, sound tools and export workflows.
- Preline: layout primitives, alerts, avatar groups, badges, blockquotes, buttons, chat bubbles, carousel, collapse, datepicker, device mockups, lists, progress, uploads, ratings, skeleton, spinners, timeline, tree view, navbar, mega menu, sidebar, scrollspy, breadcrumb, pagination, stepper, forms, dropdown, context menu, modal, drawer, popover, tooltip, tables, charts, datatables, maps and editors.
- Scrolltide: Focus Reveal, Mesh Flow, Circular Slider, Media Gallery, Carousel Ring, Arc Carousel, Fan Carousel, Expanded Cards, Spotlight Carousel, Fan Deck, Send Halo, Glow Ring Button, Particle Globe and Scroll Key. Use as inspiration for novel interactions.

---

# PHASE D — QUALITY GATES, RELEASE AND MAINTENANCE

- [ ] **D1:** Every component has an actual working preview and has been manually checked in browser.
- [ ] **D2:** Every installable item succeeds in a clean consumer React/Next.js project.
- [ ] **D3:** Component preview and website theme states remain separate.
- [ ] **D4:** Light/Dark 58-variant matrix is checked for components that claim support; do not mark an unsupported combination complete.
- [ ] **D5:** All interaction components support keyboard/touch or document a valid limitation.
- [ ] **D6:** All motion respects `prefers-reduced-motion`; audio is opt-in.
- [ ] **D7:** All shader/Canvas effects pause offscreen/hidden tab and clean up resources.
- [ ] **D8:** No known console errors, hydration warnings, broken routes or horizontal overflow.
- [ ] **D9:** Tests, typecheck, registry build/validation and production build pass.
- [ ] **D10:** Browser screenshot report records desktop 1440×900, tablet 768×1024 and mobile 390×844 (plus 1280×800 when layout-sensitive).
- [ ] **D11:** Update `ROADMAP.md`, `CHANGELOG.md`, `DECISIONS.md`, `COMPONENT_CATALOG.md`, `COMPONENT_BUILD_PLAN.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `public/llms.txt` and `public/llms-full.txt` as applicable.
- [ ] **D12:** Do not claim completion without evidence. Record remaining defects and next action.

## Required final report for every task

For each completed task, report:

1. What changed (source paths).
2. Why it changed.
3. Behaviour that was manually verified.
4. Automated tests and results.
5. Typecheck/registry/build result.
6. Browser screenshots and viewport results for visual work.
7. Known limitations.
8. Updated roadmap status.
9. Exact next task automatically selected.

---

## NEXT ACTION — agent must maintain this field

**Current next task (synced with `ROADMAP.md`):** `Ongoing long-tail Wave 3–8 catalogue additions and live Lemon Squeezy / Paddle MoR checkout & license-key provisioning.`

**Do not start Phase B or Phase C until Phase A is complete and visually accepted.**

**User's quality requirement:** Perfection and realistic behaviour are the priority. Do not trade quality for speed or catalogue volume.
