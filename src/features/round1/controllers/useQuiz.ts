import { useState } from "react";
import { Round1QuestionsType } from "../round_one.types";

export default function useQuiz(initialQuestions: Round1QuestionsType[]) {
  const [idx, setIdx] = useState(0);
  const [questions, setQuestions] =
    useState<Round1QuestionsType[]>(initialQuestions);

  const question = questions[idx];

  const next = () => setIdx((i) => Math.min(i + 1, questions.length - 1));

  const prev = () => setIdx((i) => Math.max(i - 1, 0));

  const setIndex = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setIdx(index);
  };

  const setAnswer = (selected: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx && q.userAnswer === null
          ? {
              ...q,
              userAnswer: selected,
              isCorrect: selected === q.correctOption,
              isVisited: true,
            }
          : q
      )
    );
  };

  return {
    idx,
    question,
    questions,
    total: questions.length,
    next,
    prev,
    setAnswer,
    setIndex,
  };
}
