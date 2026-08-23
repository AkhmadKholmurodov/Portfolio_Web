"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { HeroPortrait as HeroPortraitConfig } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * The portrait on the first screen, as a print lying on the page.
 *
 * The photograph is used exactly as shot — white studio wall and all. On a
 * near-black page that white is not a defect to be cut away; it is what makes
 * the picture read as a physical object rather than a hole in the layout. The
 * frame, the shadow and the way it moves are what place it.
 *
 * It tilts towards the pointer and lifts on hover. That is CSS 3D transforms,
 * not `three.js` — a WebGL context to move one photograph would ship a
 * renderer to do what `rotate3d` already does on the compositor, and it would
 * cost a frame budget this page spends on the schematic instead.
 *
 * Two rules the interaction follows:
 *   - the tilt is damped towards the pointer, never locked to it, so a flick
 *     of the mouse does not snap the card sideways;
 *   - everything is transform and box-shadow, so nothing here triggers layout.
 */
export function HeroPortrait({ portrait }: { portrait: HeroPortraitConfig }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // current / target, in degrees and pixels
    let rx = 0, ry = 0, lift = 0;
    let trx = 0, try_ = 0, tlift = 0;

    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width - 0.5;
      const py = (e.clientY - b.top) / b.height - 0.5;
      // Inverted on X: pushing the pointer down should tip the top away.
      trx = -py * 11;
      try_ = px * 13;
    };
    const onEnter = () => { tlift = 1; };
    const onLeave = () => { tlift = 0; trx = 0; try_ = 0; };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      rx += (trx - rx) * 0.09;
      ry += (try_ - ry) * 0.09;
      lift += (tlift - lift) * 0.09;

      card.style.transform =
        `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ` +
        `translate3d(0, ${(-14 * lift).toFixed(2)}px, 0) scale(${(1 + 0.022 * lift).toFixed(4)})`;
      card.style.boxShadow =
        `0 ${(28 + 44 * lift).toFixed(0)}px ${(60 + 60 * lift).toFixed(0)}px ` +
        `-32px rgba(0,0,0,${(0.75 + 0.2 * lift).toFixed(2)}), ` +
        `0 0 0 1px rgba(237,233,225,${(0.07 + 0.09 * lift).toFixed(3)})`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group/portrait relative z-0 select-none",
        // Phone: in the flow, right-aligned, under the meta row. Floating it
        // over the type at low opacity was tried and it put a bright white
        // card straight through the résumé button — on a 375px screen there
        // is no free corner to put a photograph in.
        "mt-10 ml-auto w-[62%] max-w-[210px]",
        // From `md` there is a right-hand third to give it, so it leaves the
        // flow and centres itself against the content row.
        "md:absolute md:top-1/2 md:right-0 md:mt-0 md:w-[34%] md:max-w-[300px] md:-translate-y-1/2",
        "lg:w-[38%] lg:max-w-[420px]",
      )}
    >
      {/* The separation light. A white print on a near-black page needs
          somewhere to sit, or it reads as a cut-out hole. Celadon rather than
          white so the glow belongs to the palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl transition-opacity duration-700 group-hover/portrait:opacity-100 md:opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(127,182,164,0.20), rgba(127,182,164,0.06) 58%, transparent 80%)",
        }}
      />

      <div
        ref={cardRef}
        className="lift-in overflow-hidden rounded-[1.75rem] will-change-transform"
        style={{
          animationDelay: "420ms",
          boxShadow:
            "0 28px 60px -32px rgba(0,0,0,0.75), 0 0 0 1px rgba(237,233,225,0.07)",
        }}
      >
        <Image
          src={portrait.src}
          alt=""
          width={portrait.width}
          height={portrait.height}
          sizes="(max-width: 768px) 52vw, (max-width: 1024px) 34vw, 420px"
          priority
          className="h-auto w-full origin-center scale-[1.02] transition-transform duration-700 ease-(--ease-out-expo) group-hover/portrait:scale-[1.075]"
        />
      </div>
    </div>
  );
}
