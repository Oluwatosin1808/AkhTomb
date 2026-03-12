"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/LazyMount";

const FloatingHieroglyphs = dynamic(
  () => import("@/components/FloatingHieroglyphs"),
  { ssr: false },
);

export default function HieroSceneMount() {
  return (
    <LazyMount
      className="absolute inset-0"
      placeholder={<div className="absolute inset-0 bg-background" />}
    >
      <FloatingHieroglyphs progress={{ current: 0 }} />
    </LazyMount>
  );
}
