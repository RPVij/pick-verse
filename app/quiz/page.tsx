"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import ProgressBar from "@/components/ProgressBar";
import OptionButton from "@/components/OptionButton";
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

export default function QuizPage() {
  const router = useRouter();

  const [questions, setQuestions]       = useState<Question[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers]           = useState<Answer[]>([]);
  const [fading, setFading]             = useState(false);
  const [submitting, setSubmitting]     = useState(false);

  // Stable session ID for the lifetime of this quiz attempt
  const [sessionId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setQuestions(data);
      })
      .catch((err) => setError(err.message ?? "Failed to load questions."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageShell>
        <p className="text-gray-400 dark:text-slate-500 animate-pulse">Loading questions…</p>
      </PageShell>
    );
  }

  if (error || !questions.length) {
    return (
      <PageShell>
        <div className="text-center space-y-4">
          <p className="text-gray-500 dark:text-slate-400">{error ?? "No questions available."}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </PageShell>
    );
  }

  const question = questions[currentIndex];
  const isLast   = currentIndex === questions.length - 1;

  async function handleNext() {
    if (selectedIndex === null || fading || submitting) return;

    const answer: Answer = {
      questionId:    question._id,
      selectedIndex,
      correct:       selectedIndex === question.correctIndex,
    };
    const updatedAnswers = [...answers, answer];

    if (isLast) {
      setSubmitting(true);
      const score = updatedAnswers.filter((a) => a.correct).length;

      // Persist full quiz data so the result page can show the breakdown
      try {
        localStorage.setItem(
          "pickverse_result",
          JSON.stringify({ questions, answers: updatedAnswers })
        );
      } catch {
        // non-critical
      }

      // Save response to DB — navigate even if this fails
      try {
        await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            score,
            total: questions.length,
            answers: updatedAnswers,
          }),
        });
      } catch {
        // non-critical
      }

      router.push(`/result?score=${score}&total=${questions.length}`);
      return;
    }

    // Fade out → swap question → fade in
    setFading(true);
    setTimeout(() => {
      setAnswers(updatedAnswers);
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setFading(false);
    }, 200);
  }

  return (
    <PageShell>
      <div className="w-full max-w-lg space-y-6">

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Question card — fades between questions */}
        <div className={`rounded-3xl p-8 space-y-6 border transition-opacity duration-200
          bg-white border-gray-100 shadow-sm
          dark:bg-[#1c1928] dark:border-[#2e2b40] dark:shadow-none
          ${fading ? "opacity-0" : "opacity-100"}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 dark:bg-indigo-950/50 dark:text-indigo-400 capitalize">
              {question.category}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500 capitalize">
              {question.difficulty}
            </span>
          </div>

          <h2 className="text-xl font-semibold leading-snug text-gray-900 dark:text-slate-100">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <OptionButton
                key={idx}
                option={option}
                selected={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedIndex === null || fading || submitting}
        >
          {submitting ? "Saving…" : isLast ? "See My Results" : "Next"}
        </Button>

      </div>
    </PageShell>
  );
}
