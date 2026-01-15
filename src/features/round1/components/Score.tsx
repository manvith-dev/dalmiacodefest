import { Badge } from "@/components/ui/badge";
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
    <Badge variant={"medium"} className="flex py-1 px-4  font-bold">
      Score {score}
    </Badge>
  );
}
