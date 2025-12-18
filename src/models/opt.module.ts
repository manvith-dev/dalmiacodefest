import mongoose from "mongoose";

export interface IOtp extends mongoose.Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: false }
);

const Otp = mongoose.model<IOtp>("Otp", otpSchema);
export default Otp;
