"use client";

import Image from "next/image";

const PRICING_SECTION_ID = "pricing-section";

function scrollToPricing() {
  const pricingSection = document.getElementById(PRICING_SECTION_ID);
  pricingSection?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function TrustSection() {
  return (
    <section className="w-full bg-primary-light/25 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm md:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,42%)_minmax(0,58%)] md:gap-10 lg:gap-12">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-surface md:mx-0 md:max-w-none">
              <Image
                src="/images/trust-section-placeholder.svg"
                alt="Profesional recomienda ESENCIA"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-5">
              <span className="inline-block w-fit rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-primary-dark md:text-xs">
                DESDE LA RAÍZ
              </span>

              <h2 className="font-heading text-2xl font-bold leading-tight text-text md:text-3xl lg:text-4xl">
                ¿Qué le pasa a tu cuero cabelludo y por qué se cae el pelo?
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
                <p>
                  El cuero cabelludo es el &apos;suelo&apos; donde nace cada pelo. Cuando está
                  sobrecargado, por estrés, cambios hormonales, químicos o simplemente el tiempo,
                  el pelo empieza a salir cada vez más fino y frágil.
                </p>
                <p>
                  El resultado es afinamiento y caída progresivos, y cada ducha se convierte en un
                  momento de preocupación.
                </p>
                <p>
                  El error típico es atacar el pelo con shampoos especiales. Pero el problema
                  empieza en la raíz, no en los largos.{" "}
                  <span className="font-semibold text-text">ESENCIA</span> actúa directo en el
                  cuero cabelludo, ayudando a que el pelo salga más fuerte y se vea menos caída
                  desde las primeras semanas.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToPricing}
                className="w-full rounded-full bg-primary px-4 py-3.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-dark sm:py-4 sm:text-sm md:w-auto md:px-8"
              >
                QUIERO EMPEZAR MI CAMBIO HOY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
