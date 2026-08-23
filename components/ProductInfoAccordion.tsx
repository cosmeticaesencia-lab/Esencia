"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type InfoItem = {
  id: string;
  title: string;
  content: string;
};

const INFO_ITEMS: InfoItem[] = [
  {
    id: "what-is",
    title: "¿Qué es ESENCIA?",
    content:
      "ESENCIA es un spray capilar de uso diario formulado para ayudar a frenar la caída del cabello y estimular su crecimiento desde la raíz. Actúa directamente sobre el cuero cabelludo, mejorando el entorno donde nace cada pelo, sin irritar ni dejar sensación grasosa.",
  },
  {
    id: "ingredients",
    title: "Ingredientes",
    content:
      "ESENCIA combina activos naturales reconocidos en el cuidado capilar: Biotina, Cafeína, Extracto de Romero, Aceite de Ricino, Pantenol y Vitamina E. Esta combinación ayuda a fortalecer el folículo, estimular la microcirculación del cuero cabelludo y nutrir el cabello desde la raíz, con una fórmula suave apta para uso diario.",
  },
  {
    id: "how-to-use",
    title: "¿Cómo se usa?",
    content:
      "Aplicá ESENCIA sobre el cuero cabelludo limpio y seco, idealmente antes de dormir, y repetí la aplicación a la mañana siguiente también con el cabello seco. Masajeá suavemente con las yemas de los dedos para favorecer la absorción. Cada botella está pensada como un tratamiento completo para un mes de uso diario constante.",
  },
  {
    id: "shipping",
    title: "¿Cuánto tarda el envío?",
    content:
      "Preparamos y despachamos tu pedido dentro de las primeras 72hs hábiles con el envío estándar. Si elegís envío express, tu pedido sale el mismo día.",
  },
];

export default function ProductInfoAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-8 md:py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200">
          {INFO_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left md:py-5"
                >
                  <span className="text-base font-medium text-text md:text-lg">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-text-muted md:pb-5 md:text-base">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
