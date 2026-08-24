"use client";

import FAQAccordionHombres from "@/components/hombres/FAQAccordionHombres";
import PaymentIconsHombres from "@/components/hombres/PaymentIconsHombres";
import PurchaseFlowHombres from "@/components/hombres/PurchaseFlowHombres";
import type { PricingOption } from "@/components/hombres/checkout-utils";
import PricingSelectorHombres, {
  DEFAULT_PRICING_OPTION,
} from "@/components/hombres/PricingSelectorHombres";
import ReviewCarouselHombres from "@/components/hombres/ReviewCarouselHombres";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PRODUCT_IMAGES = [
  { id: 0, src: "/images/product-gallery-1.jpeg", alt: "Producto — vista frontal" },
  { id: 1, src: "/images/product-gallery-2.jpeg", alt: "Producto — vista lateral" },
  { id: 2, src: "/images/product-gallery-hombre-4.jpeg", alt: "Producto — resultados" },
  { id: 3, src: "/images/product-gallery-hombre-3.jpg", alt: "Producto — textura" },
] as const;

const BENEFITS = [
  "Menos caída visible desde las primeras semanas de uso",
  "Fórmula liviana, ideal para cuero cabelludo sensible",
  "Activos naturales que fortalecen el folículo desde la raíz",
  "No deja sensación grasosa — usalo de día o de noche",
  "Garantía de satisfacción o te devolvemos tu dinero",
] as const;

const PRODUCT_TITLE =
  "ESENCIA - Detiene la Caída del Cabello y Recupera la Densidad desde la Raíz.";

type ProductHeroHombresProps = {
  rating?: number;
  reviewCount?: number;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);
        return (
          <span key={index} className="relative inline-block h-4 w-4">
            <Star className="h-4 w-4 text-gray-200" strokeWidth={0} fill="currentColor" />
            <span
              className="absolute inset-0 overflow-hidden text-amber-400"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-4 w-4" strokeWidth={0} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function ProductHeroHombres({
  rating = 4.8,
  reviewCount = 956,
}: ProductHeroHombresProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<PricingOption>(DEFAULT_PRICING_OPTION);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const selectedImage = PRODUCT_IMAGES[selectedIndex];

  const handlePurchase = () => {
    setPurchaseOpen(true);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 md:py-10 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
        {/* Galería */}
        <div className="flex min-w-0 flex-col gap-3 md:gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedImage.src}
                initial={{ opacity: 0, scale: 1.008 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.992 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority={selectedIndex === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="-mx-4 flex justify-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:gap-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {PRODUCT_IMAGES.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver ${image.alt}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-lg transition-all sm:h-[4.75rem] sm:w-[4.75rem] md:h-20 md:w-20 ${
                  selectedIndex === index
                    ? "ring-2 ring-[var(--h-primary)] ring-offset-1 md:ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info del producto */}
        <div className="flex min-w-0 flex-col gap-4 md:gap-5 lg:pt-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <StarRating rating={rating} />
            <span className="text-xs text-text-muted md:text-sm">
              {rating} — {reviewCount.toLocaleString("es-AR")} reseñas
            </span>
          </div>

          <h1 className="font-heading text-2xl font-bold leading-tight text-text md:text-4xl lg:text-[2.5rem]">
            {PRODUCT_TITLE}
          </h1>

          <ul className="flex flex-col gap-2.5 md:gap-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-text md:gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--h-primary)]/15">
                  <Check className="h-3.5 w-3.5 text-[var(--h-primary-dark)]" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="min-w-0">
            <PricingSelectorHombres
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              onPurchase={handlePurchase}
            />
          </div>

          <div className="w-full pt-1">
            <PaymentIconsHombres />
          </div>

          <div className="w-full min-w-0 pt-1">
            <ReviewCarouselHombres />
          </div>

          <FAQAccordionHombres variant="compact" />
        </div>
      </div>

      <PurchaseFlowHombres
        isOpen={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
        option={selectedOption}
        product={{
          name: PRODUCT_TITLE,
          image: "/images/product-1.svg",
        }}
      />
    </section>
  );
}
