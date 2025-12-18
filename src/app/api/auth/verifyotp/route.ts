import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Team from "@/models/team.model";
import Otp from "@/models/opt.model";
import bcrypt from "bcryptjs";

interface RegisterTokenPayload extends JwtPayload {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { otp1, otp2, token } = body;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as RegisterTokenPayload;

    try {
      await connectDB();

      const team = await Team.findById(decoded.id);
      if (!team || team.players.length < 2) {
        return NextResponse.json({ error: "Invalid team" }, { status: 400 });
      }

      const email1 = team.players[0].email;
      const email2 = team.players[1].email;

      const [player1, player2] = await Promise.all([
        Otp.findOne({ email: email1 }),
        Otp.findOne({ email: email2 }),
      ]);

      if (!player1 || !player2) {
        return NextResponse.json({ error: "OTP not found" }, { status: 400 });
      }

      const isOtp1Valid = await bcrypt.compare(otp1, player1.otpHash);
      const isOtp2Valid = await bcrypt.compare(otp2, player2.otpHash);

      if (!isOtp1Valid || !isOtp2Valid) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
      }

      team.isVerified = true;
      await team.save();
      await Promise.all([player1.deleteOne(), player2.deleteOne()]);

      return NextResponse.json({ success: true });
    } catch {
      return NextResponse.json({ error: "Database Error" }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
