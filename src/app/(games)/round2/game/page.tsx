"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CodeSnippetContainer from "@/features/round2/components/CodeSnippetContainer";
import ProblemContainer from "@/features/round2/components/ProblemContainer";
import { STORAGE_KEY } from "@/features/round2/config/constants";
import { Round2QuestionsType } from "@/features/round2/round_two.types";
import { toast } from "sonner";
import { Round2Provider } from "@/features/round2/controllers/RoundTwoContesxt";

export default function Round2Page() {
  const [r2questions, setR2Questions] = useState<Round2QuestionsType[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getQuestions() {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        toast.error("Session expired. Please login again.");
        router.replace("/round2/login");
        return;
      }

      if (saved) {
        try {
          setR2Questions(JSON.parse(saved));
          return;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    getQuestions();
  }, []);

  if (r2questions.length === 0) {
    return <div>Loading…</div>;
  }
  return (
    <Round2Provider questions={r2questions}>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-4 h-full">
        <CodeSnippetContainer />
        <ProblemContainer />
      </div>
    </Round2Provider>
  );
}
