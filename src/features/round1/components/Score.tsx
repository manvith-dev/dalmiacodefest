export function Score({ score }: { score: number }) {
  return (
    <div className="flex bg-muted py-1 px-4 rounded-full border text-amber-400 font-bold">
      Score {score}
    </div>
  );
}
