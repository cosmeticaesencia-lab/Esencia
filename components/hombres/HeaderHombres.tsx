"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderHombresProps = {
  brandName?: string;
};

function scrollToPricing() {
  document.getElementById("pricing-section-hombres")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

export default function HeaderHombres({ brandName = "ESENCIA" }: HeaderHombresProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-transparent bg-background transition-shadow duration-300 ${
        scrolled ? "border-gray-100 shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-11 w-full max-w-7xl items-center justify-between px-4 sm:h-12 md:px-6 lg:px-8">
        <Link
          href="/hombres"
          className="font-heading text-lg font-semibold uppercase tracking-[0.12em] text-text sm:text-xl"
        >
          {brandName}
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="hidden text-xs font-medium text-text-muted transition-colors hover:text-[var(--h-primary-dark)] sm:inline sm:text-sm"
          >
            Ver mujeres
          </Link>
          <button
            type="button"
            onClick={scrollToPricing}
            className="rounded-full bg-[var(--h-primary)] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[var(--h-primary-hover)] sm:px-4 sm:py-2 sm:text-xs"
          >
            Comprar
          </button>
        </div>
      </div>
    </header>
  );
}
