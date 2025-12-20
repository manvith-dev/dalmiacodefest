import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { regiId, email } = body;

  try {
    await connectDB();

    const team = await Team.findOne({ registrationId: regiId });

    if (!team) {
      return NextResponse.json(
        { error: "Wrong Registration ID Or Team does not exist." },
        { status: 404 }
      );
    }

    if (team.players[0].email == email || team.players[1].email == email) {
      return NextResponse.json(
        { message: "Login Successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Wrong Email" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
