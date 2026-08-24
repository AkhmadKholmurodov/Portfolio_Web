import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-mono text-label leading-none tracking-label uppercase transition-colors duration-300 ease-(--ease-out-expo)",
  {
    variants: {
      variant: {
        /** Default: a hairline chip. Carries no meaning beyond grouping. */
        outline: "border-line text-ink-400",
        /** Reserved for things that are genuinely running in production.
         *  Bone, not celadon: the accent means "you can click this", and a
         *  status chip is not clickable. Weight carries the state instead. */
        live: "border-line-hover text-live",
        solid: "border-transparent bg-surface-2 text-ink-300",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "outline", size: "sm" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/**
 * The live dot. It breathes rather than blinks — a blink is what a page does
 * when something is wrong, and this is claiming the opposite.
 */
export function StatusDot({ live }: { live: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        live ? "animate-breathe bg-live" : "bg-idle ring-1 ring-line-hover ring-inset",
      )}
    />
  );
}
