import { useState, useEffect } from "react";
import { STORAGE_KEY, END_TIME_KEY } from "../config/constants";
import { useRouter } from "next/navigation";
import { Round3QuestionsType } from "../round_three.types";
import { ROUND3DURATION } from "../config/constants";

export default function useRound3CodeMatics(
  round3Questions: Round3QuestionsType[],
) {
  const router = useRouter();
  const [questions, setQuestions] =
    useState<Round3QuestionsType[]>(round3Questions);

  const [questionNo, setQuestionNo] = useState<number>(1);

  useEffect(() => {
    if (round3Questions.length === 0) return;
    setQuestions(round3Questions);
  }, [round3Questions]);

  useEffect(() => {
    if (questions.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const question = questions.find((q) => q.questionNo === questionNo) ?? null;
  const totalQuestions = questions.length;

  const onNext = () => {
    setQuestionNo((prev) => (prev >= totalQuestions ? 1 : prev + 1));
  };

  const onCheck = (userAnswer: string) => {
    if (!question || question.solved) return false;

    const isCorrect = question.expectedOutput.trim() === userAnswer.trim();

    setQuestions((prev) =>
      prev.map((q) =>
        q.questionNo === question.questionNo
          ? {
              ...q,
              solved: isCorrect ? true : q.solved,
              tries: isCorrect ? q.tries : q.tries + 1,
            }
          : q,
      ),
    );

    return isCorrect;
  };

  const submit = async (secondsLeft: number) => {
    const score = questions.reduce((total, q) => {
      if (q.solved === true && typeof q.maxMarks === "number") {
        return total + Math.max(0, q.maxMarks - q.tries);
      }
      return total;
    }, 0);

    try {
      sessionStorage.setItem(
        "result",
        JSON.stringify({
          score,
          timeTaken: ROUND3DURATION - secondsLeft,
        }),
      );
      const res = await fetch("/api/round3/submission", {
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
      console.log("Round 3 submitted successfully");
      router.push("/round3/submitted");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return {
    questions,
    questionNo,
    question,
    onNext,
    onCheck,
    submit,
  };
}
