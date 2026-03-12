"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export default function LazyMount({
  children,
  placeholder,
  rootMargin = "300px",
  className,
}: {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    if (mounted) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (!anyVisible) return;
        setMounted(true);
        obs.disconnect();
      },
      { rootMargin },
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
    };
  }, [mounted, rootMargin]);

  return (
    <div ref={hostRef} className={className}>
      {mounted ? children : placeholder}
    </div>
  );
}
