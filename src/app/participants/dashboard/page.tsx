"use client";

import { Muted } from "@/components/Typography";
import { EVENT } from "@/config/event";
import Image from "next/image";
import WhatAppImage from "@/assets/03_Stacked/01_Digital/02_SVG/Green/Digital_Stacked_Green.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Timer from "@/components/get-time-left";

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

function JoinWhatsapp() {
  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:p-0">
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
