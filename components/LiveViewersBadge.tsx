"use client";

import { useEffect, useState } from "react";

const MIN_VIEWERS = 7;
const MAX_VIEWERS = 20;
const TICK_MS = 45_000;

function randomViewerCount() {
  return Math.floor(Math.random() * (MAX_VIEWERS - MIN_VIEWERS + 1)) + MIN_VIEWERS;
}

function nudgeViewerCount(current: number) {
  const delta = Math.random() > 0.5 ? 1 : -1;
  return Math.min(MAX_VIEWERS, Math.max(MIN_VIEWERS, current + delta));
}

export default function LiveViewersBadge() {
  const [viewers, setViewers] = useState<number | null>(null);

  useEffect(() => {
    setViewers(randomViewerCount());

    const timer = window.setInterval(() => {
      setViewers((current) => (current === null ? randomViewerCount() : nudgeViewerCount(current)));
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, []);

  if (viewers === null) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text-muted md:text-sm">
      <span className="sr-only">Personas viendo ahora:</span>
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        <span className="font-semibold text-text">{viewers}</span> viendo ahora
      </span>
    </span>
  );
}
