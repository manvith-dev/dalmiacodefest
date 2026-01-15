import { Badge } from "@/components/ui/badge";
import { useRound2Context } from "../controllers/RoundTwoContesxt";

export default function Score() {
  const { questions } = useRound2Context();
  const score = questions.reduce((total, q) => {
    if (!q.solved) return total;
    return total + Math.max(0, q.maxMarks - q.tries);
  }, 0);
  return <Badge>Score: {score}</Badge>;
}
