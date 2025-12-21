import connectDB from "@/lib/db";
import { sendConfirmationMail } from "@/features/auth/services/sendConfirmationMail";
import Team from "@/models/team.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email1, email2 } = await req.json();

  if (!email1 || !email2) {
    return NextResponse.json(
      { error: "Both emails are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const team = await Team.findOne({
      players: {
        $all: [
          { $elemMatch: { email: email1 } },
          { $elemMatch: { email: email2 } },
        ],
      },
    });

    if (!team) {
      return NextResponse.json(
        { error: "No team found with these emails" },
        { status: 404 }
      );
    }

    await sendConfirmationMail({
      teamName: team.teamName,
      collegeName: team.collegeName,
      registrationId: team.registrationId,
      players: [
        { name: team.players[0].name, email: team.players[0].email },
        { name: team.players[1].name, email: team.players[1].email },
      ],
    });

    return NextResponse.json(
      {
        message: "Confirmation mail sent to both emails",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
