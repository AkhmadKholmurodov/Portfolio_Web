/**
 * The schematic's geometry, with no canvas and no React anywhere near it. Kept
 * separate from the renderer so it can be run outside a browser — the preview
 * script in `scripts/` imports exactly these functions to draw the five
 * topologies to an SVG, which is how the diagram gets checked at desktop
 * dimensions without needing a desktop-sized window.
 */

import type { Topology } from "./topologies";

/**
 * `h`/`v` are two-corner Z-routes through a mid-point — the tidy choice when
 * several traces run in parallel. `lh`/`lv` are single-corner elbows, for
 * traces that leave one node in different directions.
 */
export type Bias = "h" | "v" | "lh" | "lv";

export type Pt = [number, number];
export type Path = { pts: Pt[]; lens: number[]; total: number };
export type Built = { paths: Path[]; nodes: { x: number; y: number }[] };

/**
 * Orthogonal routing with 45° corners. Two right angles and a chamfer is what
 * a routed trace looks like on a board and what an architecture diagram looks
 * like on a whiteboard.
 */
export function route(a: Pt, b: Pt, bias: Bias = "h"): Pt[] {
  const [ax, ay] = a;
  const [bx, by] = b;

  if (Math.abs(bx - ax) < 1 || Math.abs(by - ay) < 1) return [a, b];

  // Single-corner elbows. A Z-route with a mid-point is right for a bus or a
  // graph — it keeps parallel runs tidy — but it is wrong for anything radial:
  // seven traces each taking a dog-leg around a mid-point read as a maze
  // rather than as lines leaving a point.
  if (bias === "lh") return chamfer([a, [bx, ay], b]);
  if (bias === "lv") return chamfer([a, [ax, by], b]);

  if (bias === "v") {
    const midY = (ay + by) / 2;
    return chamfer([a, [ax, midY], [bx, midY], b]);
  }
  const midX = (ax + bx) / 2;
  return chamfer([a, [midX, ay], [midX, by], b]);
}

export function chamfer(pts: Pt[], size = 16): Pt[] {
  if (pts.length < 3) return pts;
  const out: Pt[] = [pts[0]];

  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const prev = pts[i - 1];
    const next = pts[i + 1];
    const inLen = Math.hypot(p[0] - prev[0], p[1] - prev[1]) || 1;
    const outLen = Math.hypot(next[0] - p[0], next[1] - p[1]) || 1;
    const k = Math.min(size, inLen * 0.45, outLen * 0.45);

    out.push([
      p[0] + ((prev[0] - p[0]) / inLen) * k,
      p[1] + ((prev[1] - p[1]) / inLen) * k,
    ]);
    out.push([
      p[0] + ((next[0] - p[0]) / outLen) * k,
      p[1] + ((next[1] - p[1]) / outLen) * k,
    ]);
  }

  out.push(pts[pts.length - 1]);
  return out;
}

export function measure(pts: Pt[]): Path {
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(l);
    total += l;
  }
  return { pts, lens, total };
}

export function pointAt(path: Path, frac: number): Pt {
  const target = path.total * Math.max(0, Math.min(1, frac));
  let acc = 0;
  for (let i = 0; i < path.lens.length; i++) {
    if (acc + path.lens[i] >= target) {
      const t = path.lens[i] === 0 ? 0 : (target - acc) / path.lens[i];
      return [
        path.pts[i][0] + (path.pts[i + 1][0] - path.pts[i][0]) * t,
        path.pts[i][1] + (path.pts[i + 1][1] - path.pts[i][1]) * t,
      ];
    }
    acc += path.lens[i];
  }
  return path.pts[path.pts.length - 1];
}

/** Normalised topology → pixel geometry for a given viewport. */
export function build(topo: Topology, w: number, h: number): Built {
  const nodes = topo.nodes.map((n) => ({ x: n.x * w, y: n.y * h }));
  const paths = topo.edges.map((e) =>
    measure(
      route(
        [nodes[e.from].x, nodes[e.from].y],
        [nodes[e.to].x, nodes[e.to].y],
        e.bias ?? "h",
      ),
    ),
  );
  return { paths, nodes };
}
