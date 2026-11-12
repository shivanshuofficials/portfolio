import { NextResponse } from "next/server";
import { getAuthParams } from "@/lib/imagekit";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  return NextResponse.json(getAuthParams());
}
