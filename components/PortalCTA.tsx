"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import PostFX from "@/components/PostFX";
import ShaderPortal from "@/components/ShaderPortal";
import ShaderSandParticles from "@/components/ShaderSandParticles";

function PortalRing() {
  const ring = useRef<THREE.Mesh>(null);

  const mat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#120f08",
      metalness: 0.8,
      roughness: 0.25,
      emissive: new THREE.Color("#d4af37"),
      emissiveIntensity: 0.65,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ring.current) return;
    ring.current.rotation.x = Math.PI / 2;
    ring.current.rotation.z = t * 0.22;
    ring.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.02);
  });

  return (
    <mesh ref={ring} material={mat}>
      <torusGeometry args={[3.3, 0.18, 24, 96]} />
    </mesh>
  );
}

export default function PortalCTA() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0.2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b0a08"]} />
        <fog attach="fog" args={["#0b0a08", 7, 18]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[6, 10, 6]} intensity={1.0} color="#fff2c4" />
        <pointLight position={[0, 0, 2]} intensity={2.4} color="#d4af37" />
        <pointLight position={[2, -1, 3]} intensity={0.9} color="#2ad1c9" />

        <Suspense fallback={null}>
          <PostFX bloomIntensity={0.85} bloomLuminanceThreshold={0.16} />
          <group>
            <ShaderPortal intensity={1.0} />
            <PortalRing />
          </group>
          <ShaderSandParticles count={1100} radius={13} opacity={0.14} speed={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
