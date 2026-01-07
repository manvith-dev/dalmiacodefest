import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    _id: String,
    question: String,
    options: [String],
    correctOption: Number,
    difficulty: String,
    marks: Number,
    isActive: Boolean,

    userAnswer: { type: Number, default: null },
    isCorrect: { type: Boolean, default: null },
    isVisited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);
