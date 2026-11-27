import type { RippleImpulse, ShaderInteractionMode } from "./types";

export class InteractionTracker {
  targetMouse = { x: 0.5, y: 0.5 };
  currentMouse = { x: 0.5, y: 0.5 };
  scrollProgress = 0;

  // Fixed-size 4-slot ring buffer to avoid per-frame allocations
  readonly ripples: RippleImpulse[] = [
    { x: 0.5, y: 0.5, startTime: -10, intensity: 0 },
    { x: 0.5, y: 0.5, startTime: -10, intensity: 0 },
    { x: 0.5, y: 0.5, startTime: -10, intensity: 0 },
    { x: 0.5, y: 0.5, startTime: -10, intensity: 0 },
  ];
  private rippleCursor = 0;

  isPointerEnabled(mode: ShaderInteractionMode): boolean {
    return mode === true || mode === "pointer" || mode === "both";
  }

  isScrollEnabled(mode: ShaderInteractionMode, scrollReactive: boolean): boolean {
    return scrollReactive || mode === "scroll" || mode === "both";
  }

  pushRipple(x: number, y: number, elapsed: number, intensity = 1): void {
    const slot = this.ripples[this.rippleCursor];
    slot.x = x;
    slot.y = y;
    slot.startTime = elapsed;
    slot.intensity = intensity;
    this.rippleCursor = (this.rippleCursor + 1) % this.ripples.length;
  }

  stepMouse(smoothing = 0.08): void {
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * smoothing;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * smoothing;
  }
}
