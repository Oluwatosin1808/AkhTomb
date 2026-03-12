"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/LazyMount";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

export default function HeroSceneMount() {
  return (
    <LazyMount
      className="absolute inset-0"
      placeholder={<div className="absolute inset-0 bg-background" />}
    >
      <HeroScene />
    </LazyMount>
  );
}
