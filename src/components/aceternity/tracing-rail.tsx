"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * A vertical line that draws itself as its section is scrolled. `scaleY` from
 * a transform origin at the top, not `height` — the same read for the
 * compositor's price instead of a layout pass per frame.
 *
 * The value used to be run through a spring. It is scrubbed directly now:
 * Lenis has already smoothed the scroll, so the spring was only adding lag,
 * and a line that keeps travelling after the scroll has stopped is the one
 * thing this page's motion language does not do.
 */
export function TracingRail({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });

  // The head of the line is brightest and fades back into the hairline
  // behind it, so the eye is pulled to the item currently being read.
  const glow = useTransform(scrollYProgress, [0, 0.06, 1], [0, 1, 1]);
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={cn("absolute inset-y-0 w-px", className)}>
      <div className="absolute inset-0 bg-line" />
      {/* Drawing is the animation, so a visitor who declined motion gets the
          line already drawn rather than a rail that never arrives. */}
      {reduced ? (
        <div className="absolute inset-0 bg-linear-to-b from-signal/70 via-signal/25 to-transparent" />
      ) : (
        <motion.div
          style={{ scaleY: scrollYProgress, opacity: glow }}
          className="absolute inset-0 origin-top bg-linear-to-b from-signal/70 via-signal/25 to-transparent"
        />
      )}
    </div>
  );
}
