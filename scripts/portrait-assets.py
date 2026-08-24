"""
Turns the supplied cut-out portrait into the two assets the hero needs.

The source arrives as a JPEG of a cut-out, which means the transparency is not
transparency at all — it is a checkerboard baked into the pixels, because JPEG
cannot carry an alpha channel. This restores it.

The checkerboard is synthetic, so it is *perfectly* neutral (chroma 0) and
light (luma ~194-205). Nothing photographic is both. The test is that pair, not
brightness alone, and it is still applied through a flood fill from the frame
edge so that anything light and neutral *inside* the figure — a shirt, a
highlight on the tie — is unreachable and survives.

Outputs:
  public/photos/portrait-cutout.webp   full figure, alpha
  public/photos/avatar.webp            square head crop for the mobile badge

Run: python3 scripts/portrait-assets.py <source.jpeg>
"""

import sys
import pathlib
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "portrait-source.jpeg")
OUT = pathlib.Path("public/photos")

src = Image.open(SRC).convert("RGB")
a = np.asarray(src).astype(np.int16)
h, w, _ = a.shape

luma = 0.299 * a[:, :, 0] + 0.587 * a[:, :, 1] + 0.114 * a[:, :, 2]
chroma = a.max(axis=2) - a.min(axis=2)
checker = (luma > 180) & (chroma <= 6)

m = Image.fromarray((checker * 255).astype(np.uint8), "L").copy()
seeds = [(x, y) for x in range(0, w, 4) for y in (0, h - 1) if checker[y, x]]
seeds += [(x, y) for y in range(0, h, 4) for x in (0, w - 1) if checker[y, x]]
for s in seeds:
    if m.getpixel(s) == 255:
        ImageDraw.floodfill(m, s, 128, thresh=0)
bg = np.array(m) == 128
print(f"checkerboard removed: {bg.mean() * 100:.1f}% of the frame")

alpha = Image.fromarray(((~bg) * 255).astype(np.uint8), "L")
# Erode a hair so the checker's light fringe does not survive as a halo, then
# feather so the cut does not read as a sticker.
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))

fig = src.copy()
fig.putalpha(alpha)

ys, xs = np.where(~bg)
fig = fig.crop((int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1))
fig.save(OUT / "portrait-cutout.webp", quality=92, method=6)
print(f"portrait-cutout.webp  {fig.size[0]}x{fig.size[1]}")

# --- avatar: a square around the head, for the phone badge ---
op = np.array(fig.split()[-1]) > 40
cols = np.where(op.any(axis=0))[0]
top = np.where(op.any(axis=1))[0][0]
# Head width is roughly the narrowest run near the top of the figure; take the
# opaque span a little below the crown and square off around its centre.
band = op[top : top + max(int(fig.size[1] * 0.06), 8)]
bandcols = np.where(band.any(axis=0))[0]
cx = int((bandcols.min() + bandcols.max()) / 2) if len(bandcols) else int(fig.size[0] / 2)
side = int(fig.size[1] * 0.30)
box = (max(cx - side // 2, 0), max(top - int(side * 0.10), 0))
box = (box[0], box[1], min(box[0] + side, fig.size[0]), min(box[1] + side, fig.size[1]))
avatar = fig.crop(box).resize((320, 320), Image.LANCZOS)
avatar.save(OUT / "avatar.webp", quality=92, method=6)
print(f"avatar.webp           {avatar.size[0]}x{avatar.size[1]}  crop={box}")
