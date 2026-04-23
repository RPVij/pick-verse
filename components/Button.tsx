import Link from "next/link";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
} & (
  | { href: string; onClick?: never; disabled?: never }
  | { href?: never; onClick?: () => void; disabled?: boolean }
);

const variants: Record<string, string> = {
  primary: `block w-full py-4 rounded-2xl text-lg font-semibold text-center text-white
    bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400
    shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300
    dark:shadow-indigo-950 dark:hover:shadow-indigo-900
    active:scale-95 transition-all duration-200
    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100`,
  ghost: `block w-full py-4 rounded-2xl border-2 text-lg font-semibold text-center
    border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50
    dark:border-[#2e2b40] dark:bg-[#1c1928] dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-[#252235]
    active:scale-95 transition-all duration-200`,
};

export default function Button({ children, variant = "primary", href, onClick, disabled }: Props) {
  const cls = variants[variant];

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
