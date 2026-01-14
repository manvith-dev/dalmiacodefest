import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";
import Round2Player from "@/features/round2/models/Round2Players.model";
import { Round2Question } from "@/features/round2/models/Round2Questions.model";
import { ROUND2DURATION } from "@/features/round2/config/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { email, code } = body;

    if (!isValidInput(email, code)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    email = email.trim().toLowerCase();
    code = code.trim();

    if (code !== process.env.ROUND2_SECRET_CODE) {
      return NextResponse.json({ error: "Incorrect code" }, { status: 401 });
    }

    await connectDB();

    const team = await Team.findOne({
      players: { $elemMatch: { email } },
    }).lean();
    if (!team) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const questionsCount = await Round2Question.countDocuments();
    if (questionsCount === 0) {
      return NextResponse.json(
        { error: "No questions found" },
        { status: 500 }
      );
    }

    const questions = await Round2Question.aggregate([
      { $sample: { size: questionsCount } },
    ]);

    const round2player = await Round2Player.findOneAndUpdate(
      { teamId: team._id },
      { startTime: new Date(), score: null, timeTaken: null },
      { upsert: true, new: true }
    );

    const endTime = round2player.startTime.getTime() + ROUND2DURATION * 1000;

    const token = jwt.sign(
      { teamId: team._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    const response = NextResponse.json(
      { message: "Login successful", questions, endTime },
      { status: 200 }
    );
    response.cookies.set("round2_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return response;
  } catch (error) {
    console.error("Round-2 login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function isValidInput(email: unknown, code: unknown): boolean {
  return typeof email === "string" && typeof code === "string";
}
