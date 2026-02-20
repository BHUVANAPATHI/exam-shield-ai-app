// Navbar component for ExamShield AI
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, BarChart3, FileText, User, LogOut, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = isLoggedIn
    ? [
        { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { label: "New Test", href: "/test-setup", icon: FileText },
        { label: "Analytics", href: "/analytics", icon: Zap },
      ]
    : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60"
      style={{ background: "hsl(222 47% 6% / 0.95)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "var(--grad-cyan)" }}>
                <Shield className="w-4 h-4" style={{ color: "hsl(var(--primary-foreground))" }} />
              </div>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ boxShadow: "var(--shadow-cyan)" }} />
            </div>
            <div>
              <span className="font-bold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                Exam<span style={{ color: "hsl(var(--cyan))" }}>Shield</span>
              </span>
              <span className="text-xs font-mono ml-1" style={{ color: "hsl(var(--purple-ai))" }}>AI</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} to={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === href
                    ? "text-cyan bg-cyan/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/60 cursor-pointer hover:border-cyan/40 transition-colors"
                  onClick={() => navigate("/dashboard")}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
                    style={{ background: "var(--grad-ai)", color: "hsl(var(--primary-foreground))" }}>
                    {user?.avatar}
                  </div>
                  <span className="text-sm hidden sm:block" style={{ color: "hsl(var(--foreground))" }}>
                    {user?.name.split(" ")[0]}
                  </span>
                </div>
                <button onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-danger/10 hover:text-red-danger transition-colors text-muted-foreground">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link to="/auth"
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-cyan"
                  style={{ background: "var(--grad-cyan)", color: "hsl(var(--primary-foreground))" }}>
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/60 px-4 py-3 space-y-1"
            style={{ background: "hsl(222 47% 6% / 0.98)" }}>
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} to={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  location.pathname === href ? "text-cyan bg-cyan/10" : "text-muted-foreground"
                }`}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
