import mongoose from "mongoose";

const Round2QuestionSchema = new mongoose.Schema(
  {
    questionNo: { type: Number, required: true },
    language: {
      type: String,
      enum: ["java", "cpp", "python"],
      required: true,
    },

    code: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    tries: { type: Number, default: 0 },
    maxMarks: { type: Number, required: true },
    solved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Round2Question =
  mongoose.models.Round2Question ||
  mongoose.model("Round2Question", Round2QuestionSchema);
