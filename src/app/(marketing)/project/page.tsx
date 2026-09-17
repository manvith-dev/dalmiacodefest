import Link from "next/link";
import { ArrowRight, GitCommitVertical, ExternalLink } from "lucide-react";

import { H1, H2, H3, Lead, Muted, P } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import { ScreenshotLightbox } from "@/components/marketing/ScreenshotLightbox";

const stats = [
  { value: "47", label: "Teams registered" },
  { value: "27", label: "Round 1 participants" },
  { value: "18", label: "Round 2 teams" },
  { value: "10", label: "Round 3 teams" },
  { value: "55", label: "Total submissions" },
  { value: "3", label: "Competition rounds" },
];

const rounds = [
  {
    number: "01",
    title: "Quiz",
    description:
      "Participants answered questions directly through the web application. Answers were automatically evaluated and rankings were determined by score, with completion time used as the tie-breaker.",
  },
  {
    number: "02",
    title: "Debug",
    description:
      "Teams received buggy code through the platform, fixed it using an external compiler, and submitted the required result through DCF for validation.",
  },
  {
    number: "03",
    title: "Code",
    description:
      "Teams received programming problems through DCF, solved them using an external compiler, and submitted the required result through the platform.",
  },
];

const features = [
  {
    title: "Authentication",
    description: "Participant and admin authentication with protected routes.",
  },
  {
    title: "Registration",
    description: "Online team registration and participant management.",
  },
  {
    title: "Competition Rounds",
    description: "Separate interfaces and workflows for all three rounds.",
  },
  {
    title: "Answer Validation",
    description: "Automatic validation of submitted answers.",
  },
  {
    title: "Scoring & Ranking",
    description: "Score calculation with time-based tie-breaking.",
  },
  {
    title: "Leaderboards",
    description: "Separate rankings maintained for each round.",
  },
  {
    title: "Admin Dashboard",
    description: "Participant, submission and winner management.",
  },
  {
    title: "Participant Dashboard",
    description:
      "Central place for participants to access competition information.",
  },
];

const screenshots = [
  {
    title: "Round 3 Leaderboard",
    image: "/Leaderboard.png",
  },
  {
    title: "Participant Management",
    image: "/ParticipantsList1.png",
  },
  {
    title: "Round 1 Quiz",
    image: "/Quiz.png",
  },
  {
    title: "Round 1 Quiz Submission",
    image: "/Quiz_Submitted.png",
  },
  {
    title: "Round 3 CodeMatics",
    image: "/CodeMatics.png",
  },
];

export default function ProjectPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center px-6 py-20 md:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <Muted className="mb-4 uppercase tracking-[0.25em]">
            The Project
          </Muted>

          <H1 className="max-w-4xl text-5xl md:text-7xl">Dalmia Code Fest</H1>

          <Lead className="mt-4 max-w-2xl text-xl md:text-2xl">
            Competition Management Platform
          </Lead>

          <P className="mt-8 max-w-2xl text-muted-foreground">
            A full-stack web application built and deployed to manage an
            intercollegiate technical competition from participant registration
            through final results.
          </P>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://github.com/manvith-dev/dalmiacodefest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <GitHubIcon />
                View on GitHub
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline">
                View Event Site
                <ExternalLink />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Solo project</span>
            <span>•</span>
            <span>Dec 2025 – Jan 2026</span>
            <span>•</span>
            <span>~7 weeks</span>
            <span>•</span>
            <span>Used at the actual event</span>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="border-t px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <Muted className="mb-3 uppercase tracking-[0.2em]">Overview</Muted>
            <H2 className="border-0 pb-0 text-3xl md:text-4xl">The Project</H2>
          </div>

          <div className="space-y-5">
            <P>
              DCF was built as the central platform for Dalmia Code Fest. The
              application brought participant registration, authentication,
              competition rounds, submissions, scoring and results into a single
              system.
            </P>

            <P className="text-muted-foreground">
              Instead of managing the competition through separate tools, the
              platform handled the competition workflow in one place while
              keeping participant and submission data stored in the database.
            </P>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Muted className="mb-3 uppercase tracking-[0.2em]">
              Actual event
            </Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">
              DCF in numbers
            </H2>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6 md:p-8">
                <div className="text-4xl font-bold tracking-tight md:text-5xl">
                  {stat.value}
                </div>

                <Muted className="mt-2">{stat.label}</Muted>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Flow */}
      <section className="border-t px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Muted className="mb-3 uppercase tracking-[0.2em]">
              Competition flow
            </Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">
              From registration to results
            </H2>
          </div>

          <div className="flex flex-col">
            {[
              "Registration",
              "Round 1 · Quiz",
              "Round 1 Leaderboard",
              "Round 2 · Debug",
              "Round 2 Leaderboard",
              "Round 3 · Code",
              "Final Results",
            ].map((step, index, array) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="font-medium">{step}</span>
                </div>

                {index !== array.length - 1 && (
                  <div className="ml-5 h-10 border-l" />
                )}
              </div>
            ))}
          </div>

          <P className="mt-10 max-w-2xl text-muted-foreground">
            Round 1 was played individually, while Rounds 2 and 3 were played by
            teams using a single device.
          </P>
        </div>
      </section>

      {/* Rounds */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Muted className="mb-3 uppercase tracking-[0.2em]">
              Competition
            </Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">
              The three rounds
            </H2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {rounds.map((round) => (
              <Card key={round.number} className="h-full">
                <CardHeader>
                  <Muted className="font-mono">{round.number}</Muted>
                  <CardTitle className="text-2xl">{round.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <P className="text-sm text-muted-foreground">
                    {round.description}
                  </P>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Muted className="mb-3 uppercase tracking-[0.2em]">Platform</Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">What I built</H2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background p-6">
                <H3 className="border-0 pb-0 text-lg">{feature.title}</H3>

                <P className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </P>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Muted className="mb-3 uppercase tracking-[0.2em]">
              Under the hood
            </Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">Architecture</H2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application structure</CardTitle>
              </CardHeader>

              <CardContent>
                <pre className="overflow-x-auto rounded-md bg-muted p-5 text-sm leading-7">
                  <code>{`src/
├── app/
│   ├── (auth)/
│   ├── (games)/
│   ├── (marketing)/
│   ├── admin/
│   ├── participants/
│   └── api/
│
├── features/
│   ├── auth/
│   ├── round1/
│   ├── round2/
│   ├── round3/
│   ├── participants/
│   └── admin/
│
├── components/
├── config/
├── lib/
└── models/`}</code>
                </pre>
              </CardContent>
            </Card>

            <div className="space-y-5">
              <P>
                The project uses a feature-based structure with Next.js App
                Router. Routing and API endpoints live under{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                  app
                </code>
                , while competition-specific logic is organized under{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                  features
                </code>
                .
              </P>

              <P className="text-muted-foreground">
                Shared infrastructure such as database access, email utilities
                and other helpers is kept under{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                  lib
                </code>
                , with shared data models separated under{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                  models
                </code>
                .
              </P>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js", "TypeScript", "MongoDB", "JWT", "Vercel"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full border px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-t px-6 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <Muted className="mb-3 uppercase tracking-[0.2em]">
              The Platform
            </Muted>

            <H2 className="border-0 pb-0 text-3xl md:text-4xl">
              Built for the actual competition
            </H2>

            <P className="mt-4 max-w-2xl text-muted-foreground">
              Screenshots of the application that powered Dalmia Code Fest, from
              participant registration and competition rounds to rankings and
              administration.
            </P>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.title}
                className="overflow-hidden rounded-lg border"
              >
                <ScreenshotLightbox
                  title={screenshot.title}
                  image={screenshot.image}
                />

                <div className="border-t px-4 py-3">
                  <Muted>{screenshot.title}</Muted>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <Muted className="mb-3 uppercase tracking-[0.2em]">Development</Muted>

          <H2 className="border-0 pb-0 text-3xl md:text-4xl">
            Built solo in ~7 weeks
          </H2>

          <P className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            I designed, developed, deployed and operated DCF for the actual
            event, working on the project from December 12, 2025 to January 31,
            2026.
          </P>

          <div className="mt-8">
            <Link
              href="https://github.com/manvith-dev/dalmiacodefest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="group">
                View the source
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function GitHubIcon() {
  return (
    <Image src="/GitHub_Invertocat_White.svg" alt="" width={20} height={20} />
  );
}
