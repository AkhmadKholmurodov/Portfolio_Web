import { cn } from "@/lib/utils";

/**
 * A hairline. Horizontal rules on this page are structural, so they get a
 * `role` and not just a border on whatever happens to be next to them.
 */
export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-line",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
