import { Star } from "lucide-react";
import Image from "next/image";

type DeliveryReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image: string;
};

const REVIEWS: DeliveryReview[] = [
  {
    id: "marcela",
    name: "Marcela T.",
    rating: 5,
    image: "/images/delivery-review-1.png",
    comment:
      "Llegó rapidísimo y todo bien embalado. Ya lo empecé a usar, apenas la primera semana pero estoy con ganas de sostenerlo.",
  },
  {
    id: "yamila",
    name: "Yamila C.",
    rating: 5,
    image: "/images/delivery-review-2.png",
    comment:
      "Me llegó justo cuando lo necesitaba, venía con mucha caída últimamente. El envase es chiquito pero rinde bastante en cada uso.",
  },
  {
    id: "silvina",
    name: "Silvina B.",
    rating: 4,
    image: "/images/delivery-review-3.png",
    comment:
      "Pedí con dudas por ser compra online, pero llegó perfecto y en el tiempo que decía la página. Ahora a esperar los resultados.",
  },
  {
    id: "karina",
    name: "Karina D.",
    rating: 5,
    image: "/images/delivery-review-4.png",
    comment:
      "Superó mis expectativas en cuanto a presentación. Se los recomiendo a mis amigas que también están con el mismo problema.",
  },
  {
    id: "betiana",
    name: "Betiana L.",
    rating: 5,
    image: "/images/delivery-review-5.png",
    comment:
      "Llegó en tiempo y forma, con instrucciones claras de uso. Ya armé mi rutina diaria y espero contar buenos resultados pronto.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
            index < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function DeliveryReviews() {
  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-center font-heading text-lg font-semibold text-text md:mb-6 md:text-xl">
          Lo que dicen al recibirlo
        </h2>

        <ul className="divide-y divide-gray-200 border-y border-gray-200">
          {REVIEWS.map((review) => (
            <li key={review.id} className="flex gap-3 py-3 md:gap-4 md:py-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-200 md:h-20 md:w-20">
                <Image
                  src={review.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-sm font-bold text-text md:text-base">{review.name}</span>
                  <Stars rating={review.rating} />
                </div>
                <p className="mt-1 line-clamp-3 text-sm leading-snug text-text-muted md:text-[15px] md:leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
