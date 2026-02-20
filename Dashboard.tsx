// Dashboard page for ExamShield AI
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3, Target, Clock, Zap, Plus, ChevronRight, TrendingUp,
  TrendingDown, Award, BookOpen, Brain, AlertTriangle, CheckCircle2,
  Flame, Trophy
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mockTestHistory, weeklyData, subjects } from "@/data/mockData";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from "recharts";

// Radar data for subject performance
const radarData = [
  { subject: "Physics", score: 76 },
  { subject: "Math", score: 62 },
  { subject: "Chemistry", score: 88 },
  { subject: "Biology", score: 71 },
  { subject: "CS", score: 84 },
  { subject: "Economics", score: 58 },
];

export default function Dashboard() {
  const { user, testHistory } = useApp();
  const navigate = useNavigate();

  // Combine mock + user history
  const allTests = testHistory.length > 0 ? testHistory : mockTestHistory;
  const recentTests = allTests.slice(0, 3);

  const avgScore = Math.round(allTests.reduce((s, t) => s + t.accuracy, 0) / (allTests.length || 1));
  const bestScore = Math.max(...allTests.map((t) => t.accuracy), 0);
  const allWeakTopics = [...new Set(allTests.flatMap((t) => t.weakTopics))];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-sm font-mono mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
              Welcome back,
            </p>
            <h1 className="text-3xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
              {user?.name} <span className="text-neon">👋</span>
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="badge-chip">
                <Trophy className="w-3 h-3" /> Gold Achiever
              </span>
              <span className="flex items-center gap-1 text-sm" style={{ color: "hsl(var(--amber-warn))" }}>
                <Flame className="w-4 h-4" /> 7-day streak
              </span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/test-setup"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-cyan hover:-translate-y-0.5"
              style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
              <Plus className="w-4 h-4" />
              New AI Test
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Tests Taken", value: allTests.length, icon: BookOpen, color: "cyan", sub: "all time" },
            { label: "Avg Accuracy", value: `${avgScore}%`, icon: Target, color: "green", sub: "last 30 days" },
            { label: "Best Score", value: `${bestScore}%`, icon: Award, color: "purple", sub: "all time" },
            { label: "Weak Topics", value: allWeakTopics.length, icon: AlertTriangle, color: "amber", sub: "need revision" },
          ].map((s, i) => {
            const Icon = s.icon;
            const colorMap: Record<string, string> = {
              cyan: "hsl(var(--cyan))",
              green: "hsl(var(--green-score))",
              purple: "hsl(var(--purple-ai))",
              amber: "hsl(var(--amber-warn))",
            };
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="stat-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${colorMap[s.color]}18`, border: `1px solid ${colorMap[s.color]}30` }}>
                    <Icon className="w-5 h-5" style={{ color: colorMap[s.color] }} />
                  </div>
                </div>
                <div className="text-2xl font-bold font-mono" style={{ color: colorMap[s.color] }}>{s.value}</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{s.sub}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>Weekly Performance</h3>
                <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>Score & accuracy trend</p>
              </div>
              <TrendingUp className="w-5 h-5" style={{ color: "hsl(var(--cyan))" }} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(188,100%,50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(188,100%,50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262,83%,65%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(262,83%,65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "hsl(215,20%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fill: "hsl(215,20%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(220,40%,9%)", border: "1px solid hsl(220,30%,18%)", borderRadius: 12, color: "hsl(210,40%,96%)" }}
                  cursor={{ stroke: "hsl(188,100%,50%,0.2)" }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(188,100%,50%)" fill="url(#scoreGrad)" strokeWidth={2} dot={false} name="Score" />
                <Area type="monotone" dataKey="accuracy" stroke="hsl(262,83%,65%)" fill="url(#accGrad)" strokeWidth={2} dot={false} name="Accuracy" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Subject radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>Subject Mastery</h3>
              <Brain className="w-5 h-5" style={{ color: "hsl(var(--purple-ai))" }} />
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220,30%,18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215,20%,55%)", fontSize: 10 }} />
                <Radar dataKey="score" stroke="hsl(188,100%,50%)" fill="hsl(188,100%,50%)" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent tests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>Recent Tests</h3>
              <Link to="/analytics" className="text-xs font-medium hover:underline" style={{ color: "hsl(var(--cyan))" }}>
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.id}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer hover:border-cyan/30"
                  style={{ background: "hsl(var(--muted))", borderColor: "hsl(var(--border))" }}
                  onClick={() => navigate("/analytics")}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--cyan) / 0.1)", border: "1px solid hsl(var(--cyan) / 0.3)" }}>
                    <BookOpen className="w-4 h-4" style={{ color: "hsl(var(--cyan))" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm" style={{ color: "hsl(var(--foreground))" }}>{test.subject}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: test.difficulty === "Easy" ? "hsl(var(--green-score) / 0.15)" :
                            test.difficulty === "Medium" ? "hsl(var(--amber-warn) / 0.15)" : "hsl(var(--red-danger) / 0.15)",
                          color: test.difficulty === "Easy" ? "hsl(var(--green-score))" :
                            test.difficulty === "Medium" ? "hsl(var(--amber-warn))" : "hsl(var(--red-danger))",
                        }}>
                        {test.difficulty}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {new Date(test.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {test.timeTaken} min
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold font-mono text-sm" style={{
                      color: test.accuracy >= 80 ? "hsl(var(--green-score))" :
                        test.accuracy >= 60 ? "hsl(var(--amber-warn))" : "hsl(var(--red-danger))"
                    }}>
                      {test.accuracy}%
                    </div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4" style={{ color: "hsl(var(--purple-ai))" }} />
              <h3 className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>AI Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl" style={{ background: "hsl(var(--green-score) / 0.08)", border: "1px solid hsl(var(--green-score) / 0.2)" }}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--green-score))" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
                    Strong performance in <strong>Organic Chemistry</strong>. Keep it up!
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "hsl(var(--red-danger) / 0.08)", border: "1px solid hsl(var(--red-danger) / 0.2)" }}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--red-danger))" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
                    <strong>Probability</strong> is your weakest area — 37% accuracy. Revise now.
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "hsl(var(--amber-warn) / 0.08)", border: "1px solid hsl(var(--amber-warn) / 0.2)" }}>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--amber-warn))" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
                    You spend 40% more time on <strong>Long Answers</strong>. Practice speed.
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "hsl(var(--purple-ai) / 0.08)", border: "1px solid hsl(var(--purple-ai) / 0.2)" }}>
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(var(--purple-ai))" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground))" }}>
                    AI predicts <strong>78% chance of passing</strong> Physics real exam.
                  </p>
                </div>
              </div>
            </div>
            <Link to="/analytics"
              className="flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              style={{ background: "hsl(var(--purple-ai) / 0.1)", color: "hsl(var(--purple-ai))", border: "1px solid hsl(var(--purple-ai) / 0.3)" }}>
              Full AI Analysis <ChevronRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
