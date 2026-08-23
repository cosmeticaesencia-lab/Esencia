"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderHombresProps = {
  brandName?: string;
};

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
      <div className="mx-auto flex h-11 max-w-7xl items-center px-4 sm:h-12 md:px-6 lg:px-8">
        <Link
          href="/hombres"
          className="font-heading text-lg font-semibold uppercase tracking-[0.12em] text-text sm:text-xl"
        >
          {brandName}
        </Link>
      </div>
    </header>
  );
}
