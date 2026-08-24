"use client";

import { useOfferCountdown } from "@/components/useOfferCountdown";
import { Clock } from "lucide-react";

type OfferCountdownProps = {
  storageKey: string;
};

export default function OfferCountdown({ storageKey }: OfferCountdownProps) {
  const timeLeft = useOfferCountdown(storageKey);

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 px-1 text-center text-[11px] font-semibold leading-snug text-orange-700 sm:text-xs">
      <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
      <span>
        Oferta 2x1 y 3x1 + envío gratis termina en{" "}
        <span className="tabular-nums" suppressHydrationWarning>
          {timeLeft}
        </span>
      </span>
    </p>
  );
}
