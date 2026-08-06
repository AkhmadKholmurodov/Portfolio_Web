/**
 * The channel between the scroll system and the WebGL scene. This is a plain
 * mutable object on purpose.
 */
export type Phase = 0 | 1 | 2 | 3 | 4;

type SceneState = {
  progress: number;
  targetPhase: Phase;
  phase: number;
  velocity: number;
  pointerX: number;
  pointerY: number;
  running: boolean;
};

export const sceneState: SceneState = {
  /**
   * Page scroll, 0 at the top and 1 at the bottom. Scrubbed 1:1 by
   * ScrollTrigger, so the camera tracks the scrollbar exactly.
   */
  progress: 0,

  /**
   * Which formation the field should be heading for. Set discretely as sections
   * come into view; the scene damps its way there rather than scrubbing, because
   * a formation that snaps back and forth while you nudge the wheel reads as a
   * bug, not as choreography.
   */
  targetPhase: 0 as Phase,

  /** Where the field actually is. Owned by the scene, written each frame. */
  phase: 0,

  /** Signed scroll velocity in px/frame, damped. Used to stretch the field. */
  velocity: 0,

  /** Pointer in normalised device coords, −1..1. Smoothed by the scene. */
  pointerX: 0,
  pointerY: 0,

  /**
   * False while the tab is hidden or the visitor asked for reduced motion.
   * The scene checks this before doing any work at all, so a backgrounded
   * page costs nothing.
   */
  running: true,
};

/** Reset on route change — a case study page has no formations of its own. */
export function resetSceneState() {
  sceneState.progress = 0;
  sceneState.targetPhase = 0;
  sceneState.velocity = 0;
}
