// Results page — score, detailed analytics after test submission
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trophy, Target, Clock, BarChart3, Brain, TrendingUp, AlertTriangle,
  CheckCircle2, XCircle, ChevronRight, RefreshCw, Home, BookOpen, Zap
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Cell
} from "recharts";

const recommendations = [
  { topic: "Thermodynamics", priority: "High", action: "Revise Zeroth & Second Law", time: "2 hrs" },
  { topic: "Optics", priority: "High", action: "Practice interference problems", time: "1.5 hrs" },
  { topic: "Waves", priority: "Medium", action: "Solve standing wave numericals", time: "1 hr" },
];

export default function Results() {
  const { lastResult } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastResult) navigate("/dashboard");
  }, [lastResult, navigate]);

  if (!lastResult) return null;

  const { accuracy, score, totalMarks, timeTaken, subject, difficulty, topicWise, weakTopics } = lastResult;

  const getGrade = (acc: number) => {
    if (acc >= 90) return { grade: "A+", label: "Outstanding!", color: "hsl(var(--green-score))" };
    if (acc >= 80) return { grade: "A", label: "Excellent!", color: "hsl(var(--green-score))" };
    if (acc >= 70) return { grade: "B+", label: "Good Job!", color: "hsl(var(--cyan))" };
    if (acc >= 60) return { grade: "B", label: "Above Average", color: "hsl(var(--amber-warn))" };
    if (acc >= 50) return { grade: "C", label: "Needs Work", color: "hsl(var(--amber-warn))" };
    return { grade: "D", label: "Revise Required", color: "hsl(var(--red-danger))" };
  };

  const { grade, label, color } = getGrade(accuracy);
  const failProbability = Math.max(0, 100 - accuracy - 10);

  const topicData = Object.entries(topicWise).map(([name, { correct, total }]) => ({
    name,
    accuracy: Math.round((correct / total) * 100),
    correct,
    total,
  }));

  const radialData = [{ name: "Score", value: accuracy, fill: color }];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold font-mono"
            style={{ background: `${color}20`, border: `2px solid ${color}`, color }}>
            {grade}
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>{label}</h1>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {subject} · {difficulty} · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </motion.div>

        {/* Score overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Score", value: `${score}/${totalMarks}`, color: "cyan", icon: Trophy },
            { label: "Accuracy", value: `${accuracy}%`, color: "green", icon: Target },
            { label: "Time Taken", value: `${timeTaken} min`, color: "amber", icon: Clock },
            { label: "Weak Topics", value: weakTopics.length || 2, color: "red", icon: AlertTriangle },
          ].map((s, i) => {
            const Icon = s.icon;
            const colorMap: Record<string, string> = {
              cyan: "hsl(var(--cyan))", green: "hsl(var(--green-score))",
              amber: "hsl(var(--amber-warn))", red: "hsl(var(--red-danger))",
            };
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="stat-card text-center">
                <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: colorMap[s.color] }} />
                <div className="text-2xl font-bold font-mono" style={{ color: colorMap[s.color] }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Radial score */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center">
            <h3 className="font-semibold mb-4 self-start" style={{ color: "hsl(var(--foreground))" }}>Overall Score</h3>
            <div className="relative">
              <ResponsiveContainer width={220} height={220}>
                <RadialBarChart innerRadius="60%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "hsl(var(--muted))" }}>
                    <Cell fill={color} />
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold font-mono" style={{ color }}>{accuracy}%</div>
                <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>Accuracy</div>
              </div>
            </div>
            {/* Fail probability */}
            <div className="mt-4 w-full p-3 rounded-xl text-center"
              style={{ background: failProbability > 40 ? "hsl(var(--red-danger) / 0.1)" : "hsl(var(--green-score) / 0.1)", border: `1px solid ${failProbability > 40 ? "hsl(var(--red-danger) / 0.3)" : "hsl(var(--green-score) / 0.3)"}` }}>
              <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>AI Exam Fail Probability</div>
              <div className="text-2xl font-bold font-mono mt-1" style={{ color: failProbability > 40 ? "hsl(var(--red-danger))" : "hsl(var(--green-score))" }}>
                {failProbability}%
              </div>
            </div>
          </motion.div>

          {/* Topic-wise breakdown */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4" style={{ color: "hsl(var(--foreground))" }}>Topic-wise Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topicData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215,20%,55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "hsl(215,20%,55%)", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ background: "hsl(220,40%,9%)", border: "1px solid hsl(220,30%,18%)", borderRadius: 10, color: "hsl(210,40%,96%)", fontSize: 12 }}
                  formatter={(v) => [`${v}%`, "Accuracy"]}
                />
                <Bar dataKey="accuracy" radius={4} maxBarSize={16}>
                  {topicData.map((entry, i) => (
                    <Cell key={i}
                      fill={entry.accuracy >= 80 ? "hsl(142,71%,45%)" : entry.accuracy >= 60 ? "hsl(188,100%,50%)" : "hsl(0,72%,51%)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* AI Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-5 h-5" style={{ color: "hsl(var(--purple-ai))" }} />
            <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              AI Personalized Revision Plan
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {recommendations.map((r, i) => (
              <div key={i} className="p-4 rounded-xl border transition-colors"
                style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>{r.topic}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: r.priority === "High" ? "hsl(var(--red-danger) / 0.15)" : "hsl(var(--amber-warn) / 0.15)",
                      color: r.priority === "High" ? "hsl(var(--red-danger))" : "hsl(var(--amber-warn))",
                    }}>
                    {r.priority}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>{r.action}</p>
                <div className="flex items-center gap-1 text-xs" style={{ color: "hsl(var(--cyan))" }}>
                  <Clock className="w-3 h-3" /> {r.time} suggested
                </div>
              </div>
            ))}
          </div>

          {/* AI Summary Note */}
          <div className="p-4 rounded-xl"
            style={{ background: "hsl(var(--purple-ai) / 0.08)", border: "1px solid hsl(var(--purple-ai) / 0.25)" }}>
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--purple-ai))" }} />
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "hsl(var(--purple-ai))" }}>AI-Generated Summary Note</p>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
                  Based on your performance, focus on <strong>conceptual understanding</strong> of Thermodynamics — particularly 
                  the relationship between entropy and spontaneous processes. Your MCQ accuracy (
                  <span style={{ color: "hsl(var(--cyan))" }}>72%</span>) is good, but 
                  descriptive answers lack structured format. Practice using <strong>introduction → derivation → application → conclusion</strong> framework 
                  for long answers. Estimated improvement: +15% accuracy in 1 week of targeted practice.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/test-setup"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-cyan"
            style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
            <RefreshCw className="w-4 h-4" /> Retake Test
          </Link>
          <Link to="/analytics"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:border-cyan/40"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
            <BarChart3 className="w-4 h-4" /> Full Analytics
          </Link>
          <Link to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:border-cyan/40"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
