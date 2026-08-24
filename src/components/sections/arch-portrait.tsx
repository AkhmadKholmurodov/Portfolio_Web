"use client";

import Image from "next/image";
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

export function ArchPortrait({ portrait }: { portrait: HeroPortrait }) {
  return (
    <div
      data-hero="portrait"
      className="relative w-[min(100%,300px)] min-[980px]:mx-auto min-[980px]:w-[min(100%,398px)]"
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
          src={portrait.src}
          alt=""
          fill
          // The frame is at most 398px wide and never more than half the
          // viewport, so a 40vw hint is generous rather than wasteful.
          sizes="(max-width: 980px) 300px, 40vw"
          priority
          className="object-cover"
          style={{ objectPosition: portrait.focus }}
        />
      </div>

      {/* Two mono lines, hung off the lower-left corner. The one thing the
          picture cannot say by itself: where he is, and on what visa. */}
      <div className="absolute bottom-7 left-0 rounded-xl border border-line bg-surface-2/92 px-4 py-3 min-[980px]:-left-6">
        <p className="flex items-center gap-2 font-mono text-label tracking-label text-ink-200">
          <span className="size-1.5 shrink-0 animate-breathe rounded-full bg-live" />
          {profile.country}
        </p>
        <p className="caption mt-1 font-mono tracking-label">{profile.visa}</p>
      </div>
    </div>
  );
}
