"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import PostFX from "@/components/PostFX";
import ShaderSandParticles from "@/components/ShaderSandParticles";

function Sarcophagus() {
  const group = useRef<THREE.Group>(null);

  const goldMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#0f0d08",
      metalness: 0.65,
      roughness: 0.25,
      emissive: new THREE.Color("#d4af37"),
      emissiveIntensity: 0.12,
    });
  }, []);

  const bodyMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#1a160d",
      metalness: 0.05,
      roughness: 0.85,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.35) * 0.08;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.2} floatIntensity={0.45}>
      <group ref={group}>
        <mesh material={bodyMat}>
          <boxGeometry args={[2.2, 4.8, 1]} />
        </mesh>
        <mesh position={[0, 2.1, 0.52]} material={goldMat}>
          <boxGeometry args={[2.05, 1.05, 0.08]} />
        </mesh>
        <mesh position={[0, -1.25, 0.52]} material={goldMat}>
          <boxGeometry args={[2.05, 1.25, 0.08]} />
        </mesh>
        <mesh position={[0, 0.45, 0.52]} material={goldMat}>
          <boxGeometry args={[2.05, 1.6, 0.08]} />
        </mesh>
        <mesh position={[0, 2.65, 0]} material={goldMat}>
          <cylinderGeometry args={[0.9, 1.1, 0.6, 24]} />
        </mesh>
        <mesh position={[0, 2.65, 0.36]} material={goldMat}>
          <cylinderGeometry args={[0.55, 0.7, 0.18, 24]} />
        </mesh>
      </group>
    </Float>
  );
}

function LightRays() {
  const rayRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const ray = rayRef.current;
    if (!ray) return;
    ray.rotation.z = t * 0.05;
    (ray.material as THREE.MeshBasicMaterial).opacity =
      0.16 + Math.sin(t * 0.7) * 0.02;
  });

  return (
    <mesh ref={rayRef} position={[0, 0.4, -3.2]} rotation={[0, 0, 0.6]}>
      <coneGeometry args={[6.5, 12, 40, 1, true]} />
      <meshBasicMaterial
        color="#d4af37"
        transparent
        opacity={0.16}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.5, 9.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b0a08"]} />
        <fog attach="fog" args={["#0b0a08", 10, 30]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 6]} intensity={1.1} color="#fff2c4" />
        <pointLight position={[0, 2, -2]} intensity={2.2} color="#d4af37" />
        <pointLight position={[2, -1, 2]} intensity={0.9} color="#2ad1c9" />

        <Suspense fallback={null}>
          <PostFX bloomIntensity={0.95} bloomLuminanceThreshold={0.14} />
          <LightRays />
          <Sarcophagus />
          <ShaderSandParticles count={1700} radius={18} opacity={0.16} speed={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
