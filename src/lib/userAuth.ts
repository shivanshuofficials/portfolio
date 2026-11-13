import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "crypto";

export interface GoogleUser {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export const USER_COOKIE = "google_user_session";
export const ANON_COOKIE = "anon_visitor_id";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET || "fallback-secret-at-least-32-characters-long-123456";
  return new TextEncoder().encode(secret);
};

export async function createUserSession(user: GoogleUser) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function getSignedUser(): Promise<GoogleUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, getSecretKey());
    const payload = verified.payload as unknown as GoogleUser;
    if (payload.email && payload.name) {
      return {
        sub: String(payload.sub || payload.email),
        email: String(payload.email),
        name: String(payload.name),
        picture: String(payload.picture || ""),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIE);
}

export async function getVisitorId(allowSet: boolean = false): Promise<string> {
  const user = await getSignedUser();
  if (user) return `usr_${user.sub}`;

  const cookieStore = await cookies();
  let anonId = cookieStore.get(ANON_COOKIE)?.value;
  if (!anonId) {
    anonId = `anon_${crypto.randomUUID()}`;
    if (allowSet) {
      try {
        cookieStore.set(ANON_COOKIE, anonId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 365, // 1 year
        });
      } catch {
        // Silently ignore if cookies cannot be modified in GET context
      }
    }
  }
  return anonId;
}
