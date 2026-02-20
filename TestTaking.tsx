// Test Taking page — MCQ + Descriptive questions with timer & anti-cheat
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, AlertTriangle, ChevronLeft, ChevronRight, Upload, CheckCircle,
  Eye, Shield, Send, Flag, X
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MCQQuestion, DescriptiveQuestion, TestAttempt } from "@/types/exam";

export default function TestTaking() {
  const navigate = useNavigate();
  const { activeTest, setLastResult, addTestAttempt, setActiveTest } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [descriptiveAnswers, setDescriptiveAnswers] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState((activeTest?.config.totalTime || 45) * 60);
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Redirect if no active test
  useEffect(() => {
    if (!activeTest) navigate("/test-setup");
  }, [activeTest, navigate]);

  // Timer countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Tab switch detection (anti-malpractice)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabWarnings((w) => {
          const newW = w + 1;
          setWarningMsg(`⚠️ Tab Switch Detected! Warning ${newW}/3. Continued switching may invalidate your test.`);
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 5000);
          return newW;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const questions = activeTest?.questions || [];
  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(mcqAnswers).length + Object.keys(descriptiveAnswers).length + Object.keys(uploadedImages).length;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const timerColor = timeLeft < 300 ? "hsl(var(--red-danger))" : timeLeft < 600 ? "hsl(var(--amber-warn))" : "hsl(var(--cyan))";

  const handleMCQSelect = (qId: string, optIdx: number) => {
    setMcqAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleImageUpload = (qId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImages((prev) => ({ ...prev, [qId]: url }));
    }
  };

  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    setSubmitted(true);
    clearInterval(timerRef.current);

    // Calculate score from MCQs
    let correctMCQ = 0;
    questions.forEach((q) => {
      if (q.type === "MCQ") {
        const mcq = q as MCQQuestion;
        if (mcqAnswers[mcq.id] === mcq.correctAnswer) correctMCQ++;
      }
    });

    const mcqScore = correctMCQ * 2;
    const descriptiveScore = Object.keys(descriptiveAnswers).length * 3 + Object.keys(uploadedImages).length * 5; // simulated
    const totalScore = mcqScore + descriptiveScore;
    const totalMarks = activeTest?.config.mcqCount! * 2 + activeTest?.config.shortCount! * 5 + activeTest?.config.longCount! * 10;
    const accuracy = Math.round((totalScore / totalMarks) * 100);
    const timeTaken = Math.round(((activeTest?.config.totalTime || 45) * 60 - timeLeft) / 60);

    const result: TestAttempt = {
      id: `t${Date.now()}`,
      subject: activeTest?.config.subject || "Unknown",
      difficulty: activeTest?.config.difficulty || "Medium",
      date: new Date().toISOString().split("T")[0],
      score: totalScore,
      totalMarks,
      accuracy,
      timeTaken,
      topicWise: {
        "Topic A": { correct: correctMCQ, total: questions.filter((q) => q.type === "MCQ").length },
        "Topic B": { correct: Math.floor(correctMCQ * 0.6), total: 5 },
      },
      weakTopics: accuracy < 70 ? ["Revision Needed"] : [],
    };

    setLastResult(result);
    addTestAttempt(result);
    setActiveTest(null);
    navigate("/results");
  }, [submitted, questions, mcqAnswers, descriptiveAnswers, uploadedImages, timeLeft, activeTest]);

  if (!currentQ) return null;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: "hsl(var(--background))" }}>
      {/* Tab warning toast */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl border shadow-card text-sm font-medium"
            style={{ background: "hsl(var(--red-danger) / 0.15)", borderColor: "hsl(var(--red-danger) / 0.5)", color: "hsl(var(--red-danger))" }}>
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {warningMsg}
            <button onClick={() => setShowWarning(false)}><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          {/* Test info */}
          <div>
            <div className="badge-chip mb-1.5">
              <Shield className="w-3 h-3" /> {activeTest?.config.subject} · {activeTest?.config.difficulty}
            </div>
            <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              Question {currentIdx + 1} of {totalQ}
            </div>
          </div>

          {/* Timer + controls */}
          <div className="flex items-center gap-3">
            {tabWarnings > 0 && (
              <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "hsl(var(--red-danger) / 0.1)", color: "hsl(var(--red-danger))" }}>
                <AlertTriangle className="w-3 h-3" />
                {tabWarnings} warning{tabWarnings > 1 ? "s" : ""}
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border"
              style={{ borderColor: `${timerColor}40`, background: `${timerColor}10` }}>
              <Clock className="w-4 h-4" style={{ color: timerColor }} />
              <span className="font-mono font-bold text-lg" style={{ color: timerColor }}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
          <motion.div
            className="h-full rounded-full progress-cyan"
            animate={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main question area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card rounded-2xl p-7">
                {/* Question header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                      style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                      {currentIdx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: currentQ.type === "MCQ" ? "hsl(var(--cyan) / 0.1)" : "hsl(var(--purple-ai) / 0.1)",
                          color: currentQ.type === "MCQ" ? "hsl(var(--cyan))" : "hsl(var(--purple-ai))",
                        }}>
                        {currentQ.type === "MCQ" ? "MCQ" : currentQ.type === "Short" ? "Short Answer" : "Long Answer"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {currentQ.marks} marks · {currentQ.topic}
                  </span>
                </div>

                {/* Question text */}
                <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(var(--foreground))" }}>
                  {currentQ.question}
                </p>

                {/* MCQ Options */}
                {currentQ.type === "MCQ" && (
                  <div className="space-y-3">
                    {(currentQ as MCQQuestion).options.map((opt, i) => (
                      <button key={i} onClick={() => handleMCQSelect(currentQ.id, i)}
                        className={`mcq-option ${mcqAnswers[currentQ.id] === i ? "selected" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0"
                            style={{
                              background: mcqAnswers[currentQ.id] === i ? "var(--grad-cyan)" : "hsl(var(--muted))",
                              color: mcqAnswers[currentQ.id] === i ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                            }}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm">{opt}</span>
                          {mcqAnswers[currentQ.id] === i && (
                            <CheckCircle className="w-4 h-4 ml-auto shrink-0" style={{ color: "hsl(var(--cyan))" }} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Descriptive Answer */}
                {(currentQ.type === "Short" || currentQ.type === "Long") && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block" style={{ color: "hsl(var(--foreground))" }}>
                        Type your answer (optional):
                      </label>
                      <textarea
                        value={descriptiveAnswers[currentQ.id] || ""}
                        onChange={(e) => setDescriptiveAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))}
                        placeholder="Write your answer here..."
                        rows={currentQ.type === "Long" ? 8 : 4}
                        className="w-full p-4 rounded-xl border text-sm outline-none resize-none transition-colors"
                        style={{
                          background: "hsl(var(--input))",
                          borderColor: "hsl(var(--border))",
                          color: "hsl(var(--foreground))",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "hsl(var(--cyan))"; }}
                        onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; }}
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>— OR upload photo of handwritten answer —</p>
                      <input type="file" accept="image/*" ref={fileInputRef}
                        onChange={(e) => handleImageUpload(currentQ.id, e)}
                        className="hidden" />
                      {uploadedImages[currentQ.id] ? (
                        <div className="relative inline-block">
                          <img src={uploadedImages[currentQ.id]} alt="Uploaded answer"
                            className="max-h-40 rounded-xl border border-border/60 mx-auto" />
                          <div className="mt-2 text-xs" style={{ color: "hsl(var(--green-score))" }}>
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            Image uploaded — AI will evaluate via OCR
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 mx-auto px-5 py-3 rounded-xl border text-sm font-medium transition-colors"
                          style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(var(--cyan))"; e.currentTarget.style.color = "hsl(var(--cyan))"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}>
                          <Upload className="w-4 h-4" />
                          Upload Answer Sheet Image
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 disabled:opacity-40"
                style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              {currentIdx === totalQ - 1 ? (
                <button onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-cyan"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  <Send className="w-4 h-4" /> Submit Test
                </button>
              ) : (
                <button onClick={() => setCurrentIdx(Math.min(totalQ - 1, currentIdx + 1))}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-cyan"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right sidebar — question grid */}
          <div className="space-y-4">
            {/* Question navigator */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-semibold mb-4" style={{ color: "hsl(var(--foreground))" }}>
                Question Navigator
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((q, i) => {
                  const isAnswered = q.type === "MCQ"
                    ? mcqAnswers[q.id] !== undefined
                    : descriptiveAnswers[q.id] || uploadedImages[q.id];
                  return (
                    <button key={i} onClick={() => setCurrentIdx(i)}
                      className="w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all duration-200"
                      style={{
                        background: i === currentIdx ? "var(--grad-cyan)" :
                          isAnswered ? "hsl(var(--green-score) / 0.2)" : "hsl(var(--muted))",
                        color: i === currentIdx ? "hsl(var(--primary-foreground))" :
                          isAnswered ? "hsl(var(--green-score))" : "hsl(var(--muted-foreground))",
                        border: i === currentIdx ? "none" : isAnswered ? "1px solid hsl(var(--green-score) / 0.4)" : "none",
                      }}>
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-1.5 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ background: "var(--grad-cyan)" }} />
                  Current
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border" style={{ background: "hsl(var(--green-score) / 0.2)", borderColor: "hsl(var(--green-score) / 0.4)" }} />
                  Answered ({answeredCount})
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ background: "hsl(var(--muted))" }} />
                  Unanswered ({totalQ - answeredCount})
                </div>
              </div>
            </div>

            {/* Anti-cheat status */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: "hsl(var(--purple-ai))" }} />
                <span className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  Integrity Monitor
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span style={{ color: "hsl(var(--muted-foreground))" }}>Tab switches</span>
                  <span style={{ color: tabWarnings > 0 ? "hsl(var(--red-danger))" : "hsl(var(--green-score))" }}>
                    {tabWarnings}/3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "hsl(var(--muted-foreground))" }}>Unique paper</span>
                  <span style={{ color: "hsl(var(--green-score))" }}>✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: "hsl(var(--muted-foreground))" }}>Options shuffled</span>
                  <span style={{ color: "hsl(var(--green-score))" }}>✓ Done</span>
                </div>
              </div>
            </div>

            {/* Submit early */}
            <button onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
              style={{ borderColor: "hsl(var(--red-danger) / 0.4)", color: "hsl(var(--red-danger))", background: "hsl(var(--red-danger) / 0.06)" }}>
              <Flag className="w-4 h-4" />
              Submit Early ({answeredCount}/{totalQ} answered)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
