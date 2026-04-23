type Props = {
  option: string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionButton({ option, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left
        transition-all duration-150 cursor-pointer
        ${selected
          ? `border-indigo-500 bg-indigo-50 shadow-sm shadow-indigo-100
             dark:border-indigo-400 dark:bg-indigo-950/50 dark:shadow-indigo-950`
          : `border-gray-100 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm
             dark:border-[#2e2b40] dark:bg-[#1c1928] dark:hover:border-indigo-500/40 dark:hover:bg-indigo-950/30`
        }`}
    >
      {/* Radio dot */}
      <span
        className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-150
          ${selected
            ? "border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400"
            : "border-gray-300 dark:border-slate-600 group-hover:border-indigo-300 dark:group-hover:border-indigo-500"
          }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
      </span>

      <span className={`text-base font-medium transition-colors duration-150
        ${selected
          ? "text-indigo-800 dark:text-indigo-200"
          : "text-gray-700 dark:text-slate-300"
        }`}
      >
        {option}
      </span>
    </button>
  );
}
