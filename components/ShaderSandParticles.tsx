"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uScatter;

  attribute float aSeed;

  varying float vFade;

  void main() {
    vec3 p = position;

    float t = uTime * uSpeed;

    p.x += sin(t + aSeed * 12.0) * 0.22;
    p.y += sin(t * 0.7 + aSeed * 6.0) * 0.18;
    p.z += cos(t * 0.9 + aSeed * 10.0) * 0.22;

    vFade = smoothstep(0.0, 1.0, aSeed);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.9 + aSeed * 2.0) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vFade;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);

    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= (0.55 + vFade * 0.45) * uOpacity;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function ShaderSandParticles({
  count = 1600,
  radius = 18,
  color = "#cdbb86",
  opacity = 0.22,
  speed = 0.35,
}: {
  count?: number;
  radius?: number;
  color?: string;
  opacity?: number;
  speed?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds, material } = useMemo(() => {
    const positionsArr = new Float32Array(count * 3);
    const seedsArr = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r = radius * Math.pow(Math.random(), 0.6);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * radius * 0.9;

      positionsArr[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.8;
      positionsArr[i * 3 + 1] = y;
      positionsArr[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.8;

      seedsArr[i] = Math.random();
    }

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uScatter: { value: radius },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
      },
      vertexShader,
      fragmentShader,
    });

    return { positions: positionsArr, seeds: seedsArr, material: mat };
  }, [count, radius, color, opacity, speed]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0008;
  });

  return (
    <points ref={pointsRef} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <primitive attach="material" object={material} />
    </points>
  );
}
