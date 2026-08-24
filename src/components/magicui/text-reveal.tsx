"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * A paragraph that lights up word by word as it is scrolled through. The usual
 * implementation of this effect gives every word its own scroll-linked motion
 * value.
 */
export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts as the paragraph clears the fold, finishes well before it
    // leaves — the last word should land while it is still comfortably in
    // view, not as it exits the top of the screen.
    offset: ["start 0.9", "start 0.35"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    ref.current?.style.setProperty("--p", String(p));
  });

  // Without JS, or before the first scroll event, the paragraph must already
  // be readable — this is body copy, not decoration. And a visitor who asked
  // for no motion gets it lit from the start rather than at 14% waiting for a
  // scroll that is itself the animation.
  useEffect(() => {
    ref.current?.style.setProperty("--p", reduced ? "1" : "0");
  }, [reduced]);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={cn("text-ink-100", className)}
      style={{ "--n": words.length } as React.CSSProperties}
    >
      {words.map((word, i) => (
        <span
          key={`${i}-${word}`}
          className="word-reveal"
          style={{ "--i": i } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
