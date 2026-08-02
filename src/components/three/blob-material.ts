import * as THREE from "three";

/**
 * Simplex noise 3D — Ashima Arts / Stefan Gustavson implementation,
 * MIT licensed (github.com/ashima/webgl-noise).
 */
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uPointer;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

${SIMPLEX_3D}

/* Two octaves of noise pushed along the surface normal. */
float field(vec3 p) {
  float a = snoise(p * uFreq + vec3(0.0, uTime * 0.28, 0.0));
  float b = snoise(p * uFreq * 2.15 - vec3(uTime * 0.2)) * 0.45;
  return a + b;
}

/* Single octave — good enough to estimate the neighbour offset, and it
   halves the noise evaluations per vertex. */
float fieldCoarse(vec3 p) {
  return snoise(p * uFreq + vec3(0.0, uTime * 0.28, 0.0));
}

void main() {
  vec3 nrm = normalize(position);
  float radius = length(position);

  float n = field(position);
  vec3 displaced = position + nrm * n * uAmp;

  /* Rebuild the normal from two neighbours on the sphere, otherwise the
     lighting still describes an undisplaced ball. */
  vec3 tangent = normalize(cross(nrm, vec3(0.0, 1.0, 0.0) + vec3(0.001)));
  vec3 bitangent = normalize(cross(nrm, tangent));
  float eps = 0.035;

  vec3 nrmT = normalize(nrm + tangent * eps);
  vec3 nrmB = normalize(nrm + bitangent * eps);
  vec3 pT = nrmT * radius + nrmT * fieldCoarse(nrmT * radius) * uAmp;
  vec3 pB = nrmB * radius + nrmB * fieldCoarse(nrmB * radius) * uAmp;

  vec3 newNormal = normalize(cross(pT - displaced, pB - displaced));
  if (dot(newNormal, nrm) < 0.0) newNormal = -newNormal;

  vNoise = n;
  vNormal = normalize(normalMatrix * newNormal);

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  vViewDir = normalize(-mvPosition.xyz);

  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorRim;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vNoise;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);

  float facing = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 2.6);

  /* Body colour drifts with the noise field so the surface reads as liquid. */
  float mixer = clamp(vNoise * 0.5 + 0.5, 0.0, 1.0);
  vec3 body = mix(uColorA, uColorB, mixer);

  /* Two fixed key lights — cheaper and more controllable than an env map. */
  vec3 key = normalize(vec3(0.55, 0.75, 0.6));
  vec3 fill = normalize(vec3(-0.7, -0.25, 0.4));
  float keyTerm = pow(clamp(dot(N, key), 0.0, 1.0), 2.0);
  float fillTerm = clamp(dot(N, fill), 0.0, 1.0) * 0.35;

  vec3 color = body * (0.16 + keyTerm * 0.85 + fillTerm);

  /* Tight specular glint. */
  vec3 H = normalize(key + V);
  color += vec3(1.0) * pow(clamp(dot(N, H), 0.0, 1.0), 90.0) * 0.5;

  /* Rim light does most of the silhouette work on a dark page. */
  color += uColorRim * fresnel * 1.35;

  float alpha = clamp(0.55 + fresnel * 0.85, 0.0, 1.0);
  gl_FragColor = vec4(color, alpha);

  #include <colorspace_fragment>
}
`;

export type BlobUniforms = {
  uTime: { value: number };
  uAmp: { value: number };
  uFreq: { value: number };
  uPointer: { value: number };
  uColorA: { value: THREE.Color };
  uColorB: { value: THREE.Color };
  uColorRim: { value: THREE.Color };
};

export function createBlobMaterial(colors: {
  a: string;
  b: string;
  rim: string;
}) {
  const uniforms: BlobUniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.3 },
    uFreq: { value: 1.05 },
    uPointer: { value: 0 },
    uColorA: { value: new THREE.Color(colors.a) },
    uColorB: { value: new THREE.Color(colors.b) },
    uColorRim: { value: new THREE.Color(colors.rim) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: true,
    side: THREE.FrontSide,
  });

  return { material, uniforms };
}
