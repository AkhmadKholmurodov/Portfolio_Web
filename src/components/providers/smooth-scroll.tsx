"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneState, resetSceneState } from "@/lib/scene-state";

/**
 * One scroll engine for the whole site. Lenis and ScrollTrigger both want to
 * be the thing that decides when a frame happens, and running them on separate
 * loops is the classic way to get a page where pinned sections judder a frame
 * behind the content.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sceneState.running = !reduced;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({
        // Long enough to feel like weight, short enough that a flick to the
        // footer does not become a cutscene.
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.9,
        // Touch devices already have momentum in hardware; adding a second
        // one on top makes the page feel like it is on ice.
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Page progress, scrubbed 1:1. The camera reads this, so it has to track
    // the scrollbar exactly — no damping here, the scene damps what it wants.
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        sceneState.progress = self.progress;
        sceneState.velocity = self.getVelocity();
      },
    });

    // A hidden tab still runs rAF in some browsers; the scene checks this
    // flag and skips its whole frame rather than burning battery on a page
    // nobody is looking at.
    const onVisibility = () => {
      sceneState.running = !document.hidden && !reduced;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      progress.kill();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  // A client-side navigation keeps the DOM alive, so nothing tells Lenis or
  // ScrollTrigger that every measurement they hold is now about a different
  // page. Both have to be told.
  useEffect(() => {
    resetSceneState();
    window.scrollTo(0, 0);
    // Layout for the new route lands after paint; refreshing before that
    // measures the outgoing page.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
