"use client";

import { useEffect } from "react";
import { sceneState } from "@/lib/scene-state";
import { Traces } from "./traces";

/**
 * The page's permanent backdrop. Fixed, behind everything, and deliberately
 * quiet.
 */
export function SceneRoot() {
  useEffect(() => {
    // The canvas is `pointer-events: none`, so it never receives events of
    // its own — the parallax has to come off the window.
    const onPointer = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
    >
      {/* Three washes, none of which should be visible as a gradient.
          The first lifts the top of the page off the ground so it is lit
          rather than flat. The other two are celadon at two and one percent —
          enough that the eye reads depth, far too little to read as colour.
          A page that is one flat value is the thing that makes a dark site
          feel like a switched-off screen. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 82% at 50% -8%, var(--color-bg) 0%, var(--color-void) 64%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 12% 8%, rgba(127,182,164,0.055), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 88% 96%, rgba(127,182,164,0.028), transparent 72%)",
        }}
      />

      <Traces />

      {/* Vignette — keeps the corners quiet so a headline never competes with
          the busiest part of the schematic. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 55%, var(--color-void) 100%)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
