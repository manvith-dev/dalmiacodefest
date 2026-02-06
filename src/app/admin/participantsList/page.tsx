export const revalidate = 0;

import { H2 } from "@/components/Typography";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import connectDB from "@/lib/db";
import Team from "@/models/team.model";

async function getParticipants() {
  await connectDB();

  // Only fetch teams whose registrationId does NOT start with "REG-"
  return Team.find({ registrationId: { $not: /^REG-/ } })
    .sort({ teamName: 1 })
    .lean();
}

export default async function ParticipantsListPage() {
  const teams = await getParticipants();

  return (
    <main className="flex flex-col gap-4 p-8">
      <H2>Participants List</H2>
      <TableList teams={teams} />
    </main>
  );
}

type TeamLean = {
  registrationId: string;
  teamName: string;
  collegeName: string;
  players: {
    name: string;
    email: string;
    phone: string;
  }[];
  createdAt: Date;
};

function TableList({ teams }: { teams: TeamLean[] }) {
  return (
    <Table className="border-separate border-spacing-y-3">
      <TableCaption>A list of registered participants.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Team Name</TableHead>
          <TableHead>Player Names</TableHead>
          <TableHead>Emails</TableHead>
          <TableHead>Phone Numbers</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teams.map((team, index) => (
          <TableRow key={team.registrationId}>
            <TableCell>{team.teamName}</TableCell>

            <TableCell className="align-top">
              <div className="flex flex-col gap-1 font-medium max-w-[180px]">
                {team.players.map((player, i) => (
                  <span key={i}>{player.name}</span>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                {team.players.map((player, i) => (
                  <span key={i}>{player.email}</span>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                {team.players.map((player, i) => (
                  <span key={i}>{player.phone}</span>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
