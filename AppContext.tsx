// App-level state context for ExamShield AI
import React, { createContext, useContext, useState, ReactNode } from "react";
import { TestConfig, TestAttempt, Question } from "@/types/exam";

interface AppState {
  // Auth
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;

  // Test flow
  activeTest: {
    config: TestConfig;
    questions: Question[];
    startTime: number;
  } | null;
  setActiveTest: (test: { config: TestConfig; questions: Question[]; startTime: number } | null) => void;

  // Results
  lastResult: TestAttempt | null;
  setLastResult: (r: TestAttempt | null) => void;

  // Test history
  testHistory: TestAttempt[];
  addTestAttempt: (attempt: TestAttempt) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [activeTest, setActiveTest] = useState<AppState["activeTest"]>(null);
  const [lastResult, setLastResult] = useState<TestAttempt | null>(null);
  const [testHistory, setTestHistory] = useState<TestAttempt[]>([]);

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      avatar: name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setActiveTest(null);
  };

  const addTestAttempt = (attempt: TestAttempt) => {
    setTestHistory((prev) => [attempt, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, user, login, logout,
      activeTest, setActiveTest,
      lastResult, setLastResult,
      testHistory, addTestAttempt,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
