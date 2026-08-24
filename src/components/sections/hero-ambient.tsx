/**
 * The hero's ambient field — layer 2 of the background.
 *
 * Three masses, one petrol green and two celadon, drifting on cycles of 38,
 * 44 and 33 seconds. Everything about how it looks is in `globals.css` under
 * "Layer 2"; this file only puts the elements on the page and only inside the
 * hero, which is the whole point — the schematic owns the rest of the page and
 * two atmospheres arguing over one screen is what makes a background look
 * generated rather than designed.
 *
 * `<i>` rather than `<div>`: three empty presentational boxes, and the shorter
 * tag keeps the markup honest about how little is here. The parent carries the
 * `aria-hidden`, so none of it reaches the accessibility tree.
 */
export function HeroAmbient() {
  return (
    <div aria-hidden className="ambient">
      <i className="ambient-a" />
      <i className="ambient-b" />
      <i className="ambient-c" />
    </div>
  );
}
