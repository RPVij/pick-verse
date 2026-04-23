import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local before anything else — tsx doesn't do this automatically
config({ path: resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { Question } from "../models/Question";
import questions from "./questions-merged.json";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set in .env.local");

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected to MongoDB");

  await Question.deleteMany({});
  console.log("Cleared existing questions");

  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
