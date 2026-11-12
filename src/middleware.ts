import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  let ok = false;
  if (token) {
    try {
      const secret = process.env.AUTH_SECRET || "fallback-secret-at-least-32-characters-long-123456";
      await jwtVerify(token, new TextEncoder().encode(secret));
      ok = true;
    } catch {
      ok = false;
    }
  }
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
