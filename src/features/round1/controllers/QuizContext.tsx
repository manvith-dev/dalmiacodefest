"use client";

import { createContext, useContext } from "react";
import useQuiz from "./useQuiz";
import { Round1QuestionsType } from "../round_one.types";
import { useTimer } from "./useTimer";

type QuizContextType = ReturnType<typeof useQuiz> & {
  secondsLeft: number;
};

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({
  questions,
  children,
}: {
  questions: Round1QuestionsType[];
  children: React.ReactNode;
}) {
  const quiz = useQuiz(questions);

  const secondsLeft = useTimer((remaining) => {
    quiz.submit(remaining);
  });

  return (
    <QuizContext.Provider value={{ ...quiz, secondsLeft }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);

  if (!ctx) {
    throw new Error("useQuizContext must be used inside QuizProvider");
  }
  return ctx;
}
