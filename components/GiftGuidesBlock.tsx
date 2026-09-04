type GiftGuidesBlockProps = {
  variant: "mujeres" | "hombres";
};

const GUIDES = [
  { number: "01", title: "Cómo estimular el crecimiento de tu cabello" },
  { number: "02", title: "Cómo frenar la caída paso a paso" },
  { number: "03", title: "Cómo fortalecer la raíz desde adentro" },
] as const;

const THEMES = {
  mujeres: {
    container: "border-primary/25 bg-primary/10",
    badge: "bg-primary/15 text-primary-dark",
    accent: "text-primary-dark",
  },
  hombres: {
    container: "border-[var(--h-primary)]/25 bg-[var(--h-primary)]/10",
    badge: "bg-[var(--h-primary)]/15 text-[var(--h-primary-dark)]",
    accent: "text-[var(--h-primary-dark)]",
  },
} as const;

export default function GiftGuidesBlock({ variant }: GiftGuidesBlockProps) {
  const theme = THEMES[variant];

  return (
    <div
      className={`w-full min-w-0 rounded-xl border px-3 py-2 sm:px-3.5 sm:py-2.5 ${theme.container}`}
    >
      <span
        className={`inline-block rounded-full px-1.5 py-px text-[8px] font-bold uppercase tracking-wide sm:text-[9px] ${theme.badge}`}
      >
        Incluido gratis
      </span>

      <h3 className="mt-1 font-heading text-xs font-bold leading-snug text-text sm:text-sm">
        3 guías digitales de regalo
      </h3>

      <div className="mt-1.5 border-t border-gray-200/80">
        {GUIDES.map((guide) => (
          <div
            key={guide.number}
            className="flex items-start gap-1 border-b border-gray-200/80 py-1.5 last:border-b-0 sm:gap-1.5 sm:py-2"
          >
            <span className="shrink-0 pt-px text-[10px] tabular-nums leading-snug text-text-muted/45 sm:text-[11px]">
              {guide.number}
            </span>
            <span className="shrink-0 pt-px text-[10px] leading-snug text-text-muted/45 sm:text-[11px]">
              ·
            </span>
            <span className="min-w-0 flex-1 text-[10px] font-semibold leading-snug text-text sm:text-[11px]">
              {guide.title}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1.5 text-center text-[10px] text-text-muted sm:mt-2 sm:text-[11px]">
        Valor{" "}
        <span className="line-through">$1.470</span>{" "}
        <span className={`font-bold ${theme.accent}`}>Gratis</span>
      </p>
    </div>
  );
}
