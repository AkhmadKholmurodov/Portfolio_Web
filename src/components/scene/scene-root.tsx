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
          rather than flat. The other two are celadon at five and three percent
          — enough that the eye reads depth, far too little to read as colour.
          A page that is one flat value is the thing that makes a light site
          feel like an empty browser window. */}
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
            "radial-gradient(70% 55% at 12% 8%, rgba(37,102,87,0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 88% 96%, rgba(37,102,87,0.03), transparent 72%)",
        }}
      />

      <Traces />

      {/* Vignette — keeps the corners quiet so a headline never competes with
          the busiest part of the schematic. It used to fade to `--color-void`,
          which on paper is a fade to the ground: a no-op painted every frame.
          It settles the corners with celadon instead, which is the same job
          done in the one direction a light page has available. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 52%, rgba(37,102,87,0.07) 100%)",
        }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}
