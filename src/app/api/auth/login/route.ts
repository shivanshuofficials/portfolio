import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession } from "@/lib/auth";

// Simple in-memory brute-force limiter
const attempts = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const rec = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  if (rec.length >= 5) {
    return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(password)) {
    attempts.set(ip, [...rec, now]);
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  attempts.delete(ip);
  await createSession();
  return NextResponse.json({ ok: true });
}
