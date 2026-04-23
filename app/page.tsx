import PageShell from "@/components/PageShell";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <PageShell>
      <div className="w-full max-w-sm text-center space-y-8">

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center
            shadow-lg shadow-indigo-200 dark:shadow-indigo-950">
            <span className="text-4xl">🌿</span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            PickVerse
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed">
            Discover your perfect skincare match in under a minute.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/quiz">Start Quiz</Button>
        </div>

      </div>
    </PageShell>
  );
}
