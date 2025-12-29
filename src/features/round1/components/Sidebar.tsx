import { Pagination } from "./Pagination";
import { Score } from "./Score";
import { Button } from "@/components/ui/button";
import { Round1QuestionsType } from "../round_one.types";

export function SideBar({
  questions,
  setIdx,
}: {
  questions: Round1QuestionsType[];
  setIdx: (idx: number) => void;
}) {
  const score = questions.reduce((total, q) => {
    if (q.isCorrect === true) {
      return total + q.marks;
    }
    return total;
  }, 0);
  return (
    <aside className="border-l p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <Score score={score} />
        <Pagination questions={questions} setIdx={setIdx} />
      </div>

      <Button className="w-full">Submit</Button>
    </aside>
  );
}
