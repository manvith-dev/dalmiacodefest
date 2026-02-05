export const revalidate = 0;

import { H2, Lead } from "@/components/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Team from "@/models/team.model";
import dbConnect from "@/lib/db";

export default function ParticipantsDetailsPage() {
  return (
    <main className="p-8 space-y-4">
      <H2>Participants Details</H2>
      <ParticipantsDetailsTable />
    </main>
  );
}

async function ParticipantsDetailsTable() {
  let teams;

  try {
    await dbConnect();
    teams = await Team.find({
      registrationId: { $not: /^REG-/ },
    }).lean();
  } catch (error) {
    console.error("Failed to fetch teams:", error);
  }

  if (!teams) {
    return (
      <div className="flex justify-center">
        <Lead>Loading data...</Lead>
      </div>
    );
  }

  // Flatten teams → players into table rows
  const rows = teams.flatMap((team) =>
    team.players.map((player: any) => ({
      teamName: team.teamName,
      playerName: player.name,
      phone: player.phone,
    })),
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Participant Name</TableHead>
            <TableHead>Mobile Number</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{row.teamName}</TableCell>
              <TableCell>{row.playerName}</TableCell>
              <TableCell className="font-mono">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
