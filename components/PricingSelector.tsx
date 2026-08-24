"use client";

import { formatPrice, type PricingOption } from "@/components/checkout/checkout-utils";
import { motion } from "framer-motion";

export const PRICING_OPTIONS: PricingOption[] = [
  {
    id: "1-unit",
    label: "1 spray",
    subtitle: "Tratamiento 1 mes",
    quantity: 1,
    totalPrice: 990,
  },
  {
    id: "2-units",
    label: "2x1",
    subtitle: "Tratamiento 2 meses",
    quantity: 2,
    totalPrice: 1390,
    compareAtPrice: 1980,
    badge: "MÁS ELEGIDO",
    freeShipping: true,
  },
  {
    id: "3-units",
    label: "3x1",
    subtitle: "Tratamiento 3 meses completo",
    quantity: 3,
    totalPrice: 1690,
    compareAtPrice: 2970,
    badge: "MEJOR PRECIO",
    freeShipping: true,
  },
];

export const DEFAULT_PRICING_OPTION = PRICING_OPTIONS[1];

type PricingSelectorProps = {
  selectedOption: PricingOption;
  onSelectOption: (option: PricingOption) => void;
  onPurchase: () => void;
};

export default function PricingSelector({
  selectedOption,
  onSelectOption,
  onPurchase,
}: PricingSelectorProps) {
  return (
    <div id="pricing-section" className="flex w-full min-w-0 flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Seleccionar cantidad">
        {PRICING_OPTIONS.map((option) => {
          const isSelected = selectedOption.id === option.id;
          const isBundle = option.quantity > 1;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(option)}
              className={`relative flex w-full min-w-0 items-center gap-3 rounded-xl border-2 px-3.5 py-3.5 text-left transition-all md:gap-4 md:px-4 md:py-4 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-gray-200 bg-white hover:border-primary/40 hover:bg-surface"
              }`}
            >
              {option.badge && (
                <span className="absolute right-3 top-2 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white md:text-[10px]">
                  {option.badge}
                </span>
              )}

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? "border-primary" : "border-gray-300"
                }`}
                aria-hidden="true"
              >
                {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>

              <div className="min-w-0 flex-1 pr-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`font-heading ${
                      isBundle
                        ? "text-lg font-bold text-text md:text-xl"
                        : "text-sm font-semibold text-text md:text-base"
                    }`}
                  >
                    {option.label}
                  </span>
                  {option.freeShipping && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary-dark md:text-[10px]">
                      Envío gratis
                    </span>
                  )}
                </div>
                {option.subtitle && (
                  <p className="mt-0.5 text-xs text-text-muted md:text-sm">{option.subtitle}</p>
                )}
              </div>

              <div
                className={`shrink-0 text-right ${option.badge ? "pt-6 md:pt-7" : ""}`}
              >
                <span className="font-heading text-lg font-bold text-text md:text-xl">
                  {formatPrice(option.totalPrice)}
                </span>
                {option.compareAtPrice && (
                  <p className="mt-0.5 text-sm text-text-muted line-through md:text-base">
                    {formatPrice(option.compareAtPrice)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.01, backgroundColor: "#D484A8" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={onPurchase}
        className="w-full max-w-full rounded-full bg-primary px-3 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-sm sm:py-4 sm:text-base"
      >
        Comprar
      </motion.button>
    </div>
  );
}

export type { PricingOption };
