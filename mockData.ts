// Mock data for ExamShield AI demo

import { TestAttempt, Question } from "@/types/exam";

// Simulated user profile
export const mockUser = {
  name: "Arjun Sharma",
  email: "arjun@student.edu",
  avatar: "AS",
  testsAttempted: 12,
  averageScore: 74,
  streakDays: 7,
  rank: "Gold Achiever",
};

// Recent test history
export const mockTestHistory: TestAttempt[] = [
  {
    id: "t1",
    subject: "Physics",
    difficulty: "Medium",
    date: "2026-02-18",
    score: 76,
    totalMarks: 100,
    accuracy: 76,
    timeTaken: 45,
    topicWise: {
      "Mechanics": { correct: 8, total: 10 },
      "Thermodynamics": { correct: 5, total: 10 },
      "Optics": { correct: 4, total: 8 },
      "Electrostatics": { correct: 6, total: 8 },
      "Magnetism": { correct: 3, total: 4 },
    },
    weakTopics: ["Thermodynamics", "Optics"],
  },
  {
    id: "t2",
    subject: "Mathematics",
    difficulty: "Hard",
    date: "2026-02-15",
    score: 62,
    totalMarks: 100,
    accuracy: 62,
    timeTaken: 55,
    topicWise: {
      "Calculus": { correct: 6, total: 10 },
      "Algebra": { correct: 7, total: 10 },
      "Probability": { correct: 3, total: 8 },
      "Trigonometry": { correct: 5, total: 8 },
      "Matrices": { correct: 2, total: 4 },
    },
    weakTopics: ["Probability", "Matrices"],
  },
  {
    id: "t3",
    subject: "Chemistry",
    difficulty: "Easy",
    date: "2026-02-12",
    score: 88,
    totalMarks: 100,
    accuracy: 88,
    timeTaken: 35,
    topicWise: {
      "Organic": { correct: 9, total: 10 },
      "Inorganic": { correct: 8, total: 10 },
      "Physical": { correct: 7, total: 8 },
      "Electrochemistry": { correct: 6, total: 8 },
      "Thermodynamics": { correct: 4, total: 4 },
    },
    weakTopics: ["Physical Chemistry"],
  },
];

// Mock questions for Physics - Medium
export const mockPhysicsQuestions: Question[] = [
  {
    id: "q1",
    type: "MCQ",
    question: "A particle moves in a circle of radius R with constant angular velocity ω. What is the centripetal acceleration?",
    options: ["ω²R", "ωR²", "ω/R", "R/ω²"],
    correctAnswer: 0,
    topic: "Mechanics",
    marks: 2,
    timeLimit: 90,
  },
  {
    id: "q2",
    type: "MCQ",
    question: "The first law of thermodynamics is essentially a statement of:",
    options: ["Conservation of momentum", "Conservation of energy", "Conservation of mass", "Conservation of charge"],
    correctAnswer: 1,
    topic: "Thermodynamics",
    marks: 2,
    timeLimit: 90,
  },
  {
    id: "q3",
    type: "MCQ",
    question: "Which of the following phenomena supports the wave nature of light?",
    options: ["Photoelectric effect", "Compton scattering", "Diffraction", "Pair production"],
    correctAnswer: 2,
    topic: "Optics",
    marks: 2,
    timeLimit: 90,
  },
  {
    id: "q4",
    type: "MCQ",
    question: "Electric field inside a conductor in electrostatic equilibrium is:",
    options: ["Infinite", "Zero", "Equal to surface charge density", "Depends on material"],
    correctAnswer: 1,
    topic: "Electrostatics",
    marks: 2,
    timeLimit: 90,
  },
  {
    id: "q5",
    type: "MCQ",
    question: "The magnetic field at the center of a circular loop of radius r carrying current I is:",
    options: ["μ₀I/2r", "μ₀I/4πr", "2μ₀I/r", "μ₀I/r"],
    correctAnswer: 0,
    topic: "Magnetism",
    marks: 2,
    timeLimit: 90,
  },
  {
    id: "q6",
    type: "Short",
    question: "Explain the principle of superposition of waves and give two examples from daily life.",
    expectedAnswer: "Superposition states that when two or more waves overlap, the resultant displacement equals the algebraic sum of individual displacements. Examples: noise-canceling headphones (destructive interference), musical harmonics (constructive interference).",
    topic: "Waves",
    marks: 5,
    timeLimit: 300,
  },
  {
    id: "q7",
    type: "Long",
    question: "Derive the expression for the time period of a simple pendulum. State all assumptions made and discuss the factors affecting it.",
    expectedAnswer: "Derivation using SHM: T = 2π√(L/g). Assumptions: small angle approximation, massless string, no air resistance, rigid support. Factors: length (T ∝ √L), gravity (T ∝ 1/√g). Not affected by mass or amplitude (for small angles).",
    topic: "Mechanics",
    marks: 10,
    timeLimit: 600,
  },
];

// Subjects list
export const subjects = [
  { name: "Physics", icon: "⚡", color: "cyan", topics: ["Mechanics", "Thermodynamics", "Optics", "Electrostatics", "Magnetism", "Waves", "Modern Physics"] },
  { name: "Mathematics", icon: "∑", color: "purple", topics: ["Calculus", "Algebra", "Probability", "Trigonometry", "Matrices", "Vectors", "Statistics"] },
  { name: "Chemistry", icon: "⚗", color: "green", topics: ["Organic", "Inorganic", "Physical", "Electrochemistry", "Thermodynamics", "Coordination"] },
  { name: "Biology", icon: "🧬", color: "amber", topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Plant Biology", "Evolution"] },
  { name: "Computer Science", icon: "💻", color: "blue", topics: ["Algorithms", "Data Structures", "OS", "DBMS", "Networks", "OOP"] },
  { name: "Economics", icon: "📊", color: "red", topics: ["Microeconomics", "Macroeconomics", "Trade", "Money", "Development", "Statistics"] },
];

// Weekly performance data for charts
export const weeklyData = [
  { day: "Mon", score: 65, accuracy: 70 },
  { day: "Tue", score: 72, accuracy: 75 },
  { day: "Wed", score: 68, accuracy: 72 },
  { day: "Thu", score: 80, accuracy: 82 },
  { day: "Fri", score: 76, accuracy: 78 },
  { day: "Sat", score: 88, accuracy: 85 },
  { day: "Sun", score: 74, accuracy: 76 },
];
