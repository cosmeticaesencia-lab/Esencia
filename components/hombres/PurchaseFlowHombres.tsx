"use client";

import {
  CardForm,
  CheckoutProduct,
  PaymentMethod,
  PricingOption,
  ShippingForm,
  formatPrice,
  generateOrderNumber,
  getShippingCost,
  isCardFormValid,
  isCardPayment,
  isShippingFormValid,
  isValidEmail,
} from "@/components/hombres/checkout-utils";
import { PaymentMethodIconHombres } from "@/components/hombres/PaymentIconsHombres";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type PurchaseFlowHombresProps = {
  isOpen: boolean;
  onClose: () => void;
  option: PricingOption;
  product: CheckoutProduct;
};

type Step = 1 | 2 | 3 | "success";

const INITIAL_SHIPPING: ShippingForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const INITIAL_CARD: CardForm = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  holderName: "",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

function ProgressIndicator({ step }: { step: Step }) {
  if (step === "success") return null;

  const steps = [
    { number: 1, label: "Pedido" },
    { number: 2, label: "Envío" },
    { number: 3, label: "Pago" },
  ] as const;

  return (
    <div className="mb-5 flex items-center justify-center gap-1 sm:mb-6 sm:gap-2 md:gap-4">
      {steps.map(({ number, label }, index) => {
        const isActive = step === number;
        const isCompleted = step > number;

        return (
          <div key={number} className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-8 sm:w-8 sm:text-sm ${
                  isActive
                    ? "bg-[var(--h-primary)] text-white"
                    : isCompleted
                      ? "bg-[var(--h-primary)]/20 text-[var(--h-primary-dark)]"
                      : "bg-gray-100 text-text-muted"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : number}
              </div>
              <span
                className={`text-[10px] font-medium uppercase tracking-wide sm:text-xs ${
                  isActive ? "text-[var(--h-primary-dark)]" : "text-text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mb-3 h-px w-4 sm:mb-4 sm:w-6 md:w-10 ${
                  step > number ? "bg-[var(--h-primary)]/40" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PaymentMethodSelector({
  selected,
  onSelect,
}: {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}) {
  const methods: { id: PaymentMethod; label: string }[] = [
    { id: "visa", label: "Visa" },
    { id: "mastercard", label: "Mastercard" },
    { id: "mercadopago", label: "Mercado Pago" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
      {methods.map(({ id, label }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex min-w-0 flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-all sm:gap-2 sm:p-3 ${
              isSelected
                ? "border-[var(--h-primary)] bg-[var(--h-primary)]/10"
                : "border-gray-200 hover:border-[var(--h-primary)]/40"
            }`}
          >
            {id === "visa" && (
              <PaymentMethodIconHombres method="visa" className="h-4 w-auto sm:h-5" />
            )}
            {id === "mastercard" && (
              <PaymentMethodIconHombres method="mastercard" className="h-5 w-auto sm:h-6" />
            )}
            {id === "mercadopago" && (
              <PaymentMethodIconHombres method="mercadopago" className="h-6 w-auto sm:h-7" />
            )}
            {id !== "mercadopago" && (
              <span className="text-[10px] text-text-muted sm:text-xs">{label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function PurchaseFlowHombres({
  isOpen,
  onClose,
  option,
  product,
}: PurchaseFlowHombresProps) {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [shippingForm, setShippingForm] = useState<ShippingForm>(INITIAL_SHIPPING);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("visa");
  const [cardForm, setCardForm] = useState<CardForm>(INITIAL_CARD);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingCost = getShippingCost(option.freeShipping);
  const total = option.totalPrice + shippingCost;

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDirection(1);
      setShippingForm(INITIAL_SHIPPING);
      setPaymentMethod("visa");
      setCardForm(INITIAL_CARD);
      setOrderNumber("");
    }
  }, [isOpen, option.id]);

  const goToStep = (nextStep: Step, nextDirection: number) => {
    setDirection(nextDirection);
    setStep(nextStep);
  };

  const updateShipping = (field: keyof ShippingForm, value: string) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateCard = (field: keyof CardForm, value: string) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  const canContinueShipping = isShippingFormValid(shippingForm);
  const canConfirmPayment =
    isCardPayment(paymentMethod) ? isCardFormValid(cardForm) : true;

  const handleConfirmPurchase = () => {
    setOrderNumber(generateOrderNumber());
    goToStep("success", 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden md:items-center md:p-4">
      <motion.button
        type="button"
        aria-label="Cerrar checkout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative flex max-h-[100dvh] w-full max-w-full flex-col overflow-hidden bg-white md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5 sm:px-5 sm:py-4">
          <h2 id="checkout-title" className="font-heading text-base font-semibold text-text sm:text-lg">
            {step === "success" ? "Pedido confirmado" : "Finalizar compra"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface hover:text-text"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <ProgressIndicator step={step} />

          <div className="overflow-x-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex gap-4 rounded-xl border border-gray-100 bg-surface p-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-medium text-text">{product.name}</p>
                      <p className="mt-1 text-sm text-text-muted">{option.label}</p>
                      <p className="mt-1 font-heading text-lg font-bold text-text">
                        {formatPrice(option.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-gray-100 p-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Subtotal</span>
                      <span>{formatPrice(option.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Envío</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="font-medium text-green-600">Gratis</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => goToStep(2, 1)}
                      className="w-full rounded-full bg-[var(--h-primary)] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--h-primary-dark)]"
                    >
                      Continuar
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full rounded-full border border-gray-200 py-3.5 text-sm font-medium text-text transition-colors hover:bg-surface"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-text-muted">
                    Completá tus datos de envío para continuar.
                  </p>

                  <div className="grid gap-3">
                    {(
                      [
                        ["fullName", "Nombre completo", "text"],
                        ["email", "Email", "email"],
                        ["phone", "Teléfono", "tel"],
                        ["address", "Dirección", "text"],
                        ["city", "Ciudad", "text"],
                        ["postalCode", "Código postal", "text"],
                      ] as const
                    ).map(([field, label, type]) => (
                      <label key={field} className="block">
                        <span className="mb-1 block text-xs font-medium text-text-muted">
                          {label}
                        </span>
                        <input
                          type={type}
                          value={shippingForm[field]}
                          onChange={(event) => updateShipping(field, event.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--h-primary)] focus:ring-2 focus:ring-[var(--h-primary)]/20"
                        />
                        {field === "email" &&
                          shippingForm.email.trim() !== "" &&
                          !isValidEmail(shippingForm.email) && (
                            <span className="mt-1 block text-xs text-red-500">
                              Ingresá un email válido.
                            </span>
                          )}
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="button"
                      disabled={!canContinueShipping}
                      onClick={() => goToStep(3, 1)}
                      className="w-full rounded-full bg-[var(--h-primary)] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--h-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Continuar
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(1, -1)}
                      className="w-full rounded-full border border-gray-200 py-3.5 text-sm font-medium text-text transition-colors hover:bg-surface"
                    >
                      Atrás
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <p className="mb-3 text-sm font-medium text-text">
                      Método de pago
                    </p>
                    <PaymentMethodSelector
                      selected={paymentMethod}
                      onSelect={setPaymentMethod}
                    />
                  </div>

                  {isCardPayment(paymentMethod) && (
                    <div className="grid gap-3">
                      {(
                        [
                          ["cardNumber", "Número de tarjeta", "text"],
                          ["expiry", "Vencimiento (MM/AA)", "text"],
                          ["cvv", "CVV", "text"],
                          ["holderName", "Nombre del titular", "text"],
                        ] as const
                      ).map(([field, label, type]) => (
                        <label key={field} className="block">
                          <span className="mb-1 block text-xs font-medium text-text-muted">
                            {label}
                          </span>
                          <input
                            type={type}
                            value={cardForm[field]}
                            onChange={(event) => updateCard(field, event.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--h-primary)] focus:ring-2 focus:ring-[var(--h-primary)]/20"
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {paymentMethod === "mercadopago" && (
                    <p className="rounded-lg bg-surface px-4 py-3 text-sm text-text-muted">
                      Serás redirigido a Mercado Pago para completar el pago (simulado).
                    </p>
                  )}

                  <div className="rounded-xl border border-gray-100 bg-surface p-4 text-sm">
                    <div className="flex justify-between font-semibold">
                      <span>Total a pagar</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      disabled={!canConfirmPayment}
                      onClick={handleConfirmPurchase}
                      className="w-full rounded-full bg-[var(--h-primary)] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--h-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Confirmar compra
                    </button>
                    <button
                      type="button"
                      onClick={() => goToStep(2, -1)}
                      className="w-full rounded-full border border-gray-200 py-3.5 text-sm font-medium text-text transition-colors hover:bg-surface"
                    >
                      Atrás
                    </button>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="space-y-5 py-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <motion.div
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Check className="h-10 w-10 text-green-600" strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-text sm:text-2xl">
                      ¡Pedido confirmado!
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">
                      Tu número de orden es{" "}
                      <span className="font-semibold text-text">{orderNumber}</span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4 text-left text-sm">
                    <p className="font-medium text-text">{product.name}</p>
                    <p className="mt-1 text-text-muted">{option.label}</p>
                    <p className="mt-2 text-text-muted">
                      Envío a: {shippingForm.address}, {shippingForm.city}
                    </p>
                    <p className="mt-3 border-t border-gray-100 pt-3 font-semibold text-text">
                      Total pagado: {formatPrice(total)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full bg-[var(--h-primary)] py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--h-primary-dark)]"
                  >
                    Cerrar
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
