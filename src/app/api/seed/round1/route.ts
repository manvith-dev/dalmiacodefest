import connectDB from "@/lib/db";
import { Question } from "@/features/round1/models/Question.model";
import { round1_questions } from "@/features/round1/config/questions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    await Question.deleteMany({});
    await Question.insertMany(round1_questions);

    return NextResponse.json({ message: "Records Added" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
