"use client";

import Image from "next/image";
import { Navbar } from "./Navbar";
import {
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Lead,
  Muted,
  P,
} from "@/components/Typography";

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
  title: "DALMIA CODE FEST 1.0",
  tagline: "The Code Fu League",
  description:
    "A three-round tech challenge where teams battle through, rapid-fire logic, design, and real coding. Built to test how fast you think, how well you create, and how smart you solve",
  date: "30th January, 2026",
  time: "9:00 AM - 12:00 PM",
  location: "PDLC, Mumbai",
  map_link: "https://maps.app.goo.gl/mXsyMt9KEBXHqfhy8",
};

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const eventDate = new Date("January 30, 2026 09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Event has started!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className="flex flex-col gap-4 px-8 md:px-16 items-center relative min-h-screen max-w-screen overflow-hidden"
      style={{ backgroundImage: "url('/HeroImage.png')" }}
    >
      <div className="opacity-40 flex items-center justify-center">
        <div className="z-50 absolute top-0 px-2 bg-white text-black font-bold flex items-center justify-center">
          THE WEBSITE IS UNDER DEVELOPMENT. FEATURES MAY NOT WORK.
        </div>
      </div>
      <Navbar />
      <Image
        src={"/PdlcBanner.png"}
        alt="college logo"
        width={16 * 30}
        height={164}
      />
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-16">
          <div className="flex flex-col gap-1">
            <H1>{Data.title}</H1>
            <H2>{Data.tagline}</H2>
            <P>{Data.description}</P>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-1 items-center gap-2">
              <Calendar className="text-primary w-4 h-4" />
              <P>{Data.date}</P>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Clock className="text-primary w-4 h-4" />
              <P>{Data.time}</P>
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
            <Button variant="default">Register Now</Button>
            <Button variant="outline">Read More</Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="hidden sm:flex flex-col items-center justify-center rounded-md py-8">
            <Muted>presented by</Muted>
            <Image
              src={"/DlitaLogo.png"}
              alt="dalmia dlita logo"
              width={164}
              height={164}
            />
            <Lead>{"Dalmia Lions I.T. Association"}</Lead>
          </div>
          <div className="flex items-center border gap-2 p-1 rounded-md ">
            <Clock className="hidden sm:flex text-primary w-4 h-4" />
            <P>
              Event starts in:{" "}
              <span className="font-semibold text-sm">{timeLeft}</span>
            </P>
          </div>
        </div>
      </div>
      <div className="bg-yellow-300 text-black font-bold w-full text-center shadow-md z-40">
        Registration ends on 25th January 2026!
      </div>
    </div>
  );
}
