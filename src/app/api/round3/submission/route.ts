import Round3Player from "@/features/round3/models/Round3Players.model";
import { NextRequest, NextResponse } from "next/server";
import { validateJwt } from "@/features/auth/services/verifyJwt";
import { getToken } from "@/features/auth/services/getToken";
import connectDB from "@/lib/db";
import { ROUND3DURATION } from "@/features/round3/config/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { score, secondsLeft } = body;

    if (
      typeof score !== "number" ||
      typeof secondsLeft !== "number" ||
      !Number.isFinite(score) ||
      !Number.isFinite(secondsLeft) ||
      score < 0 ||
      secondsLeft < 0
    ) {
      return NextResponse.json(
        { error: "Invalid submission data" },
        { status: 422 },
      );
    }

    const token = getToken(req, "round3_token");
    if (!token) {
      return NextResponse.json(
        { error: "No valid session, you need to login first" },
        { status: 401 },
      );
    }

    const decoded = validateJwt(token, { teamId: true });

    if (!decoded || !decoded.teamId) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 401 },
      );
    }

    const teamId = decoded.teamId;

    await connectDB();

    const player = await Round3Player.findOne({ teamId });

    if (!player) {
      return NextResponse.json(
        { error: "Session not found or expired" },
        { status: 404 },
      );
    }

    if (player.score !== null) {
      return NextResponse.json(
        { error: "Quiz already submitted" },
        { status: 409 },
      );
    }
    const timeTaken = ROUND3DURATION - secondsLeft;
    const elapsed = (Date.now() - player.startTime.getTime()) / 1000;

    if (timeTaken < 0 || timeTaken > elapsed + 10) {
      return NextResponse.json(
        { error: "Invalid submission timing" },
        { status: 422 },
      );
    }

    player.score = score;
    player.timeTaken = timeTaken;

    await player.save();

    return NextResponse.json(
      { message: "Round 3 Submitted Successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Round 3 submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
