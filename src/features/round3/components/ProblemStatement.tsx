import { H4 } from "@/components/Typography";
import { useRound3Context } from "../controllers/RoundThreeContext";
import { Badge } from "@/components/ui/badge";
import { Timer } from "./Timer";

export default function ProblemStatementContainer() {
  const { question, questionNo } = useRound3Context();
  const difficulty: "easy" | "medium" | "hard" =
    questionNo === 1 ? "easy" : questionNo === 2 ? "medium" : "hard";
  return (
    <section className="flex flex-col col-span-1 border rounded-md gap-4">
      <div className="bg-secondary flex flex-row w-full py-2 px-4 rounded-t-md justify-between">
        Problem Statement
        <Timer />
      </div>
      <div className="flex flex-col px-4">
        <Badge variant={difficulty}>{difficulty}</Badge>
      </div>
      <div className="flex flex-col px-4">
        <H4>Problem Statement</H4>
        <div className="flex font-mono whitespace-pre-wrap">
          {question?.problemStatement}
        </div>
      </div>
    </section>
  );
}
