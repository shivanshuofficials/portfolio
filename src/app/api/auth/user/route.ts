import { NextRequest, NextResponse } from "next/server";
import { getSignedUser, clearUserSession, createUserSession } from "@/lib/userAuth";

export async function GET() {
  const user = await getSignedUser();
  const hasGoogleCredentials = Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim()
  );

  return NextResponse.json({
    user,
    hasGoogleCredentials,
  });
}

export async function DELETE() {
  await clearUserSession();
  return NextResponse.json({ ok: true });
}

// Development / Testing fallback when Google OAuth is pending in Cloud Console
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = body.name?.trim() || "Verified Google Reviewer";
  const email = body.email?.trim() || "reviewer@gmail.com";

  await createUserSession({
    sub: `demo_${Date.now()}`,
    name,
    email,
    picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
  });

  const user = await getSignedUser();
  return NextResponse.json({ user });
}
