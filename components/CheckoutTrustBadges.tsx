import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Clock, MessageCircle, Star } from "lucide-react";

const MERCADO_PAGO_POINTS = [
  "Catalogados como vendedores premium por la empresa N°1 en ventas de Latinoamérica.",
  "Tus datos seguros durante toda la compra, protegidos por Mercado Pago.",
  "Podés reclamar fácilmente ante cualquier inconveniente, sin complicaciones.",
];

function MercadoPagoCertificate() {
  return (
    <div className="w-full rounded-xl border border-[#B8D9F0] bg-[#EAF4FC] px-3 py-3 sm:px-4 sm:py-3.5">
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:h-12 sm:w-12">
          <Image
            src="/images/payments/mercado-pago.webp"
            alt="Mercado Pago"
            width={866}
            height={650}
            className="h-7 w-auto object-contain sm:h-8"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold leading-tight text-[#0B1F35] sm:text-xs">
            Certificados por
          </p>
          <p className="text-sm font-bold leading-tight text-[#009EE3] sm:text-base">
            Mercado Pago
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#009EE3] px-2 py-0.5 text-[9px] font-semibold text-white sm:text-[10px]">
            Vendedores Premium
            <Star className="h-2.5 w-2.5 fill-white" strokeWidth={0} />
          </span>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {MERCADO_PAGO_POINTS.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#009EE3]">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-[10px] leading-snug text-[#0B1F35] sm:text-[11px]">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricIcon({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex text-[#00A650]">
      {children}
      <Check
        className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-white"
        strokeWidth={3}
      />
    </span>
  );
}

function MercadoLibreSellerBadge() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-start gap-2.5 border-b border-gray-100 px-3 py-3 sm:gap-3 sm:px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F5] sm:h-11 sm:w-11">
          <span className="font-heading text-[9px] font-bold leading-none text-[#333] sm:text-[10px]">
            ESENCIA
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold uppercase tracking-wide text-text sm:text-sm">
            COSMETICAESENCIA
          </p>
          <p className="mt-0.5 text-[10px] text-text-muted sm:text-[11px]">
            +1000 Seguidores · +3 Productos
          </p>
        </div>
        <span className="shrink-0 rounded-md border border-[#CBE7FF] bg-[#F0F8FF] px-2 py-1 text-[10px] font-medium text-[#3483FA]">
          Siguiendo
        </span>
      </div>

      <div className="space-y-2 px-3 py-3 sm:px-4">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="#00A650" />
            <path
              d="M10 4l1.2 3.7H15l-3.1 2.2 1.2 3.7L10 11.4 6.9 13.6l1.2-3.7L5 7.7h3.8L10 4z"
              fill="#fff"
            />
          </svg>
          <div>
            <p className="text-xs font-bold text-[#00A650] sm:text-sm">MercadoLíder Platinum</p>
            <p className="text-[10px] text-text-muted sm:text-[11px]">
              ¡Uno de los mejores del sitio!
            </p>
          </div>
        </div>

        <div className="flex h-1.5 overflow-hidden rounded-full">
          <span className="flex-1 bg-[#F23D4F]" />
          <span className="flex-1 bg-[#FF7733]" />
          <span className="flex-1 bg-[#FFC401]" />
          <span className="flex-1 bg-[#A9E86C]" />
          <span className="relative flex-1 bg-[#00A650]">
            <span className="absolute -top-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded-sm bg-[#00A650]" />
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div>
            <p className="text-sm font-bold text-text sm:text-base">+100</p>
            <p className="text-[10px] text-text-muted sm:text-[11px]">Ventas</p>
          </div>
          <div className="flex flex-col items-center">
            <MetricIcon>
              <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
            </MetricIcon>
            <p className="mt-1 text-[10px] leading-tight text-text-muted sm:text-[11px]">
              Buena atención
            </p>
          </div>
          <div className="flex flex-col items-center">
            <MetricIcon>
              <Clock className="h-5 w-5" strokeWidth={1.75} />
            </MetricIcon>
            <p className="mt-1 text-[10px] leading-tight text-text-muted sm:text-[11px]">
              Entrega a tiempo
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-[#F0F8FF] px-3 py-2.5 sm:px-4">
        <p className="text-center text-[11px] font-medium text-[#3483FA] sm:text-xs">
          Ir a la página del vendedor
        </p>
      </div>
    </div>
  );
}

export default function CheckoutTrustBadges() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <MercadoPagoCertificate />
      <MercadoLibreSellerBadge />
    </div>
  );
}
