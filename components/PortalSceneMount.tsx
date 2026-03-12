"use client";

import dynamic from "next/dynamic";
import LazyMount from "@/components/LazyMount";

const PortalCTA = dynamic(() => import("@/components/PortalCTA"), {
  ssr: false,
});

export default function PortalSceneMount() {
  return (
    <LazyMount
      className="absolute inset-0"
      placeholder={<div className="absolute inset-0 bg-background" />}
    >
      <PortalCTA />
    </LazyMount>
  );
}
