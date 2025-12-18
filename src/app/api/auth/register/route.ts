import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import validateInputs from "@/lib/register/validations";
import Team from "@/models/team.model";
import jwt from "jsonwebtoken";
import { SendOTP } from "@/lib/register/sendotp";
import addOtpToDb from "@/lib/register/addOTPtoDB";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const errors = validateInputs(body);
  if (errors.length) {
    return NextResponse.json(
      {
        error: "Invalid input. Please check your data.",
      },
      {
        status: 400,
      }
    );
  }

  const {
    teamName,
    clgName,
    p1name,
    p1email,
    p1phone,
    p2name,
    p2email,
    p2phone,
  } = body;

  try {
    await connectDB();
    const exisitingTeam = await Team.findOne({ teamName });
    if (exisitingTeam)
      return NextResponse.json(
        {
          error: `Team Name ${teamName} already exists. Please try a new one`,
        },
        { status: 404 }
      );

    const existingContact = await Team.findOne({
      players: {
        $elemMatch: {
          $or: [
            { email: p1email },
            { email: p2email },
            { phone: p1phone },
            { phone: p2phone },
          ],
        },
      },
    });

    if (existingContact) {
      return NextResponse.json(
        {
          error:
            "One of the emails or phone numbers is already registered in another team.",
        },
        { status: 400 }
      );
    }

    const team = new Team({
      teamName,
      collegeName: clgName,
      players: [
        { name: p1name, email: p1email, phone: p1phone },
        { name: p2name, email: p2email, phone: p2phone },
      ],
    });

    await team.save();

    const token = jwt.sign(
      {
        id: team._id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const [otp1, otp2] = await Promise.all([
      SendOTP(p1email),
      SendOTP(p2email),
    ]);

    if (otp1 && otp2) {
      await Promise.all([addOtpToDb(otp1, p1email), addOtpToDb(otp2, p2email)]);
    }

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
