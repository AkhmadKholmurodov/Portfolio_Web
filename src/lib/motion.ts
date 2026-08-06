/** One motion scale for the whole page. Three rules hold it together: 1. */

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
