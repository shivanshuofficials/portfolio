"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Sparkles,
  Clock,
  Calendar,
  Tag,
  ChevronDown,
  TrendingUp,
  BarChart3,
  LayoutGrid,
  Table as TableIcon,
  Flame,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Activity,
  CheckCircle2,
  Award,
} from "lucide-react";
import { PostModel } from "@/models/Post";

interface BlogCardsGridProps {
  posts: PostModel[];
  featuredSlug?: string;
}

export default function BlogCardsGrid({ posts, featuredSlug }: BlogCardsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "quick-read">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showAnalyticsChart, setShowAnalyticsChart] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Extract unique categories and their counts
  const categoriesWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => {
      const cat = p.category?.trim() || "Entertainment";
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    const list = [{ name: "All", count: posts.length }];
    map.forEach((count, name) => {
      list.push({ name, count });
    });
    return list;
  }, [posts]);

  // Top trending spotlight articles
  const trendingPosts = useMemo(() => {
    // Put Ramayana / featured post first
    const ramayana = posts.find((p) => p.slug.includes("ramayana"));
    const others = posts.filter((p) => !p.slug.includes("ramayana"));
    return [
      ...(ramayana ? [ramayana] : []),
      ...others,
    ].slice(0, 4);
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter((post) => {
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
        post.authorName?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      // Keep Ramayana at top if it matches
      if (a.slug.includes("ramayana")) return -1;
      if (b.slug.includes("ramayana")) return 1;

      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "quick-read") {
        const timeA = parseInt(a.readTime?.match(/\d+/)?.[0] || "5", 10);
        const timeB = parseInt(b.readTime?.match(/\d+/)?.[0] || "5", 10);
        return timeA - timeB;
      }
      return 0;
    });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  const displayPosts = useMemo(() => {
    if (selectedCategory === "All" && !searchQuery && featuredSlug) {
      const rest = filteredAndSortedPosts.filter((p) => p.slug !== featuredSlug);
      return rest.length > 0 ? rest : filteredAndSortedPosts;
    }
    return filteredAndSortedPosts;
  }, [filteredAndSortedPosts, selectedCategory, searchQuery, featuredSlug]);

  const visiblePosts = displayPosts.slice(0, visibleCount);
  const hasMore = visibleCount < displayPosts.length;

  return (
    <section className="space-y-12" id="editorial-hub">
      {/* 1. HIGH-DENSITY KPI METRICS STRIP (Theatrical Box Office Totals) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border-2 border-amber-400/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#86a1c7] text-xs mb-2">
            <span>PEAK TRACKED GROSS</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
            ₹ 934.55 <span className="text-xs font-bold text-white">Cr</span>
          </div>
          <p className="text-[11px] text-[#718dae] mt-1 font-sans">
            Ramayana Part 1 (Week 1 Worldwide)
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border border-[#1e395e] shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#86a1c7] text-xs mb-2">
            <span>DOMESTIC NET</span>
            <Award size={13} className="text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight">
            ₹ 511.10 <span className="text-xs font-bold text-white">Cr</span>
          </div>
          <p className="text-[11px] text-[#718dae] mt-1 font-sans">
            India Net 7-day all languages
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border border-[#1e395e] shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-[#86a1c7] text-xs mb-2">
            <span>SINGLE-DAY RECORD</span>
            <Flame size={13} className="text-orange-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-400 tracking-tight">
            ₹ 107.50 <span className="text-xs font-bold text-white">Cr</span>
          </div>
          <p className="text-[11px] text-[#718dae] mt-1 font-sans">
            Holiday Monday (Day 5 Domestic)
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#193254] to-[#0d1c31] border-2 border-emerald-400/40 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-emerald-300 text-xs mb-2">
            <span>TRADE VERIFIED</span>
            <Activity size={13} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
            100% <span className="text-xs font-bold text-white">Audited</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 mt-1 font-sans">
            Multi-Circuit Verified Trade Protocol
          </p>
        </div>
      </div>

      {/* 2. SPONSOR LEADERBOARD BANNER (Yellow Ad Banner) */}
      <div className="rounded-xl bg-[#ffb703] border-2 border-[#e09f00] p-4 text-black flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-10 h-10 rounded-lg bg-black text-[#ffb703] font-black flex items-center justify-center shrink-0 text-sm shadow-md font-mono">
            BOX
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-black text-[#ffb703] font-mono">
                TRADE PROTOCOL REPORT
              </span>
              <span className="text-[11px] font-bold text-black/90 font-mono hidden sm:inline">
                Live Box Office Intelligence &amp; Multi-Circuit Tracking
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-black mt-0.5">
              Indian Cinema Box Office Records, Day-Wise Collections &amp; Advance Booking
            </h4>
          </div>
        </div>
        <Link
          href="/blog/ramayana-part-1-box-office-collection-week-1"
          className="px-4 py-2 rounded-lg bg-black text-[#ffb703] font-black text-xs uppercase tracking-wide shrink-0 shadow-lg hover:bg-neutral-900 transition flex items-center gap-1.5 font-mono"
        >
          <span>View Ramayana Report</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 3. TRENDING BOX OFFICE POSTERS SHELF (Directly matching bottom poster cards in screenshot) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Flame size={15} />
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold font-serif text-white tracking-tight">
              Trending Box Office Tracking Reports
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8ba3c7] hidden sm:inline">
            Ranked by Day 1 &amp; Worldwide Gross
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingPosts.map((post, idx) => (
            <Link
              key={post.id || post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-xl overflow-hidden border border-[#1b3558] hover:border-amber-400 bg-[#0c182b] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Poster Art with Rank */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#060c17]">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#0b172a] to-[#040810]" />
                )}

                {/* Rank Tag */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#ffb703] text-black text-[11px] font-black font-mono shadow-md flex items-center gap-1">
                  <span>#{idx + 1}</span>
                  <span className="text-[9px] font-bold uppercase">TRENDING</span>
                </div>

                {/* Collection Highlight Tag */}
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-black/90 backdrop-blur-md text-amber-300 text-xs font-black text-center font-mono border border-amber-400/40 shadow-lg">
                  {post.slug.includes("ramayana") ? "₹ 934.55 Cr WW" : "Tracked Report"}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="p-3.5 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                  {post.category || "Entertainment"}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white font-serif line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                  {post.title}
                </h4>

                <div className="pt-2 border-t border-[#172e4d] flex items-center justify-between text-xs text-[#8ca5c9]">
                  <span className="text-[11px] font-mono">{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform text-[11px]">
                    Open <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. VISUAL COLLECTION TRAJECTORY CHART (Blue Line Graph in screenshot) */}
      <div className="rounded-2xl bg-[#0b172a] border border-[#1b3558] p-5 sm:p-7 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1b3558]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
              <BarChart3 size={14} />
              <span>India Net Collection Day-Wise Curve</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              Ramayana Part 1 Day 1 to Day 7 Theatrical Trajectory
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowAnalyticsChart(!showAnalyticsChart)}
            className="px-3 py-1.5 rounded-lg border border-[#203f6b] bg-[#12233b] hover:bg-[#182f4e] text-xs font-bold text-[#cad8eb] transition cursor-pointer"
          >
            {showAnalyticsChart ? "Hide Chart" : "Expand Chart"}
          </button>
        </div>

        {showAnalyticsChart && (
          <div className="space-y-3 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8ca5c9]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  India Net (₹ Crore)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Monday Festive Surge (₹107.50 Cr)
                </span>
              </div>
              <span className="text-[11px] text-[#6d89af]">
                Verified Trade Protocol Data
              </span>
            </div>

            {/* Responsive SVG Chart */}
            <div className="w-full h-44 sm:h-52 bg-[#060e1a] rounded-xl p-4 border border-[#182f4e] relative flex items-end">
              <svg
                viewBox="0 0 700 160"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="20" x2="700" y2="20" stroke="#172b47" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="700" y2="60" stroke="#172b47" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="700" y2="100" stroke="#172b47" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="700" y2="140" stroke="#1f3b61" strokeWidth="1" />

                <polyline
                  points="40,85 140,110 240,78 340,98 440,25 540,45 640,76"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <polygon
                  points="40,85 140,110 240,78 340,98 440,25 540,45 640,76 640,140 40,140"
                  fill="url(#blueChartGrad)"
                  opacity="0.25"
                />

                {[
                  { x: 40, y: 85, day: "Day 1 (Thu)", val: "₹64.85 Cr" },
                  { x: 140, y: 110, day: "Day 2 (Fri)", val: "₹48.05 Cr" },
                  { x: 240, y: 78, day: "Day 3 (Sat)", val: "₹69.80 Cr" },
                  { x: 340, y: 98, day: "Day 4 (Sun)", val: "₹56.15 Cr" },
                  { x: 440, y: 25, day: "Day 5 (Mon)", val: "₹107.50 Cr 🔥", isPeak: true },
                  { x: 540, y: 45, day: "Day 6 (Tue)", val: "₹94.10 Cr" },
                  { x: 640, y: 76, day: "Day 7 (Wed)", val: "₹70.65 Cr" },
                ].map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={p.isPeak ? 7 : 5}
                      fill={p.isPeak ? "#ffb703" : "#0284c7"}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y={p.y - 12}
                      textAnchor="middle"
                      fill={p.isPeak ? "#ffb703" : "#e0f2fe"}
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {p.val}
                    </text>
                    <text
                      x={p.x}
                      y="155"
                      textAnchor="middle"
                      fill="#7ea0cb"
                      fontSize="9"
                    >
                      {p.day}
                    </text>
                  </g>
                ))}

                <defs>
                  <linearGradient id="blueChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 5. SEARCH, FILTER BAR & VIEW TOGGLE */}
      <div className="space-y-4 pb-4 border-b border-[#1b3152]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles size={13} />
              BOX OFFICE EDITORIAL REPOSITORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              All Cinema Intelligence &amp; Industry Reports
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7998c0]" />
              <input
                type="text"
                placeholder="Search film, actor, box office..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#091526] border border-[#1b3558] text-xs text-white placeholder-[#6885aa] focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7998c0] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-[#091526] border border-[#1b3558] rounded-xl px-2.5 py-1.5 text-xs text-[#cad8eb]">
              <SlidersHorizontal size={13} className="text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-xs text-white focus:outline-none cursor-pointer pr-1"
              >
                <option value="newest" className="bg-[#0b172a] text-white">Latest First</option>
                <option value="quick-read" className="bg-[#0b172a] text-white">Fast Reads</option>
                <option value="oldest" className="bg-[#0b172a] text-white">Oldest</option>
              </select>
            </div>

            <div className="flex items-center bg-[#091526] border border-[#1b3558] rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#ffb703] text-black font-bold shadow-sm"
                    : "text-[#7998c0] hover:text-white"
                }`}
                title="Poster Grid View"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === "table"
                    ? "bg-[#ffb703] text-black font-bold shadow-sm"
                    : "text-[#7998c0] hover:text-white"
                }`}
                title="Theatrical Data Table View"
              >
                <TableIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#1b3558]">
          {categoriesWithCounts.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setVisibleCount(6);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#ffb703] text-black shadow-md"
                    : "bg-[#0c182b] hover:bg-[#142640] text-[#a4bedf] border border-[#1b3558]"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-black/20 text-black" : "bg-[#162c4b] text-[#7ea0cb]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. CONTENT VIEW (CARDS OR HIGH-DENSITY THEATRICAL TABLE) */}
      {displayPosts.length === 0 ? (
        <div className="py-20 text-center space-y-4 border border-dashed border-[#1b3558] rounded-2xl bg-[#091526]/50">
          <p className="text-sm text-[#8ca5c9] font-serif">No tracking publications found</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl bg-[#ffb703] text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <article
              key={post.id || post.slug}
              className="group flex flex-col rounded-2xl bg-[#0c182b] border border-[#1b3558] hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-black block"
              >
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#0a1526] to-[#040912]" />
                )}

                {post.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/40">
                    {post.category}
                  </span>
                )}

                {post.slug.includes("ramayana") && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#ffb703] text-black font-mono font-black text-xs shadow-md">
                    ₹ 934.55 Cr WW
                  </span>
                )}
              </Link>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#7999c2]">
                    <Calendar size={11} className="text-amber-400" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#a0badf] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#172e4d] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8ca5c9]">
                    {post.readTime}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition font-mono"
                  >
                    <span>Read Report</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* THEATRICAL DATA TABLE VIEW */
        <div className="rounded-xl border border-[#1b3558] bg-[#0c182b] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#12233b] border-b border-[#213f68] text-[#90abd3] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold text-amber-400"># Ref</th>
                  <th className="py-3 px-4 font-bold text-white">Title &amp; Topic</th>
                  <th className="py-3 px-4 font-bold text-zinc-300">Category</th>
                  <th className="py-3 px-4 font-bold text-amber-300">Box Office Gross</th>
                  <th className="py-3 px-4 font-bold text-zinc-300">Date</th>
                  <th className="py-3 px-4 text-right font-bold text-amber-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172e4d] font-mono">
                {visiblePosts.map((post, idx) => (
                  <tr
                    key={post.id || post.slug}
                    className="hover:bg-[#152a47] transition group"
                  >
                    <td className="py-3.5 px-4 font-bold text-amber-400 whitespace-nowrap">
                      TRK-{String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-bold text-white group-hover:text-amber-300 transition block leading-snug line-clamp-1 font-sans"
                      >
                        {post.title}
                      </Link>
                      <p className="text-[11px] text-[#86a2c7] line-clamp-1 mt-0.5 font-sans">
                        {post.excerpt}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 border border-sky-500/30 text-sky-300">
                        {post.category || "Entertainment"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap font-black text-amber-400">
                      {post.slug.includes("ramayana") ? "₹ 934.55 Cr" : "Trade Estimate"}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#7999c2] text-[11px]">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#ffb703] hover:bg-amber-400 text-black font-extrabold text-xs transition shadow-md"
                      >
                        <span>Open</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#1b3558] hover:border-amber-400 bg-[#0c182b] text-xs font-bold text-white transition cursor-pointer shadow-lg font-mono"
          >
            <span>Show more reports ({displayPosts.length - visibleCount} remaining)</span>
            <ChevronDown size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
