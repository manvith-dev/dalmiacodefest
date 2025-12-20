import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 20,
  rateDelta: 1000,
  rateLimit: 5,
});

export default transporter;
