import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about this project's type scale.
 *
 * The scale lives in `@theme` as `--text-lede`, `--text-body`, `--text-ui` and
 * friends, which makes Tailwind emit `text-lede`, `text-body`, `text-ui` … as
 * font-size utilities. tailwind-merge does not read the stylesheet, so it falls
 * back to its default reading of `text-*`: a colour.
 *
 * That is not a cosmetic mismatch. It means `cn("text-ui", "text-ink-500")`
 * looks like two colours competing, so the "loser" — the size — is dropped from
 * the output entirely, and the element silently renders at the inherited 16px.
 * The nav links were doing exactly this. It fails only where a size and a
 * colour meet inside one `cn()` call, which is why it survived this long.
 *
 * Listing the scale here puts these classes in the font-size group, where a
 * size only ever conflicts with another size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["lede", "body", "ui", "stat-label", "label", "caption"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
