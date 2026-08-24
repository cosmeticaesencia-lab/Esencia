"use client";

const FEATURES = [
  "CRECIMIENTO VISIBLE DEL PELO",
  "DETIENE LA CAÍDA",
  "FÓRMULA LIVIANA · SIN GRASA",
] as const;

function FeatureTrack() {
  return (
    <div className="flex shrink-0 items-center gap-4 px-4 md:gap-8">
      {FEATURES.map((feature) => (
        <span key={feature} className="flex shrink-0 items-center gap-4 md:gap-8">
          <span>{feature}</span>
          <span aria-hidden="true" className="opacity-70">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function FeatureMarqueeHombres() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[var(--h-primary)] py-3 text-xs font-bold uppercase tracking-wide text-white sm:py-4 sm:text-sm md:text-base md:tracking-wider"
      aria-label="Beneficios del producto"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none [animation-duration:36s]">
        <FeatureTrack />
        <div aria-hidden="true">
          <FeatureTrack />
        </div>
      </div>
    </div>
  );
}
