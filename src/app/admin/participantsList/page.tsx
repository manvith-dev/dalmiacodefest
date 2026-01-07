export const revalidate = 0;

import { H2 } from "@/components/Typography";
import { ITeam } from "@/models/team.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeamRow {
  registrationId: string;
  teamName: string;
  collegeName: string;
  createdAt: Date;
}

import connectDB from "@/lib/db";
import Team from "@/models/team.model";

async function getParticipants() {
  await connectDB();

  return Team.find().sort({ createdAt: -1 }).lean();
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

function TableList({ teams }: { teams: ITeam[] }) {
  return (
    <Table>
      <TableCaption>A list of registered participants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Registration ID</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>College Name</TableHead>
          <TableHead>Registered On</TableHead>
          <TableHead className="text-right">Attendence</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teams.map((team, index) => (
          <TableRow key={team.registrationId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{team.registrationId}</TableCell>
            <TableCell>{team.teamName}</TableCell>
            <TableCell>
              {team.collegeName
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </TableCell>
            <TableCell>
              {new Date(team.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex items-center justify-end">
              <div className="bg-secondary border p-4 rounded-md"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
