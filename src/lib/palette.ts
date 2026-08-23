/**
 * The canvas half of the palette. `globals.css` is the source of truth; these
 * are the same colours as sRGB integers, because a canvas context wants
 * `rgba(...)` strings and cannot be handed a CSS custom property.
 *
 * If a value moves in `globals.css` it has to move here in the same commit or
 * the schematic drifts out of the scheme.
 */
export const PALETTE = {
  void: 0x0b100e,
  bg: 0x0f1512,
  ink: 0x9ea8a2,
  inkDim: 0x5a625e,
  signal: 0x7fb6a4,
  signal2: 0x6ba492,
  signal3: 0x4e7d6e,
} as const;

export type PaletteKey = keyof typeof PALETTE;
