"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-media";
import { DUR, EASE_OUT, RISE, VIEWPORT, lead } from "@/lib/motion";

/**
 * These animate from inline styles, which no stylesheet can override — the
 * `prefers-reduced-motion` block in `globals.css` cannot reach them. So every
 * component here asks directly, and when the answer is yes it renders the
 * finished element and no motion component at all: not a faster reveal, no
 * reveal. The page is the same page with the arriving taken out of it.
 */

/** The page's one entrance animation. Only `transform` and `opacity` move. */
export function Reveal({
  children,
  delay = 0,
  y = RISE,
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
  const reduced = useReducedMotion();
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

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
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

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
  y = RISE,
  className,
}: {
  children: React.ReactNode;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

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
