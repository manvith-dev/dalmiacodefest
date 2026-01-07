import { Round1QuestionsType } from "../round_one.types";
import { H3 } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { QuizOption } from "./QuizOption";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "../controllers/QuizContext";

export function QuizCard() {
  const { onPrev, onNext } = useQuizContext();
  return (
    <div className="flex flex-col w-4/5 xl:w-3/5 bg-linear-to-br from-card to-background border px-6 py-8 rounded-2xl gap-8">
      <QuizForm />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Prev
        </Button>
        <Button
          className="bg-foreground border border-foreground text-background hover:bg-card hover:text-foreground"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function QuizForm() {
  const { idx, question, setAnswer } = useQuizContext();

  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <H3>
          Q.{idx + 1} {question.question}
        </H3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{"marks: " + question.marks}</Badge>
          <Badge variant={question.difficulty || "default"}>
            {question.difficulty}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((opt, i) => (
          <QuizOption
            key={i}
            index={i}
            text={opt}
            onSelect={() => setAnswer(i)}
          />
        ))}
      </div>
    </form>
  );
}
