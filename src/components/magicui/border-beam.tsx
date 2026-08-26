import { cn } from "@/lib/utils";

/**
 * A light travelling around a border. A conic gradient painted into the border
 * box and rotated by an animated `--angle` (registered in `globals.css`, which
 * is what makes it interpolate).
 *
 * The unlit part of the ring used to be `transparent`, which was right while
 * the page was near-black: the gap showed the ground, and the ground was
 * darker than the button, so it read as an edge. On paper the same gap shows
 * *paper* — a one-pixel light line drawn all the way around a dark green pill,
 * which reads as a printing misregistration rather than as a highlight. So the
 * ring now rests at the colour of whatever it is wrapping and only the beam
 * departs from it: `base` is the button's own fill, and the travelling part is
 * one step lighter.
 */
export function BorderBeam({
  className,
  children,
  duration = "5s",
  base = "var(--color-signal)",
  beam = "var(--color-signal-3)",
}: {
  className?: string;
  children: React.ReactNode;
  duration?: string;
  /** The resting colour of the ring. Match it to what is being wrapped. */
  base?: string;
  /** The travelling highlight. One step off `base`, never a second hue. */
  beam?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex rounded-full p-px", className)}
      style={{
        background: `conic-gradient(from var(--angle), ${base} 0%, ${base} 56%, ${beam} 80%, ${beam} 90%, ${base} 100%)`,
        animation: `spin-angle ${duration} linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
