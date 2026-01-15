import Header from "@/components/layout/games/Header";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header roundNumber={1} roundName="Quiz" />
      <div className="flex flex-1">{children}</div>
    </main>
  );
}
