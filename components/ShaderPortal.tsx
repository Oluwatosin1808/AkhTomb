"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uGold;
  uniform vec3 uTurq;
  uniform float uIntensity;

  float hash(vec2 p){
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);

    float swirl = atan(uv.y, uv.x) + (uTime * 0.6) + r * 2.0;
    vec2 p = vec2(cos(swirl), sin(swirl)) * (1.2 - r);

    float n = noise(p * 3.0 + uTime * 0.2);

    float ring = smoothstep(0.65, 0.2, abs(r - 0.58));
    float core = smoothstep(0.9, 0.0, r);

    vec3 col = mix(uTurq, uGold, smoothstep(0.0, 1.0, n));

    float a = (ring * 0.55 + core * 0.25) * (0.35 + n * 0.65) * uIntensity;
    a *= smoothstep(1.05, 0.0, r);

    gl_FragColor = vec4(col, a);
  }
`;

export default function ShaderPortal({
  intensity = 1,
}: {
  intensity?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uGold: { value: new THREE.Color("#d4af37") },
        uTurq: { value: new THREE.Color("#2ad1c9") },
        uIntensity: { value: intensity },
      },
      vertexShader,
      fragmentShader,
    });
  }, [intensity]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    material.uniforms.uTime.value = t;

    const m = mesh.current;
    if (!m) return;
    m.rotation.z = -t * 0.12;
    material.uniforms.uIntensity.value = intensity * (0.85 + Math.sin(t * 0.8) * 0.1);
  });

  return (
    <mesh ref={mesh} position={[0, 0, -0.45]}>
      <circleGeometry args={[3.3, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
