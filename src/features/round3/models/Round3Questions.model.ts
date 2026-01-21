import mongoose from "mongoose";

const Round3QuestionSchema = new mongoose.Schema(
  {
    questionNo: { type: Number, required: true },
    problemStatement: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    tries: { type: Number, default: 0 },
    maxMarks: { type: Number, required: true },
    solved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Round3Question =
  mongoose.models.Round3Question ||
  mongoose.model("Round3Question", Round3QuestionSchema);
