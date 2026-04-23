import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  options: string[];     // always 4 options
  correctIndex: number;  // 0–3
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

const QuestionSchema = new Schema<IQuestion>({
  question:     { type: String, required: true, unique: true, trim: true },
  options:      { type: [String], required: true },
  correctIndex: { type: Number, required: true, min: 0, max: 3 },
  category:     { type: String, required: true, trim: true },
  difficulty:   { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
});

// Prevent model re-compilation on hot reload
export const Question =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
