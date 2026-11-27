# Writing Custom Shaders

1. Add a new `ShaderPresetId` union member in `lib/shaders/types.ts`.
2. Register its metadata (`id`, `label`, `look`, `description`, `defaultColors`, `index`) in `lib/shaders/presets/index.ts`.
3. Add the corresponding `else if (u_preset == <index>)` branch in `lib/shaders/glsl-source.ts` using aspect-corrected `uv`, `u_time`, `u_mouse`, `u_intensity`, `u_distortion`, and `u_color0..2`.
4. Run `node scripts/validate-registry.mjs` and `vitest run tests/shader-background.test.tsx`.
