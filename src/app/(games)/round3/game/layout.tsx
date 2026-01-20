import Header from "@/components/layout/games/Header";

export default function Round3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen md:h-screen">
      <Header roundNumber={3} roundName="CodeMatics" />
      {children}
    </main>
  );
}
