"use client";

const MESSAGES = [
  "GARANTÍA DE 30 DÍAS",
  "2X1 + ENVÍO GRATIS",
  "COMPRA 100% SEGURA",
] as const;

function MessageTrack() {
  return (
    <div className="flex shrink-0 items-center gap-4 px-4 md:gap-8">
      {MESSAGES.map((message) => (
        <span key={message} className="flex shrink-0 items-center gap-4 md:gap-8">
          <span>{message}</span>
          <span aria-hidden="true" className="opacity-70">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="relative overflow-hidden bg-primary py-1.5 text-[10px] font-medium uppercase tracking-wide text-white sm:py-2 sm:text-xs sm:tracking-wider"
      aria-label="Anuncios promocionales"
    >
      <div className="group flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        <MessageTrack />
        <div aria-hidden="true">
          <MessageTrack />
        </div>
      </div>
    </div>
  );
}
