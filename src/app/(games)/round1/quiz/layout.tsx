import Header from "@/features/round1/components/Header";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex-1 overflow-hidden">{children}</div>
    </main>
  );
}
