"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative z-10 min-h-screen bg-[#0b0507] flex flex-col justify-center items-center px-4 font-sans text-zinc-100">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition"
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center mx-auto text-rose-500 shadow-xl">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-serif">Admin Sign In</h2>
          <p className="text-xs text-zinc-400">
            Protected dashboard for editorial publishing and media management.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="p-6 rounded-2xl bg-[#12090c]/90 border border-[#e1cec0]/15 shadow-2xl space-y-4 backdrop-blur-md"
        >
          {error && (
            <div className="p-3 text-xs rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-200 leading-relaxed">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">Admin Secret Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 bg-zinc-950/90 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-rose-500 transition"
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
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

        <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
          <ShieldCheck size={14} /> Constant-time comparison &amp; rate-limited session
        </div>
      </div>
    </div>
  );
}
