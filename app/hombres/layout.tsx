import type { Metadata } from "next";
import "./hombres.css";

export const metadata: Metadata = {
  title: "ESENCIA Hombres — Detiene la Caída del Cabello",
  description:
    "Spray capilar ESENCIA para hombres. Frena la caída y estimula el crecimiento desde la raíz.",
};

export default function HombresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="hombres-theme">{children}</div>;
}
