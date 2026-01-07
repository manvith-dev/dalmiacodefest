import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";
import Round1Player from "@/features/round1/models/Round1Players.model";
import { Question } from "@/features/round1/models/Question.model";
import { ROUND1DURATION } from "@/features/round1/config/constants";

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

    if (code !== process.env.ROUND1_SECRET_CODE) {
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

    const questionsCount = await Question.countDocuments();
    if (questionsCount === 0) {
      return NextResponse.json(
        { error: "No questions found" },
        { status: 500 }
      );
    }

    const questions = await Question.aggregate([
      { $sample: { size: questionsCount } },
    ]);

    const round1player = await Round1Player.findOneAndUpdate(
      { teamId: team._id },
      { startTime: new Date(), score: null, timeTaken: null },
      { upsert: true, new: true }
    );

    const endTime = round1player.startTime.getTime() + ROUND1DURATION * 1000;

    const token = jwt.sign(
      { teamId: team._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    const response = NextResponse.json(
      { message: "Login successful", questions, endTime },
      { status: 200 }
    );
    response.cookies.set("round1_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return response;
  } catch (error) {
    console.error("Round-1 login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function isValidInput(email: unknown, code: unknown): boolean {
  return typeof email === "string" && typeof code === "string";
}
