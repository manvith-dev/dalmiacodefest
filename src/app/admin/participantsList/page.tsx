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
      <div className="flex items-center gap-3">
        <H2>Participants List</H2>

        <span className="text-xs text-muted-foreground border rounded-full px-2.5 py-1">
          Participant data masked for privacy
        </span>
      </div>

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
        {teams.map((team) => (
          <TableRow key={team.registrationId}>
            <TableCell>{maskName(team.teamName)}</TableCell>

            <TableCell className="align-top">
              <div className="flex flex-col gap-1 font-medium max-w-[180px]">
                {team.players.map((player, i) => (
                  <span key={i}>{maskName(player.name)}</span>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                {team.players.map((player, i) => (
                  <span key={i}>{maskEmail(player.email)}</span>
                ))}
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1">
                {team.players.map((player, i) => (
                  <span key={i}>{maskPhone(player.phone)}</span>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
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

function maskEmail(email: string) {
  if (!email) return "xxxxxxxx@xxxx.com";

  const [username, domain] = email.split("@");

  if (!username || !domain) return "xxxxxxxx@xxxx.com";

  const maskedUsername =
    username.length <= 2
      ? "xx"
      : `${username.slice(0, 2)}${"x".repeat(
          Math.min(username.length - 2, 6),
        )}`;

  return `${maskedUsername}@${domain}`;
}

function maskPhone(phone: string) {
  if (!phone) return "xxxxxx1234";

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 4) return "xxxxxxxxxx";

  return `${"x".repeat(digits.length - 4)}${digits.slice(-4)}`;
}
