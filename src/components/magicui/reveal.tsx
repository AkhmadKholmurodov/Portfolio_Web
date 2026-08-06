"use client";

import { motion } from "motion/react";
import { DUR, EASE_OUT, VIEWPORT, lead } from "@/lib/motion";

/** The page's one entrance animation. Only `transform` and `opacity` move. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  duration = DUR.base,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section" | "p";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={lead(duration, delay)}
    >
      {children}
    </Comp>
  );
}

/**
 * Staggered children. The parent owns the timing so the items do not each
 * need a hand-counted delay — which is how stagger lists drift out of order
 * the moment one is inserted in the middle.
 */
export function RevealGroup({
  children,
  stagger = 0.07,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR.base, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
