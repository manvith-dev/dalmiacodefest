"use client";

import Image from "next/image";
import { Navbar } from "./Navbar";
import { H1, H2, H3, Lead, Muted, P } from "@/components/Typography";
import { EVENT } from "@/config/event";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Map } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Data = {
  location: "PDLC, Mumbai",
  map_link: "https://maps.app.goo.gl/mXsyMt9KEBXHqfhy8",
};

export default function HeroSection() {
  const eventDate = new Date(EVENT.date);

  return (
    <div
      className="flex flex-col gap-4 px-8 md:px-16 items-center relative min-h-screen max-w-screen overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/HeroImage.jpg')",
      }}
    >
      <Navbar />
      <Image
        src={"/PdlcBanner.webp"}
        alt="college logo"
        width={16 * 30}
        height={164}
      />
      <div className="flex flex-col md:flex-row w-full ">
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-8">
          <div className="flex flex-col gap-1">
            <H1>{EVENT.name}</H1>
            <H2>{EVENT.tagline}</H2>
            <P>{EVENT.description}</P>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-1 items-center gap-2">
              <Calendar className="text-primary w-4 h-4" />
              <P>
                {eventDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </P>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Clock className="text-primary w-4 h-4" />
              <P>{EVENT.time}</P>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-1 items-center gap-2">
                  <Map className="text-primary w-4 h-4" />
                  <Link href={Data.map_link} target="_blank">
                    <P className="leading-relaxed underline underline-offset-4">
                      {Data.location}
                    </P>
                  </Link>
                  <TooltipContent>
                    Prahladrai Dalmia Lions College of Commerce and Economics,
                    Mumbai
                  </TooltipContent>
                </div>
              </TooltipTrigger>
            </Tooltip>
          </div>
          <div className="flex flex-row gap-2">
            <Link href="/register">
              <Button variant="default">Register Now</Button>
            </Link>
            {/* <Button variant="outline">Read More</Button> */}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="hidden sm:flex flex-col items-center justify-center rounded-md py-8">
            <Muted>{"presented by"}</Muted>
            <P>{"SFC Program B.Sc.I.T. & B.Sc.C.S"}</P>
            <Muted>{"and"}</Muted>
            <Image
              src={"/DlitaLogo.webp"}
              alt="dalmia dlita logo"
              width={164}
              height={164}
            />
            <Lead>{"Dalmia Lions I.T. Association"}</Lead>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-5 border rounded-lg bg-background/80 backdrop-blur-sm mb-8">
        <div className="flex flex-col gap-1">
          <Muted className="uppercase tracking-[0.2em] font-semibold text-xs">
            The Project
          </Muted>

          <H3 className="text-xl md:text-2xl border-0 pb-0">
            DCF has concluded.
          </H3>

          <P className="text-sm text-muted-foreground">
            Explore the platform that powered the competition.
          </P>
        </div>

        <div className="shrink-0">
          <Link href={"/project"}>
            <Button
              variant="default"
              className="
        group relative overflow-hidden
        bg-yellow-300 text-black
        border-2 border-yellow-200
        transition-all duration-300
        hover:bg-yellow-200
        hover:shadow-[0_8px_30px_rgba(253,224,71,0.35)]
        "
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore The Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>

              <span
                className="
          absolute inset-0
          -translate-x-full
          skew-x-12
          bg-white/30
          transition-transform duration-700
          group-hover:translate-x-full
          "
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
