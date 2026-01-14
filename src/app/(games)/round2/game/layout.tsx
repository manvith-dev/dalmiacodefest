import Header from "@/components/layout/games/Header";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen md:h-screen">
      <Header roundNumber={2} roundName="The-Bug" />
      {children}
    </main>
  );
}
