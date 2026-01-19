"use client";

import { H2, H4, Lead } from "@/components/Typography";
import Timer from "@/components/get-time-left";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [participants, setParticipants] = useState<number>(0);

  useEffect(() => {
    async function getNumberOfParticipants() {
      try {
        const res = await fetch("/api/participants/count", { method: "GET" });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || "Couldn't fetch participants count");
          return;
        }
        setParticipants(data.count - 20);
      } catch {
        toast.error("Something went wrong");
      }
    }
    getNumberOfParticipants();
  }, []);
  return (
    <main className="flex flex-col items-center justify-center gap-2">
      <H2>ADMIN DASHBOARD</H2>
      <section className="flex flex-col gap-6 items-center justify-center">
        <H4>Quick Insights</H4>
        <div className="flex flex-col w-full gap-6 items-center justify-center">
          <div className="bg-card flex flex-col flex-1 items-center justify-center gap-4 border rounded-2xl p-4">
            <H2>{participants.toString()}</H2>
            <Lead>Participants Registered</Lead>
          </div>
          <div className="flex flex-col flex-1">
            <Timer />
          </div>
        </div>
        <div className="flex flex-col flex-1"></div>
      </section>
    </main>
  );
}
