import questions from "./questions.json";

export type SkinResult = {
  label: string;
  emoji: string;
  description: string;
  tags: string[];
  accent: string;
  bg: string;
};

export const RESULTS: Record<number, SkinResult> = {
  0: {
    label: "Oily Skin",
    emoji: "💧",
    description:
      "Your skin produces excess sebum, especially in the T-zone. Lightweight, non-comedogenic products and a consistent twice-daily cleanse will keep shine in check.",
    tags: ["Balancing", "Mattifying", "Pore-care"],
    accent: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 border-sky-100 dark:bg-sky-950/40 dark:border-sky-900/50",
  },
  1: {
    label: "Dry Skin",
    emoji: "🌿",
    description:
      "Your skin craves moisture and can feel tight or flaky. Rich hydrating serums, a gentle cleanser, and daily SPF will nourish and protect your skin barrier.",
    tags: ["Hydrating", "Nourishing", "Barrier-repair"],
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
  },
  2: {
    label: "Combination Skin",
    emoji: "✨",
    description:
      "You have a mix of oily and dry zones. A balanced routine with targeted products for each area will keep your skin comfortable and healthy all day.",
    tags: ["Balancing", "Adaptive", "Zone-care"],
    accent: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50",
  },
};

// Tallies each answer's option index (0/1/2) across all questions,
// then returns the skin type that received the most votes.
export function getResult(answers: string[]): SkinResult {
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0 };

  answers.forEach((answer, qi) => {
    const index = questions[qi]?.options.indexOf(answer) ?? -1;
    if (index in counts) counts[index]++;
  });

  const dominant = Number(
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
  );

  return RESULTS[dominant] ?? RESULTS[2];
}
