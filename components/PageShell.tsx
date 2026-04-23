type Props = {
  children: React.ReactNode;
};

// Shared full-screen centred wrapper with the app's gradient background.
export default function PageShell({ children }: Props) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12
      bg-gradient-to-br from-indigo-50 via-[#faf8f5] to-purple-50
      dark:from-[#0f0e1a] dark:via-[#13101f] dark:to-[#0f0e1a]">
      {children}
    </main>
  );
}
