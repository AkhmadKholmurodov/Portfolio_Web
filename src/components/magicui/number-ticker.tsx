"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A number that counts up once, when it is first seen. Deliberately *not* a
 * spring.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  grouped = false,
  duration = 1600,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Thousands separators. 2500 unseparated reads as a year, not a count. */
  grouped?: boolean;
  duration?: number;
  className?: string;
}) {
  // Pinned to en-US rather than the visitor's locale: the number is typeset
  // beside a fixed-width mono label and a locale that groups differently
  // would change the glyph count mid-count-up.
  const fmt = (n: number) =>
    grouped
      ? n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : n.toFixed(decimals);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion collapses the ramp to zero rather than short-circuiting to
    // a `setDisplay` here. Same visible result — the number simply appears — but
    // the write still happens inside the rAF callback, so this stays a
    // subscription to an external clock instead of a synchronous setState in an
    // effect body, which is a cascading render.
    const total = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : duration;

    let raf = 0;
    const started = performance.now();

    const step = (now: number) => {
      const t = total === 0 ? 1 : Math.min(1, (now - started) / total);
      // Ease-out quint: most of the distance early, a long quiet settle.
      const eased = 1 - Math.pow(1 - t, 5);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {/* The accessible value is the final one from the first paint — a
          screen reader should never be read a number mid-count. */}
      <span aria-hidden>
        {prefix}
        {fmt(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
