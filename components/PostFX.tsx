"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

export default function PostFX({
  bloomIntensity = 0.85,
  bloomLuminanceThreshold = 0.18,
}: {
  bloomIntensity?: number;
  bloomLuminanceThreshold?: number;
}) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomLuminanceThreshold}
        luminanceSmoothing={0.6}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.75} />
    </EffectComposer>
  );
}
