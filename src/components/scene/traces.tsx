"use client";

import { useEffect, useRef } from "react";
import { PALETTE } from "@/lib/palette";
import { sceneState } from "@/lib/scene-state";
import { topologies, type Topology } from "./topologies";
import { build, pointAt, type Built, type Path } from "./geometry";

/**
 * Canvas wants `rgba(...)` strings; the palette is stored as sRGB integers so
 * that `globals.css` stays the single source of truth for every colour on the
 * site. This is the one conversion, in one place — nothing below writes a
 * channel value by hand.
 */
function rgba(hex: number, alpha: number) {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}

/**
 * Everything in the drawing that is not a pulse is struck in the body ink.
 * It was white, which was correct while the page was near-black and is
 * invisible now that the page is paper: a hairline is a hairline because it is
 * a few percent away from the ground, and on this ground "away" means darker.
 */
const HAIR = PALETTE.ink;

/** Strokes the first `frac` of a path — this is what "drawing itself" is. */
function strokePartial(ctx: CanvasRenderingContext2D, path: Path, frac: number) {
  if (frac <= 0 || path.total === 0) return;
  const target = path.total * Math.min(1, frac);

  ctx.beginPath();
  ctx.moveTo(path.pts[0][0], path.pts[0][1]);

  let acc = 0;
  for (let i = 0; i < path.lens.length; i++) {
    if (acc + path.lens[i] <= target) {
      ctx.lineTo(path.pts[i + 1][0], path.pts[i + 1][1]);
      acc += path.lens[i];
    } else {
      const t = path.lens[i] === 0 ? 0 : (target - acc) / path.lens[i];
      ctx.lineTo(
        path.pts[i][0] + (path.pts[i + 1][0] - path.pts[i][0]) * t,
        path.pts[i][1] + (path.pts[i + 1][1] - path.pts[i][1]) * t,
      );
      break;
    }
  }
  ctx.stroke();
}

/* ------------------------------------------------------------------ *
 * Pulses
 * ------------------------------------------------------------------ */

type Pulse = { edge: number; u: number; speed: number; blockAt: number; fade: number };
type Mark = { x: number; y: number; life: number };

const SPAWN: Record<Topology["flow"], number> = {
  radiate: 1.9,
  forward: 1.35,
  probe: 1.0,
  converge: 1.6,
};

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

/**
 * The background, as a schematic that rewires itself. Canvas 2D rather than
 * WebGL, deliberately.
 */
export function Traces() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // next/font generates the family name, so it cannot be hard-coded here.
    const mono =
      getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim() ||
      "ui-monospace, monospace";

    let w = 0;
    let h = 0;
    let dpr = 1;
    let built: Built[] = [];

    // Declared up here, not next to the frame loop, because `resize()` paints
    // synchronously and `resize()` runs during setup — a `let` further down the
    // effect would still be in its temporal dead zone when `render` read it,
    // which throws and takes the whole React tree down with it.
    let raf = 0;
    let last = performance.now();
    let pointerX = 0;
    let pointerY = 0;

    // Annotated: the initialiser is all 0s and 1s, so TypeScript would infer
    // `(0 | 1)[]` and then refuse the fractional values the cross-fade writes.
    const weights: number[] = topologies.map((_, i) => (i === 0 ? 1 : 0));
    const pulses: Pulse[][] = topologies.map(() => []);
    const timers: number[][] = topologies.map((t) => t.edges.map((_, i) => i * 0.22));
    const marks: Mark[] = [];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      // Capped: this is a hairline drawing, and a 3× backing store on a phone
      // costs three times the fill for detail nobody can resolve.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      built = topologies.map((t) => build(t, w, h));
      // Setting canvas.width wipes the surface, so a resize must repaint in
      // the same turn or the background flickers to nothing while the window
      // is being dragged.
      render(0);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    /**
     * Where the schematic is, as a number between 0 and 1: nothing over the
     * first screen, full strength half a viewport later. It is a property of
     * the scroll position rather than of time, which is why it is separate
     * from the frameloop — under reduced motion there is no frameloop and this
     * still has to be right.
     */
    function setFade() {
      const y = reduced ? window.scrollY : sceneState.scrollY;
      const f = Math.min(1, Math.max(0, (y - h * 0.14) / (h * 0.46)));
      canvas!.style.opacity = f.toFixed(3);
      return f;
    }

    /**
     * One frame, given a time step. Split out from the rAF callback so it can also
     * be called synchronously — at mount and on every resize — which means the
     * schematic is on screen in the same paint as the rest of the page rather than
     * one animation frame later.
     */
    function render(dt: number) {
      if (!sceneState.running && !reduced) {
        // Hidden tab: leave the canvas as it is and burn nothing.
        return;
      }

      // Not a motion decision, so it holds under reduced motion too: the hero
      // has its own background now, and a schematic behind the arch and the
      // ambient field is a third thing competing for one screen.
      if (setFade() < 0.005 && !reduced) {
        ctx!.clearRect(0, 0, w, h);
        return;
      }

      const active = sceneState.targetPhase;
      const narrow = w < 768;
      const showLabels = w >= 1024;

      // Weights cross-fade, which is what makes a switch read as the system
      // being *rewired* rather than as one picture replacing another.
      for (let i = 0; i < weights.length; i++) {
        const target = i === active ? 1 : 0;
        weights[i] = reduced
          ? target
          : weights[i] + (target - weights[i]) * (1 - Math.exp(-3.4 * dt));
      }

      pointerX += (sceneState.pointerX - pointerX) * (1 - Math.exp(-2.4 * dt));
      pointerY += (sceneState.pointerY - pointerY) * (1 - Math.exp(-2.4 * dt));

      ctx!.clearRect(0, 0, w, h);

      const drift = reduced ? 0 : sceneState.progress;

      /* ---- the module grid, one parallax layer back ---- */
      const gridStep = 34;
      const gx = (pointerX * 5) % gridStep;
      const gy = ((-drift * 90 + pointerY * 5) % gridStep + gridStep) % gridStep;
      ctx!.fillStyle = rgba(HAIR, 0.05);
      for (let y = gy - gridStep; y < h + gridStep; y += gridStep) {
        for (let x = gx - gridStep; x < w + gridStep; x += gridStep) {
          ctx!.fillRect(x, y, 1, 1);
        }
      }

      /* ---- the schematic ---- */
      ctx!.save();
      // The schematic is laid out for a wide screen, where it sits to the right of
      // a text column. A phone has no right-hand column, so it is pulled back
      // towards the middle — otherwise two thirds of it is off the edge and the
      // visitor gets an empty background.
      ctx!.translate(
        (narrow ? -w * 0.16 : 0) + pointerX * 14,
        -drift * 30 + pointerY * 10,
      );
      ctx!.lineWidth = 1;
      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";

      for (let ti = 0; ti < topologies.length; ti++) {
        const weight = weights[ti];
        if (weight < 0.012) continue;

        const topo = topologies[ti];
        const geo = built[ti];
        const isActive = ti === active;
        const alpha = weight * (narrow ? 0.6 : 1);

        // Edges draw in as a wave rather than all at once — the stagger is
        // what makes it look routed instead of switched on.
        const n = topo.edges.length;
        for (let ei = 0; ei < n; ei++) {
          const stagger = n > 1 ? (ei / (n - 1)) * 0.35 : 0;
          const f = Math.max(0, Math.min(1, (weight - stagger) / (1 - stagger || 1)));
          if (f <= 0) continue;

          const edge = topo.edges[ei];
          const lit =
            isActive &&
            edge.open === true &&
            pulses[ti].some((p) => p.edge === ei && p.fade > 0);

          ctx!.strokeStyle = lit
            ? rgba(PALETTE.signal, 0.34 * alpha)
            : rgba(HAIR, 0.075 * alpha);
          strokePartial(ctx!, geo.paths[ei], f);
        }

        // Nodes.
        for (let ni = 0; ni < topo.nodes.length; ni++) {
          const node = topo.nodes[ni];
          if (node.kind === "ghost") continue;
          const p = geo.nodes[ni];
          const size = node.kind === "origin" ? 7 : 5;

          ctx!.strokeStyle = rgba(HAIR, 0.15 * alpha);
          if (node.kind === "sink") {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, size / 2, 0, Math.PI * 2);
            ctx!.stroke();
          } else {
            ctx!.strokeRect(p.x - size / 2, p.y - size / 2, size, size);
          }

          if (node.kind === "origin") {
            ctx!.fillStyle = rgba(PALETTE.signal, 0.5 * alpha);
            ctx!.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
          }

          if (showLabels && node.label) {
            // 12.5px, not 10px: the floor applies to type the canvas draws
            // as much as to type the DOM does. A node label is read.
            ctx!.font = `500 12.5px ${mono}`;
            ctx!.textAlign = "center";

            // Knock the trace out from behind the text. A vertical wire running through
            // the middle of a label is the difference between a schematic and a mess,
            // and it is what every real drawing does: the label breaks the line.
            const tw = ctx!.measureText(node.label).width;
            ctx!.clearRect(p.x - tw / 2 - 4, p.y + 8, tw + 8, 16);

            ctx!.fillStyle = rgba(HAIR, 0.2 * alpha);
            ctx!.fillText(node.label, p.x, p.y + 19);
          }
        }

        if (!isActive || reduced) continue;

        /* ---- pulses ---- */
        const interval = SPAWN[topo.flow];
        for (let ei = 0; ei < n; ei++) {
          timers[ti][ei] -= dt;
          if (timers[ti][ei] <= 0) {
            timers[ti][ei] = interval * (0.75 + Math.random() * 0.6);
            const edge = topo.edges[ei];
            pulses[ti].push({
              edge: ei,
              u: 0,
              speed: 0.34 + Math.random() * 0.16,
              // A probe stops where the system says no. The one `open` edge
              // is the finding — it runs the whole way.
              blockAt:
                topo.flow === "probe" && !edge.open
                  ? 0.42 + Math.random() * 0.26
                  : 1.1,
              fade: 1,
            });
          }
        }

        const list = pulses[ti];
        for (let pi = list.length - 1; pi >= 0; pi--) {
          const pulse = list[pi];
          const path = geo.paths[pulse.edge];

          if (pulse.u < pulse.blockAt) {
            pulse.u += pulse.speed * dt;
            if (pulse.u >= pulse.blockAt && pulse.blockAt < 1) {
              const at = pointAt(path, pulse.blockAt);
              marks.push({ x: at[0], y: at[1], life: 1 });
            }
          } else {
            pulse.fade -= dt * 3.2;
          }

          if (pulse.u > 1 || pulse.fade <= 0) {
            list.splice(pi, 1);
            continue;
          }

          const [px, py] = pointAt(path, Math.min(pulse.u, 1));
          const a = 0.85 * pulse.fade * alpha;

          // A short trail: the pulse reads as travelling rather than blinking.
          const [tx, ty] = pointAt(path, Math.max(0, Math.min(pulse.u, 1) - 0.05));
          ctx!.strokeStyle = rgba(PALETTE.signal, a * 0.35);
          ctx!.beginPath();
          ctx!.moveTo(tx, ty);
          ctx!.lineTo(px, py);
          ctx!.stroke();

          ctx!.fillStyle = rgba(PALETTE.signal, a);
          ctx!.beginPath();
          ctx!.arc(px, py, 1.7, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      /* ---- where a probe was refused ---- */
      for (let mi = marks.length - 1; mi >= 0; mi--) {
        const mark = marks[mi];
        mark.life -= dt * 1.1;
        if (mark.life <= 0) {
          marks.splice(mi, 1);
          continue;
        }
        ctx!.strokeStyle = rgba(HAIR, mark.life * 0.38);
        ctx!.beginPath();
        ctx!.moveTo(mark.x - 3, mark.y - 3);
        ctx!.lineTo(mark.x + 3, mark.y + 3);
        ctx!.moveTo(mark.x + 3, mark.y - 3);
        ctx!.lineTo(mark.x - 3, mark.y + 3);
        ctx!.stroke();
      }

      ctx!.restore();

      /* ---- keep the copy column clear ----
         The layout puts prose on the left, so the schematic is faded out
         there. This is the legibility guarantee, and it is a property of the
         composition rather than a value somebody tuned until it looked fine
         on one screen. */
      ctx!.globalCompositeOperation = "destination-in";
      if (narrow) {
        // A phone has text everywhere, so there is no clear side to fade towards. It
        // gets a flat, much lower ceiling instead: the hairlines become almost
        // subliminal and the travelling pulses are the only thing that actually
        // reads.
        ctx!.fillStyle = "rgba(0,0,0,0.5)";
      } else {
        const mask = ctx!.createLinearGradient(0, 0, w, 0);
        mask.addColorStop(0, "rgba(0,0,0,0.18)");
        mask.addColorStop(0.42, "rgba(0,0,0,0.42)");
        mask.addColorStop(0.72, "rgba(0,0,0,0.9)");
        mask.addColorStop(1, "rgba(0,0,0,1)");
        ctx!.fillStyle = mask;
      }
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "source-over";
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      render(dt);
    }

    render(0);
    // Under reduced motion the schematic is a still drawing, so there is no
    // frameloop at all — not a loop repainting the same pixels sixty times a
    // second. `resize` still repaints it, which is the only event that can
    // change it. Scrolling cannot: the hero fade is motion too, and a visitor
    // who asked for none gets the drawing at full strength from the start.
    if (reduced) {
      const onScroll = () => setFade();
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resize);
      };
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}
