"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questions from "@/data/questions.json";
import PageShell from "@/components/PageShell";
import ProgressBar from "@/components/ProgressBar";
import OptionButton from "@/components/OptionButton";
import Button from "@/components/Button";

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [fading, setFading] = useState(false);

  if (!questions.length) {
    return (
      <PageShell>
        <p className="text-gray-400 dark:text-slate-500">No questions available.</p>
      </PageShell>
    );
  }

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  if (!question) {
    return (
      <PageShell>
        <p className="text-gray-400 dark:text-slate-500">
          Something went wrong.{" "}
          <a href="/quiz" className="underline">Restart</a>
        </p>
      </PageShell>
    );
  }

  function handleNext() {
    if (!selectedAnswer || fading) return;

    const updated = [...selectedAnswers, selectedAnswer];

    if (isLast) {
      router.push(`/result?answers=${encodeURIComponent(JSON.stringify(updated))}`);
      return;
    }

    // Fade out → swap question → fade in
    setFading(true);
    setTimeout(() => {
      setSelectedAnswers(updated);
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
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
          <h2 className="text-xl font-semibold leading-snug text-gray-900 dark:text-slate-100">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <OptionButton
                key={option}
                option={option}
                selected={selectedAnswer === option}
                onClick={() => setSelectedAnswer(option)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleNext} disabled={!selectedAnswer || fading}>
          {isLast ? "See My Results" : "Next"}
        </Button>

      </div>
    </PageShell>
  );
}
