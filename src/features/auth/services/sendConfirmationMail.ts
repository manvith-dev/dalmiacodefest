import transporter from "@/lib/mailer";

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
      <div style="font-family: Arial, sans-serif; color: #f8f8f2; background-color: #282a36; padding: 20px; border-radius: 8px;">
        <h2 style="color: #50fa7b;">Registration Confirmed</h2>

        <p>Your team has been successfully registered for <strong>Dalmia Code Fest</strong>.</p>

        <hr style="border-color: #44475a;" />

        <p><strong>Registration ID:</strong> ${registrationId}</p>
        <p><strong>Team Name:</strong> ${teamName}</p>
        <p><strong>College:</strong> ${collegeName}</p>

        <p><strong>Players:</strong></p>
        <ul>
          ${players.map((p) => `<li>${p.name} — ${p.email}</li>`).join("")}
        </ul>

        <hr style="border-color: #44475a;" />

        <p>📌 <strong>Important:</strong> Show this email at the event registration desk.</p>

        <p>— DCF Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
