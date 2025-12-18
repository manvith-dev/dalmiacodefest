import transporter from "@/lib/mailer";

export async function SendOTP(email: string) {
  const otp = generateOTP();

  try {
    const mailOptions = {
      from: `"DCF Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your DCF Verification Code",
      html: `
          <div style="font-family: sans-serif">
          <h2>DCF Email Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 4px">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
          </div>`,
    };

    await transporter.sendMail(mailOptions);

    return otp;
  } catch (error) {
    return "";
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
