/**
 * The canvas half of the palette. `globals.css` is the source of truth; these
 * are the same colours as sRGB integers, because a canvas context wants
 * `rgba(...)` strings and cannot be handed a CSS custom property.
 *
 * If a value moves in `globals.css` it has to move here in the same commit or
 * the schematic drifts out of the scheme.
 */
export const PALETTE = {
  void: 0xf1f3ee,
  bg: 0xfbfcf9,
  ink: 0x444e49,
  inkDim: 0x99a29d,
  signal: 0x256657,
  signal2: 0x1a4f42,
  signal3: 0x4e8d7b,
} as const;

export type PaletteKey = keyof typeof PALETTE;
