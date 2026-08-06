/**
 * The WebGL half of the palette. `globals.css` is the source of truth and
 * states everything in oklch, which neither three.js nor GLSL can parse.
 */
export const PALETTE = {
  void: 0x020305,
  bg: 0x090a0e,
  ink: 0xbcbec2,
  inkDim: 0x585b60,
  signal: 0xf5ad58,
  signal2: 0xdb874a,
  signal3: 0xa6603a,
} as const;

export type PaletteKey = keyof typeof PALETTE;
