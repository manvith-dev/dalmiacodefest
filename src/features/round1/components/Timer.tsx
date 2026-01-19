import { useQuizContext } from "../controllers/QuizContext";

export function Timer() {
  const { secondsLeft } = useQuizContext();

  const TOTAL_TIME = 15 * 60; // 🔴 set this to your actual quiz duration
  const progress = secondsLeft / TOTAL_TIME;

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;

  const isWarning = secondsLeft <= 60 && secondsLeft > 15;
  const isCritical = secondsLeft <= 15;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const ringColor = isCritical
    ? "stroke-hard"
    : isWarning
      ? "stroke-medium"
      : "stroke-easy";

  return (
    <div className="flex items-center justify-center my-8">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            className="stroke-muted"
          />

          {/* progress ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={[
              ringColor,
              "transition-all duration-500 ease-linear",
              isCritical && "animate-pulse",
            ].join(" ")}
          />
        </svg>

        {/* time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={[
              "font-mono text-xl tabular-nums",
              isCritical
                ? "text-hard"
                : isWarning
                  ? "text-medium"
                  : "text-easy",
            ].join(" ")}
          >
            {m}:{s.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
