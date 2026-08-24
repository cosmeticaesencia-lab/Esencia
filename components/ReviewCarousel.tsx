"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatar: string;
  rating: number;
  text: string;
  timeAgo: string;
};

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Valentina R.",
    initials: "VR",
    avatarColor: "#E8A5C4",
    avatar: "/images/resena-mujer-1.jpeg",
    rating: 5,
    text: "Le tenía fe pero no tanta, la verdad. A las 3 semanas empecé a notar menos pelo en la almohada y eso ya me tranquilizó bastante. Sigo usándolo todos los días.",
    timeAgo: "Hace 3 horas",
  },
  {
    id: "2",
    name: "Camila S.",
    initials: "CS",
    avatarColor: "#C9B8E8",
    avatar: "/images/resena-mujer-2.jpeg",
    rating: 5,
    text: "Lo que más me sorprendió es que no deja el pelo grasoso, lo uso a la mañana y no tengo que lavarme el pelo después. Ya voy por el segundo mes y se nota más denso.",
    timeAgo: "Hace 8 horas",
  },
  {
    id: "3",
    name: "Agustina P.",
    initials: "AP",
    avatarColor: "#D484A8",
    avatar: "/images/resena-mujer-3.jpeg",
    rating: 4,
    text: "Tenía la raya cada vez más ancha y me angustiaba un montón. Con un mes y medio de uso constante veo la diferencia, todavía sigo en proceso pero vale la pena.",
    timeAgo: "Hace 1 día",
  },
  {
    id: "4",
    name: "Rocío M.",
    initials: "RM",
    avatarColor: "#F5D0E0",
    avatar: "/images/resena-mujer-4.jpeg",
    rating: 5,
    text: "Probé cremas, shampoos, de todo. Esto es lo primero que siento que realmente hace algo. A las 5 semanas ya se me caía notoriamente menos al peinarme.",
    timeAgo: "Hace 2 días",
  },
];

const AUTO_ADVANCE_MS = 5000;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((index + REVIEWS.length) % REVIEWS.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext]);

  const review = REVIEWS[activeIndex];

  return (
    <div className="flex w-full min-w-0 items-center gap-2">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Reseña anterior"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-text-muted transition-colors hover:border-primary/40 hover:bg-surface hover:text-text"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={review.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex gap-3"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <Image
                src={review.avatar}
                alt={review.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-medium text-text">{review.name}</span>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {review.text}
              </p>
              <p className="mt-2 text-xs text-text-muted">{review.timeAgo}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={goNext}
        aria-label="Siguiente reseña"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-text-muted transition-colors hover:border-primary/40 hover:bg-surface hover:text-text"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
