"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "results",
    question: "¿En cuánto tiempo voy a ver resultados?",
    answer:
      "La mayoría de los usuarios empieza a notar menos caída entre la 3ra y 4ta semana. Para ver crecimiento visible se recomienda uso constante durante al menos 8 semanas.",
  },
  {
    id: "genetic",
    question: "¿Sirve si la calvicie es hereditaria?",
    answer:
      "Sí, muchos hombres con predisposición genética eligen Esencia para frenar el avance. Si tenés dudas puntuales sobre tu caso, te recomendamos consultar con un profesional de la salud.",
  },
  {
    id: "greasy",
    question: "¿Engrasa el pelo?",
    answer:
      "No. La fórmula de Esencia es liviana, se absorbe rápido y no deja sensación de pelo pesado ni grasoso.",
  },
  {
    id: "dyed-hair",
    question: "¿Puedo usarlo si tengo el pelo teñido?",
    answer:
      "Sí, Esencia es compatible con cabello teñido o con tratamientos químicos previos.",
  },
  {
    id: "daily-use",
    question: "¿Tengo que usarlo todos los días?",
    answer:
      "Sí, la aplicación diaria es clave para sostener los resultados en el tiempo.",
  },
  {
    id: "guarantee",
    question: "¿Y si no funciona en mi caso?",
    answer:
      "Ofrecemos garantía de satisfacción: si no estás conforme, podés solicitar la devolución dentro del plazo establecido.",
  },
];

type FAQAccordionHombresProps = {
  variant?: "default" | "compact";
  className?: string;
};

export default function FAQAccordionHombres({
  variant = "default",
  className = "",
}: FAQAccordionHombresProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isCompact = variant === "compact";

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const content = (
    <>
      <h2
        className={
          isCompact
            ? "mb-2.5 font-heading text-sm font-semibold text-text"
            : "mb-5 font-heading text-xl font-semibold text-text md:mb-6 md:text-2xl"
        }
      >
        Preguntas frecuentes
      </h2>

      <div className="border-t border-gray-200">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-3 text-left ${
                  isCompact ? "py-2.5" : "gap-4 py-4 md:py-5"
                }`}
              >
                <span
                  className={`font-semibold leading-snug text-text ${
                    isCompact ? "text-sm" : "text-sm md:text-base"
                  }`}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={`shrink-0 text-text-muted transition-transform duration-300 ${
                    isCompact ? "h-4 w-4" : "h-5 w-5"
                  } ${isOpen ? "rotate-180" : "rotate-0"}`}
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
                    <p
                      className={`leading-relaxed text-text-muted ${
                        isCompact
                          ? "pb-2.5 text-xs"
                          : "pb-4 text-sm md:pb-5 md:text-base"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );

  if (isCompact) {
    return (
      <div className={`w-full min-w-0 pt-2 ${className}`.trim()}>{content}</div>
    );
  }

  return (
    <section
      className={`mx-auto w-full max-w-7xl bg-white px-4 py-8 sm:px-6 md:py-10 lg:px-8 ${className}`.trim()}
    >
      <div className="mx-auto max-w-3xl">{content}</div>
    </section>
  );
}
