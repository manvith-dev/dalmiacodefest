import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import connectDB from "@/lib/db";
import { Question } from "@/features/round1/models/Question.model";
import { round1_questions } from "@/features/round1/config/questions";

async function seed() {
  console.log("MONGO:", process.env.MONGODB_URI);

  await connectDB();

  await Question.deleteMany({});
  await Question.insertMany(round1_questions);

  console.log("✅ Round 1 questions seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
