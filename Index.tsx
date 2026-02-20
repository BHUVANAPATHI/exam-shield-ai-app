// Landing Page for ExamShield AI
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Brain, BarChart3, Target, Zap, ChevronRight,
  CheckCircle, Star, Users, Clock, TrendingUp, Eye, Lock
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Question Generation",
    desc: "GPT-4 powered syllabus-aligned questions — MCQs, Short & Long answers, unique for every student.",
    color: "cyan",
  },
  {
    icon: Eye,
    title: "Image Answer Evaluation",
    desc: "Upload your handwritten answer sheet. OCR + AI semantic scoring gives you instant marks.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Topic-wise accuracy, time management scores, difficulty analysis — all in real-time dashboards.",
    color: "green",
  },
  {
    icon: Target,
    title: "Weakness Prediction",
    desc: "AI detects your repeated weak areas and predicts probability of failing real exam topics.",
    color: "amber",
  },
  {
    icon: Zap,
    title: "Personalized Revision",
    desc: "AI-generated summary notes and practice questions targeting your exact weak spots.",
    color: "purple",
  },
  {
    icon: Lock,
    title: "Anti-Malpractice System",
    desc: "Each student gets a unique paper. Tab switching detection, option shuffling, time tracking.",
    color: "red",
  },
];

const stats = [
  { value: "10,000+", label: "Questions Generated" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "500+", label: "Students Trained" },
  { value: "6", label: "Subjects Covered" },
];

const colorMap: Record<string, string> = {
  cyan: "hsl(var(--cyan))",
  purple: "hsl(var(--purple-ai))",
  green: "hsl(var(--green-score))",
  amber: "hsl(var(--amber-warn))",
  red: "hsl(var(--red-danger))",
};

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "hsl(var(--cyan))" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-8"
          style={{ background: "hsl(var(--purple-ai))" }} />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{
              background: "hsl(var(--cyan) / 0.08)",
              borderColor: "hsl(var(--cyan) / 0.3)",
              color: "hsl(var(--cyan))",
            }}>
            <Zap className="w-3.5 h-3.5" />
            Powered by OpenAI GPT-4 + OCR Technology
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ color: "hsl(var(--foreground))" }}>
            One Student.{" "}
            <span className="text-neon">One Unique</span>
            <br />Paper.{" "}
            <span style={{ background: "var(--grad-ai)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              One AI.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            Stop practicing with generic question banks. ExamShield AI generates personalized,
            full-length mock tests — evaluates your handwritten answers with AI, and tells you
            exactly what to revise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:shadow-cyan hover:-translate-y-1"
              style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
              Start Free Test
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/auth"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border transition-all duration-200 hover:border-cyan/60 hover:bg-cyan/5"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
              <BarChart3 className="w-4 h-4" />
              View Demo
            </Link>
          </motion.div>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm font-mono"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            "One Student. One Unique Paper. One Intelligent Evaluation."
          </motion.p>
        </div>

        {/* Mock UI preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-4xl mx-auto mt-16">
          <div className="glass-card rounded-2xl overflow-hidden glow-border">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--red-danger))" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--amber-warn))" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--green-score))" }} />
              <div className="ml-4 px-4 py-1 rounded text-xs font-mono border border-border/60"
                style={{ color: "hsl(var(--muted-foreground))" }}>
                examshield.ai/test
              </div>
            </div>
            {/* Mock test UI inside */}
            <div className="p-6 grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-3">
                <div className="h-4 rounded-full w-3/4" style={{ background: "hsl(var(--muted))" }} />
                <div className="p-4 rounded-xl border border-cyan/30" style={{ background: "hsl(var(--cyan) / 0.05)" }}>
                  <div className="h-3 rounded w-full mb-2" style={{ background: "hsl(var(--muted))" }} />
                  <div className="h-3 rounded w-4/5" style={{ background: "hsl(var(--muted))" }} />
                </div>
                {["A", "B", "C", "D"].map((opt, i) => (
                  <div key={opt} className={`flex items-center gap-3 p-3 rounded-xl border ${i === 1 ? "border-cyan/60" : "border-border"}`}
                    style={{ background: i === 1 ? "hsl(var(--cyan) / 0.1)" : "hsl(var(--card))" }}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${i === 1 ? "text-primary-foreground" : ""}`}
                      style={{ background: i === 1 ? "var(--grad-cyan)" : "hsl(var(--muted))", color: i === 1 ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))" }}>
                      {opt}
                    </div>
                    <div className="h-2.5 rounded flex-1" style={{ background: "hsl(var(--muted))" }} />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-border/60 text-center" style={{ background: "hsl(var(--card))" }}>
                  <div className="text-2xl font-bold font-mono text-neon">23:47</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>Time Left</div>
                </div>
                <div className="p-3 rounded-xl border border-border/60" style={{ background: "hsl(var(--card))" }}>
                  <div className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>Progress</div>
                  <div className="h-2 rounded-full" style={{ background: "hsl(var(--muted))" }}>
                    <div className="h-full w-2/5 rounded-full progress-cyan" />
                  </div>
                  <div className="text-xs mt-1.5 font-mono" style={{ color: "hsl(var(--cyan))" }}>8 / 20</div>
                </div>
                <div className="p-3 rounded-xl border border-border/60" style={{ background: "hsl(var(--card))" }}>
                  <div className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>AI Difficulty</div>
                  <div className="badge-chip">Medium</div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating badges */}
          <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl border text-xs font-medium animate-float"
            style={{ background: "hsl(var(--purple-ai) / 0.15)", borderColor: "hsl(var(--purple-ai) / 0.4)", color: "hsl(var(--purple-ai))" }}>
            🤖 AI Generating...
          </div>
          <div className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl border text-xs font-medium animate-float"
            style={{ animationDelay: "1.5s", background: "hsl(var(--green-score) / 0.15)", borderColor: "hsl(var(--green-score) / 0.4)", color: "hsl(var(--green-score))" }}>
            ✅ Unique Paper
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 border-y border-border/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center">
              <div className="text-3xl font-bold font-mono text-neon">{s.value}</div>
              <div className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
              Everything You Need to
              <span className="text-neon"> Ace Your Exam</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(var(--muted-foreground))" }}>
              End-to-end AI exam prep — from question generation to intelligent evaluation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 group hover:border-cyan/30 transition-all duration-300 cursor-default"
                  style={{ "--hover-color": colorMap[f.color] } as React.CSSProperties}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: `${colorMap[f.color]}18`, border: `1px solid ${colorMap[f.color]}30` }}>
                    <Icon className="w-6 h-6" style={{ color: colorMap[f.color] }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
              How It <span className="text-neon">Works</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Select Subject", desc: "Choose your subject, difficulty & question types." },
              { step: "02", title: "AI Generates", desc: "Unique full-length paper generated instantly." },
              { step: "03", title: "Attempt & Submit", desc: "Answer MCQs or upload your written answers." },
              { step: "04", title: "AI Evaluates", desc: "Instant scoring, analytics & revision plan." },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold font-mono mx-auto mb-4"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  {s.step}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-7 text-muted-foreground">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 glow-border">
            <Shield className="w-12 h-12 mx-auto mb-6" style={{ color: "hsl(var(--cyan))" }} />
            <h2 className="text-3xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>
              Ready to Dominate Your Exam?
            </h2>
            <p className="mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Join thousands of students using AI-powered preparation.
            </p>
            <Link to="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-cyan hover:-translate-y-1"
              style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
              Start Free — No Credit Card
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 text-center text-sm"
        style={{ color: "hsl(var(--muted-foreground))" }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4" style={{ color: "hsl(var(--cyan))" }} />
          <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>ExamShield AI</span>
        </div>
        <p className="font-mono text-xs">One Student. One Unique Paper. One Intelligent Evaluation.</p>
      </footer>
    </div>
  );
}
