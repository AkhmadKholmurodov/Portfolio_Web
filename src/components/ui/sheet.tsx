"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * The mobile menu, on Radix Dialog. Radix is here for the parts that are
 * tedious and easy to get wrong rather than for the visuals: focus trapping,
 * `aria-modal`, restoring focus to the trigger on close, and Escape.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { title: string }) {
  return (
    <DialogPrimitive.Portal>
      {/* A scrim has to be darker than the page it is dimming. `bg-void/70`
          was the page ground at 70% over a near-black page, which read as a
          dim; on paper it is paper over paper. The ink does the job here. */}
      <DialogPrimitive.Overlay
        className="anim-fade data-[state=closed]:anim-fade-out fixed inset-0 z-50 bg-ink-100/30 backdrop-blur-sm"
      />
      <DialogPrimitive.Content
        className={cn(
          // Full-bleed on a phone and a panel from `sm` up. It was capped at
          // `max-w-sm` everywhere, which on a 390px screen is a panel exactly
          // as wide as the screen with a border down the left of it — a seam
          // drawn along an edge that is not there.
          "anim-slide-x data-[state=closed]:anim-slide-x-out",
          "fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-bg/97 backdrop-blur-xl",
          "sm:max-w-sm sm:border-l sm:border-line",
          className,
        )}
        {...props}
      >
        {/* Radix requires an accessible name; the visual header is separate,
            so this stays visually hidden rather than duplicated. */}
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
