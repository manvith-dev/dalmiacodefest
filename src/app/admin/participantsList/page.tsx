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

  return Team.find()
    .select("registrationId teamName collegeName createdAt")
    .sort({ createdAt: -1 })
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

function TableList({ teams }: { teams: TeamRow[] }) {
  return (
    <Table>
      <TableCaption>A list of registered participants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Registration ID</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>College Name</TableHead>
          <TableHead className="text-right">Registered On</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {teams.map((team, index) => (
          <TableRow key={team.registrationId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{team.registrationId}</TableCell>
            <TableCell>{team.teamName}</TableCell>
            <TableCell>
              <TableCell>
                {team.collegeName
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </TableCell>
            </TableCell>
            <TableCell className="text-right">
              {new Date(team.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
