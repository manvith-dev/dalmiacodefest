import { H2, Lead } from "@/components/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Team from "@/models/team.model";
import dbConnect from "@/lib/db";

export default function ParticipantsDetailsPage() {
  return (
    <main className="p-8">
      <H2>Participants Details</H2>
      <section className="flex p-4">
        <ParticipantsDetailsTable />
      </section>
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
      <main className="flex justify-center">
        <Lead>Loading Data...</Lead>
      </main>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {teams.map((team) => (
        <AccordionItem
          key={team._id}
          value={team._id.toString()}
          className="border rounded-lg bg-card/50"
        >
          <AccordionTrigger className="px-4 py-3 text-left">
            <div>
              <p className="font-semibold">{team.teamName}</p>
              <p className="text-sm text-muted-foreground">
                {team.collegeName}
              </p>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 space-y-3">
            <p className="text-sm">
              Registration ID:{" "}
              <span className="font-mono">{team.registrationId}</span>
            </p>

            <div className="space-y-2">
              {team.players.map((player: any, idx: number) => (
                <div key={idx} className="border rounded-md p-3 text-sm">
                  <p className="font-medium">{player.name}</p>
                  <p>{player.email}</p>
                  <p>{player.phone}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
