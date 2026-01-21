import { useState, useEffect } from "react";
import { Round1QuestionsType } from "../round_one.types";
import { STORAGE_KEY, END_TIME_KEY } from "../config/constants";
import { useRouter } from "next/navigation";
import { ROUND1DURATION } from "../config/constants";

export default function useQuiz(round1Questions: Round1QuestionsType[]) {
  const router = useRouter();
  const [idx, setIndex] = useState<number>(0);
  const [questions, setQuestions] =
    useState<Round1QuestionsType[]>(round1Questions);

  useEffect(() => {
    if (questions.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    if (round1Questions.length === 0) return;
    setQuestions(round1Questions);
  }, [round1Questions]);

  const question = questions[idx];

  const onNext = () => setIndex((i) => Math.min(i + 1, questions.length - 1));

  const onPrev = () => setIndex((i) => Math.max(i - 1, 0));

  const goToIndex = (index: number) => {
    if (index < 0 || index >= questions.length) return;
    setIndex(index);
  };

  const setAnswer = async (selected: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx && q.userAnswer === null
          ? {
              ...q,
              userAnswer: selected,
              isCorrect: selected === q.correctOption,
              isVisited: true,
            }
          : q,
      ),
    );
    onNext();
  };

  const submit = async (secondsLeft: number) => {
    const score = questions.reduce((total, q) => {
      if (q.isCorrect === true && typeof q.marks === "number") {
        return total + q.marks;
      }
      return total;
    }, 0);

    sessionStorage.setItem(
      "result",
      JSON.stringify({
        score,
        timeTaken: ROUND1DURATION - secondsLeft,
      }),
    );

    try {
      const res = await fetch("/api/round1/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, secondsLeft }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(END_TIME_KEY);
      console.log("Quiz submitted successfully");
      router.push("/round1/submitted");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return {
    idx,
    question,
    questions,
    total: questions.length,
    onNext,
    onPrev,
    setAnswer,
    goToIndex,
    submit,
  };
}
