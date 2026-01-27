import transporter from "@/lib/mailer";
import { EVENT } from "@/config/event";

interface PlayerInfo {
  email: string;
  name: string;
}

interface ConfirmationMailParams {
  teamName: string;
  collegeName: string;
  registrationId: string;
  players: PlayerInfo[];
}

const year = new Date().getFullYear();

export async function sendConfirmationMail({
  teamName,
  collegeName,
  registrationId,
  players,
}: ConfirmationMailParams) {
  const emails = players.map((p) => p.email);

  const mailOptions = {
    from: `"DCF Registration" <${process.env.EMAIL_USER}>`,
    to: emails.join(","), // send to both players
    subject: "DCF Registration Confirmed",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #1e1f29;
        color: #f8f8f2;
        padding: 24px;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
      ">

        <h2 style="color: #50fa7b; margin-bottom: 8px;">
          Registration Confirmed ✅
        </h2>

        <p style="margin-top: 0;">
          Your team has been successfully registered for
          <strong>${EVENT.name}</strong>.
        </p>

        <hr style="border-color: #44475a; margin: 20px 0;" />

        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Team Name:</strong> ${teamName}</p>
        <p><strong>College:</strong> ${collegeName}</p>

        <p style="margin-top: 16px;"><strong>Players:</strong></p>
        <ul style="padding-left: 18px;">
          ${players.map((p) => `<li>${p.name} — ${p.email}</li>`).join("")}
        </ul>

        <hr style="border-color: #44475a; margin: 20px 0;" />

        <h3 style="color: #8be9fd; margin-bottom: 8px;">Event Details</h3>
        <p><strong>Date:</strong> 6 February 2026</p>
        <p><strong>Time:</strong> 9:00 AM onwards</p>

        <div style="margin: 24px 0;">
          <a
            href="${EVENT.WhatsAppGroupLink}"
            target="_blank"
            style="
              display: inline-block;
              background-color: #25D366;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 16px;
              border-radius: 6px;
              font-weight: bold;
              margin-right: 10px;
            "
          >
            Join WhatsApp Group
          </a>

          <a
            href="https://maps.app.goo.gl/mXsyMt9KEBXHqfhy8"
            target="_blank"
            style="
              display: inline-block;
              background-color: #6272a4;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 16px;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            View Location on Map
          </a>
        </div>

        <p style="font-size: 14px; color: #cfcfcf;">
          📌 Please keep this email safe and show it at the event registration desk.
        </p>

        <hr style="border-color: #44475a; margin: 24px 0;" />
        
        <h3 style="color: #ffb86c; margin-bottom: 8px;">
        Important Instructions
        </h3>
        
        <ul style="padding-left: 18px; color: #e0e0e0; font-size: 14px;">
        <li>
        Participants must carry a <strong>valid college ID card</strong> on the
        event day.
        </li>
        <li>
        Teams are required to be present at the venue
        <strong>at least 30 minutes before</strong> the event starts.
        </li>
        <li>
        The <strong>9:00 AM start time is tentative</strong>. Any changes to the
        schedule or date will be communicated via the
        <strong>official website</strong> and the
        <strong>WhatsApp group</strong>.
        </li>
        <li>
        Teams must strictly adhere to the rules and instructions provided by the
        event coordinators.
        </li>
        <li>
        Any form of malpractice or misbehavior may lead to
        <strong>immediate disqualification</strong>.
        </li>
        </ul>
        
        <hr style="border-color: #44475a; margin: 24px 0;" />
        
        <footer style="font-size: 13px; color: #9aa0a6; text-align: center;">
          <p style="margin: 4px 0;">
            ${
              EVENT.name
            } · Prahladrai Dalmia Lions College of Commerce & Economincs
          </p>
          <p style="margin: 0;">
            &copy; ${year} Prahladrai Dalmia Lions College of Commerce & Economics
          </p>
        </footer>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
