"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEY } from "@/features/round3/config/constants";
import { Round3QuestionsType } from "@/features/round3/round_three.types";
import { toast } from "sonner";
import ProblemStatementContainer from "@/features/round3/components/ProblemStatement";
import { Round3Provider } from "@/features/round3/controllers/RoundThreeContext";
import UserAnswerContainer from "@/features/round3/components/UserAnswerContainer";

export default function Round3Page() {
  const [r3questions, setR3Questions] = useState<Round3QuestionsType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getQuestions() {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        toast.error("Session expired. Please login again.");
        router.replace("/round3/login");
        return;
      }

      if (saved) {
        try {
          setR3Questions(JSON.parse(saved));
          return;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    getQuestions();
  }, []);

  if (r3questions.length === 0) {
    return <div>Loading…</div>;
  }
  return (
    <Round3Provider questions={r3questions}>
      <main className="flex flex-col md:grid md:grid-cols-2 border p-4 gap-4 h-full">
        <ProblemStatementContainer />
        <UserAnswerContainer />
      </main>
    </Round3Provider>
  );
}
