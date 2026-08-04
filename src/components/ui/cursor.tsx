"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-media";

/**
 * Two-part cursor: a hard dot that tracks exactly, and a lagging ring that
 * grows over interactive elements. Hidden entirely on touch / reduced-motion,
 * and it never replaces the native cursor — it sits on top of it.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

export function Cursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  const disabled = isTouch || reduced;

  useEffect(() => {
    if (disabled) return;

    const interactive = "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setActive(!!(e.target as Element | null)?.closest?.(interactive));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled, x, y]);

  if (disabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-ink-100"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.22, ease: EASE }}
      />
      {/* The ring is the same neutral hairline the page uses everywhere else,
          so the pointer reads as a light source rather than as a coloured
          object floating over the design. */}
      <motion.div
        className="absolute rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 42 : 24,
          height: active ? 42 : 24,
          opacity: visible ? (active ? 1 : 0.5) : 0,
          borderColor: active ? "var(--line-hover)" : "var(--line-strong)",
          backgroundColor: active ? "var(--tint-hover)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
      />
    </div>
  );
}
