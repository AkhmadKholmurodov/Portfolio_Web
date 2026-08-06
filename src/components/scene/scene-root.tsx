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
      {/* A single soft wash from the top, so the ground is lit rather than
          flat. No coloured haze: the amber on this page belongs to the pulses
          and to state, and a warm gradient across the whole viewport spends
          it on nothing. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 82% at 50% -8%, var(--color-bg) 0%, var(--color-void) 64%)",
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
