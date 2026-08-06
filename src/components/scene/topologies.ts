/**
 * One network, five meanings. The background is not decoration that happens to
 * move — it is a schematic, and at every section it is wired into a different
 * real system.
 */

import type { Bias } from "./geometry";

export type NodeKind = "origin" | "service" | "sink" | "ghost";

export type TopoNode = {
  x: number;
  y: number;
  /** Drawn at ~11% white on wide screens only. Legible if you look for it. */
  label?: string;
  kind: NodeKind;
};

export type TopoEdge = {
  from: number;
  to: number;
  /** See `Bias` in geometry.ts. Defaults to a horizontal Z-route. */
  bias?: Bias;
  /** BREAK only: the one path a probe gets through. */
  open?: boolean;
};

export type Flow = "radiate" | "forward" | "probe" | "converge";

export type Topology = {
  key: string;
  nodes: TopoNode[];
  edges: TopoEdge[];
  flow: Flow;
};

/* ------------------------------------------------------------------ *
 * 0 · ORIGIN — the hero
 * ------------------------------------------------------------------ */
const origin: Topology = {
  key: "origin",
  flow: "radiate",
  nodes: [
    { x: 0.78, y: 0.44, kind: "origin" },
    { x: 1.06, y: 0.14, kind: "ghost" },
    { x: 1.06, y: 0.38, kind: "ghost" },
    { x: 1.06, y: 0.68, kind: "ghost" },
    { x: 0.88, y: 1.06, kind: "ghost" },
    { x: 0.58, y: 1.06, kind: "ghost" },
    { x: 0.62, y: -0.06, kind: "ghost" },
    { x: 0.36, y: 0.2, kind: "ghost" },
  ],
  // One corner each, and the first leg chosen so no two traces leave the node
  // along the same line — that is what turns seven wires into a fan.
  edges: [
    { from: 0, to: 1, bias: "lv" },
    { from: 0, to: 2, bias: "lh" },
    { from: 0, to: 3, bias: "lh" },
    { from: 0, to: 4, bias: "lv" },
    { from: 0, to: 5, bias: "lv" },
    { from: 0, to: 6, bias: "lv" },
    { from: 0, to: 7, bias: "lh" },
  ],
};

/* ------------------------------------------------------------------ *
 * 1 · BUILD — a dependency graph
 *
 * Read bottom to top, which is the order the thing is actually built in.
 * ------------------------------------------------------------------ */
const build: Topology = {
  key: "build",
  flow: "forward",
  nodes: [
    { x: 0.58, y: 0.84, label: "schema", kind: "service" },
    { x: 0.74, y: 0.84, label: "api", kind: "service" },
    { x: 0.9, y: 0.84, label: "ui", kind: "service" },
    { x: 0.74, y: 0.58, label: "app", kind: "service" },
    { x: 0.74, y: 0.32, label: "deploy", kind: "service" },
    { x: 1.06, y: 0.32, kind: "ghost" },
  ],
  edges: [
    { from: 0, to: 3, bias: "v" },
    { from: 1, to: 3, bias: "v" },
    { from: 2, to: 3, bias: "v" },
    { from: 3, to: 4, bias: "v" },
    { from: 4, to: 5 },
  ],
};

/* ------------------------------------------------------------------ *
 * 2 · RUN — lowshop.net's channel synchronisation
 *
 * The actual system: one catalogue, one sync job, four places a price has to
 * be true at the same time.
 * ------------------------------------------------------------------ */
const run: Topology = {
  key: "run",
  flow: "forward",
  nodes: [
    { x: 0.48, y: 0.5, label: "catalogue", kind: "service" },
    { x: 0.68, y: 0.5, label: "sync", kind: "origin" },
    { x: 0.92, y: 0.2, label: "lowshop", kind: "sink" },
    { x: 0.92, y: 0.4, label: "coupang", kind: "sink" },
    { x: 0.92, y: 0.6, label: "naver", kind: "sink" },
    { x: 0.92, y: 0.8, label: "toss", kind: "sink" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
  ],
};

/* ------------------------------------------------------------------ *
 * 3 · BREAK — the same system, from the outside
 *
 * Pulses run backwards here: inward, from the edge of the frame towards the
 * core. Most of them stop partway and leave a mark. One edge is `open`, and
 * the pulse that finds it goes all the way through and lights the path amber.
 *
 * Two of the nodes are stubs that connect to nothing — the scans that hit a
 * closed port. They are what makes the picture read as *probing* rather than
 * as traffic.
 * ------------------------------------------------------------------ */
const breakIn: Topology = {
  key: "break",
  flow: "probe",
  nodes: [
    { x: 0.5, y: 0.5, label: "core", kind: "origin" },
    { x: 0.7, y: 0.5, label: "gateway", kind: "service" },
    { x: 0.94, y: 0.22, label: "auth", kind: "sink" },
    { x: 0.94, y: 0.42, label: "upload", kind: "sink" },
    { x: 0.94, y: 0.62, label: "session", kind: "sink" },
    { x: 0.94, y: 0.82, label: "admin", kind: "sink" },
    { x: 1.06, y: 0.08, kind: "ghost" },
    { x: 0.82, y: 0.08, kind: "ghost" },
    { x: 1.06, y: 0.94, kind: "ghost" },
    { x: 0.78, y: 0.94, kind: "ghost" },
  ],
  edges: [
    { from: 1, to: 0 },
    { from: 2, to: 1 },
    // The one that gets through. `upload` is not an accident: unrestricted
    // file upload is the finding he would actually go looking for.
    { from: 3, to: 1, open: true },
    { from: 4, to: 1 },
    { from: 5, to: 1 },
    { from: 6, to: 7 },
    { from: 8, to: 9 },
  ],
};

/* ------------------------------------------------------------------ *
 * 4 · CONVERGE — contact
 * ------------------------------------------------------------------ */
const converge: Topology = {
  key: "converge",
  flow: "converge",
  nodes: [
    { x: 0.74, y: 0.5, kind: "origin" },
    { x: 1.06, y: 0.16, kind: "ghost" },
    { x: 1.06, y: 0.84, kind: "ghost" },
    { x: 0.36, y: 0.12, kind: "ghost" },
    { x: 0.36, y: 0.88, kind: "ghost" },
    { x: 0.6, y: -0.06, kind: "ghost" },
    { x: 0.88, y: 1.06, kind: "ghost" },
  ],
  // The mirror of ORIGIN: same single-corner elbows, arriving instead of
  // leaving. The last thing the page does is gather.
  edges: [
    { from: 1, to: 0, bias: "lh" },
    { from: 2, to: 0, bias: "lh" },
    { from: 3, to: 0, bias: "lv" },
    { from: 4, to: 0, bias: "lv" },
    { from: 5, to: 0, bias: "lv" },
    { from: 6, to: 0, bias: "lv" },
  ],
};

/** Indexed by `sceneState.targetPhase`. */
export const topologies: Topology[] = [origin, build, run, breakIn, converge];
