import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { clean, slugify } from "@/lib/sanitize";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const posts = await Post.find({}, "title slug status updatedAt coverImage excerpt category authorName readTime")
    .sort({ updatedAt: -1 })
    .lean();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  await connectDB();
  const b = await req.json();
  if (!b.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  let slug = slugify(b.slug || b.title);
  let n = 1;
  while (await Post.exists({ slug })) {
    slug = `${slugify(b.slug || b.title)}-${++n}`;
  }

  const post = await Post.create({
    title: b.title.trim(),
    slug,
    excerpt: b.excerpt || "",
    coverImage: b.coverImage || "",
    content: clean(b.content || ""),
    tags: Array.isArray(b.tags) ? b.tags : [],
    category: b.category || "Design & Engineering",
    readTime: b.readTime || "5 min read",
    authorName: b.authorName || "Shivanshu Chauhan",
    authorAvatar: b.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    featured: !!b.featured,
    status: b.status === "published" ? "published" : "draft",
  });

  return NextResponse.json(post, { status: 201 });
}
