"use client";

import useQuiz from "@/features/round1/controllers/useQuiz";
import { Timer } from "@/features/round1/components/Timer";
import { SideBar } from "@/features/round1/components/Sidebar";
import { QuizCard } from "@/features/round1/components/QuizCard";
import { QuizProvider } from "@/features/round1/controllers/QuizContext";
import { useEffect, useState } from "react";
import { Round1QuestionsType } from "@/features/round1/round_one.types";
import { toast } from "sonner";
import { STORAGE_KEY } from "@/features/round1/config/constants";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const [r1questions, setR1Questions] = useState<Round1QuestionsType[]>([]);
  const router = useRouter();

  const quiz = useQuiz(r1questions);
  useEffect(() => {
    async function getQuestions() {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        toast.error("Session expired. Please login again.");
        router.replace("/round1/login");
        return;
      }

      if (saved) {
        try {
          setR1Questions(JSON.parse(saved));
          return;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    getQuestions();
  }, []);

  if (quiz.questions.length === 0) {
    return <div>Loading…</div>;
  }

  return (
    <QuizProvider questions={quiz.questions}>
      <section className="min-h-screen bg-grid grid grid-cols-1 lg:grid-cols-[3fr_1fr] xl:grid-cols-[4fr_1fr]">
        <main className="flex flex-col items-center justify-center">
          <QuizCard />
        </main>
        <SideBar />
      </section>
    </QuizProvider>
  );
}
