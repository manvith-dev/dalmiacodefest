import { H2, H3, P } from "@/components/Typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GAMES } from "@/config/event";

export default function About() {
  return (
    <section id="about" className="flex flex-col gap-8 md:justify-between p-16">
      <div>
        <H2>About</H2>
        <P>
          Dalmia Code Fest is a multi-round technical competition where teams of
          two compete in quizzes, debugging, and coding challenges. Each round
          tests a different skill — speed, logic, and problem-solving. All teams
          play every round, and overall performance decides the winners. Fast,
          competitive, and skill-driven.
        </P>
      </div>
      <div className="flex flex-col gap-4">
        <H3>Games</H3>
        <div className="flex flex-col md:flex-row gap-4">
          <RoundCard
            title={GAMES.round1.name}
            description={GAMES.round1.description}
            rules={GAMES.round1.rules}
          />

          <RoundCard
            title={GAMES.round2.name}
            description={GAMES.round2.description}
            rules={GAMES.round2.rules}
          />
          <RoundCard
            title={GAMES.round3.name}
            description={GAMES.round3.description}
            rules={GAMES.round3.rules}
          />
        </div>
      </div>
    </section>
  );
}

function RoundCard({
  title,
  description,
  rules,
}: {
  title: string;
  description: string;
  rules: string[];
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="list-disc pl-4 space-y-1 text-sm">
          {rules.map((rule: string, i: number) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Read rules before starting
        </p>
      </CardFooter>
    </Card>
  );
}
