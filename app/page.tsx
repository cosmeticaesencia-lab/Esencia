import ProductHero from "@/components/ProductHero";
import ResultsTimeline, {
  type TimelineMilestone,
} from "@/components/ResultsTimeline";
import SocialProofCarousel from "@/components/SocialProofCarousel";
import ComparisonTable from "@/components/ComparisonTable";
import FeatureMarquee from "@/components/FeatureMarquee";
import BeforeAfterTestimonials from "@/components/BeforeAfterTestimonials";
import TrustSection from "@/components/TrustSection";
import DeliveryReviews from "@/components/DeliveryReviews";
import ProductInfoAccordion from "@/components/ProductInfoAccordion";

const RESULTS_MILESTONES: TimelineMilestone[] = [
  {
    id: "month-1",
    label: "MES 1",
    image: "/images/timeline-1.svg",
    badge: "PRIMERAS SEÑALES",
    eyebrow: "SE REPARA EL CUERO CABELLUDO",
    title: "Menos caída desde las primeras semanas",
    description:
      "Las usuarias empiezan a notar menos pelo en la almohada y un cuero cabelludo más equilibrado, con una sensación de frescura al aplicar Esencia cada día.",
  },
  {
    id: "month-2",
    label: "2 MESES",
    image: "/images/timeline-2.svg",
    badge: "MÁS CRECIMIENTO",
    eyebrow: "FORTALECE LA RAÍZ",
    title: "Cabello más denso y con más volumen",
    description:
      "Con el uso constante, la raíz se siente más firme y el cabello gana cuerpo. Muchas usuarias notan baby hairs visibles y más densidad al peinarse.",
  },
  {
    id: "month-3",
    label: "3 MESES",
    image: "/images/timeline-3.svg",
    badge: "TRANSFORMACIÓN",
    eyebrow: "RESULTADOS VISIBLES",
    title: "Un cambio que se nota y se sostiene",
    description:
      "A los tres meses, la diferencia es clara: menos caída, más crecimiento y un cabello que se ve más sano, fuerte y lleno de vida.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      <ProductHero />
      <ResultsTimeline milestones={RESULTS_MILESTONES} />
      <SocialProofCarousel />
      <ComparisonTable />
      <FeatureMarquee />
      <BeforeAfterTestimonials />
      <TrustSection />
      <DeliveryReviews />
      <ProductInfoAccordion />
    </main>
  );
}
