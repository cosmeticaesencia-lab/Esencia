import Image from "next/image";

type PaymentIconsHombresProps = {
  className?: string;
  size?: "sm" | "md";
};

const MERCADO_PAGO_LOGO = "/images/payments/mercado-pago.webp";

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
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
      aria-label="Medios de pago aceptados"
    >
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
