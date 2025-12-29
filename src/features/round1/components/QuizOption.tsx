import { Round1QuestionsType } from "../round_one.types";

export function QuizOption({
  index,
  text,
  onSelect,
}: {
  index: number;
  text: string;
  onSelect: () => void;
}) {
  const option: string =
    index === 0 ? "A." : index === 1 ? "B." : index === 2 ? "C." : "D.";
  return (
    <button
      onClick={onSelect}
      type="button"
      className="flex gap-2 bg-card border border-secondary p-4 rounded-lg hover:border-primary cursor-pointer "
    >
      <span className="">{option}</span>
      <span>{text}</span>
    </button>
  );
}
