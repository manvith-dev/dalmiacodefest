"use client";

import { EVENT } from "@/config/event";
import { useState, useEffect } from "react";
import { H3 } from "./Typography";

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="text-xl sm:text-3xl font-extrabold tabular-nums"
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-sm uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function Timer() {
  const eventStart = new Date(EVENT.startAt);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventStart));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(eventStart));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventStart]);
  return (
    <div className="flex flex-col justify-center items-center gap-4 flex-1">
      <H3>Event starts in</H3>

      <div className="rounded-2xl border bg-background/60 py-2 px-4 sm:px-10 sm:py-8 backdrop-blur">
        {timeLeft && (
          <div className="flex items-center gap-4 sm:gap-10">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </div>
  );
}
