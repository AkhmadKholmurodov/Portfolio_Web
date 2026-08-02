"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  EDGES,
  HOSTILE_EDGE,
  NODE_COLORS,
  NODES,
  nodeIndex,
} from "@/components/three/topology";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

const ACCENT = "#3fd8d1";
const HOSTILE = "#ff6b5e";

/* Shared soft dot, used for node glows and for the packets. */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const nodeVectors = NODES.map((n) => new THREE.Vector3(...n.position));

/* ------------------------------------------------------------------ *
 * Nodes — a solid core, a soft halo, and a scale that reacts to events.
 * ------------------------------------------------------------------ */
function Nodes({
  dot,
  pulses,
  showLabels,
}: {
  dot: THREE.Texture;
  pulses: React.RefObject<Float32Array>;
  showLabels: boolean;
}) {
  const cores = useRef<(THREE.Mesh | null)[]>([]);
  const halos = useRef<(THREE.Sprite | null)[]>([]);

  useFrame((_, delta) => {
    const p = pulses.current;
    for (let i = 0; i < NODES.length; i++) {
      // Every pulse decays back to rest; events top it back up.
      p[i] = Math.max(0, p[i] - delta * 2.2);
      const swell = 1 + p[i] * 0.9;
      cores.current[i]?.scale.setScalar(swell);
      halos.current[i]?.scale.setScalar(NODES[i].size * 5.5 * (1 + p[i] * 0.6));
    }
  });

  return (
    <>
      {NODES.map((node, i) => {
        const color = NODE_COLORS[node.kind];
        return (
          <group key={node.id} position={node.position}>
            <mesh
              ref={(el) => {
                cores.current[i] = el;
              }}
            >
              <octahedronGeometry args={[node.size, 0]} />
              <meshBasicMaterial color={color} />
            </mesh>

            <sprite
              ref={(el) => {
                halos.current[i] = el;
              }}
              scale={node.size * 5.5}
            >
              <spriteMaterial
                map={dot}
                color={color}
                transparent
                opacity={0.55}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </sprite>

            {showLabels && (
              <Html
                center
                position={[0, -node.size - 0.24, 0]}
                style={{ pointerEvents: "none", userSelect: "none" }}
                zIndexRange={[10, 0]}
              >
                <span
                  className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em]"
                  style={{
                    color,
                    // Keeps the tag legible where it crosses a link or a halo.
                    textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                  }}
                >
                  {node.label}
                </span>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Links — static hairlines between connected nodes.
 * ------------------------------------------------------------------ */
function Links() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    for (const edge of EDGES) {
      const a = nodeVectors[nodeIndex.get(edge.from)!];
      const b = nodeVectors[nodeIndex.get(edge.to)!];
      points.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={ACCENT}
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ------------------------------------------------------------------ *
 * Packets — the traffic. Most are ordinary requests travelling an edge;
 * a few are hostile and die at the boundary instead of reaching the app.
 * ------------------------------------------------------------------ */
type Packet = {
  edge: number;
  t: number;
  speed: number;
  hostile: boolean;
};

function Packets({
  dot,
  pulses,
  reduced,
}: {
  dot: THREE.Texture;
  pulses: React.RefObject<Float32Array>;
  reduced: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const { packets, geometry, positions } = useMemo(() => {
    const list: Packet[] = [];

    EDGES.forEach((edge, edgeIdx) => {
      for (let i = 0; i < edge.traffic; i++) {
        list.push({
          edge: edgeIdx,
          t: (i + Math.random()) / edge.traffic,
          speed: 0.16 + Math.random() * 0.14,
          hostile: false,
        });
      }
    });

    // Three attackers on the public edge, spaced so they arrive apart.
    for (let i = 0; i < 3; i++) {
      list.push({
        edge: HOSTILE_EDGE,
        t: i / 3,
        speed: 0.24,
        hostile: true,
      });
    }

    const pos = new Float32Array(list.length * 3);
    const col = new Float32Array(list.length * 3);

    const normal = new THREE.Color(ACCENT);
    const hostile = new THREE.Color(HOSTILE);
    list.forEach((packet, i) => {
      const c = packet.hostile ? hostile : normal;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    return { packets: list, geometry: geo, positions: pos };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Seed the buffer so the first frame is not a cluster at the origin.
  useEffect(() => {
    writePositions(packets, positions, 0);
    geometry.attributes.position.needsUpdate = true;
  }, [packets, positions, geometry]);

  useFrame((_, delta) => {
    if (reduced) return;

    for (const packet of packets) {
      packet.t += packet.speed * delta;

      if (packet.hostile) {
        // Stopped just short of the edge node, then sent back to the start.
        if (packet.t >= 0.88) {
          packet.t = 0;
          pulses.current[nodeIndex.get(EDGES[packet.edge].to)!] = 1;
        }
      } else if (packet.t >= 1) {
        packet.t -= 1;
        pulses.current[nodeIndex.get(EDGES[packet.edge].to)!] = 0.55;
      }
    }

    writePositions(packets, positions, 0);
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={dot}
        size={0.14}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function writePositions(packets: Packet[], out: Float32Array, offset: number) {
  for (let i = 0; i < packets.length; i++) {
    const packet = packets[i];
    const edge = EDGES[packet.edge];
    const a = nodeVectors[nodeIndex.get(edge.from)!];
    const b = nodeVectors[nodeIndex.get(edge.to)!];
    const t = packet.t;

    const j = (offset + i) * 3;
    out[j] = a.x + (b.x - a.x) * t;
    out[j + 1] = a.y + (b.y - a.y) * t;
    out[j + 2] = a.z + (b.z - a.z) * t;
  }
}

/* ------------------------------------------------------------------ *
 * Heartbeat — an uptime ping expanding out of the app node.
 * ------------------------------------------------------------------ */
function Heartbeat({ reduced }: { reduced: boolean }) {
  const ring = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const clock = useRef(0);
  const appPosition = nodeVectors[nodeIndex.get("app")!];

  useFrame((state, delta) => {
    if (reduced || !ring.current || !material.current) return;

    // Face the camera, so the ping reads as a clean circle rather than an
    // ellipse lying at some arbitrary angle.
    ring.current.quaternion.copy(state.camera.quaternion);

    clock.current = (clock.current + delta * 0.34) % 1;
    const t = clock.current;
    ring.current.scale.setScalar(0.25 + t * 3.4);
    // Ease the fade so the ring dissolves rather than snapping off.
    material.current.opacity = (1 - t) * (1 - t) * 0.22;
  });

  return (
    <mesh ref={ring} position={appPosition}>
      <ringGeometry args={[0.44, 0.455, 96]} />
      <meshBasicMaterial
        ref={material}
        color={ACCENT}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * Dust — depth cue behind the graph.
 * ------------------------------------------------------------------ */
function Dust({ count, dot, reduced }: { count: number; dot: THREE.Texture; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (reduced || !points.current) return;
    points.current.rotation.y += delta * 0.012;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={dot}
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={ACCENT}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Rig — the graph drifts rather than spins, so the labels stay readable.
 * ------------------------------------------------------------------ */
function Graph({
  reduced,
  parallax,
  children,
}: {
  reduced: boolean;
  parallax: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || reduced) return;

    const t = state.clock.elapsedTime;
    const targetY = Math.sin(t * 0.2) * 0.26 + (parallax ? pointer.x * 0.22 : 0);
    const targetX = Math.sin(t * 0.15) * 0.1 - (parallax ? pointer.y * 0.16 : 0);

    // Frame-rate independent damping.
    const k = 1 - Math.pow(0.002, delta);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  return <group ref={group}>{children}</group>;
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */
export default function HeroScene({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // Animating traffic while the visitor reads the case studies is pure waste.
  const running = active && !reduced;

  const dot = useMemo(() => makeDotTexture(), []);
  useEffect(() => () => dot.dispose(), [dot]);

  // One decaying pulse per node, written by packet arrivals, read by Nodes.
  const pulses = useRef<Float32Array>(new Float32Array(NODES.length));

  return (
    <Canvas
      camera={{ position: [0, 0, 8.1], fov: 42 }}
      dpr={[1, isMobile ? 1.25 : 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={running ? "always" : "never"}
      // The canvas is decoration; the text underneath carries the meaning.
      aria-hidden
    >
      <Dust count={isMobile ? 200 : 420} dot={dot} reduced={reduced} />

      <Graph reduced={reduced} parallax={!isMobile}>
        <Links />
        <Nodes dot={dot} pulses={pulses} showLabels={!isMobile} />
        <Packets dot={dot} pulses={pulses} reduced={reduced} />
        <Heartbeat reduced={reduced} />
      </Graph>
    </Canvas>
  );
}
