"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Editor, { uploadToImageKit } from "./Editor";
import { ArrowLeft, Save, Eye, Upload, Tag, Globe, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

interface PostData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  category: string;
  readTime: string;
  authorName: string;
  authorAvatar: string;
  featured: boolean;
  status: "draft" | "published";
}

const empty: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  content: "",
  tags: ["Engineering", "Design"],
  category: "Design & Engineering",
  readTime: "5 min read",
  authorName: "Shivanshu Chauhan",
  authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  featured: false,
  status: "draft",
};

export default function PostForm({ id }: { id?: string }) {
  const router = useRouter();
  const [post, setPost] = useState<PostData>(empty);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/posts/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setPost({
          ...p,
          tags: Array.isArray(p.tags) ? p.tags : [],
        });
        setLoading(false);
      })
      .catch(() => {
        setErr("Failed to load post data");
        setLoading(false);
      });
  }, [id]);

  const setField = <K extends keyof PostData>(key: K, val: PostData[K]) =>
    setPost((p) => ({ ...p, [key]: val }));

  async function save(statusToApply?: "draft" | "published") {
    setSaving(true);
    setErr("");
    setSuccess("");
    const newStatus = statusToApply || post.status;
    try {
      const res = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, status: newStatus }),
      });
      const data = await res.json();
      setSaving(false);
      if (!res.ok) {
        setErr(data.error || "Failed to save post");
        return;
      }
      setSuccess("Post saved successfully!");
      if (!id) {
        router.replace(`/admin/edit/${data._id}`);
      } else {
        setField("status", data.status);
      }
    } catch {
      setSaving(false);
      setErr("Network error while saving post");
    }
  }

  async function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      setSuccess("Uploading image to ImageKit...");
      const url = await uploadToImageKit(f);
      setField("coverImage", url);
      setSuccess("Image uploaded to ImageKit!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "ImageKit upload failed";
      setErr(msg);
    }
  }

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (!post.tags.includes(tagInput.trim())) {
      setField("tags", [...post.tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const removeTag = (tToRemove: string) => {
    setField(
      "tags",
      post.tags.filter((t) => t !== tToRemove)
    );
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center text-zinc-400">
        Loading post details...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition"
        >
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
        <div className="flex items-center gap-3">
          {post.status === "published" && post.slug && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition"
            >
              <Eye size={14} /> View live
            </Link>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border border-zinc-800 text-zinc-200 hover:bg-zinc-800/80 transition disabled:opacity-50"
          >
            <Save size={14} /> Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("published")}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-950/40 hover:from-rose-400 hover:to-rose-500 transition disabled:opacity-50"
          >
            <Globe size={14} />
            {post.status === "published" ? "Update live" : "Publish post"}
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {err && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-sm">
          <AlertCircle size={16} />
          {err}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 text-sm">
          <Check size={16} />
          {success}
        </div>
      )}

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Article Title</label>
            <input
              type="text"
              placeholder="e.g. Breaking Into Product Design: Advice from Founders"
              value={post.title}
              onChange={(e) => setField("title", e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900/70 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 text-lg font-medium focus:outline-none focus:border-rose-500/60 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Custom Slug (URL)</label>
              <input
                type="text"
                placeholder="breaking-into-product-design"
                value={post.slug}
                onChange={(e) => setField("slug", e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-900/70 border border-zinc-800 rounded-xl text-zinc-200 text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Category</label>
              <input
                type="text"
                placeholder="Product Design, Architecture, AI"
                value={post.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full px-3.5 py-2 bg-zinc-900/70 border border-zinc-800 rounded-xl text-zinc-200 text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Excerpt / SEO Description (Max 160 characters recommended)
            </label>
            <textarea
              rows={3}
              placeholder="A brief teaser to display on the blog listing and social search cards..."
              value={post.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900/70 border border-zinc-800 rounded-xl text-zinc-200 text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition"
            />
          </div>
        </div>

        {/* Sidebar Controls (Cover Image & Featured) */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Cover Image (ImageKit.io)</label>
            <div className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-4 space-y-3 text-center">
              {post.coverImage ? (
                <div className="relative group rounded-lg overflow-hidden border border-zinc-800">
                  <img
                    src={post.coverImage}
                    alt="Cover preview"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900/90 text-xs text-zinc-200 border border-zinc-700 hover:bg-black transition"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-xl p-6 cursor-pointer transition flex flex-col items-center justify-center gap-2"
                >
                  <Upload size={20} className="text-zinc-500" />
                  <span className="text-xs text-zinc-400 font-medium">Click to upload cover to ImageKit</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCover}
              />
              <input
                type="text"
                placeholder="Or paste direct image URL"
                value={post.coverImage}
                onChange={(e) => setField("coverImage", e.target.value)}
                className="w-full px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-300">Featured Article</span>
              <input
                type="checkbox"
                checked={post.featured}
                onChange={(e) => setField("featured", e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-950 text-rose-500 focus:ring-0 cursor-pointer h-4 w-4"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-xs"
                  >
                    <Tag size={10} className="text-zinc-500" />
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="text-zinc-500 hover:text-zinc-200 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-zinc-400">Post Content</label>
        <Editor
          value={post.content}
          onChange={(html) => setField("content", html)}
          onImportTitle={(title) => {
            if (!post.title) setField("title", title);
          }}
        />
      </div>
    </div>
  );
}
