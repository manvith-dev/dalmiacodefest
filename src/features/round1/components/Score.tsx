import { useQuizContext } from "../controllers/QuizContext";

export function Score() {
  const { questions } = useQuizContext();
  const score = questions.reduce((total, q) => {
    if (q.isCorrect === true) {
      return total + q.marks;
    }
    return total;
  }, 0);
  return (
    <div className="flex bg-muted py-1 px-4 rounded-full border text-amber-400 font-bold">
      Score {score}
    </div>
  );
}
