"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Result = {
  score: number;
  timeTaken: number;
};

export default function SubmittedPage() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("result");
    if (!data) return;

    try {
      setResult(JSON.parse(data));
      sessionStorage.removeItem("result");
    } catch {
      // corrupted or tampered data — ignore silently
      sessionStorage.removeItem("result");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid px-4">
      <div className="bg-card text-card-foreground border border-border rounded-xl shadow-xl p-10 sm:p-14 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-4 bg-primary/10 ring-2 ring-primary/30">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Round 2</h1>

        <p className="text-muted-foreground mb-6">
          Your responses have been recorded successfully.
        </p>
        <p className="mb-6 text-sm font-bold text-destructive uppercase tracking-wide">
          ⚠️ Do not reload, refresh, or close this page
        </p>

        {result && (
          <div className="mb-8 space-y-1 text-sm">
            <p>
              <span className="font-medium">Score:</span> {result.score}
            </p>
            <p>
              <span className="font-medium">Time taken:</span>{" "}
              {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
            </p>
          </div>
        )}

        <Button onClick={() => router.push("/")} className="w-full">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
