import { Round1QuestionsType } from "../round_one.types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useQuizContext } from "../controllers/QuizContext";

type OptionVariant = VariantProps<typeof optionVariants>["variant"];

export function QuizOption({
  index,
  text,
  onSelect,
}: {
  index: number;
  text: string;
  onSelect: () => void;
}) {
  const { question } = useQuizContext();
  const option: string =
    index === 0 ? "A." : index === 1 ? "B." : index === 2 ? "C." : "D.";
  const variant: OptionVariant = (() => {
    if (question.userAnswer === null) return "active";

    if (index === question.userAnswer) {
      return question.isCorrect ? "correct" : "incorrect";
    }

    return "unactive";
  })();
  return (
    <button
      onClick={onSelect}
      type="button"
      className={cn(optionVariants({ variant }))}
      disabled={question.userAnswer !== null}
    >
      <span className="">{option}</span>
      <span>{text}</span>
    </button>
  );
}

const optionVariants = cva(
  [
    "flex items-center gap-3 p-4 rounded-xl text-left",
    "border transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
  ],
  {
    variants: {
      variant: {
        active: [
          "bg-card text-card-foreground",
          "border-border",
          "hover:border-primary/60 hover:bg-accent/40",
          "hover:shadow-sm hover:-translate-y-[1px]",
          "cursor-pointer",
        ].join(" "),

        correct: [
          "bg-[color:var(--easy)]/10",
          "border-[color:var(--easy)]/40",
          "text-foreground",
          "shadow-[0_0_0_1px_var(--easy)/40]",
        ].join(" "),

        incorrect: [
          "bg-destructive/15",
          "border-destructive/40",
          "text-destructive",
          "shadow-[0_0_0_1px_var(--destructive)/40]",
        ].join(" "),

        outline: [
          "bg-transparent",
          "border-border",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),

        unactive: [
          "bg-muted/40",
          "border-border/40",
          "text-muted-foreground",
          "opacity-60",
          "cursor-not-allowed",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);
