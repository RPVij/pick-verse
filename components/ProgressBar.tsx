type Props = {
  current: number; // 1-based question number
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  // Bar fills AFTER each submission: 0% on Q1, 10% on Q2, etc.
  const pct = Math.round(((current - 1) / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium text-gray-400 dark:text-slate-500">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
