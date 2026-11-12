import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { clean } from "@/lib/sanitize";
import { uploadBuffer } from "@/lib/imagekit";

const MAX = 15 * 1024 * 1024;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const textToHtml = (t: string) =>
  t
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "File too large (max 15 MB)" }, { status: 413 });

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const buf = Buffer.from(await file.arrayBuffer());
  let html = "";

  try {
    if (ext === "docx") {
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.convertToHtml(
        { buffer: buf },
        {
          convertImage: mammoth.images.imgElement(async (image: { read: () => Promise<Buffer>; contentType: string }) => {
            const data = await image.read();
            const type = image.contentType.split("/")[1] || "png";
            const url = await uploadBuffer(data, `import-${Date.now()}.${type}`);
            return { src: url };
          }),
        }
      );
      html = result.value;
    } else if (ext === "pdf") {
      const pdfModule = await import("pdf-parse");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdf = (pdfModule as any).default || pdfModule;
      html = textToHtml((await pdf(buf)).text);
    } else if (ext === "txt" || ext === "md") {
      html = textToHtml(buf.toString("utf8"));
    } else if (ext === "html" || ext === "htm") {
      const raw = buf.toString("utf8");
      html = /<body[^>]*>([\s\S]*)<\/body>/i.exec(raw)?.[1] || raw;
    } else {
      return NextResponse.json({ error: "Supported: .docx .pdf .txt .md .html" }, { status: 415 });
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Could not read this file";
    return NextResponse.json({ error: msg }, { status: 422 });
  }
  return NextResponse.json({ html: clean(html), title: file.name.replace(/\.[^.]+$/, "") });
}
