"use client";

import { createContext, useCallback, useContext } from "react";
import useQuiz from "./useQuiz";
import { Round1QuestionsType } from "../round_one.types";
import { useTimer } from "@/components/layout/games/useTimer";
import { END_TIME_KEY } from "../config/constants";

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

  const onTimeUp = useCallback(
    (remaining: number) => {
      quiz.submit(remaining);
    },
    [quiz]
  );

  const secondsLeft = useTimer(END_TIME_KEY, onTimeUp);

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
