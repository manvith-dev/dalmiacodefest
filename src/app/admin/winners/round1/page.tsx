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

import Round1Player from "@/features/round1/models/Round1Players.model";
import connectDB from "@/lib/db";
import "@/models/team.model";

export default function RoundOneWinnersPage() {
  return (
    <main className="flex flex-col items-center gap-6">
      <section className="flex flex-col">
        <H2>Round 1 Players Ranking</H2>
        <Muted>{"Based on score and time taken (if score is tied)"}</Muted>
      </section>
      <LeaderBoardTable />
      <section className="flex flex-col">
        <Muted>{"The leaderboard score is auto-generated."}</Muted>
      </section>
    </main>
  );
}

async function LeaderBoardTable() {
  let round1analysis;
  try {
    await connectDB();

    round1analysis = await Round1Player.find()
      .populate("teamId")
      .sort({
        score: -1,
        timeTaken: 1,
        createdAt: 1,
      })
      .lean();

    if (!round1analysis || round1analysis.length === 0) {
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
        <TableCaption>Round 1 Leaderboard</TableCaption>

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
          {round1analysis.map((player: any, index: number) => {
            const team = player.teamId;

            return (
              <TableRow key={player._id.toString()}>
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">
                  {team?.registrationId ?? "-"}
                </TableCell>

                <TableCell>{team?.teamName ?? "-"}</TableCell>

                <TableCell>
                  {team?.collegeName
                    ? team.collegeName
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c: string) => c.toUpperCase())
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
