import { useRound2Context } from "../controllers/RoundTwoContesxt";

export function Timer() {
  const { secondsLeft } = useRound2Context();

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;

  const isWarning = secondsLeft <= 60 && secondsLeft > 15;
  const isCritical = secondsLeft <= 15;

  const boxStyle = isCritical
    ? "border-hard text-hard"
    : isWarning
    ? "border-medium text-medium"
    : "border-primary text-primary";

  return (
    <div className="flex justify-center">
      <div
        className={[
          "px-2",
          "rounded-md",
          "border",
          "font-mono text-base tabular-nums tracking-widest",
          "transition-colors duration-300",
          boxStyle,
          isCritical && "animate-pulse",
        ].join(" ")}
      >
        {m}:{s.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
