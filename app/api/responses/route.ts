import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Response } from "@/models/Response";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { sessionId, score, total, answers } = body;

    if (!sessionId || score === undefined || !total || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const saved = await Response.create({ sessionId, score, total, answers });
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    console.error("POST /api/responses:", err);
    return NextResponse.json({ error: "Failed to save response." }, { status: 500 });
  }
}
