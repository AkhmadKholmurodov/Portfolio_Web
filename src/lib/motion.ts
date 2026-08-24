/** One motion scale for the whole page. Three rules hold it together: 1. */

/** Fast attack, long settle — anything arriving on the page. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Symmetric — anything moving while already visible. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.4,
  /** Every arrival on this site, hero and scroll alike. */
  base: 0.65,
  slow: 1.05,
} as const;

/**
 * Fired when the element is 15% into the viewport — far enough in that the
 * motion is already finishing by the time the reader's eye arrives, and not so
 * far that things are still arriving after you have started reading them.
 */
export const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

/** One distance for everything that arrives, hero and scroll alike. */
export const RISE = 28;

/** Opacity lands at ~65% of the travel. See rule 2. */
export function lead(duration: number, delay = 0) {
  return {
    duration,
    delay,
    ease: EASE_OUT,
    opacity: { duration: duration * 0.65, delay, ease: EASE_OUT },
  };
}
