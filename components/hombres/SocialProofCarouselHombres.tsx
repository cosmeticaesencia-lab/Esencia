"use client";

import Image from "next/image";

export type SocialProofImageHombres = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: SocialProofImageHombres[] = [
  { src: "", alt: "Cliente satisfecho 1" },
  { src: "", alt: "Cliente satisfecho 2" },
  { src: "", alt: "Cliente satisfecho 3" },
  { src: "", alt: "Cliente satisfecho 4" },
  { src: "", alt: "Cliente satisfecho 5" },
  { src: "", alt: "Cliente satisfecho 6" },
  { src: "", alt: "Cliente satisfecho 7" },
  { src: "", alt: "Cliente satisfecho 8" },
  { src: "", alt: "Cliente satisfecho 9" },
];

type SocialProofCarouselHombresProps = {
  images?: SocialProofImageHombres[];
  title?: string;
  subtitle?: string;
};

function ImageTrack({ images }: { images: SocialProofImageHombres[] }) {
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

export default function SocialProofCarouselHombres({
  images = DEFAULT_IMAGES,
  title = "Ellos ya se animaron",
  subtitle = "+ Más de 3500 clientes satisfechos",
}: SocialProofCarouselHombresProps) {
  return (
    <section className="w-full overflow-hidden bg-white py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-2xl px-4 text-center md:mb-10">
        <h2 className="font-heading text-2xl font-bold leading-tight text-[var(--h-primary-dark)] md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 inline-block rounded-full border border-[var(--h-primary)]/30 bg-[var(--h-primary)]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-text/80 md:mt-4 md:text-sm">
          {subtitle}
        </p>
      </header>

      <div
        className="relative overflow-hidden"
        aria-label="Galería de clientes satisfechos"
      >
        <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          <ImageTrack images={images} />
          <div aria-hidden="true">
            <ImageTrack images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
