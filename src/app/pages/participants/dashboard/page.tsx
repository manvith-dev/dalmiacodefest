"use client";

import { H2, H3, H4, Muted } from "@/components/Typography";
import { EVENT } from "@/config/event";
import Image from "next/image";
import { useEffect, useState } from "react";
import WhatAppImage from "@/assets/03_Stacked/01_Digital/02_SVG/Green/Digital_Stacked_Green.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ParticipantDashboardPage() {
  return (
    <main className="w-full h-full">
      <section className="flex flex-col p-8 gap-12">
        <Timer />
        <JoinWhatsapp />
      </section>
    </main>
  );
}

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
        className="text-3xl font-extrabold tabular-nums"
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

function Timer() {
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

      <div className="rounded-2xl border bg-background/60 px-10 py-8 backdrop-blur">
        {timeLeft && (
          <div className="flex items-center gap-10">
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

function JoinWhatsapp() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={WhatAppImage} alt="WhatsApp image" height={128} width={128} />
      <Button
        asChild
        className="bg-green-500 text-background font-semibold hover:bg-green-800"
      >
        <Link
          href={EVENT.WhatsAppGroupLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Group
        </Link>
      </Button>
      <Muted>Join our WhatsApp group for updates.</Muted>
    </div>
  );
}
