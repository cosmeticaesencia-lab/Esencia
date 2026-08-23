"use client";

import { useState } from "react";

type ProductTab = {
  id: string;
  label: string;
  content: string;
};

const TABS: ProductTab[] = [
  {
    id: "what-is",
    label: "¿Qué es?",
    content:
      "Esencia es un tratamiento capilar de uso diario formulado para frenar la caída del cabello y estimular el crecimiento desde la raíz. Actúa directamente sobre el cuero cabelludo con ingredientes activos de origen natural.",
  },
  {
    id: "ingredients",
    label: "Ingredientes",
    content:
      "Contiene extractos botánicos, péptidos capilares, biotina, aceites esenciales y vitaminas del complejo B. Sin parabenos, sin sulfatos agresivos y apto para uso diario.",
  },
  {
    id: "how-to-use",
    label: "¿Cómo se usa?",
    content:
      "Aplicá 10–15 gotas sobre el cuero cabelludo seco o húmedo, masajeá con la yema de los dedos durante 2 minutos y dejá actuar. No enjuagues. Usalo una vez por día, preferentemente a la noche.",
  },
  {
    id: "shipping",
    label: "¿Cuánto tarda el envío?",
    content:
      "Despachamos en 24–48 hs hábiles. El envío llega entre 3 y 7 días hábiles según tu zona. En compras de 2 o más unidades el envío es gratis a todo el país.",
  },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeContent = TABS.find((tab) => tab.id === activeTab)?.content ?? "";

  return (
    <div className="w-full min-w-0 pt-3">
      <div className="-mx-1 flex gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 px-2 py-2 text-xs font-medium transition-colors md:text-sm ${
                isActive
                  ? "border-primary text-text"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="pt-3 text-sm leading-relaxed text-text-muted">{activeContent}</p>
    </div>
  );
}
