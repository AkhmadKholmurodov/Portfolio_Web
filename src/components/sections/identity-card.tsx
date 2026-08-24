"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { profile, type HeroPortrait } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * The identity card — the right-hand column of the hero.
 *
 * A dark panel with the cut-out figure standing in it, not a photograph in a
 * frame. The distinction matters: the source portrait is shot on a white
 * studio wall, and a white rectangle on a near-black page is a hole punched in
 * the layout no border radius can repair. The background is gone, so what sits
 * on the panel is the person, at his own colour, which is this site's standing
 * rule for photographs.
 *
 * It stays deliberately quieter than the headline. The type is the argument of
 * this screen; the card is corroboration. That is why it is a third of the
 * width, why the panel is barely lighter than the page, and why the glow is
 * held at a level you notice only if you look for it.
 *
 * The tilt and lift are CSS 3D transforms driven off the pointer. Not
 * `three.js` — a WebGL context to move one photograph ships a renderer to do
 * what `rotate3d` already does on the compositor, and it would spend a frame
 * budget this page gives to the schematic.
 */
export function IdentityCard({ portrait }: { portrait: HeroPortrait }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let rx = 0, ry = 0, lift = 0;
    let trx = 0, try_ = 0, tlift = 0;

    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      trx = -((e.clientY - b.top) / b.height - 0.5) * 9;
      try_ = ((e.clientX - b.left) / b.width - 0.5) * 11;
    };
    const onEnter = () => { tlift = 1; };
    const onLeave = () => { tlift = 0; trx = 0; try_ = 0; };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      // Damped towards the pointer, never locked to it: a flick of the mouse
      // should not snap the card sideways.
      rx += (trx - rx) * 0.09;
      ry += (try_ - ry) * 0.09;
      lift += (tlift - lift) * 0.09;
      card.style.transform =
        `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) ` +
        `translate3d(0, ${(-12 * lift).toFixed(2)}px, 0) scale(${(1 + 0.018 * lift).toFixed(4)})`;
      card.style.boxShadow =
        `0 ${(26 + 40 * lift).toFixed(0)}px ${(58 + 56 * lift).toFixed(0)}px -34px rgba(0,0,0,${(0.7 + 0.22 * lift).toFixed(2)})`;
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
      className="group/id relative hidden select-none md:block"
      style={{ animationDelay: "420ms" }}
    >
      {/* The separation light, well under the threshold of "a glow". */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(127,182,164,0.17), rgba(127,182,164,0.05) 58%, transparent 80%)",
        }}
      />

      <div
        ref={cardRef}
        className={cn(
          "lift-in relative overflow-hidden rounded-[1.75rem] border border-line",
          "bg-surface will-change-transform",
        )}
        style={{ boxShadow: "0 26px 58px -34px rgba(0,0,0,0.7)" }}
      >
        {/* A shallow lift from the top of the panel, so the figure is standing
            in light rather than pasted onto a flat rectangle. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 50% 0%, rgba(127,182,164,0.10), transparent 62%)",
          }}
        />

        <div className="relative aspect-[4/5] w-full">
          <Image
            src={portrait.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 34vw, 400px"
            priority
            className="scale-[1.04] object-contain object-bottom transition-transform duration-700 ease-(--ease-out-expo) group-hover/id:scale-[1.09]"
          />
          {/* The figure runs past the bottom of its box, so without this it is
              sliced clean through the hands. A short scrim reads as depth; a
              hard horizontal cut reads as a mistake. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-surface) 88%, transparent) 62%, var(--color-surface))",
            }}
          />
        </div>

        {/* Identity strip. The one thing the card says that the headline does
            not: that he is available, and from where. */}
        <div className="relative border-t border-line bg-void/50 px-5 py-4">
          <p className="flex items-center gap-2 font-mono text-label tracking-label text-ink-300">
            <span className="size-1.5 shrink-0 animate-breathe rounded-full bg-live" />
            {profile.name}
          </p>
          {/* Credentials rather than the role: the headline says the role in
              celadon 300px to the left, and an identity card repeating it
              verbatim is a caption that adds nothing. */}
          <p className="caption mt-1.5 font-mono tracking-label">
            {profile.country} · {profile.visa}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * The phone version. A 48px badge beside the eyebrow instead of a card —
 * a full-height portrait at the bottom of a 375px hero is 300px of scrolling
 * that pushes the numbers off the screen, and the numbers are the point.
 */
export function IdentityBadge({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="relative inline-flex size-11 shrink-0 overflow-hidden rounded-full border border-line bg-surface md:hidden"
    >
      <Image src={src} alt="" width={320} height={320} className="size-full object-cover" />
    </span>
  );
}
