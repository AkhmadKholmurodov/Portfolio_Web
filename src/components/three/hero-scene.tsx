"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createBlobMaterial } from "@/components/three/blob-material";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media";

const ACCENT = "#3fd8d1";
const ACCENT_2 = "#7c62e8";

/* ------------------------------------------------------------------ *
 * The blob — sphere displaced by simplex noise in the vertex shader.
 * ------------------------------------------------------------------ */
function Blob({ detail, reduced }: { detail: number; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const { material, uniforms } = useMemo(
    () => createBlobMaterial({ a: "#0d3a48", b: ACCENT_2, rim: ACCENT }),
    [],
  );

  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.32, detail),
    [detail],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (reduced) return;
    uniforms.uTime.value += delta;

    if (group.current) {
      group.current.rotation.y += delta * 0.14;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.14;
      // Slow breath so the silhouette is never perfectly still.
      const breath = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.028;
      group.current.scale.setScalar(breath);
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}

/* Larger wireframe shell rotating the other way. */
function Shell({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduced || !mesh.current) return;
    mesh.current.rotation.y -= delta * 0.06;
    mesh.current.rotation.x += delta * 0.022;
  });

  return (
    <mesh ref={mesh} scale={2.15}>
      <icosahedronGeometry args={[1, 3]} />
      <meshBasicMaterial
        color={ACCENT}
        wireframe
        transparent
        opacity={0.07}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * Dust — points scattered in a shell around the blob.
 * ------------------------------------------------------------------ */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Dust({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  const { geometry, texture } = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Shell, not a ball — nothing should spawn inside the blob.
      const radius = 2.4 + Math.random() * 5.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.68;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, texture: makeDotTexture() };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      texture.dispose();
    };
  }, [geometry, texture]);

  useFrame((state, delta) => {
    if (reduced || !points.current) return;
    points.current.rotation.y += delta * 0.04;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={texture}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={ACCENT}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * Pointer parallax — the camera drifts, the blob stays put.
 * ------------------------------------------------------------------ */
function Rig({ enabled }: { enabled: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    if (!enabled) return;
    // Frame-rate independent damping.
    const k = 1 - Math.pow(0.0015, delta);
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * k;
    camera.position.y += (pointer.y * 0.6 - camera.position.y) * k;
    camera.lookAt(target);
  });

  return null;
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */
export default function HeroScene({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // Rendering a displaced 20k-vertex mesh every frame while the visitor is
  // reading the case studies is pure waste — and on integrated graphics it
  // is the difference between a smooth page and a hot laptop.
  const running = active && !reduced;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, isMobile ? 1.25 : 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={running ? "always" : "never"}
      // The canvas is decoration; the text underneath carries the meaning.
      aria-hidden
    >
      <Blob detail={isMobile ? 14 : 20} reduced={reduced} />
      <Shell reduced={reduced} />
      <Dust count={isMobile ? 320 : 700} reduced={reduced} />
      <Rig enabled={running && !isMobile} />
    </Canvas>
  );
}
