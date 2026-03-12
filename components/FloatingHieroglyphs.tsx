"use client";

import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import SandParticles from "@/components/SandParticles";
import PostFX from "@/components/PostFX";

function GlyphCloud({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  const glyphs = useMemo(
    () => [
      "𓂀",
      "𓁹",
      "𓋹",
      "𓄿",
      "𓎛",
      "𓈖",
      "𓏏",
      "𓆣",
      "𓇌",
      "𓅱",
      "𓆓",
      "𓍿",
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const g = group.current;
    if (!g) return;

    const p = progress.current;

    g.rotation.y = t * 0.12 + p * 1.25;
    g.rotation.x = Math.sin(t * 0.2) * 0.15 + p * 0.22;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      Math.sin(p * Math.PI * 2) * 0.6,
      0.04,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      0.15 + p * 0.35,
      0.04,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      {glyphs.map((g, i) => {
        const a = (i / glyphs.length) * Math.PI * 2;
        const r = 3.6 + (i % 3) * 0.6;
        const y = (i % 4) * 0.55 - 1.0;

        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;

        return (
          <Text
            key={i}
            position={[x, y, z]}
            fontSize={0.7}
            color={i % 3 === 0 ? "#2ad1c9" : "#d4af37"}
            anchorX="center"
            anchorY="middle"
          >
            {g}
          </Text>
        );
      })}
    </group>
  );
}

export default function FloatingHieroglyphs({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0.1, 9], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b0a08"]} />
        <fog attach="fog" args={["#0b0a08", 8, 22]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 10, 6]} intensity={0.9} color="#fff2c4" />
        <pointLight position={[0, 1, 3]} intensity={1.0} color="#2ad1c9" />
        <pointLight position={[-2, -1, -2]} intensity={1.2} color="#d4af37" />

        <Suspense fallback={null}>
          <PostFX bloomIntensity={0.7} bloomLuminanceThreshold={0.18} />
          <GlyphCloud progress={progress} />
          <SandParticles count={1300} radius={14} opacity={0.14} />
        </Suspense>
      </Canvas>
    </div>
  );
}
