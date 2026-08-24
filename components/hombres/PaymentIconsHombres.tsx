import Image from "next/image";
import { Truck } from "lucide-react";

type PaymentIconsHombresProps = {
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

export default function PaymentIconsHombres({
  className = "",
  size = "md",
}: PaymentIconsHombresProps) {
  const visaHeight = size === "sm" ? "h-3.5" : "h-4";
  const mcHeight = size === "sm" ? "h-5" : "h-6";
  const mpHeight = size === "sm" ? "h-6" : "h-7";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 ${className}`}
      aria-label="Medios de pago y envío seguro"
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <svg
        viewBox="0 0 48 16"
        className={`${visaHeight} w-auto`}
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
        className={`${mcHeight} w-auto`}
        aria-label="Mastercard"
        role="img"
      >
        <circle cx="12" cy="12" r="10" fill="#EB001B" />
        <circle cx="24" cy="12" r="10" fill="#F79E1B" />
      </svg>

      <MercadoPagoLogo className={`${mpHeight} w-auto`} />
      </div>

      <span className="hidden h-4 w-px shrink-0 bg-gray-200 sm:block" aria-hidden="true" />

      <div className="flex items-center gap-2 text-[11px] text-text-muted sm:text-xs">
        <Truck className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
        <span>Envío seguro</span>
        <Image
          src={DAC_LOGO}
          alt="DAC"
          width={120}
          height={40}
          className="h-5 w-auto rounded-sm object-contain"
        />
      </div>
    </div>
  );
}

export function PaymentMethodIconHombres({
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
