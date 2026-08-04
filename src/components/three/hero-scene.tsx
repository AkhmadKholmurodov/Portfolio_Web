"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

/**
 * The hero backdrop: three orbits, one light on each, going round forever.
 *
 * The previous scene drew a labelled service topology. It was accurate and
 * completely illegible — six node types, tiny captions and drifting particles
 * behind a scrim, which reads as generic "tech sparkles". That is the one
 * thing a portfolio backdrop must not be.
 *
 * This says a single thing instead, and says it without a caption: something
 * is running, and it does not stop. That is the headline — "I build web
 * products end to end, and then I keep them running" — and the first stat,
 * 99.9% uptime, rendered as motion rather than as another label.
 */

const ACCENT = "#B4CDAC";

/** Radius, tilt, angular speed and head size. Negative speed runs backwards. */
const ORBITS = [
  { r: 0.9, tilt: [0.52, 0.2, 0.1], speed: 0.34, head: 0.075 },
  { r: 1.45, tilt: [-0.6, 0.58, -0.22], speed: -0.21, head: 0.062 },
  { r: 2.0, tilt: [0.3, -0.8, 0.42], speed: 0.14, head: 0.05 },
] as const;

/** Points behind the head. The trail is what makes the motion read as speed. */
const TRAIL = 26;

/** Soft radial dot, shared by every light in the scene. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,255,255,0.6)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/**
 * One palette, sampled from the gilding in the portrait beside it. The scene
 * is made of light — additive blending on a near-black page, which is the only
 * background glow actually works on.
 */
const INK = {
  color: new THREE.Color(ACCENT),
  blending: THREE.AdditiveBlending,
  ringOpacity: 0.18,
  headOpacity: 0.95,
  coreOpacity: 0.42,
  coreHalo: 0.95,
  coreDot: 0.16,
};

/** Places a point on a tilted circle. */
function orbitPoint(out: THREE.Vector3, r: number, angle: number, m: THREE.Matrix4) {
  return out.set(Math.cos(angle) * r, 0, Math.sin(angle) * r).applyMatrix4(m);
}

/* ------------------------------------------------------------------ *
 * One orbit: a faint ring, and a head dragging a fading trail.
 * ------------------------------------------------------------------ */
function Orbit({
  spec,
  dot,
  reduced,
  index,
}: {
  spec: (typeof ORBITS)[number];
  dot: THREE.Texture;
  reduced: boolean;
  index: number;
}) {
  const ink = INK;
  const angle = useRef(index * 2.1);
  const scratch = useMemo(() => new THREE.Vector3(), []);

  const matrix = useMemo(
    () =>
      new THREE.Matrix4().makeRotationFromEuler(
        new THREE.Euler(spec.tilt[0], spec.tilt[1], spec.tilt[2]),
      ),
    [spec.tilt],
  );

  const ring = useMemo(() => {
    const segments = 128;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      pts.push(orbitPoint(new THREE.Vector3(), spec.r, (i / segments) * Math.PI * 2, matrix));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [spec.r, matrix]);

  const { geometry, positions } = useMemo(() => {
    const positions = new Float32Array(TRAIL * 3);
    const colors = new Float32Array(TRAIL * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry, positions };
  }, []);

  /** Writes the head and its trail for one angle. */
  const write = useMemo(() => {
    return (a: number) => {
      for (let i = 0; i < TRAIL; i++) {
        // Trail spacing widens with radius so every orbit reads the same length.
        const back = (i / TRAIL) * (2.1 / spec.r);
        orbitPoint(scratch, spec.r, a - Math.sign(spec.speed) * back, matrix);
        positions[i * 3] = scratch.x;
        positions[i * 3 + 1] = scratch.y;
        positions[i * 3 + 2] = scratch.z;
      }
      geometry.getAttribute("position").needsUpdate = true;
    };
  }, [geometry, positions, matrix, scratch, spec.r, spec.speed]);

  // Colour carries the fade: under additive blending a darker point simply
  // contributes less light, which is cheaper than per-point alpha.
  useMemo(() => {
    const colors = geometry.getAttribute("color") as THREE.BufferAttribute;
    for (let i = 0; i < TRAIL; i++) {
      const fade = Math.pow(1 - i / TRAIL, 3);
      colors.setXYZ(i, ink.color.r * fade, ink.color.g * fade, ink.color.b * fade);
    }
    colors.needsUpdate = true;
    // Seeded here too, so the first painted frame is never a cluster at 0,0,0.
    write(angle.current);
  }, [geometry, ink.color, write]);

  useFrame((_, delta) => {
    if (reduced) return;
    angle.current += spec.speed * delta;
    write(angle.current);
  });

  return (
    <group>
      <lineLoop geometry={ring}>
        <lineBasicMaterial
          color={ink.color}
          transparent
          opacity={ink.ringOpacity}
          depthWrite={false}
        />
      </lineLoop>

      <points geometry={geometry}>
        <pointsMaterial
          map={dot}
          size={spec.head}
          sizeAttenuation
          vertexColors
          transparent
          opacity={ink.headOpacity}
          depthWrite={false}
          blending={ink.blending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * The thing being orbited. It breathes rather than pulses, so it never
 * competes with the headline for attention.
 * ------------------------------------------------------------------ */
function Core({ dot, reduced }: { dot: THREE.Texture; reduced: boolean }) {
  const ink = INK;
  const halo = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    if (reduced || !halo.current) return;
    halo.current.scale.setScalar(ink.coreHalo * (1 + Math.sin(state.clock.elapsedTime * 0.55) * 0.08));
  });

  return (
    <group>
      {/* Soft field, then the point itself — no solid geometry, so the centre
          reads as the same kind of thing as the lights going round it. */}
      <sprite ref={halo} scale={ink.coreHalo}>
        <spriteMaterial
          map={dot}
          color={ink.color}
          transparent
          opacity={ink.coreOpacity}
          depthWrite={false}
          blending={ink.blending}
        />
      </sprite>
      <sprite scale={ink.coreDot}>
        <spriteMaterial
          map={dot}
          color={ink.color}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={ink.blending}
        />
      </sprite>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Rig — the whole system leans towards the pointer, very slightly.
 * ------------------------------------------------------------------ */
function Rig({
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
    if (!g) return;

    const drift = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.11) * 0.09;
    const targetY = (parallax ? pointer.x * 0.22 : 0) + drift;
    const targetX = parallax ? -pointer.y * 0.14 : 0;

    // Frame-rate independent damping, so the lean never overshoots.
    const k = 1 - Math.pow(0.001, delta);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 1.1, 10], fov: 38 }}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active && !reduced ? "always" : "demand"}
      // The canvas is decoration; the text underneath carries the meaning.
      aria-hidden
    >
      <SceneBody reduced={reduced} parallax={!isMobile} />
    </Canvas>
  );
}

function SceneBody({ reduced, parallax }: { reduced: boolean; parallax: boolean }) {
  const dot = useDotTexture();

  return (
    <Rig reduced={reduced} parallax={parallax}>
      <Core dot={dot} reduced={reduced} />
      {ORBITS.map((spec, i) => (
        <Orbit key={i} spec={spec} dot={dot} reduced={reduced} index={i} />
      ))}
    </Rig>
  );
}
