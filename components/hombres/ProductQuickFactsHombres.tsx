import { Calendar, Droplets, Package } from "lucide-react";

const FACTS = [
  { icon: Package, value: "100 ml", label: "Volumen" },
  { icon: Calendar, value: "1 mes", label: "de suministro" },
  { icon: Droplets, value: "2 veces", label: "al día" },
] as const;

export default function ProductQuickFactsHombres() {
  return (
    <div
      className="grid grid-cols-3 gap-2 rounded-xl border border-gray-100 bg-surface/60 px-2 py-3 sm:px-3"
      aria-label="Detalles del producto"
    >
      {FACTS.map(({ icon: Icon, value, label }) => (
        <div key={label} className="flex min-w-0 items-start gap-1.5 sm:gap-2">
          <Icon
            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--h-primary-dark)]"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-tight text-text sm:text-sm">{value}</p>
            <p className="mt-0.5 text-[10px] leading-tight text-text-muted sm:text-xs">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
