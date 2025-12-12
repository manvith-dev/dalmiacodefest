import Image from "next/image";
import { Navbar } from "./Navbar";
import { H1, Lead, Muted } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HeroSection() {
  return (
    <div
      className="flex flex-col gap-4 items-center relative h-screen w-screen overflow-hidden"
      style={{ backgroundImage: "url('/HeroImage.png')" }}
    >
      <Navbar />

      <Image
        src={"/PdlcBanner.png"}
        alt="college logo"
        width={614}
        height={164}
      />

      <div className="flex flex-row py-8 p-16 w-full">
        <div className="flex flex-1 flex-col gap-4 py-16">
          <H1 className="">DALMIA CODE FEST</H1>

          <Muted>
            {
              "A three-round tech challenge where teams battle through, rapid-fire logic, design, and real coding.\nBuilt to test how fast you think, how well you create, and how smart you solve"
            }
          </Muted>
          <div className="flex flex-row gap-2">
            <Button variant="default">Register Now</Button>
            <Button variant="outline">Read More</Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-1 items-center justify-center  ">
          <div className="flex flex-col items-center justify-center border rounded-md p-8">
            <Muted>presented by</Muted>
            <Image
              src={"/DlitaLogo.png"}
              alt="dalmia dlita logo"
              width={164}
              height={164}
            />
            <Lead>{"Dalmia Lions I.T. Association"}</Lead>
          </div>
        </div>
      </div>
    </div>
  );
}
