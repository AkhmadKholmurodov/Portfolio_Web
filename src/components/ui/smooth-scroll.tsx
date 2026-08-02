"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-media";

/**
 * Lenis inertial scrolling. Opt-out under reduced-motion, where the native
 * scroll is the correct behaviour rather than a downgrade.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis or they fight the animation.
    function onClick(e: MouseEvent) {
      const anchor = (e.target as Element | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.replaceState(null, "", hash);
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
