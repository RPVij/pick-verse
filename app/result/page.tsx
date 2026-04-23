"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getResult } from "@/data/results";
import PageShell from "@/components/PageShell";
import Button from "@/components/Button";

function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();

  let answers: string[] = [];
  try {
    const raw = params.get("answers");
    answers = raw ? JSON.parse(decodeURIComponent(raw)) : [];
  } catch {
    // malformed param — getResult returns a default
  }

  const result = getResult(answers);

  return (
    <div className="w-full max-w-sm space-y-6">

      {/* bg and accent carry both light + dark classes from data/results.ts */}
      <div className={`rounded-3xl border-2 p-8 text-center space-y-5 ${result.bg}`}>
        <div className="text-6xl">{result.emoji}</div>

        <div className="space-y-2">
          <p className={`text-sm font-semibold uppercase tracking-widest ${result.accent}`}>
            Your Skin Type
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100">
            {result.label}
          </h1>
        </div>

        <p className="text-gray-600 dark:text-slate-400 text-base leading-relaxed">
          {result.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${result.bg} ${result.accent} border-current/20`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={() => router.push("/quiz")}>Retake Quiz</Button>
        <Button variant="ghost" onClick={() => router.push("/")}>Back to Home</Button>
      </div>

    </div>
  );
}

export default function ResultPage() {
  return (
    <PageShell>
      <Suspense fallback={
        <p className="text-gray-400 dark:text-slate-500 animate-pulse">Loading your results…</p>
      }>
        <ResultContent />
      </Suspense>
    </PageShell>
  );
}
