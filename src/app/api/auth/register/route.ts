import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import validateInputs from "@/features/auth/services/validations";
import Team from "@/models/team.model";
import { sendConfirmationMail } from "@/features/auth/services/sendConfirmationMail";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      error: "Registration has ended.",
    },
    {
      status: 410,
    },
  );

  const body = await req.json();

  const errors = validateInputs(body);
  if (errors.length) {
    return NextResponse.json(
      {
        error: "Invalid input. Please check your data.",
      },
      {
        status: 400,
      },
    );
  }

  const {
    teamName,
    clgName,
    customCollegeName,
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
        { status: 404 },
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
        { status: 400 },
      );
    }

    const registrationId = generateRegistrationId();
    const collegeNameToSave =
      clgName === "other" ? slugifyCollege(customCollegeName) : clgName;

    const team = new Team({
      registrationId,
      teamName,
      collegeName: collegeNameToSave,
      players: [
        { name: p1name, email: p1email.toLowerCase(), phone: p1phone },
        { name: p2name, email: p2email.toLowerCase(), phone: p2phone },
      ],
    });

    await team.save();

    await sendConfirmationMail({
      teamName,
      collegeName: collegeNameToSave,
      registrationId,
      players: [
        { name: p1name, email: p1email },
        { name: p2name, email: p2email },
      ],
    });

    return NextResponse.json(
      { message: "A confirmation has been sent (IMPORTANT)." },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

function generateRegistrationId() {
  return "EVT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function slugifyCollege(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove special chars
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}
