import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local before anything else — tsx doesn't do this automatically
config({ path: resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { Question } from "../models/Question";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set in .env.local");

const questions = [
  {
    question: "What does SPF stand for?",
    options: ["Sun Protection Factor", "Skin Protection Formula", "Sun Prevention Filter", "Solar Protection Frequency"],
    correctIndex: 0,
    category: "SPF",
    difficulty: "easy",
  },
  {
    question: "Which acid is most effective for treating acne by unclogging pores?",
    options: ["Hyaluronic acid", "Salicylic acid", "Ascorbic acid", "Lactic acid"],
    correctIndex: 1,
    category: "ingredients",
    difficulty: "easy",
  },
  {
    question: "What is the recommended minimum SPF for daily use according to dermatologists?",
    options: ["SPF 10", "SPF 15", "SPF 30", "SPF 50"],
    correctIndex: 2,
    category: "SPF",
    difficulty: "easy",
  },
  {
    question: "Vitamin C in skincare is also known as?",
    options: ["Retinol", "Niacinamide", "Ascorbic acid", "Glycolic acid"],
    correctIndex: 2,
    category: "ingredients",
    difficulty: "easy",
  },
  {
    question: "What is hyaluronic acid primarily used for in skincare?",
    options: ["Exfoliation", "Oil control", "Hydration", "Brightening"],
    correctIndex: 2,
    category: "ingredients",
    difficulty: "easy",
  },
  {
    question: "Which skin type is characterised by shiny appearance and enlarged pores?",
    options: ["Dry", "Normal", "Sensitive", "Oily"],
    correctIndex: 3,
    category: "skin types",
    difficulty: "easy",
  },
  {
    question: "Retinol is a derivative of which vitamin?",
    options: ["Vitamin C", "Vitamin A", "Vitamin E", "Vitamin K"],
    correctIndex: 1,
    category: "ingredients",
    difficulty: "medium",
  },
  {
    question: "What is the correct order for a basic skincare routine?",
    options: [
      "Moisturiser → Toner → Serum",
      "Serum → Toner → Moisturiser",
      "Toner → Serum → Moisturiser",
      "Cleanser → Moisturiser → Toner",
    ],
    correctIndex: 2,
    category: "routine",
    difficulty: "medium",
  },
  {
    question: "What does 'non-comedogenic' mean on a product label?",
    options: ["Fragrance-free", "Won't clog pores", "Dermatologist tested", "Paraben-free"],
    correctIndex: 1,
    category: "terminology",
    difficulty: "medium",
  },
  {
    question: "Which UV rays are primarily responsible for skin ageing?",
    options: ["UVA", "UVB", "UVC", "UVD"],
    correctIndex: 0,
    category: "SPF",
    difficulty: "medium",
  },
  {
    question: "What is the main function of ceramides in skincare?",
    options: ["Brightening", "Reducing inflammation", "Strengthening the skin barrier", "Promoting cell turnover"],
    correctIndex: 2,
    category: "ingredients",
    difficulty: "medium",
  },
  {
    question: "Which ingredient should NOT be used in the same routine as retinol to avoid irritation?",
    options: ["Hyaluronic acid", "Ceramides", "AHA or BHA exfoliants", "Niacinamide"],
    correctIndex: 2,
    category: "ingredients",
    difficulty: "hard",
  },
  {
    question: "What is the Fitzpatrick scale used to classify?",
    options: ["Skin hydration levels", "Skin type and sun sensitivity", "Severity of acne", "Collagen density"],
    correctIndex: 1,
    category: "dermatology",
    difficulty: "hard",
  },
  {
    question: "Which layer of the skin is the outermost?",
    options: ["Dermis", "Hypodermis", "Epidermis", "Subcutis"],
    correctIndex: 2,
    category: "dermatology",
    difficulty: "medium",
  },
  {
    question: "Niacinamide is a form of which vitamin?",
    options: ["Vitamin A", "Vitamin B3", "Vitamin C", "Vitamin D"],
    correctIndex: 1,
    category: "ingredients",
    difficulty: "medium",
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected to MongoDB");

  // Clear existing questions to avoid duplicates on re-run
  await Question.deleteMany({});
  console.log("Cleared existing questions");

  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
