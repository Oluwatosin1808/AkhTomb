"use client";

import type { MutableRefObject } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollOrchestrator({
  hieroProgress,
}: {
  hieroProgress: MutableRefObject<number>;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector<HTMLElement>("[data-section='hero']");
    const hiero = document.querySelector<HTMLElement>("[data-section='hiero']");
    const features = document.querySelector<HTMLElement>(
      "[data-section='features']",
    );
    const cta = document.querySelector<HTMLElement>("[data-section='cta']");

    const triggers: ScrollTrigger[] = [];

    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const strength = self.progress;
            document.documentElement.style.setProperty(
              "--hero-dim",
              String(strength),
            );
          },
        }),
      );
    }

    if (hiero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hiero,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            hieroProgress.current = self.progress;
          },
        }),
      );
    }

    if (features) {
      triggers.push(
        ScrollTrigger.create({
          trigger: features,
          start: "top 85%",
          end: "bottom 15%",
          scrub: true,
          onUpdate: (self) => {
            document.documentElement.style.setProperty(
              "--feature-glow",
              String(self.progress),
            );
          },
        }),
      );
    }

    if (cta) {
      triggers.push(
        ScrollTrigger.create({
          trigger: cta,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            document.documentElement.style.setProperty(
              "--portal-charge",
              String(self.progress),
            );
          },
        }),
      );
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [hieroProgress]);

  return null;
}
