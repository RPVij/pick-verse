import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";

export async function GET() {
  try {
    await connectDB();

    // $sample selects N random documents at the DB level — efficient at any scale
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

    if (!questions.length) {
      return NextResponse.json(
        { error: "No questions found. Please seed the database." },
        { status: 404 }
      );
    }

    return NextResponse.json(questions);
  } catch (err) {
    console.error("GET /api/questions:", err);
    return NextResponse.json({ error: "Failed to fetch questions." }, { status: 500 });
  }
}
