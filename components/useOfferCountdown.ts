"use client";

import { useEffect, useState } from "react";

const MIN_MINUTES = 30;
const MAX_MINUTES = 120;

function randomDurationMs() {
  const minutes =
    MIN_MINUTES + Math.floor(Math.random() * (MAX_MINUTES - MIN_MINUTES + 1));
  return minutes * 60 * 1000;
}

function createEndTime(storageKey: string) {
  const end = Date.now() + randomDurationMs();
  localStorage.setItem(storageKey, String(end));
  return end;
}

function getEndTime(storageKey: string) {
  const stored = localStorage.getItem(storageKey);
  const now = Date.now();

  if (stored) {
    const end = Number(stored);
    if (!Number.isNaN(end) && end > now) {
      return end;
    }
  }

  return createEndTime(storageKey);
}

function formatMMSS(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useOfferCountdown(storageKey: string) {
  const [display, setDisplay] = useState("--:--");

  useEffect(() => {
    let endTime = getEndTime(storageKey);

    const tick = () => {
      const now = Date.now();

      if (now >= endTime) {
        endTime = createEndTime(storageKey);
      }

      const remainingSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setDisplay(formatMMSS(remainingSeconds));
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [storageKey]);

  return display;
}
