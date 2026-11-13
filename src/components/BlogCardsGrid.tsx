"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles, Clock, Calendar, Tag, ChevronDown } from "lucide-react";
import { PostModel } from "@/models/Post";

interface BlogCardsGridProps {
  posts: PostModel[];
  featuredSlug?: string;
}

export default function BlogCardsGrid({ posts, featuredSlug }: BlogCardsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return ["All", ...Array.from(set)];
  }, [posts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude the hero post if we are on "All" view and there are other posts,
      // or include it if user explicitly searches/filters
      const matchesCategory =
        selectedCategory === "All"
          ? true
          : post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.tags?.some((t) => t.toLowerCase().includes(q)) ||
        post.authorName?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // If viewing "All" and no search is active, we can separate the featured post from the rest
  const displayPosts = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery && featuredSlug) {
      const rest = filteredPosts.filter((p) => p.slug !== featuredSlug);
      // If filtering out featured leaves nothing, keep all
      return rest.length > 0 ? rest : filteredPosts;
    }
    return filteredPosts;
  }, [filteredPosts, selectedCategory, searchQuery, featuredSlug]);

  const visiblePosts = displayPosts.slice(0, visibleCount);
  const hasMore = visibleCount < displayPosts.length;

  return (
    <section className="space-y-10" id="articles">
      {/* Header with Title and Search */}
      <div className="space-y-6 pb-6 border-b border-[#e1cec0]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400 font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              EXPLORE EDITORIAL COLLECTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Recent blog posts
            </h2>
            <p className="text-xs sm:text-sm text-[#9e8e85] max-w-xl">
              Insights, engineering deep-dives, enterprise cloud migrations, and product design explorations.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles by topic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/60 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-950/50 scale-[1.02] border border-rose-400/40"
                    : "bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Cards */}
      {displayPosts.length === 0 ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-zinc-800/80 rounded-3xl bg-zinc-950/30">
          <p className="text-sm text-zinc-400 font-serif">No articles found matching your criteria</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white hover:bg-zinc-800 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visiblePosts.map((post) => (
            <article
              key={post.id || post.slug}
              className="group flex flex-col rounded-2xl bg-gradient-to-b from-[#140a0f] to-[#0c0507] border border-[#e1cec0]/12 hover:border-rose-500/40 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-rose-950/30 hover:-translate-y-1.5"
            >
              {/* Card Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 block">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 text-xs font-mono">
                    ✦ ARCHITECTURAL EDITORIAL
                  </div>
                )}

                {/* Category Pill Over Image */}
                {post.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0b0507]/85 backdrop-blur-md text-[11px] font-semibold text-rose-300 border border-rose-500/30 shadow-md">
                    {post.category}
                  </span>
                )}

                {/* Read Time Pill Over Image */}
                {post.readTime && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10 flex items-center gap-1 shadow-md">
                    <Clock size={11} className="text-rose-400" />
                    {post.readTime}
                  </span>
                )}
              </Link>

              {/* Card Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  {/* Date metadata */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#9e8e85]">
                    <Calendar size={11} className="text-rose-400/80" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white group-hover:text-rose-200 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#c9bab0] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400"
                        >
                          <Tag size={9} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Author & Read CTA */}
                <div className="pt-4 border-t border-[#e1cec0]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-rose-400/30"
                    />
                    <div className="text-xs">
                      <span className="font-medium text-zinc-200 block text-[11px] sm:text-xs">
                        {post.authorName || "Shivanshu Chauhan"}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 group-hover:text-rose-300 transition"
                  >
                    <span>Read</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#e1cec0]/20 hover:border-rose-400/50 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition backdrop-blur-md cursor-pointer shadow-lg"
          >
            <span>Show more articles ({displayPosts.length - visibleCount} remaining)</span>
            <ChevronDown size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
