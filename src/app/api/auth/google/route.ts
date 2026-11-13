import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get("redirect") || "/blog";

  let clientId = process.env.GOOGLE_CLIENT_ID?.trim() || "";
  // Strip any accidental multiline copy-paste containing GOOGLE_CLIENT_SECRET
  if (clientId.includes("\n")) {
    clientId = clientId.split("\n")[0].trim();
  }
  if (clientId.includes("GOOGLE_CLIENT_ID=")) {
    clientId = clientId.replace("GOOGLE_CLIENT_ID=", "").trim();
  }

  if (!clientId) {
    // If Google Client ID is not yet provided in .env, redirect back with error notice
    return NextResponse.redirect(
      new URL(
        `${redirect}${redirect.includes("?") ? "&" : "?"}auth_error=google_client_id_missing`,
        req.url
      )
    );
  }

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const origin = isLocal ? "http://localhost:3000" : "https://www.shivanshuchauhan.com";
  const redirectUri = `${origin}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: Buffer.from(redirect).toString("base64"),
    access_type: "online",
    prompt: "select_account",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
