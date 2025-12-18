import Otp from "@/models/opt.model";
import connectDB from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function addOtpToDb(otp: string, email: string) {
  await connectDB();

  const otpHash = await bcrypt.hash(otp, 10);

  //If email exits we update with latest one.
  await Otp.findOneAndUpdate(
    { email },
    {
      $set: {
        otpHash,
        createdAt: new Date(),
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
}
