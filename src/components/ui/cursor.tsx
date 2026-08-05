"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch, useReducedMotion } from "@/hooks/use-media";

/**
 * The pointer as a bead of water.
 *
 * Two parts, as before: a hard point that tracks exactly, and a bead that lags
 * behind it on a spring. The lag is the effect — water has mass, so it arrives
 * late and settles, and a bead that tracked the pointer perfectly would just be
 * a circle. Touching something interactive spreads it, and the moment it meets
 * that thing it throws a ripple from the point of contact.
 *
 * Hidden entirely on touch and on reduced motion, and it never replaces the
 * native cursor — it sits on top of it.
 */

type Ripple = { id: number; x: number; y: number };

export function Cursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Heavier and looser than a normal follow spring: this is the difference
  // between a bead of water and a dot with a delay.
  const beadX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.8 });
  const beadY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.8 });

  const disabled = isTouch || reduced;

  const dropRipple = useCallback((px: number, py: number) => {
    const id = performance.now();
    setRipples((current) => [...current.slice(-3), { id, x: px, y: py }]);
  }, []);

  // Tracks the same thing as `active`, but readable inside the listener
  // without being a dependency of it — otherwise every crossing would tear
  // down and rebuild the pointer handler. Written in the handler rather than
  // during render, which is where refs are allowed to be written.
  const activeRef = useRef(false);

  useEffect(() => {
    if (disabled) return;

    const interactive =
      "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const over = !!(e.target as Element | null)?.closest?.(interactive);
      // Only on the crossing, not for every frame spent inside the element.
      if (over && !activeRef.current) dropRipple(e.clientX, e.clientY);
      activeRef.current = over;
      setActive(over);
    }

    function onDown(e: PointerEvent) {
      dropRipple(e.clientX, e.clientY);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled, x, y, dropRipple]);

  if (disabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
      {/* Impact rings. Positioned where contact happened, not where the
          pointer is now — a ripple that followed the cursor would be a halo. */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() =>
            setRipples((current) => current.filter((r) => r.id !== ripple.id))
          }
          className="ripple absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-hover"
        />
      ))}

      <motion.div
        className="absolute h-1 w-1 rounded-full bg-ink-100"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 0.7 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="droplet absolute rounded-full"
        style={{ x: beadX, y: beadY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 28,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.7 }}
      />
    </div>
  );
}
