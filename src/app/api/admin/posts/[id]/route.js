import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { clean, slugify } from "@/lib/sanitize";

export async function GET(_, { params }) {
  const denied = await requireAdmin(); if (denied) return denied;
  await connectDB();
  const post = await Post.findById(params.id).lean();
  return post ? NextResponse.json(post) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req, { params }) {
  const denied = await requireAdmin(); if (denied) return denied;
  await connectDB();
  const b = await req.json();
  const update = {
    title: b.title, excerpt: b.excerpt, coverImage: b.coverImage,
    content: clean(b.content), tags: b.tags, status: b.status,
  };
  if (b.slug) {
    const slug = slugify(b.slug);
    if (await Post.exists({ slug, _id: { $ne: params.id } }))
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    update.slug = slug;
  }
  const post = await Post.findByIdAndUpdate(params.id, update, { new: true });
  return post ? NextResponse.json(post) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(_, { params }) {
  const denied = await requireAdmin(); if (denied) return denied;
  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
