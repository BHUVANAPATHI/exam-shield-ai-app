// Test Setup page — select subject, difficulty, question types
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Zap, Target, ChevronRight, ChevronLeft, Info,
  Clock, FileText, Hash, Shuffle, Shield
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { subjects } from "@/data/mockData";
import { mockPhysicsQuestions } from "@/data/mockData";
import { Difficulty, TestConfig } from "@/types/exam";

const difficulties: { level: Difficulty; desc: string; color: string; time: number }[] = [
  { level: "Easy", desc: "Fundamental concepts, straightforward questions", color: "green", time: 30 },
  { level: "Medium", desc: "Application-based, mixed complexity", color: "amber", time: 45 },
  { level: "Hard", desc: "Advanced problems, exam-level difficulty", color: "red", time: 60 },
];

const colorMap: Record<string, string> = {
  cyan: "hsl(var(--cyan))",
  purple: "hsl(var(--purple-ai))",
  green: "hsl(var(--green-score))",
  amber: "hsl(var(--amber-warn))",
  blue: "hsl(188, 80%, 55%)",
  red: "hsl(var(--red-danger))",
};

export default function TestSetup() {
  const navigate = useNavigate();
  const { setActiveTest } = useApp();

  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDiff, setSelectedDiff] = useState<Difficulty>("Medium");
  const [mcqCount, setMcqCount] = useState(10);
  const [shortCount, setShortCount] = useState(3);
  const [longCount, setLongCount] = useState(2);
  const [generating, setGenerating] = useState(false);

  const totalTime = difficulties.find((d) => d.level === selectedDiff)?.time || 45;
  const totalMarks = mcqCount * 2 + shortCount * 5 + longCount * 10;

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI generation with a delay
    await new Promise((r) => setTimeout(r, 2000));
    const config: TestConfig = {
      subject: selectedSubject,
      difficulty: selectedDiff,
      mcqCount,
      shortCount,
      longCount,
      totalTime,
    };
    // In production: call AI edge function to generate unique questions
    setActiveTest({
      config,
      questions: mockPhysicsQuestions,
      startTime: Date.now(),
    });
    setGenerating(false);
    navigate("/test");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="badge-chip mx-auto mb-4">
            <Brain className="w-3 h-3" /> AI Question Generator
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
            Configure Your <span className="text-neon">Mock Test</span>
          </h1>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            AI will generate a completely unique paper — different from every other student
          </p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? "text-primary-foreground" : ""}`}
                style={{
                  background: step >= s ? "var(--grad-cyan)" : "hsl(var(--muted))",
                  color: step >= s ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                }}>
                {s}
              </div>
              {s < 3 && (
                <div className="w-12 h-0.5 rounded-full transition-all duration-300"
                  style={{ background: step > s ? "hsl(var(--cyan))" : "hsl(var(--border))" }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Subject */}
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Select Subject
                </h2>
                <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                  AI will generate syllabus-aligned questions for your chosen subject
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {subjects.map((s) => (
                    <button key={s.name} onClick={() => setSelectedSubject(s.name)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${selectedSubject === s.name ? "glow-border" : "border-border hover:border-border/80"}`}
                      style={selectedSubject === s.name ? {
                        background: `${colorMap[s.color]}10`,
                        borderColor: colorMap[s.color],
                      } : { background: "hsl(var(--card))" }}>
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <div className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{s.name}</div>
                      <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {s.topics.length} topics
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedSubject}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  Next: Difficulty <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Difficulty */}
          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Select Difficulty
                </h2>
                <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                  AI adjusts question complexity, bloom's taxonomy level & marking scheme
                </p>
                <div className="space-y-3">
                  {difficulties.map((d) => (
                    <button key={d.level} onClick={() => setSelectedDiff(d.level)}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-200 ${selectedDiff === d.level ? "glow-border" : "border-border hover:border-border/80"}`}
                      style={selectedDiff === d.level ? {
                        background: `${colorMap[d.color]}10`,
                        borderColor: colorMap[d.color],
                      } : { background: "hsl(var(--card))" }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{d.level}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: `${colorMap[d.color]}18`, color: colorMap[d.color] }}>
                              {d.time} min
                            </span>
                          </div>
                          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{d.desc}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${selectedDiff === d.level ? "border-4" : ""}`}
                          style={{ borderColor: colorMap[d.color] }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200"
                  style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  Next: Questions <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Question count + review */}
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Question Configuration
                </h2>
                <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Customize the mix of question types for your paper
                </p>
                <div className="space-y-5">
                  {[
                    { label: "MCQs (2 marks each)", key: "mcq", value: mcqCount, set: setMcqCount, min: 5, max: 30 },
                    { label: "Short Answers (5 marks each)", key: "short", value: shortCount, set: setShortCount, min: 0, max: 10 },
                    { label: "Long Answers (10 marks each)", key: "long", value: longCount, set: setLongCount, min: 0, max: 5 },
                  ].map((q) => (
                    <div key={q.key}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>{q.label}</label>
                        <span className="font-mono font-bold text-sm" style={{ color: "hsl(var(--cyan))" }}>{q.value}</span>
                      </div>
                      <input type="range" min={q.min} max={q.max} value={q.value}
                        onChange={(e) => q.set(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: "hsl(var(--cyan))", background: "hsl(var(--muted))" }}
                      />
                      <div className="flex justify-between text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <span>{q.min}</span><span>{q.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 rounded-xl grid grid-cols-3 gap-3 text-center"
                  style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
                  {[
                    { label: "Total Questions", value: mcqCount + shortCount + longCount, icon: Hash },
                    { label: "Total Marks", value: totalMarks, icon: Target },
                    { label: "Time Allowed", value: `${totalTime}m`, icon: Clock },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label}>
                        <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: "hsl(var(--cyan))" }} />
                        <div className="font-bold font-mono text-sm" style={{ color: "hsl(var(--foreground))" }}>{s.value}</div>
                        <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Anti-cheat notice */}
                <div className="mt-4 flex items-start gap-2 p-3 rounded-xl"
                  style={{ background: "hsl(var(--purple-ai) / 0.08)", border: "1px solid hsl(var(--purple-ai) / 0.25)" }}>
                  <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--purple-ai))" }} />
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span style={{ color: "hsl(var(--purple-ai))" }} className="font-medium">Anti-Malpractice Active: </span>
                    Your paper will be unique. Questions shuffled. Options randomized. Tab-switching monitored.
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200"
                  style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleGenerate} disabled={generating}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-cyan disabled:opacity-70"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{ borderColor: "hsl(var(--primary-foreground) / 0.3)", borderTopColor: "hsl(var(--primary-foreground))" }} />
                      AI Generating Paper...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" /> Generate AI Paper
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
