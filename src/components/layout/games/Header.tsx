import { H4 } from "@/components/Typography";

export default function Header({
  roundNumber,
  roundName,
}: {
  roundNumber: number;
  roundName: string;
}) {
  return (
    <nav className="flex flex-row justify-between border-b py-2 px-4">
      <div>
        <H4>DCF - Round {roundNumber}</H4>
      </div>
      <div>
        <H4>{roundName}</H4>
      </div>
    </nav>
  );
}
