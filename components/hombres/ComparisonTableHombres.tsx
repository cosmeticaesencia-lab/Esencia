import { Check, X } from "lucide-react";

const COMPARISON_ROWS = [
  "Actúa en la raíz",
  "Uso diario simple",
  "No engrasa",
  "Fortalece el cabello",
  "Promueve el crecimiento",
] as const;

export default function ComparisonTableHombres() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,40%)_minmax(0,60%)] md:gap-10 lg:gap-14">
        {/* Columna izquierda — copy */}
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl font-bold leading-tight text-text md:text-3xl lg:text-4xl">
            ¿Por qué ESENCIA es diferente?
          </h2>
        </div>

        {/* Columna derecha — tabla */}
        <div className="w-full min-w-0">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] border-b border-gray-200">
              <div className="bg-surface px-2 py-2.5 md:px-4 md:py-3" aria-hidden="true" />
              <div className="bg-[var(--h-primary)] px-1 py-2.5 text-center md:px-3 md:py-3">
                <span className="text-[11px] font-bold uppercase tracking-wide text-white md:text-sm">
                  ESENCIA
                </span>
              </div>
              <div className="bg-surface px-1 py-2.5 text-center md:px-3 md:py-3">
                <span className="text-[10px] font-semibold text-text md:text-xs">
                  Otras marcas
                </span>
              </div>
            </div>

            {/* Filas */}
            {COMPARISON_ROWS.map((label, index) => (
              <div
                key={label}
                className={`grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] ${
                  index < COMPARISON_ROWS.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center bg-white px-2 py-2.5 md:px-4 md:py-3">
                  <span className="text-left text-[11px] font-medium leading-snug text-text md:text-sm">
                    {label}
                  </span>
                </div>
                <div className="flex items-center justify-center bg-[var(--h-primary)] px-1 py-2.5 md:px-3 md:py-3">
                  <Check
                    className="h-4 w-4 text-emerald-300 md:h-5 md:w-5"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Sí</span>
                </div>
                <div className="flex items-center justify-center bg-white px-1 py-2.5 md:px-3 md:py-3">
                  <X
                    className="h-4 w-4 text-red-400/80 md:h-5 md:w-5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span className="sr-only">No</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
