"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/Button";

function getEmoji(pct: number) {
  if (pct === 100) return "🏆";
  if (pct >= 80)  return "🎉";
  if (pct >= 60)  return "👍";
  if (pct >= 40)  return "💪";
  return "📚";
}

function getMessage(pct: number) {
  if (pct === 100) return "Perfect score! You're a skincare expert!";
  if (pct >= 80)  return "Great job! You really know your skincare.";
  if (pct >= 60)  return "Good effort! A bit more reading and you'll ace it.";
  if (pct >= 40)  return "Not bad — keep exploring skincare tips!";
  return "Every expert starts somewhere. Try again!";
}

function ResultContent() {
  const params = useSearchParams();
  const score  = Number(params.get("score") ?? 0);
  const total  = Number(params.get("total") ?? 10);
  const pct    = Math.round((score / total) * 100);

  return (
    <div className="w-full max-w-sm space-y-6 text-center">

      {/* Score card */}
      <div className="rounded-3xl border-2 p-8 space-y-5
        bg-indigo-50 border-indigo-100
        dark:bg-indigo-950/40 dark:border-indigo-900/50">

        <div className="text-6xl">{getEmoji(pct)}</div>

        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Your Score
          </p>
          <p className="text-6xl font-bold text-gray-900 dark:text-slate-100">
            {score}<span className="text-3xl text-gray-400 dark:text-slate-500">/{total}</span>
          </p>
          <p className="text-indigo-500 dark:text-indigo-400 font-medium">{pct}% correct</p>
        </div>

        <p className="text-gray-600 dark:text-slate-400 text-base leading-relaxed">
          {getMessage(pct)}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button href="/quiz">Play Again</Button>
        <Button variant="ghost" href="/">Back to Home</Button>
      </div>

    </div>
  );
}

export default function ResultPage() {
  return (
    <PageShell>
      <Suspense fallback={
        <p className="text-gray-400 dark:text-slate-500 animate-pulse">Loading results…</p>
      }>
        <ResultContent />
      </Suspense>
    </PageShell>
  );
}
