"use client";

import { Children, cloneElement, isValidElement } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DUR, EASE_OUT, VIEWPORT, lead } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 * Reveal — fades a block up as it scrolls into view, once.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={lead(DUR.base, delay)}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ *
 * Stagger — parent/child pair for lists.
 * ------------------------------------------------------------------ */
/**
 * Each item observes the viewport for itself rather than inheriting a variant
 * from the parent.
 *
 * Motion only propagates a parent variant at the moment the parent animates.
 * A child that mounts *afterwards* — which is exactly what happens when the
 * language switches and a translated `key` changes — never receives "show"
 * and stays stuck at opacity 0, leaving a visible container with invisible
 * contents. Self-observing items re-reveal themselves no matter when they
 * mount, so the pattern cannot rot that way again.
 *
 * `Stagger` keeps the shared layout and hands each item its position so the
 * entrance still cascades.
 */
export type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  /** Injected by `Stagger`; drives the cascade delay. */
  index?: number;
  amount?: number;
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) =>
        isValidElement(child) && child.type === StaggerItem
          ? cloneElement(child as React.ReactElement<StaggerItemProps>, {
              index,
              amount,
            })
          : child,
      )}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
  amount = 0.2,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={lead(DUR.base, 0.04 + index * 0.06)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * SplitWords — headline animation, one word at a time.
 *
 * Words stay inside a clipping row so they rise out of nothing. There is no
 * fade: the row already hides the word completely, and cross-fading a masked
 * reveal only softens the edge that makes it read as type being set.
 * ------------------------------------------------------------------ */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: DUR.slow,
              delay: delay + i * stagger,
              ease: EASE_OUT,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
