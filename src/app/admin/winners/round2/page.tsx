export const revalidate = 0;

import { H2, Muted } from "@/components/Typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Round2Player from "@/features/round2/models/Round2Players.model";
import connectDB from "@/lib/db";
import "@/models/team.model";

export default function RoundOneWinnersPage() {
  return (
    <main className="flex flex-col items-center gap-6">
      <section className="flex flex-col">
        <span className="text-xs text-muted-foreground border rounded-full px-2.5 py-1">
          Participant data masked for privacy
        </span>
        <H2>Round 2 Players Ranking</H2>
        <Muted>{"Based on score and time taken (if score is tied)"}</Muted>
      </section>
      <LeaderBoardTable />
      <section className="flex flex-col">
        <Muted>{"The leaderboard data is auto-generated."}</Muted>
      </section>
    </main>
  );
}

async function LeaderBoardTable() {
  let round2analysis;
  try {
    await connectDB();

    round2analysis = await Round2Player.find()
      .populate("teamId")
      .sort({
        score: -1,
        timeTaken: 1,
        createdAt: 1,
      })
      .lean();

    if (!round2analysis || round2analysis.length === 0) {
      return <div>No Data Found</div>;
    }
  } catch (err) {
    return (
      <div>{(err as string) + "Error occurred while loading leaderboard"}</div>
    );
  }

  return (
    <section className="w-full px-8 ">
      <Table className="w-full">
        <TableCaption>Round 2 Leaderboard</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Registration ID</TableHead>
            <TableHead>Team Name</TableHead>
            <TableHead>College Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time (s)</TableHead>
            <TableHead className="text-right">Attendance</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {round2analysis.map((player: any, index: number) => {
            const team = player.teamId;

            return (
              <TableRow key={player._id.toString()}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {maskRegistrationId(team?.registrationId)}
                </TableCell>

                <TableCell>
                  {team?.teamName ? maskName(team.teamName) : "-"}
                </TableCell>

                <TableCell>
                  {team?.collegeName
                    ? maskCollegeName(
                        team.collegeName
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
                      )
                    : "-"}
                </TableCell>

                <TableCell>{player.score ?? "-"}</TableCell>
                <TableCell>{player.timeTaken ?? "-"}</TableCell>
                <TableCell className="flex items-center justify-end">
                  <div className="bg-secondary border p-4 rounded-md"></div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

function maskRegistrationId(id?: string) {
  if (!id) return "xxxxxxxx";

  if (id.length <= 4) return "xxxx";

  return `${id.slice(0, 3)}${"x".repeat(id.length - 3)}`;
}

function maskName(name: string) {
  if (!name) return "xxxxxxxx";

  return name
    .trim()
    .split(" ")
    .map((part) => {
      if (part.length <= 2) return "xx";

      return `${part.slice(0, 2)}${"x".repeat(part.length - 2)}`;
    })
    .join(" ");
}

function maskCollegeName(name: string) {
  if (!name) return "College xxxxx";

  return `College ${"x".repeat(6 + (name.length % 5))}`;
}
