import mongoose, { Schema, Document } from "mongoose";

interface Answer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export interface IResponse extends Document {
  sessionId: string;   // random client-generated ID — no auth required
  score: number;
  total: number;
  answers: Answer[];
  createdAt: Date;
}

const AnswerSchema = new Schema<Answer>({
  questionId:    { type: String, required: true },
  selectedIndex: { type: Number, required: true },
  correct:       { type: Boolean, required: true },
}, { _id: false });

const ResponseSchema = new Schema<IResponse>({
  sessionId: { type: String, required: true },
  score:     { type: Number, required: true },
  total:     { type: Number, required: true },
  answers:   { type: [AnswerSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Response =
  mongoose.models.Response ||
  mongoose.model<IResponse>("Response", ResponseSchema);
