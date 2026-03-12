"use client";

import { useMemo, useRef } from "react";
import { cubicBezier, motion, type Variants } from "framer-motion";
import HeroScene from "@/components/HeroScene";
import FloatingHieroglyphs from "@/components/FloatingHieroglyphs";
import FeatureCards from "@/components/FeatureCards";
import PortalCTA from "@/components/PortalCTA";
import ScrollOrchestrator from "@/components/ScrollOrchestrator";

export default function Home() {
  const hieroProgress = useRef(0);

  const headline = useMemo(
    (): Variants => ({
      hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: cubicBezier(0.2, 0.8, 0.2, 1) },
      },
    }),
    [],
  );

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <ScrollOrchestrator hieroProgress={hieroProgress} />

      <section
        data-section="hero"
        className="relative h-[100svh] overflow-hidden"
      >
        <HeroScene />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-background" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <motion.h1
            variants={headline}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
          >
            Unearth the
            <span className="block text-gold [text-shadow:0_0_30px_rgba(212,175,55,0.18)]">
              Forbidden Signal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: cubicBezier(0.2, 0.8, 0.2, 1),
            }}
            className="mt-5 max-w-xl text-sm leading-7 text-foreground/70 md:text-base"
          >
            A cinematic, scroll-driven artifact: drifting sand, glowing glyphs, and
            a sarcophagus suspended between dynasties and data.
          </motion.p>

          <div className="mt-8 flex items-center gap-3 text-xs tracking-[0.32em] uppercase text-foreground/55">
            <span className="h-px w-10 bg-gold/40" />
            Scroll to descend
          </div>
        </div>
      </section>

      <section
        data-section="hiero"
        className="relative h-[110svh] overflow-hidden border-t border-gold/10"
      >
        <FloatingHieroglyphs progress={hieroProgress} />

        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/25 to-background" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-20 md:px-10 md:pb-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              The Glyph Field
            </h2>
            <p className="mt-4 text-sm leading-7 text-foreground/70 md:text-base">
              Symbols orbit like satellites. The camera breathes with your scroll,
              turning typography into a navigable constellation.
            </p>
          </div>
        </div>
      </section>

      <section
        data-section="features"
        className="relative border-t border-gold/10"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between gap-10">
            <div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">
                Ritual Features
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/70 md:text-base">
                Minimal UI, maximal atmosphere. Glass, gold, turquoise and shadow
                tuned for motion.
              </p>
            </div>
            <div className="hidden md:block text-xs tracking-[0.28em] uppercase text-foreground/55">
              <span className="text-turq">/</span> 03 fragments
            </div>
          </div>

          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section
        data-section="cta"
        className="relative h-[95svh] overflow-hidden border-t border-gold/10"
      >
        <PortalCTA />

        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/35 to-background" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:px-10 md:pb-24">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Enter the Tomb
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/70 md:text-base">
            A portal of gold light. A button that feels like a sealed mechanism
            awakening.
          </p>

          <div className="mt-9">
            <button
              className="glow-gold rounded-full border border-gold/35 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent px-7 py-3 text-sm tracking-[0.26em] uppercase text-foreground transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
              type="button"
            >
              Enter the Tomb
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gold/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-10 text-xs text-foreground/55 md:px-10">
          <div className="tracking-[0.28em] uppercase">AkhTomb</div>
          <div className="tracking-[0.28em] uppercase">
            WebGL • GSAP • Lenis
          </div>
        </div>
      </footer>
    </div>
  );
}
