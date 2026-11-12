import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET || "fallback-secret-at-least-32-characters-long-123456";
  return new TextEncoder().encode(secret);
};

export const COOKIE = "admin_session";

export function checkPassword(input: string): boolean {
  const real = process.env.ADMIN_PASSWORD?.trim();
  if (!real || !input) return false;
  const hash = (s: string) => crypto.createHash("sha256").update(String(s)).digest();
  try {
    return crypto.timingSafeEqual(hash(input.trim()), hash(real));
  } catch {
    return false;
  }
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const t = cookieStore.get(COOKIE)?.value;
  if (!t) return false;
  try {
    await jwtVerify(t, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
