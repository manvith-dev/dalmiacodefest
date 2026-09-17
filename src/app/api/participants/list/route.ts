import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Team from "@/models/team.model";

export async function GET() {
  try {
    await connectDB();

    const teams = await Team.find()
      .select("registrationId teamName collegeName createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ teams }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch participants" },
      { status: 500 },
    );
  }
}
