import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadBuffer } from "@/lib/imagekit";

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();
    if (!privateKey) {
      return NextResponse.json(
        {
          error:
            "IMAGEKIT_PRIVATE_KEY is missing in environment variables. Please check your settings.",
        },
        { status: 500 }
      );
    }

    if (!privateKey.startsWith("private_")) {
      return NextResponse.json(
        {
          error:
            "Invalid IMAGEKIT_PRIVATE_KEY: Key must start with 'private_'. Please update it in Vercel.",
        },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const url = await uploadBuffer(buffer, fileName, "/blog");

    return NextResponse.json({ url });
  } catch (err: unknown) {
    console.error("Server upload to ImageKit failed:", err);
    const msg = err instanceof Error ? err.message : "Upload to ImageKit failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
