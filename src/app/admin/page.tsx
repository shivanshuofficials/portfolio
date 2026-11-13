"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, ExternalLink, LogOut, FileText, CheckCircle2, Clock, EyeOff, Folder } from "lucide-react";

interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  category?: string;
  updatedAt: string;
  coverImage?: string;
  noIndex?: boolean;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const loadPosts = () => {
    setLoading(true);
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
        else setPosts([]);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const categories = Array.from(
    new Set(
      posts
        ?.map((p) => p.category?.trim())
        .filter((c): c is string => Boolean(c)) || []
    )
  );

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts?.filter((p) => p.category?.trim().toLowerCase() === selectedCategory.toLowerCase());

  async function handleDelete(p: PostSummary) {
    if (!confirm(`Are you sure you want to delete "${p.title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/posts/${p._id}`, { method: "DELETE" });
    loadPosts();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="relative z-10 min-h-screen bg-[#0b0507] text-zinc-100 font-sans p-6 sm:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FileText className="text-rose-500" size={24} />
              Editorial Blog Manager
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage stories, articles, ImageKit uploads, and live publications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition flex items-center gap-1.5"
            >
              <ExternalLink size={14} /> View Public Blog
            </Link>
            <Link
              href="/admin/new"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-lg shadow-rose-950/40 transition flex items-center gap-1.5"
            >
              <Plus size={15} /> New Article
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-medium rounded-xl border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition flex items-center gap-1.5"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Category Filter & Quick Add in Category */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium mr-1 flex items-center gap-1">
                <Folder size={13} className="text-rose-400" /> Categories:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-1 text-xs rounded-xl transition font-medium ${
                  selectedCategory === "All"
                    ? "bg-rose-500 text-white"
                    : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                All ({posts?.length || 0})
              </button>
              {categories.map((cat) => {
                const count = posts?.filter((p) => p.category?.trim().toLowerCase() === cat.toLowerCase()).length || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-xl transition font-medium ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-rose-500 text-white"
                        : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {selectedCategory !== "All" && (
              <Link
                href={`/admin/new?category=${encodeURIComponent(selectedCategory)}`}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-rose-300 border border-rose-500/30 transition flex items-center gap-1"
              >
                <Plus size={13} /> Add New Post in &quot;{selectedCategory}&quot;
              </Link>
            )}
          </div>
        )}

        {/* Content list */}
        {loading ? (
          <div className="py-20 text-center text-zinc-500">Loading your articles...</div>
        ) : filteredPosts?.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">No blog posts in this category</h3>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto">
              Get started by creating your first article in &quot;{selectedCategory}&quot;.
            </p>
            <Link
              href={
                selectedCategory === "All"
                  ? "/admin/new"
                  : `/admin/new?category=${encodeURIComponent(selectedCategory)}`
              }
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-zinc-100 text-zinc-900 hover:bg-white transition"
            >
              <Plus size={14} /> Create post in {selectedCategory}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80 border border-zinc-800/80 rounded-2xl bg-zinc-900/40 overflow-hidden shadow-xl">
            {filteredPosts?.map((p) => (
              <div
                key={p._id}
                className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-zinc-800/30 transition"
              >
                <div className="flex items-center gap-4 min-w-[280px]">
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt=""
                      className="w-16 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-zinc-800/50 border border-zinc-800 flex items-center justify-center text-zinc-600 flex-shrink-0">
                      <FileText size={18} />
                    </div>
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-zinc-100 text-base hover:text-rose-400 transition">
                        <Link href={`/admin/edit/${p._id}`}>{p.title}</Link>
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          p.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {p.status === "published" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        {p.status}
                      </span>
                      {p.noIndex && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                          <EyeOff size={10} />
                          Noindex (Out of Sitemap)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                      <span>/blog/{p.slug}</span>
                      <span>•</span>
                      <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                      {p.category && (
                        <>
                          <span>•</span>
                          <span className="text-zinc-400">{p.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {p.status === "published" && (
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition"
                      title="View Live Article"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/edit/${p._id}`}
                    className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition"
                    title="Edit Post"
                  >
                    <Edit3 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition"
                    title="Delete Post"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
