"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function SandParticles({
  count = 1800,
  radius = 18,
  color = "#cdbb86",
  opacity = 0.22,
}: {
  count?: number;
  radius?: number;
  color?: string;
  opacity?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = radius * Math.pow(Math.random(), 0.65);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * radius * 0.9;

      arr[i * 3 + 0] = Math.cos(theta) * r + (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * r + (Math.random() - 0.5) * 0.8;
    }

    return arr;
  }, [count, radius]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = pointsRef.current;
    if (!p) return;

    p.rotation.y = t * 0.03;
    p.rotation.x = Math.sin(t * 0.15) * 0.02;
    p.position.y = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <points ref={pointsRef} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
