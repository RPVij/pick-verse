import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PickVerse — Skincare Quiz",
  description: "Discover your perfect skincare match",
};

// Runs before React hydrates to avoid flash of wrong theme.
// Default is light mode — only switch to dark if user manually chose it via the toggle.
const darkScript = `
  (function() {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkScript }} />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#faf8f5] text-gray-900 dark:bg-[#0f0e1a] dark:text-slate-100 transition-colors duration-300">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
