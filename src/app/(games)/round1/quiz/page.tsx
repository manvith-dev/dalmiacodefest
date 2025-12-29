"use client";

import { round1_questions } from "@/features/round1/config/questions";
import useQuiz from "@/features/round1/controllers/useQuiz";
import { Timer } from "@/features/round1/components/Timer";
import { SideBar } from "@/features/round1/components/Sidebar";
import { QuizCard } from "@/features/round1/components/QuizCard";

export default function QuizPage() {
  const quiz = useQuiz(round1_questions);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] h-full">
      <main className="flex flex-col items-center">
        <Timer />

        <QuizCard
          question={quiz.question}
          onPrev={quiz.prev}
          onNext={quiz.next}
          setAnswer={quiz.setAnswer}
        />
      </main>

      <SideBar questions={quiz.questions} setIdx={quiz.setIndex} />
    </section>
  );
}
