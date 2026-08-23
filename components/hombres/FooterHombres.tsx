import Link from "next/link";

export default function FooterHombres() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-8 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/hombres"
          className="font-heading text-lg font-semibold uppercase tracking-[0.12em] text-[var(--h-primary-dark)] sm:text-xl"
        >
          ESENCIA
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-text-muted transition-colors hover:text-[var(--h-primary-dark)]"
          >
            Mujeres
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            ·
          </span>
          <Link
            href="/hombres"
            className="font-medium text-[var(--h-primary-dark)] transition-colors hover:text-[var(--h-primary)]"
          >
            Hombres
          </Link>
        </nav>

        <p className="text-xs text-text-muted md:text-sm">
          © 2026 ESENCIA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
