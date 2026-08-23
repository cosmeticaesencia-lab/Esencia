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
    id: "monica",
    name: "Mónica",
    image: "/images/testimonials/mujer-1.webp",
    imageAlt: "Antes y después del cabello de Mónica",
    text: "Llevaba meses con miedo a ducharme de la cantidad de pelo que perdía. En la segunda semana ya noté que en el cepillo habían menos mechones. Al mes y medio, mi raya se ve mucho más llena. No me deja grasoso ni pesado, lo uso todos los días y lo sostuve sin problema. Primera vez en años que siento que estoy haciendo algo que de verdad funciona.",
  },
  {
    id: "laura",
    name: "Laura",
    image: "/images/testimonials/mujer-2.webp",
    imageAlt: "Antes y después del cabello de Laura",
    text: "Vine con las expectativas por el piso después de probar de todo. A las 3 semanas noté menos pelo en la ducha. Al mes y medio, la raya visiblemente más cubierta. No engrasa, lo sostengo sin esfuerzo. Primera vez en años que no siento que tiré la plata.",
  },
  {
    id: "roxana",
    name: "Roxana",
    image: "/images/testimonials/mujer-3.webp",
    imageAlt: "Antes y después del cabello de Roxana",
    text: "Al principio, me preguntaba si algo podría solucionar realmente mis problemas capilares, pero este producto me demostró lo contrario. Es más que un producto; es mi opción preferida para tener un cabello más sano y resistente cada día.",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-primary-dark text-primary-dark"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function BeforeAfterTestimonials() {
  return (
    <section className="w-full bg-primary-light/35 py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-2xl px-4 text-center sm:px-6 md:mb-10 lg:px-8">
        <span className="inline-block rounded-full border border-primary/30 bg-white px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-primary-dark md:text-xs">
          TESTIMONIOS REALES
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-text md:text-4xl">
          Resultados de Clientas
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
