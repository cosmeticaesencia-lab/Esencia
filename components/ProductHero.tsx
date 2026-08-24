"use client";

import FAQAccordion from "@/components/FAQAccordion";
import PaymentIcons from "@/components/PaymentIcons";
import PurchaseFlow from "@/components/checkout/PurchaseFlow";
import type { PricingOption } from "@/components/checkout/checkout-utils";
import PricingSelector, {
  DEFAULT_PRICING_OPTION,
} from "@/components/PricingSelector";
import ReviewCarousel from "@/components/ReviewCarousel";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PRODUCT_IMAGES = [
  { id: 0, src: "/images/product-gallery-1.jpeg", alt: "Producto — vista frontal" },
  { id: 1, src: "/images/product-gallery-2.jpeg", alt: "Producto — vista lateral" },
  { id: 2, src: "/images/product-gallery-3.png", alt: "Producto — textura" },
  { id: 3, src: "/images/product-4.svg", alt: "Producto — en uso" },
  { id: 4, src: "/images/product-gallery-5.png", alt: "Producto — empaque" },
] as const;

const BENEFITS = [
  "Resultados visibles desde la primera semana de uso",
  "Fórmula suave, apta para todo tipo de piel",
  "Ingredientes naturales de origen certificado",
  "Textura ligera que se absorbe al instante",
  "Garantía de satisfacción o te devolvemos tu dinero",
] as const;

const PRODUCT_TITLE =
  "ESENCIA - Detiene la Caída del Pelo y Estimula el Crecimiento de Raíz.";

type ProductHeroProps = {
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

export default function ProductHero({
  rating = 4.8,
  reviewCount = 956,
}: ProductHeroProps) {
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
          <motion.div
            key={selectedImage.id}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface"
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {PRODUCT_IMAGES.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ver ${image.alt}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                className={`relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-lg transition-all md:aspect-square md:h-auto md:w-auto ${
                  selectedIndex === index
                    ? "ring-2 ring-primary ring-offset-1 md:ring-offset-2"
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
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="min-w-0">
            <PricingSelector
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              onPurchase={handlePurchase}
            />
          </div>

          <div className="flex justify-center pt-1">
            <PaymentIcons />
          </div>

          <div className="w-full min-w-0 pt-1">
            <ReviewCarousel />
          </div>

          <FAQAccordion variant="compact" />
        </div>
      </div>

      <PurchaseFlow
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
