import AnnouncementBarHombres from "@/components/hombres/AnnouncementBarHombres";
import BeforeAfterTestimonialsHombres from "@/components/hombres/BeforeAfterTestimonialsHombres";
import ComparisonTableHombres from "@/components/hombres/ComparisonTableHombres";
import DeliveryReviewsHombres from "@/components/hombres/DeliveryReviewsHombres";
import FeatureMarqueeHombres from "@/components/hombres/FeatureMarqueeHombres";
import FooterHombres from "@/components/hombres/FooterHombres";
import HeaderHombres from "@/components/hombres/HeaderHombres";
import ProductHeroHombres from "@/components/hombres/ProductHeroHombres";
import ProductInfoAccordionHombres from "@/components/hombres/ProductInfoAccordionHombres";
import ResultsTimelineHombres, {
  type TimelineMilestoneHombres,
} from "@/components/hombres/ResultsTimelineHombres";
import SocialProofCarouselHombres from "@/components/hombres/SocialProofCarouselHombres";
import TrustSectionHombres from "@/components/hombres/TrustSectionHombres";

const RESULTS_MILESTONES: TimelineMilestoneHombres[] = [
  {
    id: "month-1",
    label: "MES 1",
    image: "/images/mes-hombre-1.png",
    badge: "PRIMERAS SEÑALES",
    eyebrow: "SE REPARA EL CUERO CABELLUDO",
    title: "Menos caída desde las primeras semanas",
    description:
      "Los usuarios empiezan a notar menos pelo en la almohada y un cuero cabelludo más equilibrado, con una sensación de frescura al aplicar Esencia cada día.",
  },
  {
    id: "month-2",
    label: "2 MESES",
    image: "/images/mes-hombre-2.png",
    badge: "MÁS CRECIMIENTO",
    eyebrow: "FORTALECE LA RAÍZ",
    title: "Cabello más denso y con más volumen",
    description:
      "Con el uso constante, la raíz se siente más firme y el cabello gana cuerpo. Muchos usuarios notan baby hairs visibles y más densidad al peinarse.",
  },
  {
    id: "month-3",
    label: "3 MESES",
    image: "/images/mes-hombre-3.png",
    badge: "TRANSFORMACIÓN",
    eyebrow: "RESULTADOS VISIBLES",
    title: "Un cambio que se nota y se sostiene",
    description:
      "A los tres meses, la diferencia es clara: menos caída, más crecimiento y un cabello que se ve más sano, fuerte y lleno de vida.",
  },
];

export default function HombresPage() {
  return (
    <>
      <AnnouncementBarHombres />
      <HeaderHombres />
      <main className="min-h-screen w-full overflow-x-hidden bg-background">
        <ProductHeroHombres />
        <ResultsTimelineHombres milestones={RESULTS_MILESTONES} />
        <SocialProofCarouselHombres />
        <ComparisonTableHombres />
        <FeatureMarqueeHombres />
        <BeforeAfterTestimonialsHombres />
        <TrustSectionHombres />
        <DeliveryReviewsHombres />
        <ProductInfoAccordionHombres />
      </main>
      <FooterHombres />
    </>
  );
}
