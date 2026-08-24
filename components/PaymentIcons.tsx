import Image from "next/image";
import { Truck } from "lucide-react";

type PaymentIconsProps = {
  className?: string;
  size?: "sm" | "md";
};

const MERCADO_PAGO_LOGO = "/images/payments/mercado-pago.webp";
const DAC_LOGO = "/images/payments/dac.png";

function MercadoPagoLogo({ className }: { className?: string }) {
  return (
    <Image
      src={MERCADO_PAGO_LOGO}
      alt="Mercado Pago"
      width={866}
      height={650}
      className={className}
    />
  );
}

export default function PaymentIcons({
  className = "",
  size = "md",
}: PaymentIconsProps) {
  const iconHeight = size === "sm" ? "h-5" : "h-6";

  return (
    <div
      className={`flex w-full flex-col items-center gap-1.5 ${className}`}
      aria-label="Medios de pago y envío seguro"
    >
      <div className="flex items-center gap-5 sm:gap-6">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 36 16"
            className={`${iconHeight} w-[2.25rem] shrink-0 sm:w-auto`}
            aria-label="Visa"
            role="img"
          >
            <text
              x="0"
              y="13"
              fill="#1A1F71"
              fontSize="14"
              fontWeight="700"
              fontFamily="Arial, sans-serif"
            >
              VISA
            </text>
          </svg>

          <svg
            viewBox="0 0 36 24"
            className={`${iconHeight} w-auto shrink-0`}
            aria-label="Mastercard"
            role="img"
          >
            <circle cx="12" cy="12" r="10" fill="#EB001B" />
            <circle cx="24" cy="12" r="10" fill="#F79E1B" />
          </svg>

          <MercadoPagoLogo className={`${iconHeight} w-auto shrink-0`} />
        </div>

        <span className="h-4 w-px shrink-0 bg-gray-200" aria-hidden="true" />

        <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-text-muted sm:gap-2 sm:text-xs">
          <Truck className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
          <span className="whitespace-nowrap">Envío seguro</span>
          <Image
            src={DAC_LOGO}
            alt="DAC"
            width={120}
            height={40}
            className="h-5 w-auto rounded-sm object-contain"
          />
        </div>
      </div>

      <p className="text-center text-[10px] text-text-muted sm:text-xs">
        Hasta 12 cuotas{" "}
        <span className="font-semibold text-primary-dark">sin interés</span>
      </p>
    </div>
  );
}

export function PaymentMethodIcon({
  method,
  className = "",
}: {
  method: "visa" | "mastercard" | "mercadopago";
  className?: string;
}) {
  if (method === "visa") {
    return (
      <svg viewBox="0 0 48 16" className={className} aria-hidden="true">
        <text
          x="0"
          y="13"
          fill="#1A1F71"
          fontSize="14"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
        >
          VISA
        </text>
      </svg>
    );
  }

  if (method === "mastercard") {
    return (
      <svg viewBox="0 0 36 24" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#EB001B" />
        <circle cx="24" cy="12" r="10" fill="#F79E1B" />
      </svg>
    );
  }

  return <MercadoPagoLogo className={className} />;
}
