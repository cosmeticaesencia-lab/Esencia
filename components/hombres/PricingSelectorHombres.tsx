"use client";

import { formatPrice, type PricingOption } from "@/components/hombres/checkout-utils";
import { motion } from "framer-motion";

export const PRICING_OPTIONS: PricingOption[] = [
  {
    id: "1-unit",
    label: "1 Unidad",
    quantity: 1,
    totalPrice: 990,
  },
  {
    id: "2-units",
    label: "2 Unidades",
    quantity: 2,
    totalPrice: 1390,
    badge: "MÁS ELEGIDO",
    freeShipping: true,
  },
  {
    id: "3-units",
    label: "3 Unidades",
    quantity: 3,
    totalPrice: 1690,
    badge: "MEJOR PRECIO",
    freeShipping: true,
  },
];

export const DEFAULT_PRICING_OPTION = PRICING_OPTIONS[1];

function formatUnitPrice(totalPrice: number, quantity: number) {
  const unitPrice = totalPrice / quantity;
  const rounded = Number.isInteger(unitPrice)
    ? unitPrice
    : Math.round(unitPrice);
  return `${formatPrice(rounded)} c/u`;
}

type PricingSelectorHombresProps = {
  selectedOption: PricingOption;
  onSelectOption: (option: PricingOption) => void;
  onPurchase: () => void;
};

export default function PricingSelectorHombres({
  selectedOption,
  onSelectOption,
  onPurchase,
}: PricingSelectorHombresProps) {
  return (
    <div id="pricing-section-hombres" className="flex w-full min-w-0 flex-col gap-3 md:gap-4">
      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
        role="radiogroup"
        aria-label="Seleccionar cantidad"
      >
        {PRICING_OPTIONS.map((option) => {
          const isSelected = selectedOption.id === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(option)}
              className={`relative flex w-full min-w-0 flex-col rounded-xl border-2 p-3.5 text-left transition-all md:p-4 ${
                isSelected
                  ? "border-[var(--h-primary)] bg-[var(--h-primary)]/10 shadow-sm"
                  : "border-gray-200 bg-white hover:border-[var(--h-primary)]/40 hover:bg-surface"
              }`}
            >
              {option.badge && (
                <span className="mb-2 inline-block w-fit rounded-full bg-[var(--h-primary)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {option.badge}
                </span>
              )}

              <span className="font-heading text-sm font-semibold text-text">
                {option.label}
              </span>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-heading text-xl font-bold text-text md:text-2xl">
                  {formatPrice(option.totalPrice)}
                </span>
                {option.freeShipping && (
                  <span className="rounded-full bg-[var(--h-primary)]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--h-primary-dark)] md:text-[10px]">
                    Envío gratis
                  </span>
                )}
              </div>

              <span className="mt-0.5 text-xs text-text-muted">
                {formatUnitPrice(option.totalPrice, option.quantity)}
              </span>
            </button>
          );
        })}
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.01, backgroundColor: "var(--h-primary-hover)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={onPurchase}
        className="w-full max-w-full rounded-full bg-[var(--h-primary)] px-3 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white shadow-sm sm:py-4 sm:text-base"
      >
        Comprar
      </motion.button>
    </div>
  );
}

export type { PricingOption };
