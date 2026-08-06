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
  duration = 1600,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
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
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
