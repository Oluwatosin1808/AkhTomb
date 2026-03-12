function Card({
  title,
  desc,
  accent,
  revealDelayClass,
}: {
  title: string;
  desc: string;
  accent: "gold" | "turq";
  revealDelayClass?: string;
}) {
  const border =
    accent === "gold" ? "border-gold/30 glow-gold" : "border-turq/25 glow-turq";

  const pill =
    accent === "gold"
      ? "text-gold/95 border-gold/30"
      : "text-turq/95 border-turq/25";

  return (
    <div
      className={`reveal ${revealDelayClass ?? ""} relative rounded-2xl border ${border} bg-white/5 backdrop-blur-xl p-7`}
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full border ${pill} px-3 py-1 text-xs tracking-[0.28em] uppercase`}
      >
        {accent === "gold" ? "Glyph" : "Aether"}
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-foreground/70">{desc}</p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <p className="mt-5 text-xs tracking-[0.22em] uppercase text-foreground/55">
        Unearth the signal
      </p>
    </div>
  );
}

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <Card
        title="Ancient Knowledge"
        desc="Scroll-revealed fragments of forgotten systems, encoded in floating glyphs and light." 
        accent="gold"
        revealDelayClass=""
      />
      <Card
        title="Eternal Power"
        desc="Cinematic illumination, fog, and particles woven into a smooth 60fps ritual." 
        accent="turq"
        revealDelayClass="reveal-delay"
      />
      <Card
        title="Hidden Secrets"
        desc="Subtle parallax, micro-motion, and portal-like transitions that feel unearthed, not built." 
        accent="gold"
        revealDelayClass="reveal-delay"
      />
    </div>
  );
}
