// Analytics page — full performance deep-dive, weakness prediction
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Target, Brain, AlertTriangle, BookOpen,
  Clock, Zap, ChevronRight, BarChart3, Activity
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mockTestHistory, weeklyData } from "@/data/mockData";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend
} from "recharts";

const weaknessData = [
  { topic: "Probability", attempts: 3, avgScore: 37, trend: "down" },
  { topic: "Thermodynamics", attempts: 4, avgScore: 51, trend: "up" },
  { topic: "Optics", attempts: 2, avgScore: 50, trend: "down" },
  { topic: "Matrices", attempts: 2, avgScore: 45, trend: "up" },
  { topic: "Physical Chem", attempts: 3, avgScore: 55, trend: "down" },
];

const difficultyData = [
  { difficulty: "Easy", attempted: 4, avgScore: 85 },
  { difficulty: "Medium", attempted: 5, avgScore: 72 },
  { difficulty: "Hard", attempted: 3, avgScore: 58 },
];

const subjectPie = [
  { name: "Physics", value: 35, color: "hsl(188,100%,50%)" },
  { name: "Mathematics", value: 30, color: "hsl(262,83%,65%)" },
  { name: "Chemistry", value: 25, color: "hsl(142,71%,45%)" },
  { name: "Biology", value: 10, color: "hsl(38,92%,50%)" },
];

const radarCompare = [
  { subject: "Physics", you: 76, avg: 68 },
  { subject: "Math", you: 62, avg: 71 },
  { subject: "Chemistry", you: 88, avg: 65 },
  { subject: "Biology", you: 71, avg: 70 },
  { subject: "CS", you: 84, avg: 72 },
  { subject: "Econ", you: 58, avg: 66 },
];

export default function Analytics() {
  const { testHistory } = useApp();
  const allTests = testHistory.length > 0 ? testHistory : mockTestHistory;

  const avgScore = Math.round(allTests.reduce((s, t) => s + t.accuracy, 0) / allTests.length);
  const improvementRate = 12; // simulated

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="badge-chip mb-2">
                <BarChart3 className="w-3 h-3" /> Performance Analytics
              </div>
              <h1 className="text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                Your <span className="text-neon">Intelligence Report</span>
              </h1>
              <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                AI-powered analysis of {allTests.length} test attempts
              </p>
            </div>
            <Link to="/test-setup"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-cyan"
              style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
              <Zap className="w-4 h-4" /> New Test
            </Link>
          </div>
        </motion.div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Avg Score", value: `${avgScore}%`, sub: "+12% this week", icon: Target, color: "cyan", up: true },
            { label: "Tests Taken", value: allTests.length, sub: "all subjects", icon: BookOpen, color: "purple", up: true },
            { label: "Improvement", value: `+${improvementRate}%`, sub: "vs last week", icon: TrendingUp, color: "green", up: true },
            { label: "Risk Level", value: "Medium", sub: "2 weak topics", icon: AlertTriangle, color: "amber", up: false },
          ].map((s, i) => {
            const Icon = s.icon;
            const colorMap: Record<string, string> = {
              cyan: "hsl(var(--cyan))", purple: "hsl(var(--purple-ai))",
              green: "hsl(var(--green-score))", amber: "hsl(var(--amber-warn))",
            };
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="stat-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${colorMap[s.color]}18`, border: `1px solid ${colorMap[s.color]}30` }}>
                    <Icon className="w-4 h-4" style={{ color: colorMap[s.color] }} />
                  </div>
                  <span className="flex items-center gap-1 text-xs" style={{ color: s.up ? "hsl(var(--green-score))" : "hsl(var(--amber-warn))" }}>
                    {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {s.sub}
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono" style={{ color: colorMap[s.color] }}>{s.value}</div>
                <div className="text-sm mt-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Performance trend + Radar comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>7-Day Score Trend</h3>
              <Activity className="w-4 h-4" style={{ color: "hsl(var(--cyan))" }} />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(188,100%,50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(188,100%,50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262,83%,65%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262,83%,65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(220,40%,9%)", border: "1px solid hsl(220,30%,18%)", borderRadius: 12, color: "hsl(210,40%,96%)" }} />
                <Area type="monotone" dataKey="score" stroke="hsl(188,100%,50%)" fill="url(#sg)" strokeWidth={2} dot={false} name="Score" />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(262,83%,65%)" fill="url(#ag)" strokeWidth={2} dot={false} name="Accuracy" />
                <Legend wrapperStyle={{ color: "hsl(215,20%,55%)", fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>You vs Class Avg</h3>
              <Brain className="w-4 h-4" style={{ color: "hsl(var(--purple-ai))" }} />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarCompare}>
                <PolarGrid stroke="hsl(220,30%,18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215,20%,55%)", fontSize: 9 }} />
                <Radar dataKey="you" stroke="hsl(188,100%,50%)" fill="hsl(188,100%,50%)" fillOpacity={0.15} strokeWidth={2} name="You" />
                <Radar dataKey="avg" stroke="hsl(262,83%,65%)" fill="hsl(262,83%,65%)" fillOpacity={0.1} strokeWidth={1.5} name="Class Avg" strokeDasharray="4 2" />
                <Legend wrapperStyle={{ color: "hsl(215,20%,55%)", fontSize: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Difficulty analysis + Subject distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold mb-5" style={{ color: "hsl(var(--foreground))" }}>Difficulty-wise Analysis</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={difficultyData}>
                <XAxis dataKey="difficulty" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(220,40%,9%)", border: "1px solid hsl(220,30%,18%)", borderRadius: 12, color: "hsl(210,40%,96%)" }} />
                <Bar dataKey="avgScore" radius={6} maxBarSize={48} name="Avg Score (%)">
                  <Cell fill="hsl(142,71%,45%)" />
                  <Cell fill="hsl(188,100%,50%)" />
                  <Cell fill="hsl(0,72%,51%)" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold mb-5" style={{ color: "hsl(var(--foreground))" }}>Subject Distribution</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={subjectPie} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                    {subjectPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {subjectPie.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                    <span className="text-xs" style={{ color: "hsl(var(--foreground))" }}>{s.name}</span>
                    <span className="text-xs ml-auto font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weakness Prediction Engine */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5" style={{ color: "hsl(var(--red-danger))" }} />
            <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              AI Weakness Prediction Engine
            </h3>
            <span className="badge-chip ml-auto">Powered by GPT-4</span>
          </div>
          <div className="space-y-3">
            {weaknessData.map((w, i) => (
              <div key={w.topic} className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}>
                <div className="font-mono font-bold text-sm w-6 text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm" style={{ color: "hsl(var(--foreground))" }}>{w.topic}</span>
                    {w.trend === "down" ? (
                      <TrendingDown className="w-3 h-3" style={{ color: "hsl(var(--red-danger))" }} />
                    ) : (
                      <TrendingUp className="w-3 h-3" style={{ color: "hsl(var(--green-score))" }} />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "hsl(var(--border))" }}>
                      <div className="h-full rounded-full" style={{
                        width: `${w.avgScore}%`,
                        background: w.avgScore < 50 ? "hsl(var(--red-danger))" : w.avgScore < 65 ? "hsl(var(--amber-warn))" : "hsl(var(--green-score))",
                      }} />
                    </div>
                    <span className="text-xs font-mono w-8" style={{ color: "hsl(var(--muted-foreground))" }}>{w.avgScore}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{w.attempts} attempts</div>
                  <div className="text-xs mt-0.5" style={{ color: w.avgScore < 50 ? "hsl(var(--red-danger))" : "hsl(var(--amber-warn))" }}>
                    {w.avgScore < 50 ? "⚠️ Critical" : "⚡ Watch"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Test history table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold mb-5" style={{ color: "hsl(var(--foreground))" }}>Complete Test History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                  {["Date", "Subject", "Difficulty", "Score", "Accuracy", "Time", "Status"].map((h) => (
                    <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                {allTests.map((t) => (
                  <tr key={t.id} className="border-b" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
                    <td className="py-3 pr-4 text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="py-3 pr-4 font-medium" style={{ color: "hsl(var(--foreground))" }}>{t.subject}</td>
                    <td className="py-3 pr-4">
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: t.difficulty === "Easy" ? "hsl(var(--green-score) / 0.15)" : t.difficulty === "Medium" ? "hsl(var(--amber-warn) / 0.15)" : "hsl(var(--red-danger) / 0.15)",
                          color: t.difficulty === "Easy" ? "hsl(var(--green-score))" : t.difficulty === "Medium" ? "hsl(var(--amber-warn))" : "hsl(var(--red-danger))",
                        }}>
                        {t.difficulty}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs" style={{ color: "hsl(var(--foreground))" }}>
                      {t.score}/{t.totalMarks}
                    </td>
                    <td className="py-3 pr-4 font-mono font-bold text-xs" style={{
                      color: t.accuracy >= 80 ? "hsl(var(--green-score))" : t.accuracy >= 60 ? "hsl(var(--amber-warn))" : "hsl(var(--red-danger))"
                    }}>
                      {t.accuracy}%
                    </td>
                    <td className="py-3 pr-4 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {t.timeTaken} min
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: t.accuracy >= 60 ? "hsl(var(--green-score))" : "hsl(var(--red-danger))" }}>
                        {t.accuracy >= 60 ? "✅ Pass" : "❌ Fail"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
