import { NextRequest, NextResponse } from "next/server";
import { createUserSession } from "@/lib/userAuth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  let redirectTo = "/blog";
  if (state) {
    try {
      redirectTo = Buffer.from(state, "base64").toString("utf-8");
    } catch {
      redirectTo = "/blog";
    }
  }

  if (error || !code) {
    return NextResponse.redirect(
      new URL(
        `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}auth_error=${error || "no_code"}`,
        req.url
      )
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const origin = isLocal ? "http://localhost:3000" : "https://www.shivanshuchauhan.com";
  const redirectUri = `${origin}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL(
        `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}auth_error=missing_credentials`,
        req.url
      )
    );
  }

  try {
    // Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Google token exchange failed:", errText);
      return NextResponse.redirect(
        new URL(
          `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}auth_error=token_exchange_failed`,
          req.url
        )
      );
    }

    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;

    // Fetch user info from Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL(
          `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}auth_error=userinfo_failed`,
          req.url
        )
      );
    }

    const userInfo = await userRes.json();
    await createUserSession({
      sub: String(userInfo.sub),
      email: String(userInfo.email),
      name: String(userInfo.name || userInfo.email.split("@")[0]),
      picture: String(userInfo.picture || ""),
    });

    // Ensure we anchor back to the comments section
    const target = redirectTo.includes("#") ? redirectTo : `${redirectTo}#comments`;
    return NextResponse.redirect(new URL(target, req.url));
  } catch (err: unknown) {
    console.error("Google auth callback error:", err);
    return NextResponse.redirect(
      new URL(
        `${redirectTo}${redirectTo.includes("?") ? "&" : "?"}auth_error=server_error`,
        req.url
      )
    );
  }
}
