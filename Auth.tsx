// Authentication page — Login & Register for ExamShield AI
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mockTestHistory } from "@/data/mockData";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, addTestAttempt } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth API call
    await new Promise((r) => setTimeout(r, 1200));
    const name = mode === "login" ? form.email.split("@")[0] : form.name;
    login(name, form.email);
    // Seed demo data for login
    if (mode === "login") {
      mockTestHistory.forEach((t) => addTestAttempt(t));
    }
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "hsl(var(--background))" }}>
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-8"
        style={{ background: "hsl(var(--cyan))" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass-card rounded-2xl p-8 glow-border">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--grad-cyan)" }}>
              <Shield className="w-8 h-8" style={{ color: "hsl(var(--primary-foreground))" }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
              {mode === "login" ? "Welcome Back" : "Join ExamShield"}
            </h1>
            <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
              {mode === "login"
                ? "Continue your AI-powered exam prep"
                : "Start your personalized test journey"}
            </p>
          </div>

          {/* Tab toggle */}
          <div className="flex p-1 rounded-xl mb-6" style={{ background: "hsl(var(--muted))" }}>
            {(["login", "register"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  mode === m ? "shadow-card" : "text-muted-foreground"
                }`}
                style={mode === m ? { background: "hsl(var(--card))", color: "hsl(var(--foreground))" } : {}}>
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Arjun Sharma"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                      style={{
                        background: "hsl(var(--input))",
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "hsl(var(--cyan))"; e.target.style.boxShadow = "0 0 0 2px hsl(var(--cyan) / 0.15)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student@college.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    background: "hsl(var(--input))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "hsl(var(--cyan))"; e.target.style.boxShadow = "0 0 0 2px hsl(var(--cyan) / 0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  type={showPass ? "text" : "password"} required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border text-sm outline-none transition-colors"
                  style={{
                    background: "hsl(var(--input))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "hsl(var(--cyan))"; e.target.style.boxShadow = "0 0 0 2px hsl(var(--cyan) / 0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "hsl(var(--muted-foreground))" }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-2 disabled:opacity-70"
              style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{ borderColor: "hsl(var(--primary-foreground) / 0.3)", borderTopColor: "hsl(var(--primary-foreground))" }} />
                  Authenticating...
                </>
              ) : (
                <>
                  {mode === "login" ? "Sign In to Dashboard" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-xl border text-center text-xs"
            style={{ background: "hsl(var(--purple-ai) / 0.08)", borderColor: "hsl(var(--purple-ai) / 0.3)", color: "hsl(var(--purple-ai))" }}>
            <Zap className="w-3 h-3 inline mr-1" />
            Demo: use any email/password to explore the platform
          </div>
        </div>
      </motion.div>
    </div>
  );
}
