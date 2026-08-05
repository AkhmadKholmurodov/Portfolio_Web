"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-media";

/**
 * Water on the glass the page is behind.
 *
 * The layer is invisible until the page moves. Scroll and the beads slide with
 * it — the fast ones near the surface, the slow ones further back — then bleed
 * away as the motion settles, the way water on a window only reads while
 * something is moving past it.
 *
 * It is built from transforms and opacity and nothing else. The obvious way to
 * do wet glass is `backdrop-filter` or an SVG `feDisplacementMap`, and both
 * re-rasterise everything underneath them on every frame; across a whole
 * viewport, during a scroll, on a page that is already running a sticky stage,
 * that is the one thing this must not do. What is left is a light model: each
 * bead is two radial gradients — a highlight where the light enters and a
 * pooled shadow where it leaves — so it reads as refraction without refracting
 * anything.
 *
 * Speed, not position, drives it. Tying opacity to scroll *velocity* means the
 * effect belongs to the gesture rather than to a place on the page, so it can
 * never be sitting there when a reader stops to read.
 */

/** Hand-scattered so the beads never fall into a grid. `depth` is how much of
 *  the scroll each one takes: the near ones run, the far ones drag. */
const DROPS = [
  { x: 6, y: 14, size: 13, depth: 1.15, trail: 34 },
  { x: 17, y: 62, size: 8, depth: 0.72, trail: 20 },
  { x: 24, y: 31, size: 5, depth: 0.45, trail: 0 },
  { x: 33, y: 79, size: 15, depth: 1.3, trail: 42 },
  { x: 41, y: 22, size: 7, depth: 0.6, trail: 16 },
  { x: 48, y: 54, size: 10, depth: 0.95, trail: 26 },
  { x: 56, y: 8, size: 6, depth: 0.5, trail: 0 },
  { x: 63, y: 71, size: 12, depth: 1.05, trail: 30 },
  { x: 71, y: 38, size: 9, depth: 0.82, trail: 22 },
  { x: 78, y: 88, size: 5, depth: 0.42, trail: 0 },
  { x: 84, y: 17, size: 14, depth: 1.22, trail: 38 },
  { x: 91, y: 58, size: 8, depth: 0.68, trail: 18 },
  { x: 96, y: 33, size: 6, depth: 0.55, trail: 14 },
];

/** Scroll speed, in px/s, at which the glass is fully wet. */
const FULL_WET = 2200;

export function WaterGlass() {
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  // Raw velocity is a step function — it snaps to zero the instant a wheel
  // tick ends. The spring is what turns "moving / not moving" into water that
  // runs on and then drains.
  const smooth = useSpring(velocity, {
    stiffness: 55,
    damping: 20,
    mass: 0.6,
  });

  const opacity = useTransform(smooth, (v) =>
    Math.min(Math.abs(v) / FULL_WET, 1) * 0.9,
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
    >
      {DROPS.map((drop, i) => (
        <Drop key={i} drop={drop} velocity={smooth} sheet={opacity} />
      ))}
    </div>
  );
}

function Drop({
  drop,
  velocity,
  sheet,
}: {
  drop: (typeof DROPS)[number];
  velocity: MotionValue<number>;
  sheet: MotionValue<number>;
}) {
  // Beads slide *with* the page, which is what a bead on a moving window does.
  // Clamped, or a flick of the wheel throws them off the screen.
  const y = useTransform(velocity, (v) => {
    const travel = (v / FULL_WET) * 90 * drop.depth;
    return Math.max(-140, Math.min(140, travel));
  });

  // The trail belongs to the run, not to the bead: it stretches out of nothing
  // as the drop picks up speed and is gone the moment it stops.
  const trailScale = useTransform(velocity, (v) =>
    Math.min(Math.abs(v) / FULL_WET, 1),
  );

  return (
    <motion.span
      style={{
        left: `${drop.x}%`,
        top: `${drop.y}%`,
        y,
        opacity: sheet,
      }}
      className="absolute"
    >
      {drop.trail > 0 && (
        <motion.span
          style={{
            width: Math.max(2, drop.size * 0.28),
            height: drop.trail,
            scaleY: trailScale,
            x: "-50%",
          }}
          className="droplet-trail absolute bottom-full left-1/2 origin-bottom rounded-full"
        />
      )}
      <span
        style={{ width: drop.size, height: drop.size * 1.08 }}
        className="droplet block rounded-full"
      />
    </motion.span>
  );
}
