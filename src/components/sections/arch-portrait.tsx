"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, type HeroPortrait } from "@/content/profile";

/**
 * The portrait, as a print on the page rather than a photograph in a card.
 *
 * The arch is the whole idea: rounded at the top, square at the base. It is
 * the shape of a niche, and a niche is what a portrait has been hung in for
 * six hundred years — which is why 200px of radius at the top and 26px at the
 * bottom reads as deliberate where a uniform border-radius reads as a rounded
 * rectangle somebody put a face in.
 *
 * The frame carries no border of its own. The hairline is in the ring behind
 * it, offset up and to the right, so the picture has an edge without being
 * boxed — the difference between a print that is mounted and a thumbnail.
 *
 * `object-cover` and a per-image `focus` do the cropping, so replacing the
 * picture is one line in `profile.ts` and does not require the new file to
 * match this one's aspect ratio.
 */

/** Rounded at the top, square at the base. Shared by the frame and its ring. */
const ARCH = "200px 200px 26px 26px";

/** Maximum parallax travel, in pixels. Small enough to feel like weight. */
const TRAVEL = 8;

export function ArchPortrait({ portrait }: { portrait: HeroPortrait }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  /**
   * Two motions, on two elements, so neither has to know about the other.
   *
   * The frame translates with the pointer. The picture inside it scales with
   * scroll. Putting the scale on the media rather than on the frame is this
   * site's standing rule for images: the frame stays a crisp fixed shape and
   * the picture moves inside it, which is also the only version where the
   * arch does not grow out of its column.
   */
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: (() => void)[] = [];

    /* ---- scroll: the picture grows 4% across the hero ---- */
    gsap.registerPlugin(ScrollTrigger);
    const hero = wrap.closest("section");
    if (hero) {
      const tween = gsap.to(img, {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      cleanups.push(() => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    }

    /* ---- pointer: eight pixels, damped, desktop only ---- */
    // A coarse pointer has no hover position to follow, and below 980 the
    // frame is above the text where a parallax would read as a wobble.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 980px)");
    if (fine.matches) {
      let raf = 0;
      let x = 0, y = 0, tx = 0, ty = 0;

      const onMove = (e: PointerEvent) => {
        tx = ((e.clientX / window.innerWidth) * 2 - 1) * TRAVEL;
        ty = ((e.clientY / window.innerHeight) * 2 - 1) * TRAVEL;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const frame = () => {
        raf = requestAnimationFrame(frame);
        // Damped, so the frame lags the pointer instead of being pinned to
        // it. A flick of the mouse should not snap it sideways.
        x += (tx - x) * 0.06;
        y += (ty - y) * 0.06;
        wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      };
      raf = requestAnimationFrame(frame);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      ref={wrapRef}
      data-hero="portrait"
      // 244px on a phone, not 300. At 300 the arch is 370px tall and the
      // frame alone eats 44% of the fold — so a visitor's first screen was a
      // photograph and the name was below it, which is the wrong way round for
      // a page whose headline *is* the name. Centred rather than flush left at
      // every width now: the ring is offset to the right, so a left-aligned
      // frame put an asymmetric composition hard against the page margin.
      className="relative mx-auto w-[min(100%,244px)] will-change-transform min-[420px]:w-[min(100%,272px)] min-[980px]:w-[min(100%,398px)]"
    >
      {/* The offset ring. Same radius, shifted up and right, and stopping
          34px short of the base so it never runs behind the badge. It is the
          only hairline in this composition — the frame itself has none. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 border border-line"
        style={{ inset: "-16px -16px 34px 20px", borderRadius: ARCH }}
      />

      <div
        className="relative aspect-[3/3.7] overflow-hidden bg-surface"
        style={{ borderRadius: ARCH }}
      >
        <Image
          ref={imgRef}
          src={portrait.src}
          alt=""
          fill
          // The frame is at most 398px wide and never more than half the
          // viewport, so a 40vw hint is generous rather than wasteful.
          sizes="(max-width: 980px) 300px, 40vw"
          priority
          className="object-cover will-change-transform"
          style={{ objectPosition: portrait.focus }}
        />
      </div>

      {/* Two mono lines, hung off the lower-left corner. The one thing the
          picture cannot say by itself: where he is, and on what visa. */}
      <div className="absolute bottom-6 -left-3 rounded-xl border border-line bg-surface-2/92 px-3.5 py-2.5 shadow-card min-[980px]:bottom-7 min-[980px]:-left-6 min-[980px]:px-4 min-[980px]:py-3">
        <p className="flex items-center gap-2 font-mono text-label tracking-label text-ink-200">
          <span className="size-1.5 shrink-0 animate-breathe rounded-full bg-live" />
          {profile.country}
        </p>
        <p className="caption mt-1 font-mono tracking-label">{profile.visa}</p>
      </div>
    </div>
  );
}
