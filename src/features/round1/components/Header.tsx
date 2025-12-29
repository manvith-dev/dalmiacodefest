import { H3, H4 } from "@/components/Typography";

export default function Header() {
  return (
    <nav className="flex flex-row justify-between border-b py-2 px-4">
      <div>
        <H4>DCF - Round 1</H4>
      </div>
      <div>
        <H4>Quiz</H4>
      </div>
    </nav>
  );
}
