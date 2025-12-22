import connectDB from "@/lib/db";
import Team from "@/models/team.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_token");

  if (!adminCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(adminCookie.value, process.env.JWT_SECRET as string);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    await connectDB();
    const count = await Team.countDocuments();
    return NextResponse.json({ count }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
