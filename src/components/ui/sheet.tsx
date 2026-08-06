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
      <DialogPrimitive.Overlay className="anim-fade fixed inset-0 z-50 bg-void/70 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "anim-slide-x fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-bg/95 backdrop-blur-xl",
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
