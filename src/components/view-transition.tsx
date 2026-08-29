"use client";

import type { ReactNode } from "react";
import { ViewTransition as ReactViewTransition } from "react";

/**
 * The shared-element morph — the project card's cover growing into the
 * case-study hero when you click it.
 *
 * Two things have to line up. Next.js only wraps a navigation in
 * `document.startViewTransition` when a React `<ViewTransition>` is present in
 * the tree, so the component is what *arms* the morph. The matching
 * `view-transition-name` on both pages is what the browser actually animates
 * between. We set both here: the component to arm, the CSS name to aim.
 *
 * `name` is unique per morph (`cover-<slug>`), so the browser pairs this card's
 * cover with that project's hero and no other. Browsers without the View
 * Transitions API ignore all of it and navigate instantly, as before.
 */
export function CoverMorph({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <ReactViewTransition name={`cover-${slug}`}>{children}</ReactViewTransition>
  );
}
