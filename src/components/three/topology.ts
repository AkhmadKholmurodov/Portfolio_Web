/**
 * The hero scene is a picture of the thing this portfolio is about: a request
 * entering a production web platform, being served, and hitting the database —
 * with the delivery and monitoring that keep it up hanging off the side.
 *
 * Every label is a tool that appears in the résumé; nothing here is decoration
 * pretending to be a system.
 */

export type NodeKind = "client" | "edge" | "app" | "service" | "data" | "ops";

export type TopologyNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: NodeKind;
  /** Radius of the solid core, in world units. */
  size: number;
};

/**
 * Laid out to read top-left to bottom-right as a request path, and kept
 * clear of the hero's bottom marquee — labels hang below their node, so the
 * lowest rows need headroom.
 */
export const NODES: TopologyNode[] = [
  { id: "client", label: "CLIENT",   position: [-1.95,  1.95,  0.25], kind: "client",  size: 0.085 },
  { id: "edge",   label: "EDGE",     position: [-0.30,  1.15, -0.50], kind: "edge",    size: 0.11 },
  { id: "ci",     label: "DOCKER",   position: [ 1.95,  1.55,  0.35], kind: "ops",     size: 0.075 },
  { id: "app",    label: "NEXT.JS",  position: [ 0.80,  0.15,  0.55], kind: "app",     size: 0.145 },
  { id: "api",    label: "NODE API", position: [-1.30, -0.30,  0.80], kind: "service", size: 0.095 },
  { id: "py",     label: "FASTAPI",  position: [ 2.05, -0.75, -0.30], kind: "service", size: 0.08 },
  { id: "db",     label: "POSTGRES", position: [ 0.40, -1.65,  0.20], kind: "data",    size: 0.12 },
  { id: "ops",    label: "UPTIME",   position: [-1.95, -1.20, -0.65], kind: "ops",     size: 0.075 },
];

export const nodeIndex = new Map(NODES.map((node, i) => [node.id, i]));

export type TopologyEdge = {
  from: string;
  to: string;
  /** Packets per edge — the hot path carries more traffic than the cold one. */
  traffic: number;
};

export const EDGES: TopologyEdge[] = [
  { from: "client", to: "edge", traffic: 3 },
  { from: "edge", to: "app", traffic: 3 },
  { from: "app", to: "api", traffic: 2 },
  { from: "app", to: "db", traffic: 2 },
  { from: "api", to: "db", traffic: 2 },
  { from: "app", to: "py", traffic: 1 },
  { from: "py", to: "db", traffic: 1 },
  { from: "ci", to: "app", traffic: 1 },
  { from: "ops", to: "api", traffic: 1 },
  { from: "ops", to: "db", traffic: 1 },
];

/** The edge that hostile traffic rides — and never gets past. */
export const HOSTILE_EDGE = 0;

export const NODE_COLORS: Record<NodeKind, string> = {
  client: "#8ad9f5",
  edge: "#8b7bf0",
  app: "#5ff0e6",
  service: "#3fd8d1",
  data: "#7ee6a8",
  ops: "#f5b544",
};
