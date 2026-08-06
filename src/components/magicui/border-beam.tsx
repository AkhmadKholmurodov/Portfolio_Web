import { cn } from "@/lib/utils";

/**
 * A light travelling around a border. A conic gradient painted into the border
 * box and rotated by an animated `--angle` (registered in `globals.css`, which
 * is what makes it interpolate).
 */
export function BorderBeam({
  className,
  children,
  duration = "5s",
}: {
  className?: string;
  children: React.ReactNode;
  duration?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex rounded-full p-px", className)}
      style={{
        background: `conic-gradient(from var(--angle), transparent 55%, var(--color-signal-line) 78%, var(--color-signal) 92%, transparent 100%)`,
        animation: `spin-angle ${duration} linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
