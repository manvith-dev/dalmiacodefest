import mongoose from "mongoose";

const Round2QuestionSchema = new mongoose.Schema(
  {
    question: { type: Number, required: true },
    language: {
      type: String,
      enum: ["java", "cpp", "py"],
      required: true,
    },
    code: { type: String, required: true },
    expectedOutput: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Round2Question =
  mongoose.models.Round2Question ||
  mongoose.model("Round2Question", Round2QuestionSchema);
