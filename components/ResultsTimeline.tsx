"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Calendar, Check } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export type TimelineMilestone = {
  id?: string;
  label: string;
  image: string;
  imageAlt?: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
};

type ResultsTimelineProps = {
  milestones: TimelineMilestone[];
  badge?: string;
  title?: string;
  subtitle?: string;
};

type MilestoneMarkerProps = {
  scrollYProgress: MotionValue<number>;
  threshold: number;
};

function MilestoneMarker({ scrollYProgress, threshold }: MilestoneMarkerProps) {
  const [active, setActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(value >= threshold);
  });

  return (
    <div
      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors duration-300 md:h-8 md:w-8 ${
        active
          ? "border-primary bg-primary text-white"
          : "border-gray-300 bg-white text-transparent"
      }`}
    >
      <Check
        className={`h-3.5 w-3.5 md:h-4 md:w-4 ${active ? "opacity-100" : "opacity-0"}`}
        strokeWidth={3}
      />
    </div>
  );
}

type TimelineCardProps = {
  milestone: TimelineMilestone;
  index: number;
};

function TimelineCard({ milestone, index }: TimelineCardProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, x: isLeft ? -16 : 16 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 md:px-5">
        <Calendar className="h-4 w-4 text-primary-dark" strokeWidth={2} />
        <span className="text-xs font-bold tracking-wider text-text md:text-sm">
          {milestone.label}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full bg-surface">
        <Image
          src={milestone.image}
          alt={milestone.imageAlt ?? milestone.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-text shadow-sm md:left-4 md:top-4 md:px-3 md:py-1.5 md:text-xs">
          {milestone.badge}
        </span>
      </div>

      <div className="space-y-2 px-4 py-4 md:space-y-2.5 md:px-5 md:py-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-dark md:text-xs">
          {milestone.eyebrow}
        </p>
        <h3 className="font-heading text-base font-bold leading-snug text-text md:text-lg">
          {milestone.title}
        </h3>
        <p className="text-sm leading-relaxed text-text-muted md:text-[15px]">
          {milestone.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ResultsTimeline({
  milestones,
  badge = "RESULTADOS REALES",
  title = "Tu transformación, mes a mes",
  subtitle = "Seguí el progreso real de quienes usan Esencia con constancia y descubrí qué podés esperar en cada etapa.",
}: ResultsTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [markerThresholds, setMarkerThresholds] = useState<number[]>(
    milestones.map((_, index) => (index + 0.5) / milestones.length),
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateThresholds = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top + window.scrollY;
      const timelineHeight = timeline.offsetHeight;

      if (timelineHeight <= 0) return;

      const thresholds = markerRefs.current.map((marker) => {
        if (!marker) return 0;
        const markerRect = marker.getBoundingClientRect();
        const markerCenter = markerRect.top + window.scrollY + markerRect.height / 2;
        const relativePosition = (markerCenter - timelineTop) / timelineHeight;
        return Math.min(1, Math.max(0, relativePosition));
      });

      setMarkerThresholds(thresholds);
    };

    updateThresholds();

    const resizeObserver = new ResizeObserver(updateThresholds);
    resizeObserver.observe(timeline);

    window.addEventListener("resize", updateThresholds);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateThresholds);
    };
  }, [milestones]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-7xl overflow-hidden bg-white px-4 py-10 sm:px-6 md:py-16 lg:px-8"
    >
      <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
        <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-primary-dark md:text-xs">
          {badge}
        </span>
        <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-text md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted md:mt-4 md:text-base">
          {subtitle}
        </p>
      </header>

      <div ref={timelineRef} className="relative mx-auto max-w-5xl">
        {/* Línea vertical — track gris + relleno primario */}
        <div
          aria-hidden
          className="absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-gray-200 left-[1.125rem] md:left-1/2"
        >
          <motion.div
            className="absolute left-0 top-0 w-full origin-top bg-primary"
            style={{ height: fillHeight }}
          />
        </div>

        <div className="flex flex-col gap-10 md:gap-16">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={milestone.id ?? milestone.label} className="relative">
                {/* Marcador sobre la línea */}
                <div
                  ref={(element) => {
                    markerRefs.current[index] = element;
                  }}
                  className="absolute top-8 z-10 -translate-x-1/2 left-[1.125rem] md:left-1/2"
                >
                  <MilestoneMarker
                    scrollYProgress={scrollYProgress}
                    threshold={markerThresholds[index] ?? 0}
                  />
                </div>

                {/* Tarjeta — mobile: siempre a la derecha; desktop: zigzag */}
                <div
                  className={`pl-10 md:pl-0 ${
                    isLeft
                      ? "md:mr-[calc(50%+1.75rem)]"
                      : "md:ml-[calc(50%+1.75rem)]"
                  }`}
                >
                  <TimelineCard milestone={milestone} index={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
