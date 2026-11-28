# ROADMAP_RECONCILIATION.md — Master Roadmap & Playbook Reconciliation

> **Reconciliation Date:** 2026-11-28  
> **Authoritative Source of Truth:** `ROADMAP.md`  
> **Implementation Playbook:** `RENDERJOY_AGENT_ROADMAP.md`  
> **Research Knowledge Base:** `RENDERJOY_REFERENCE_RESEARCH.md`

---

## 1. Document Hierarchy

1. **`ROADMAP.md` (Master Development Roadmap):** Single source of truth for phases, priorities, execution sequence, completion status, and `NEXT ACTION`.
2. **`RENDERJOY_AGENT_ROADMAP.md` (Implementation Playbook):** Detailed engineering subtasks (`A0`–`D12`), testing gates, and QA checklists. Never overrides `ROADMAP.md`.
3. **`RENDERJOY_REFERENCE_RESEARCH.md` (Research Knowledge Base):** External competitive analysis, component inventories, and inspiration links.

---

## 2. Historical Conflicts Reconciled

| # | Conflict / Inconsistency | Verified Repository Evidence | Resolution |
|---|---|---|---|
| 1 | Phase 0 listed `Node Pipeline Orchestrator prototype audit` as `[~]`, while Phase 6 reported it complete. | `ADR-012`, `app/flow/page.tsx`, `registry/flow/`, `lib/flow/`, `tests/flow-orchestrator.test.tsx` (`3/3` passing). | Reconciled Phase 0 item as `[x]` (superseded and completed in Phase 6 via user-supplied POC `raghav1924/frontend_technical_assessment`). |
| 2 | Phase 3 & Phase 2.8 listed `/playground` and `/canvas` routes as `[x]`, while Phase 6 removed them. | `app/playground` and `app/canvas` do not exist; `InfinityCanvas` is an installable component at `registry/components/infinity-canvas.tsx`. | Preserved removal decision (`ADR-012`). Historical entries annotated as superseded; future full-canvas workspace is **Bench** (`/bench`, Priority 2). |
| 3 | `ShaderBackground` has 18 internal presets (`lib/shaders/`), while the user requested separately discoverable background/WebGL components. | `registry/components/shader-background.tsx` + `lib/shaders/presets/index.ts` (`18` presets). | Shared WebGL engine remains the single renderer (`A3.2`–`A3.4` / `C2`), while separate discoverable background routes remain scheduled. |
| 4 | Flow execution capabilities could be overstated. | `components/flow/pipeline-orchestrator.tsx` uses real Kahn's DAG validation + simulated execution adapter. | Explicitly documented and preserved as a simulated-adapter demo (`B4.8`). |
| 5 | Sound Lab has `17` cues vs `50+` target library. | `app/sounds/page.tsx` and `lib/audio/sound-engine.ts` expose `17` synthesized cues. | Marked `50+` Sound Library as incomplete in **Priority 2 (`B1`)**. |
| 6 | Component counts in `AnnouncementBar` and `app/page.tsx` said `44` while `lib/catalog.ts` had `60` implemented items. | Fixed in `components/shell/announcement-bar.tsx` and `app/page.tsx` to derive count dynamically (`60`). | Derived dynamically; verified via `tests/homepage.test.tsx` & `tests/planes-shell.test.tsx`. |

---

## 3. Master Task Reconciliation Table

| Master Task (`ROADMAP.md`) | Status | Agent Subtask (`RENDERJOY_AGENT_ROADMAP.md`) | Priority | Evidence | Next Action |
|---|---|---|---|---|---|
| **Phase 0:** Node Pipeline POC audit | Complete *(Reconciled)* | `B4.1` | — | `ADR-012`, `registry/flow/`, `tests/flow-orchestrator.test.tsx` | None (completed in Phase 6). |
| **Phase A (Priority 1):** A0.1–A0.4 Shared UI Audit | Complete | `A0.1`–`A0.4` | Priority 1 | `PHASE_A_UI_AUDIT.md`, `tests/` (`95/95`) | None. |
| **Phase A (Priority 1):** A1.1, A1.3, A1.4, A1.5, A2.14, A2.15 | Complete *(Needs browser QA)* | `A1.1`, `A1.3`–`A1.5`, `A2.14`–`A2.15` | Priority 1 | `visibility-preview.tsx`, `catalogue-browser.tsx`, `brand-floating-button.tsx`, `component-docs.tsx`, `component-studio.tsx` | Browser screenshot verification in `A1.6`. |
| **Phase A (Priority 1):** A1.2 Shared Preview-Stage Contract | Not started | `A1.2`, `A1.6` | **Critical (Next)** | `ComponentStudio` vs `ThemeStudio` stage divergence in `PHASE_A_UI_AUDIT.md` | Standardise shared preview stage contract across Studio, Theme Studio, and Catalogue. |
| **Phase A (Priority 1):** A2.1–A2.13 FloatingToolbar & Right-Side Floating Inspector | Not started | `A2.1`–`A2.13`, `A2.16`, `A2.17` | **Critical** | `floating-toolbar.tsx`, `component-studio.tsx` | Redesign compact frosted toolbar (30% smaller), Home logomark button, right-side floating Inspector, Replay vs Reset, independent global/component theme controls, Hide/Show Text, and tooltips. |
| **Phase A (Priority 1):** A3.1–A3.5 WebGL/Background Discovery & Polish | In progress | `A3.1`–`A3.5` | High | `lib/shaders/`, `shader-background.tsx` | Add Hide/Show Text toggle and expose distinct background effects as discoverable items/routes. |
| **Phase A (Priority 1):** A4.1–A4.6 & A5.1–A5.4 Brand Motion & Footer | Partial | `A4.1`–`A4.6`, `A5.1`–`A5.4` | High | `brand-floating-button.tsx`, `footer.tsx` | Add cursor-responsive logo motion/click ripple and refine footer halftone motif. |
| **Priority 2:** Sound Library (`50+` sounds) | Not started | `B1.1`–`B1.8` | High | `app/sounds/page.tsx` (`17` cues) | Expand after Priority 1 gate passes. |
| **Priority 2:** Bench (`/bench`) Workspace | Not started | `B2.1`–`B2.10` | High | Not implemented | Build full-canvas experimentation board after Priority 1. |
| **Priority 2:** Motion Lab Purpose & Polish | Not started | `B3.1`–`B3.5` | High | `app/motion/page.tsx` | Refine motion-recipe tuning after Priority 1. |
| **Priority 2:** Flow Orchestrator UI Polish | Not started | `B4.2`–`B4.10` | High | `app/flow/page.tsx`, `components/flow/` | Polish collapsible panels, node UX, and shortcuts. |
| **Priority 2:** Homepage & Brand Entrance | Not started | `B5.1`–`B5.6` | High | `app/page.tsx`, `components/home/` | Refine progressive entrance after Priority 1. |
| **Phase 5 (Priority 3):** `cover-flow-carousel` | Verify (`[?]`) | `C4` | Normal | `registry/components/cover-flow-carousel.tsx`, `lib/catalog.ts`, `public/r/cover-flow-carousel.json` | Visual browser verification (`D1`). |
| **Phase 5 (Priority 3):** Advanced Upload, Payment Success, Animated Charts, Bento Dashboard | Not started | `C10`, `C12` | Normal | `status: "planned"` in `lib/catalog.ts` | Implement after Priority 2. |
| **Phase 7 (Priority 3):** Pro Infrastructure & Launch | Not started | `D2` | Normal | Not implemented | Merchant-of-record research, Pro auth/licensing, launch QA. |
| **Phase 8 & Future Theme Demos (Priority 3):** | Not started | — | Future | Not implemented | Additional themes/blocks + `/themes/[themeId]/demo`. |
| **Phase 2.8 Wave 3–8 (Priority 4):** Future Component Catalogue | Not started | `C0`–`C12` | Future | `COMPONENT_BUILD_PLAN.md`, `lib/inventory.ts` | Begin only after Priorities 1–3 gates pass. |

---

## 4. Prioritized Execution Sequence

1. **Priority 1 — Existing UI Issues & Refactoring (`Phase A`):** `A1.2` → `A2.1`–`A2.13`, `A2.16`–`A2.17` → `A1.6` → `A3.1`–`A3.5` → `A4.3`–`A4.6` → `A5.1`–`A5.4` + browser QA.
2. **Priority 2 — Product Improvements (`Phase B`):** `B1` (50+ Sound Library) → `B2` (Bench `/bench`) → `B3` (Motion Lab) → `B4` (Flow UI Polish) → `B5` (Homepage/Brand Entrance).
3. **Priority 3 — Remaining Master Roadmap Tasks:** `Phase 5` (`cover-flow-carousel` browser QA + remaining 4 Pro items) → `Phase 7` (Pro Infrastructure) → `Phase 8` & `Future Theme Demo Websites`.
4. **Priority 4 — Future Component Catalogue (`Phase C`):** Waves 3–8 from `COMPONENT_BUILD_PLAN.md` & `RENDERJOY_REFERENCE_RESEARCH.md`.

**Exact Next Incomplete Master Task:** `Priority 1 — A1.2 & A2.1–A2.13: Shared preview-stage contract, compact 30%-scaled frosted FloatingToolbar, Home logomark button, right-side floating Inspector, Replay vs Reset, independent global/component appearance toggles, Hide/Show Text, and tooltips.`
