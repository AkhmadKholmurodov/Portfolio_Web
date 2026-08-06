/**
 * Draws the five topologies to an SVG, at whatever viewport you name.
 *
 * This exists because the schematic is laid out for a wide screen and a wide
 * screen is not always available to look at — a phone, a small laptop, an
 * automated browser that will not resize. It imports the *same* routing code
 * the site runs (`geometry.ts`), so what comes out is what the page draws,
 * not an approximation of it.
 *
 *   npx tsc --outDir .preview --module commonjs --target es2022 \
 *     scripts/preview-schematic.ts src/components/scene/geometry.ts \
 *     src/components/scene/topologies.ts
 *   node .preview/scripts/preview-schematic.js 1440 900 > schematic.svg
 */

import { writeFileSync } from "node:fs";
import { build } from "../src/components/scene/geometry";
import { topologies } from "../src/components/scene/topologies";

const W = Number(process.argv[2] ?? 1440);
const H = Number(process.argv[3] ?? 900);
const OUT = process.argv[4] ?? "schematic.svg";

// The preview is deliberately drawn at higher contrast than the site. On the
// page these hairlines sit at ~5% white, which is correct there and invisible
// in a review — the point of this file is to check *shape*, not opacity.
const LINE = "rgba(255,255,255,0.42)";
const NODE = "rgba(255,255,255,0.65)";
const LABEL = "rgba(255,255,255,0.6)";
const SIGNAL = "#F5AD58";

// A `.json` target dumps the resolved geometry instead of drawing it, for
// rasterising elsewhere — this machine has no SVG renderer installed and a
// picture you cannot look at verifies nothing.
if (OUT.endsWith(".json")) {
  const dump = topologies.map((topo) => {
    const geo = build(topo, W, H);
    return {
      key: topo.key,
      flow: topo.flow,
      paths: geo.paths.map((p, i) => ({ pts: p.pts, open: topo.edges[i].open === true })),
      nodes: topo.nodes.map((n, i) => ({
        x: geo.nodes[i].x,
        y: geo.nodes[i].y,
        kind: n.kind,
        label: n.label ?? null,
      })),
    };
  });
  writeFileSync(OUT, JSON.stringify(dump));
  console.log(`wrote ${OUT} — ${topologies.length} topologies at ${W}×${H}`);
  process.exit(0);
}

const panels = topologies
  .map((topo, index) => {
    const geo = build(topo, W, H);
    const y = index * (H + 40);

    const edges = geo.paths
      .map((path, i) => {
        const d = path.pts
          .map((p, j) => `${j === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
          .join(" ");
        const open = topo.edges[i].open;
        return `<path d="${d}" fill="none" stroke="${open ? SIGNAL : LINE}" stroke-width="1.2"/>`;
      })
      .join("\n    ");

    const nodes = topo.nodes
      .map((node, i) => {
        if (node.kind === "ghost") return "";
        const p = geo.nodes[i];
        const size = node.kind === "origin" ? 8 : 6;
        const shape =
          node.kind === "sink"
            ? `<circle cx="${p.x}" cy="${p.y}" r="${size / 2}" fill="none" stroke="${NODE}"/>`
            : `<rect x="${p.x - size / 2}" y="${p.y - size / 2}" width="${size}" height="${size}" fill="none" stroke="${NODE}"/>`;
        const label = node.label
          ? `<text x="${p.x}" y="${p.y + 19}" fill="${LABEL}" font-family="monospace" font-size="11" text-anchor="middle">${node.label}</text>`
          : "";
        return shape + label;
      })
      .join("\n    ");

    return `  <g transform="translate(0,${y})">
    <rect width="${W}" height="${H}" fill="#050609"/>
    <text x="24" y="34" fill="${SIGNAL}" font-family="monospace" font-size="13">${index} · ${topo.key} · ${topo.flow}</text>
    ${edges}
    ${nodes}
  </g>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${(H + 40) * topologies.length}" viewBox="0 0 ${W} ${(H + 40) * topologies.length}">
<rect width="100%" height="100%" fill="#000"/>
${panels}
</svg>`;

writeFileSync(OUT, svg);
console.log(`wrote ${OUT} — ${topologies.length} topologies at ${W}×${H}`);
