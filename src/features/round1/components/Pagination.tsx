import clsx from "clsx";
import { Round1QuestionsType } from "../round_one.types";

export function Pagination({
  questions,
  setIdx,
}: {
  questions: Round1QuestionsType[];
  setIdx: (idx: number) => void;
}) {
  return (
    <div className="border p-4 rounded-md">
      <div className="grid grid-cols-5 auto-rows-fr gap-1">
        {questions.map((q, i) =>
          q.userAnswer === null ? (
            <Box key={i} variant="" onSelect={() => setIdx(i)} />
          ) : q.correctOption === q.userAnswer ? (
            <Box key={i} variant="correct" onSelect={() => setIdx(i)} />
          ) : (
            <Box key={i} variant="incorrect" onSelect={() => setIdx(i)} />
          )
        )}
      </div>
    </div>
  );
}

function Box({ variant, onSelect }: { variant: string; onSelect: () => void }) {
  let borderColor: string;

  borderColor =
    variant === "correct"
      ? "border-green-400"
      : variant === "incorrect"
      ? "border-destructive"
      : "border-muted-foreground";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "bg-card border h-10 w-10 rounded-md cursor-pointer hover:bg-secondary",
        borderColor
      )}
    ></button>
  );
}
