import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { regiId, email } = body;

    if (typeof regiId !== "string" || typeof email !== "string") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    regiId = regiId.trim();
    email = email.trim().toLowerCase();

    await connectDB();

    const team = await Team.findOne({ registrationId: regiId }).lean();

    if (!team) {
      return NextResponse.json(
        { error: "Wrong Registration ID Or Team does not exist." },
        { status: 404 },
      );
    }

    if (team.players[0].email == email || team.players[1].email == email) {
      const response = NextResponse.json(
        { message: "Login Successful" },
        { status: 200 },
      );
      const token = jwt.sign(
        { teamId: team._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      response.cookies.set("participant_token", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      return NextResponse.json({ error: "Wrong Email" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
