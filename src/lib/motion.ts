/**
 * One motion scale for the whole page.
 *
 * Three rules hold it together:
 *
 *   1. Only `transform` and `opacity` animate. Both are composited, so a
 *      reveal costs neither a layout nor a repaint. The blur these reveals
 *      used to animate looked expensive because it *was* — `filter` is
 *      rasterised on the main thread every frame, and the page runs dozens of
 *      reveals plus a scroll-driven sticky stage plus a WebGL loop.
 *
 *   2. Opacity leads, distance follows. A thing is fully visible at roughly
 *      two-thirds of its travel, so it settles into place instead of arriving
 *      at it. This is the whole difference between "it fades up" and "it
 *      feels good", and it is one number.
 *
 *   3. Travel scales with mass. A headline moves further and slower than a
 *      chip, because a uniform 26px on everything is what makes a page read
 *      as generated rather than composed.
 */

/** Fast attack, long settle — anything arriving on the page. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Symmetric — anything moving while already visible. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.72,
  slow: 1.05,
} as const;

/**
 * Reveals fire slightly before the element is centred, so the motion is
 * already finishing by the time the reader's eye gets there. Waiting for a
 * generous margin is what produces the "everything pops in late" feel.
 */
export const VIEWPORT = { once: true, margin: "-8% 0px -14% 0px" } as const;

/** Opacity lands at ~65% of the travel. See rule 2. */
export function lead(duration: number, delay = 0) {
  return {
    duration,
    delay,
    ease: EASE_OUT,
    opacity: { duration: duration * 0.65, delay, ease: EASE_OUT },
  };
}
