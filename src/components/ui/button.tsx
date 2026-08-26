import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui's Button, re-pointed at this site's tokens. The `primary` variant
 * is the only filled-celadon element the design allows, and there is at most one
 * of them on screen at a time.
 *
 * A press used to shrink the button by 1.5% and then, for a while, to do
 * nothing at all — colour was the whole interaction, because on a near-black
 * page a raised button has no shadow to be raised by. Paper gives it one, so
 * the filled and outlined variants now rest on `--shadow-control`, rise two
 * pixels under the pointer, and go flat to the page on `:active`. That last
 * step is the point: press is the one moment the site allows something to move
 * *down*, because a button that does not go back under your finger has not
 * been pressed.
 *
 * `ghost` and `link` stay flat. They are text that happens to be clickable,
 * and a shadow under a word is a badge, not a link.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium outline-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "lift-control bg-signal text-on-signal hover:bg-signal-2",
        // No `backdrop-blur` here, and none on any of the cards either. A backdrop
        // filter forces the compositor to re-read and re-blur everything behind the
        // element every frame, and behind every element on this page is a live WebGL
        // canvas.
        outline:
          "lift-control border border-line bg-surface-2 text-ink-100 hover:border-line-hover",
        ghost:
          "text-ink-500 transition-colors duration-[180ms] ease-(--ease-out-expo) hover:bg-signal-soft hover:text-ink-100",
        link: "h-auto p-0 text-ink-100 underline decoration-line-strong underline-offset-[6px] transition-colors duration-[180ms] ease-(--ease-out-expo) hover:decoration-signal",
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

/**
 * The shape a `lg` button takes when it is one of a stacked, full-width pair
 * on a phone. Two things change and both are load-bearing:
 *
 * `px-5` instead of `px-8`, and `whitespace-normal`. The base button is
 * `whitespace-nowrap`, which is correct — a button is a target, not a
 * paragraph — but a nowrap label sets the element's min-content width, and a
 * grid or flex item's automatic minimum size *is* its min-content width. So
 * Uzbek's "Rezyumeni yuklab olish (PDF)" at `px-8` needed 290px inside a 270px
 * column, pushed the column wide, and gave the whole page a two-pixel
 * horizontal scrollbar at 320px. Padding buys the room; wrapping is the
 * guarantee, so a longer string in some future locale takes a second line
 * rather than the page.
 *
 * `h-auto min-h-13` is what makes that second line survivable — a fixed `h-13`
 * with wrapped text overflows its own pill.
 */
export const buttonStack =
  "h-auto min-h-13 w-full px-5 py-3 whitespace-normal sm:h-13 sm:w-auto sm:px-8 sm:py-0 sm:whitespace-nowrap";

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
