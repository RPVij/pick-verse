"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/Button";

type Question = {
  _id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  difficulty: string;
};

type Answer = {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
};

type BreakdownItem = {
  question: Question;
  answer: Answer;
};

function getEmoji(pct: number) {
  if (pct === 100) return "🏆";
  if (pct >= 80)   return "🎉";
  if (pct >= 60)   return "👍";
  if (pct >= 40)   return "💪";
  return "📚";
}

function getMessage(pct: number) {
  if (pct === 100) return "Perfect score! You're a skincare expert!";
  if (pct >= 80)   return "Great job! You really know your skincare.";
  if (pct >= 60)   return "Good effort! A bit more reading and you'll ace it.";
  if (pct >= 40)   return "Not bad — keep exploring skincare tips!";
  return "Every expert starts somewhere. Try again!";
}

function ResultContent() {
  const params = useSearchParams();
  const score  = Number(params.get("score") ?? 0);
  const total  = Number(params.get("total") ?? 10);
  const pct    = Math.round((score / total) * 100);

  // Read full quiz data saved by the quiz page before redirecting
  let breakdown: BreakdownItem[] = [];
  try {
    const saved = localStorage.getItem("pickverse_result");
    if (saved) {
      const { questions, answers } = JSON.parse(saved) as {
        questions: Question[];
        answers: Answer[];
      };
      breakdown = questions.map((q, i) => ({ question: q, answer: answers[i] }));
    }
  } catch {
    // localStorage unavailable or malformed — show score only
  }

  return (
    <div className="w-full max-w-2xl space-y-6">

      {/* Score card */}
      <div className="rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4
        bg-indigo-50 border-indigo-100
        dark:bg-indigo-950/40 dark:border-indigo-900/50">
        <div className="text-5xl sm:text-6xl">{getEmoji(pct)}</div>
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
            Your Score
          </p>
          <p className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-slate-100">
            {score}<span className="text-2xl sm:text-3xl text-gray-400 dark:text-slate-500">/{total}</span>
          </p>
          <p className="text-indigo-500 dark:text-indigo-400 font-medium">{pct}% correct</p>
        </div>
        <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base">{getMessage(pct)}</p>
      </div>

      {/* Answer breakdown */}
      {breakdown.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 text-center">
            Answer Breakdown
          </h2>

          {breakdown.map(({ question, answer }, i) => {
            const correct = answer.correct;
            const chosen  = question.options[answer.selectedIndex];
            const right   = question.options[question.correctIndex];

            return (
              <div
                key={question._id}
                className={`rounded-2xl border p-4 sm:p-5 space-y-3
                  ${correct
                    ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/40"
                    : "bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900/40"
                  }`}
              >
                {/* Question header */}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{correct ? "✅" : "❌"}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/60 dark:bg-black/20 text-gray-500 dark:text-slate-400 capitalize">
                        {question.category}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">Q{i + 1}</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900 dark:text-slate-100 leading-snug">
                      {question.question}
                    </p>
                  </div>
                </div>

                {/* Answer details */}
                <div className="ml-9 space-y-1.5 text-sm">
                  {correct ? (
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                      ✓ {chosen}
                    </p>
                  ) : (
                    <>
                      <p className="text-red-600 dark:text-red-400">
                        ✗ You chose: <span className="font-medium">{chosen}</span>
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400">
                        ✓ Correct: <span className="font-medium">{right}</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
