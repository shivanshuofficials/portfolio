import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getTursoClient, initDb } from "@/lib/turso";
import { clean, slugify } from "@/lib/sanitize";
import crypto from "crypto";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getTursoClient();
  if (!db) return NextResponse.json([]);
  await initDb();

  const result = await db.execute("SELECT * FROM posts ORDER BY updatedAt DESC");
  const posts = result.rows.map((r) => ({
    ...r,
    _id: r.id,
    tags: JSON.parse(String(r.tags || "[]")),
    featured: Boolean(r.featured),
    noIndex: Boolean(r.noIndex),
  }));

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getTursoClient();
  if (!db) return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  await initDb();

  const b = await req.json();
  if (!b.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const baseSlug = slugify(b.slug || b.title);
  let slug = baseSlug;
  let n = 1;
  while ((await db.execute({ sql: "SELECT id FROM posts WHERE slug = ?", args: [slug] })).rows.length > 0) {
    slug = `${baseSlug}-${++n}`;
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const tags = JSON.stringify(Array.isArray(b.tags) ? b.tags : []);
  const status = b.status === "published" ? "published" : "draft";

  await db.execute({
    sql: `
      INSERT INTO posts (
        id, title, slug, excerpt, coverImage, content, tags, category, readTime, authorName, authorAvatar, featured, status, metaTitle, metaDescription, metaKeywords, noIndex, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      id,
      b.title.trim(),
      slug,
      b.excerpt || "",
      b.coverImage || "",
      clean(b.content || ""),
      tags,
      b.category || "Design & Engineering",
      b.readTime || "5 min read",
      b.authorName || "Shivanshu Chauhan",
      b.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
      b.featured ? 1 : 0,
      status,
      b.metaTitle || "",
      b.metaDescription || "",
      b.metaKeywords || "",
      b.noIndex ? 1 : 0,
      now,
      now,
    ],
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/");

  return NextResponse.json({ id, _id: id, slug, status }, { status: 201 });
}
