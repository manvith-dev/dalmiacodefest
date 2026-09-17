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
      <div className="flex items-center gap-3">
        <H2>Participants Details</H2>

        <span className="text-xs text-muted-foreground border rounded-full px-2.5 py-1">
          Participant data masked for privacy
        </span>
      </div>

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
      teamName: maskName(team.teamName),
      playerName: maskName(player.name),
      phone: maskPhone(player.phone),
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

function maskName(name: string) {
  if (!name) return "xxxxxxxx";

  const parts = name.trim().split(" ");

  return parts
    .map((part) => {
      if (part.length <= 2) return "xx";

      return `${part.slice(0, 2)}${"x".repeat(part.length - 1)}`;
    })
    .join(" ");
}

function maskPhone(phone: string) {
  if (!phone) return "••••••••••";

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 4) return "••••••••••";

  return `${"•".repeat(digits.length - 4)}${digits.slice(-4)}`;
}
