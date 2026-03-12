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

    const heroUI = document.querySelector<HTMLElement>("[data-ui='hero']");
    const heroScene = document.querySelector<HTMLElement>("[data-scene='hero']");
    const hieroUI = document.querySelector<HTMLElement>("[data-ui='hiero']");
    const hieroScene = document.querySelector<HTMLElement>("[data-scene='hiero']");
    const ctaUI = document.querySelector<HTMLElement>("[data-ui='cta']");
    const ctaScene = document.querySelector<HTMLElement>("[data-scene='cta']");

    const triggers: ScrollTrigger[] = [];

    const timelines: gsap.core.Timeline[] = [];

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

      if (heroUI || heroScene) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=140%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        if (heroUI) {
          tl.to(
            heroUI,
            {
              opacity: 0,
              y: -60,
              ease: "none",
            },
            0,
          );
        }

        if (heroScene) {
          tl.to(
            heroScene,
            {
              opacity: 0,
              scale: 0.98,
              ease: "none",
            },
            0,
          );
        }

        timelines.push(tl);
      }
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

      if (hieroUI || hieroScene) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hiero,
            start: "top top",
            end: "+=160%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        if (hieroUI) {
          tl.fromTo(
            hieroUI,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: "none" },
            0,
          );
          tl.to(
            hieroUI,
            {
              opacity: 0,
              y: -40,
              ease: "none",
            },
            0.55,
          );
        }

        if (hieroScene) {
          tl.fromTo(
            hieroScene,
            { opacity: 0 },
            { opacity: 1, ease: "none" },
            0,
          );
          tl.to(
            hieroScene,
            { opacity: 0, ease: "none" },
            0.62,
          );
        }

        timelines.push(tl);
      }
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

      if (ctaUI || ctaScene) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: "top top",
            end: "+=140%",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        });

        if (ctaScene) {
          tl.fromTo(
            ctaScene,
            { opacity: 0 },
            { opacity: 1, ease: "none" },
            0,
          );
        }

        if (ctaUI) {
          tl.fromTo(
            ctaUI,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, ease: "none" },
            0.12,
          );
        }

        timelines.push(tl);
      }
    }

    return () => {
      timelines.forEach((t) => t.scrollTrigger?.kill());
      timelines.forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
    };
  }, [hieroProgress]);

  return null;
}
