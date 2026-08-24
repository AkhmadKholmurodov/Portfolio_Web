import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui's Button, re-pointed at this site's tokens. The `primary` variant
 * is the only filled-celadon element the design allows, and there is at most one
 * of them on screen at a time.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium outline-none transition-[background-color,border-color,color,opacity,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-signal text-on-signal hover:bg-signal-2",
        // No `backdrop-blur` here, and none on any of the cards either. A backdrop
        // filter forces the compositor to re-read and re-blur everything behind the
        // element every frame, and behind every element on this page is a live WebGL
        // canvas.
        outline: "border border-line bg-surface/70 text-ink-100 hover:border-line-hover",
        ghost: "text-ink-500 hover:text-ink-100",
        link: "h-auto p-0 text-ink-100 underline decoration-line-strong underline-offset-[6px] hover:decoration-ink-500",
      },
      size: {
        sm: "h-9 px-4 text-ui",
        md: "h-11 px-6 text-ui",
        lg: "h-13 px-8 text-ui",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render as the single child element instead of a <button>. */
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
