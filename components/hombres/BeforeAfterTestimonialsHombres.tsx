import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "martin",
    name: "Martín",
    image: "/images/testimonials/monica-before-after.svg",
    imageAlt: "Antes y después del cabello de Martín",
    text: "Tenía entradas que me comían la cabeza. En la segunda semana ya noté que en el cepillo habían menos mechones. Al mes y medio, la coronilla se ve mucho más cubierta. No me deja grasoso, lo uso todos los días.",
  },
  {
    id: "diego",
    name: "Diego",
    image: "/images/testimonials/laura-before-after.svg",
    imageAlt: "Antes y después del cabello de Diego",
    text: "Vine con las expectativas por el piso después de probar minoxidil y shampoos. A las 3 semanas noté menos pelo en la ducha. Al mes y medio, se ve más denso. Primera vez en años que no siento que tiré la plata.",
  },
  {
    id: "rodrigo",
    name: "Rodrigo",
    image: "/images/testimonials/roxana-before-after.svg",
    imageAlt: "Antes y después del cabello de Rodrigo",
    text: "Al principio dudaba si algo podía frenar la caída, pero Esencia me demostró lo contrario. Es mi rutina diaria para un cabello más sano y resistente.",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-[var(--h-primary-dark)] text-[var(--h-primary-dark)]"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function BeforeAfterTestimonialsHombres() {
  return (
    <section className="w-full bg-[var(--h-primary-light)]/35 py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-2xl px-4 text-center sm:px-6 md:mb-10 lg:px-8">
        <span className="inline-block rounded-full border border-[var(--h-primary)]/30 bg-white px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[var(--h-primary-dark)] md:text-xs">
          TESTIMONIOS REALES
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-text md:text-4xl">
          Resultados de Clientes
        </h2>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 md:gap-5 lg:px-8 lg:gap-6">
        {TESTIMONIALS.map((testimonial) => (
          <article
            key={testimonial.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full bg-surface">
              <Image
                src={testimonial.image}
                alt={testimonial.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="space-y-2.5 p-4 md:p-5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="font-heading text-base font-bold text-text md:text-lg">
                  {testimonial.name}
                </h3>
                <StarRating />
              </div>
              <p className="text-sm leading-relaxed text-text-muted md:text-[15px]">
                {testimonial.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
