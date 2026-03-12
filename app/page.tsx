import HeroSceneMount from "@/components/HeroSceneMount";
import HieroSceneMount from "@/components/HieroSceneMount";
import FeatureCards from "@/components/FeatureCards";
import PortalSceneMount from "@/components/PortalSceneMount";

export default function Home() {
  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <section
        data-section="hero"
        className="relative h-[100svh] overflow-hidden"
      >
        <div data-scene="hero" className="absolute inset-0">
          <HeroSceneMount />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-background" />

        <div
          data-ui="hero"
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16 md:px-10 md:pb-24"
        >
          <h1 className="reveal font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em] text-foreground">
            Unearth the
            <span className="block text-gold [text-shadow:0_0_30px_rgba(212,175,55,0.18)]">
              Forbidden Signal
            </span>
          </h1>

          <p className="reveal reveal-delay mt-5 max-w-xl text-sm leading-7 text-foreground/70 md:text-base">
            A cinematic, scroll-driven artifact: drifting sand, glowing glyphs, and
            a sarcophagus suspended between dynasties and data.
          </p>

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
        <div data-scene="hiero" className="absolute inset-0">
          <HieroSceneMount />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/25 to-background" />

        <div
          data-ui="hiero"
          className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-20 md:px-10 md:pb-24"
        >
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
        <div data-scene="cta" className="absolute inset-0">
          <PortalSceneMount />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/35 to-background" />

        <div
          data-ui="cta"
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:px-10 md:pb-24"
        >
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
