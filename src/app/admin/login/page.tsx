"use client";

import { useState } from "react";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError(data.error || "Invalid password");
        setLoading(false);
      }
    } catch {
      setError("An unexpected network error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 font-sans text-zinc-100">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-rose-500 shadow-xl">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Admin Sign In</h2>
          <p className="text-xs text-zinc-400">
            Protected dashboard for editorial publishing and media management.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-2xl space-y-4"
        >
          {error && (
            <div className="p-3 text-xs rounded-xl bg-rose-950/50 border border-rose-900/50 text-rose-300">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Admin Secret Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-rose-500 transition"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign in to Dashboard"}
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-zinc-600 text-xs">
          <ShieldCheck size={14} /> Constant-time comparison & rate-limited session
        </div>
      </div>
    </div>
  );
}
