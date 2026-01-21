import clsx from "clsx";
import { useQuizContext } from "../controllers/QuizContext";

export function Pagination() {
  const { questions, goToIndex, idx } = useQuizContext();

  return (
    <div className="border rounded-lg p-4 ">
      <div className="grid grid-cols-8 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2">
        {questions.map((q, i) => {
          let variant: "unanswered" | "correct" | "incorrect" = "unanswered";

          if (q.userAnswer !== null) {
            variant =
              q.userAnswer === q.correctOption ? "correct" : "incorrect";
          }

          return (
            <Box
              key={i}
              index={i}
              active={i === idx}
              variant={variant}
              onSelect={() => goToIndex(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

function Box({
  index,
  variant,
  active,
  onSelect,
}: {
  index: number;
  variant: "unanswered" | "correct" | "incorrect";
  active: boolean;
  onSelect: () => void;
}) {
  const styles = {
    unanswered:
      "border-muted-foreground/40 text-muted-foreground hover:bg-muted",
    correct: "border-easy bg-easy/15 text-easy hover:bg-easy/25",
    incorrect:
      "border-destructive bg-destructive/15 text-destructive hover:bg-destructive/25",
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-all",
        "hover:scale-[1.05] active:scale-[0.98]",
        styles[variant],
        active && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
    >
      {index + 1}
    </button>
  );
}
