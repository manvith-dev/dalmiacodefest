"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SubmittedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid px-4">
      <div className="bg-card text-card-foreground border border-border rounded-xl shadow-xl p-10 sm:p-14 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-4 bg-primary/10 ring-2 ring-primary/30">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Round 2 Score submitted
        </h1>

        <p className="text-muted-foreground mb-8">
          Your responses have been recorded successfully. You’re all done for
          this round.
        </p>

        <Button onClick={() => router.push("/")} className="w-full">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
