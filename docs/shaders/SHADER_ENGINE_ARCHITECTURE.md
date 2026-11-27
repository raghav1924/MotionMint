# Shader Engine Architecture

The RenderJoy Shader Background engine is a portable, zero-dependency (no Three.js) WebGL 2 / WebGL 1 rendering pipeline organized into six decoupled layers under `lib/shaders/`:

1. **React Component API (`registry/components/shader-background.tsx`)**
   - Drop-in `<ShaderBackground />` wrapper with `aria-hidden="true"` and `pointer-events-none` canvas so foreground HTML remains 100% interactive.
2. **Canvas Lifecycle & Renderer (`lib/shaders/renderer.ts`)**
   - Acquires WebGL 2 (falling back to WebGL 1), creates a full-screen quad buffer, attaches `ResizeObserver`, `IntersectionObserver`, `visibilitychange`, and `webglcontextlost`/`webglcontextrestored` handlers, and cleans up all GPU resources on unmount.
3. **Shader Compiler (`lib/shaders/shader-compiler.ts`)**
   - Compiles vertex and fragment shaders once on mount and releases failed shader/program handles cleanly.
4. **Uniform Manager (`lib/shaders/uniform-manager.ts`)**
   - Caches uniform locations and updates floats, vec2/vec3/vec4 values in-place on prop changes without recompiling GLSL programs.
5. **Interaction Manager (`lib/shaders/interaction-manager.ts`)**
   - Smooths pointer coordinates via exponential interpolation, tracks scroll progress, and maintains a fixed-size 4-slot ring buffer for click/ripple impulses (`u_ripple0..3`) with zero per-frame allocations.
6. **Quality Manager (`lib/shaders/quality-manager.ts`)**
   - Enforces conservative DPR caps (`low: 1`, `balanced: 1.5`, `high: 2`, `auto: 1.25 mobile / 1.5 desktop`) and respects `prefers-reduced-motion` by rendering a single stable frame.
