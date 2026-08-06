"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A vertical line that draws itself as its section is scrolled. `scaleY` from
 * a transform origin at the top, not `height` — the same read for the
 * compositor's price instead of a layout pass per frame.
 */
export function TracingRail({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });

  const drawn = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // The head of the line is brightest and fades back into the hairline
  // behind it, so the eye is pulled to the item currently being read.
  const glow = useTransform(drawn, [0, 0.06, 1], [0, 1, 1]);

  return (
    <div ref={ref} className={cn("absolute inset-y-0 w-px", className)}>
      <div className="absolute inset-0 bg-line" />
      <motion.div
        style={{ scaleY: drawn, opacity: glow }}
        className="absolute inset-0 origin-top bg-linear-to-b from-signal/70 via-signal/25 to-transparent"
      />
    </div>
  );
}
