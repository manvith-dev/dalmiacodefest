import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";
import Round3Player from "@/features/round3/models/Round3Players.model";
import { Round3Question } from "@/features/round3/models/Round3Questions.model";
import { ROUND3DURATION } from "@/features/round3/config/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { email, code } = body;

    if (!isValidInput(email, code)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    email = email.trim().toLowerCase();
    code = code.trim();

    if (code !== process.env.ROUND3_SECRET_CODE) {
      return NextResponse.json({ error: "Incorrect code" }, { status: 401 });
    }

    await connectDB();

    const team = await Team.findOne({
      players: { $elemMatch: { email } },
    }).lean();
    if (!team) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const questionsCount = await Round3Question.countDocuments();
    if (questionsCount === 0) {
      return NextResponse.json(
        { error: "No questions found" },
        { status: 500 },
      );
    }

    const questions = await Round3Question.aggregate([
      { $sample: { size: questionsCount } },
    ]);

    const existingPlayer = await Round3Player.findOne({ teamId: team._id });

    if (existingPlayer) {
      return NextResponse.json(
        { error: "Round 3 already started. Please contact event organizer" },
        { status: 403 },
      );
    }

    const round3player = await Round3Player.create({
      teamId: team._id,
      startTime: new Date(),
      score: null,
      timeTaken: null,
    });

    const endTime = round3player.startTime.getTime() + ROUND3DURATION * 1000;

    const token = jwt.sign(
      { teamId: team._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" },
    );

    const response = NextResponse.json(
      { message: "Login successful", questions, endTime },
      { status: 200 },
    );
    response.cookies.set("round3_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return response;
  } catch (error) {
    console.error("Round-3 login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function isValidInput(email: unknown, code: unknown): boolean {
  return typeof email === "string" && typeof code === "string";
}
