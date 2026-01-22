import { useState, useEffect } from "react";
import { STORAGE_KEY, END_TIME_KEY } from "../config/constants";
import { useRouter } from "next/navigation";
import { Round2QuestionsType } from "../round_two.types";
import { ROUND2DURATION } from "../config/constants";
import { toast } from "sonner";

export default function useRound2Debug(round2Questions: Round2QuestionsType[]) {
  const router = useRouter();
  const [questions, setQuestions] =
    useState<Round2QuestionsType[]>(round2Questions);

  const [questionNo, setQuestionNo] = useState<1 | 2>(1);
  const [language, setLanguage] = useState<"java" | "cpp" | "python">("cpp");

  useEffect(() => {
    if (round2Questions.length === 0) return;
    setQuestions(round2Questions);
  }, [round2Questions]);

  useEffect(() => {
    if (questions.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const visibleQuestions = questions.filter((q) => q.language === language);
  const question = visibleQuestions.find((q) => q.questionNo === questionNo);

  if (!question) {
    throw new Error(
      `Invariant violation: No question for questionNo=${questionNo}, language=${language}`,
    );
  }

  if (!question) {
    throw new Error(
      `Invariant violation: No question for questionNo=${questionNo}, language=${language}`,
    );
  }

  const onSwitchLanguage = (language: "java" | "cpp" | "python") => {
    setLanguage(language);
  };

  const onNext = () => {
    setQuestionNo((prev) => (prev === 1 ? 2 : 1));
  };

  const onCheck = (userAnswer: string) => {
    if (!question || question.solved) return false;

    const isCorrect = question.expectedOutput.trim() === userAnswer.trim();

    setQuestions((prev) =>
      prev.map((q) =>
        q === question
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
          timeTaken: ROUND2DURATION - secondsLeft,
        }),
      );

      const res = await fetch("/api/round2/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, secondsLeft }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Round 2 could not be submitted");
        return;
      }

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(END_TIME_KEY);
      toast.success("Round 2 submitted successfully");
      router.push("/round2/submitted");
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Submit error:", err);
    }
  };

  return {
    questions,
    visibleQuestions,
    questionNo,
    question,
    language,
    onSwitchLanguage,
    onNext,
    onCheck,
    submit,
  };
}
