"use client";

import Image from "next/image";

export type SocialProofImage = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: SocialProofImage[] = [
  { src: "/images/l1.png", alt: "Cliente satisfecha 1" },
  { src: "/images/l2.png", alt: "Cliente satisfecha 2" },
  { src: "/images/l3.png", alt: "Cliente satisfecha 3" },
  { src: "/images/l4.png", alt: "Cliente satisfecha 4" },
  { src: "/images/l5.png", alt: "Cliente satisfecha 5" },
  { src: "/images/l6.png", alt: "Cliente satisfecha 6" },
  { src: "/images/l7.png", alt: "Cliente satisfecha 7" },
  { src: "/images/l8.png", alt: "Cliente satisfecha 8" },
  { src: "/images/l9.png", alt: "Cliente satisfecha 9" },
  { src: "/images/l10.png", alt: "Cliente satisfecha 10" },
];

type SocialProofCarouselProps = {
  images?: SocialProofImage[];
  title?: string;
  subtitle?: string;
};

function ImageTrack({ images }: { images: SocialProofImage[] }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-1.5 md:gap-4 md:px-2">
      {images.map((image, index) => (
        <div
          key={`${image.alt}-${index}`}
          className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-2xl bg-gray-200 md:h-[280px] md:w-[280px]"
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 180px, 280px"
            />
          ) : (
            <span className="sr-only">{image.alt}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function SocialProofCarousel({
  images = DEFAULT_IMAGES,
  title = "Ellas ya se animaron",
  subtitle = "+ Más de 3500 clientas Satisfechas",
}: SocialProofCarouselProps) {
  return (
    <section className="w-full overflow-hidden bg-white py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-2xl px-4 text-center md:mb-10">
        <h2 className="font-heading text-2xl font-bold leading-tight text-primary-dark md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-text/80 md:mt-4 md:text-sm">
          {subtitle}
        </p>
      </header>

      <div
        className="relative overflow-hidden"
        aria-label="Galería de clientas satisfechas"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          <ImageTrack images={images} />
          <div aria-hidden="true">
            <ImageTrack images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
