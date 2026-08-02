"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite ticker. The track holds the items twice and translates by -50%,
 * so the loop point is invisible. Pauses on hover.
 */
export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: readonly string[];
  className?: string;
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className={cn("group relative overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max animate-[marquee_42s_linear_infinite] items-center gap-3 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            // The first copy is the real content; the second is decorative.
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-ink-500"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/45" />
          </span>
        ))}
      </div>
    </div>
  );
}
