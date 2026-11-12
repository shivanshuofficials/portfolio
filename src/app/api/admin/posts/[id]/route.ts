import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { clean, slugify } from "@/lib/sanitize";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const { id } = await context.params;
  const post = await Post.findById(id).lean();
  return post ? NextResponse.json(post) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const { id } = await context.params;
  const b = await req.json();

  const update: Record<string, unknown> = {
    title: b.title,
    excerpt: b.excerpt,
    coverImage: b.coverImage,
    content: clean(b.content || ""),
    tags: Array.isArray(b.tags) ? b.tags : [],
    category: b.category || "Design & Engineering",
    readTime: b.readTime || "5 min read",
    authorName: b.authorName || "Shivanshu Chauhan",
    authorAvatar: b.authorAvatar,
    featured: !!b.featured,
    status: b.status,
  };

  if (b.slug) {
    const slug = slugify(b.slug);
    if (await Post.exists({ slug, _id: { $ne: id } })) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    update.slug = slug;
  }

  const post = await Post.findByIdAndUpdate(id, update, { new: true });
  return post ? NextResponse.json(post) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const { id } = await context.params;
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
