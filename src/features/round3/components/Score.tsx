import { Badge } from "@/components/ui/badge";
import { useRound3Context } from "../controllers/RoundThreeContext";

export default function Score() {
  const { questions } = useRound3Context();
  const score = questions.reduce((total, q) => {
    if (!q.solved) return total;
    return total + Math.max(0, q.maxMarks - q.tries);
  }, 0);
  return <Badge>Score: {score}</Badge>;
}
