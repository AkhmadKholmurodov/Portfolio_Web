import { cn } from "@/lib/utils";

/**
 * An infinite horizontal strip. The children are rendered twice and the track
 * is translated by exactly -50%, which is what makes the loop seamless — any
 * other distance leaves a visible jump at the wrap.
 */
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-edges-x group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          // Pausing on hover is the difference between a decorative strip and
          // one a reader can actually finish reading.
          "group-hover:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
