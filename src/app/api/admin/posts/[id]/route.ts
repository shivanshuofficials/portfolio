import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getTursoClient, initDb } from "@/lib/turso";
import { clean, slugify } from "@/lib/sanitize";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getTursoClient();
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  await initDb();

  const { id } = await context.params;
  const result = await db.execute({
    sql: "SELECT * FROM posts WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const r = result.rows[0];
  const post = {
    ...r,
    _id: r.id,
    tags: JSON.parse(String(r.tags || "[]")),
    featured: Boolean(r.featured),
  };

  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getTursoClient();
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  await initDb();

  const { id } = await context.params;
  const b = await req.json();

  const slug = b.slug ? slugify(b.slug) : undefined;
  if (slug) {
    const checkSlug = await db.execute({
      sql: "SELECT id FROM posts WHERE slug = ? AND id != ?",
      args: [slug, id],
    });
    if (checkSlug.rows.length > 0) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
  }

  const now = new Date().toISOString();
  const tags = JSON.stringify(Array.isArray(b.tags) ? b.tags : []);

  await db.execute({
    sql: `
      UPDATE posts SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        excerpt = COALESCE(?, excerpt),
        coverImage = COALESCE(?, coverImage),
        content = COALESCE(?, content),
        tags = ?,
        category = COALESCE(?, category),
        readTime = COALESCE(?, readTime),
        authorName = COALESCE(?, authorName),
        authorAvatar = COALESCE(?, authorAvatar),
        featured = ?,
        status = COALESCE(?, status),
        metaTitle = COALESCE(?, metaTitle),
        metaDescription = COALESCE(?, metaDescription),
        metaKeywords = COALESCE(?, metaKeywords),
        updatedAt = ?
      WHERE id = ?
    `,
    args: [
      b.title || null,
      slug || null,
      b.excerpt !== undefined ? b.excerpt : null,
      b.coverImage !== undefined ? b.coverImage : null,
      b.content !== undefined ? clean(b.content) : null,
      tags,
      b.category || null,
      b.readTime || null,
      b.authorName || null,
      b.authorAvatar || null,
      b.featured ? 1 : 0,
      b.status || null,
      b.metaTitle !== undefined ? b.metaTitle : null,
      b.metaDescription !== undefined ? b.metaDescription : null,
      b.metaKeywords !== undefined ? b.metaKeywords : null,
      now,
      id,
    ],
  });

  return NextResponse.json({ id, _id: id, slug, status: b.status });
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const db = getTursoClient();
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  await initDb();

  const { id } = await context.params;
  await db.execute({
    sql: "DELETE FROM posts WHERE id = ?",
    args: [id],
  });

  return NextResponse.json({ ok: true });
}
