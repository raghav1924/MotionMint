# Shader Preset Guide

All 18 presets share the unified renderer and uniform pipeline in `lib/shaders/presets/index.ts`.

## Flagship & Interactive Presets
- **`logo-flare`**: Polar-coordinate volumetric radial beams (`u_rayCount`, `u_glowRadius`, `u_lensStreak`, `u_noiseAmount`, `u_flareOrigin`) with midnight-navy vignette and optional foreground `logo` slot.
- **`liquid-drops`**: Refractive surface-tension droplets with pointer attraction.
- **`ripple`**: Pointer- and click-triggered concentric wave fields using the 4-slot impulse ring buffer.
- **`silk`**, **`liquid-gold`**, **`contour`**, **`mercury`**, **`pastel`**, **`aurora`**, **`flow`**, **`noise`**, **`energy`**, **`fluted-glass`**, **`topography`**, **`prism`**, **`kinetic-torus`**, **`particle-helix`**, **`bio-terrain`**.
