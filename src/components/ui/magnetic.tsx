"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * Wraps a child so it drifts toward the pointer while hovered.
 * No-ops on touch devices and under reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const disabled = isTouch || reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={disabled ? undefined : { x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}
