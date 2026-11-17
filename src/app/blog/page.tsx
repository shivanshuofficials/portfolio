import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Flame, Layers, ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { PostModel } from "@/models/Post";
import BlogCardsGrid from "@/components/BlogCardsGrid";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  title: "Box Office Intelligence & Trade Reports — Shivanshu Chauhan",
  description:
    "Live Indian cinema box office collections, day-wise trade breakdowns, worldwide grosses, advance booking data, and industry milestone analyses.",
  alternates: {
    canonical: "https://www.shivanshuchauhan.com/blog",
  },
};

const FALLBACK_POSTS: PostModel[] = [
  {
    id: "e4df3a39-7190-41ba-a89f-f98a3942e37b",
    _id: "e4df3a39-7190-41ba-a89f-f98a3942e37b",
    title: "Ramayana: Part 1 Box Office Analysis — Historic 7-Day Theatrical Run & Milestone Report",
    slug: "ramayana-part-1-box-office-collection-week-1",
    excerpt:
      "An independent analytical deep dive into the theatrical trajectory of Nitesh Tiwari's Ramayana: Part 1 across domestic multiplex chains, single screens, and international territories.",
    coverImage:
      "https://ik.imagekit.io/5zsbf18hx/blog/1794544811699-Ramayana-part-1__1__s7QSml5YO.webp",
    category: "Entertainment",
    readTime: "6 min read",
    authorName: "Shivanshu Chauhan",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    content: "<p>Independent theatrical telemetry and certified circuit collection breakdown.</p>",
    tags: ["Entertainment", "Box Office", "Bollywood", "Ramayana"],
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    status: "published",
    featured: true,
  },
  {
    id: "seed-1",
    _id: "seed-1",
    title: "Breaking Into Product Design: Advice from Untitled Founder, Frankie",
    slug: "breaking-into-product-design-advice",
    excerpt:
      "Let's get one thing out of the way: you don't need a fancy Bachelor's Degree to get into Product Design. We sat down with Frankie Sullivan to talk about gatekeeping in product design and how anyone can get into this growing industry.",
    coverImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    category: "Design & Engineering",
    readTime: "8 min read",
    authorName: "Shivanshu Chauhan",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    content: "<p>Welcome to our deep dive into breaking into product design and engineering.</p>",
    tags: ["Design", "Product"],
    createdAt: "2026-01-20",
    updatedAt: "2026-01-20",
    status: "published",
    featured: false,
  },
  {
    id: "seed-2",
    _id: "seed-2",
    title: "Migrating to Linear 101: Enterprise Engineering Workflows",
    slug: "migrating-to-linear-101",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started smoothly across enterprise engineering teams without friction.",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=720&q=80",
    category: "Product",
    readTime: "5 min read",
    authorName: "Phoenix Baker",
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
    content: "<p>Linear streamline software projects.</p>",
    tags: ["Product", "Agile"],
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19",
    status: "published",
    featured: false,
  },
  {
    id: "seed-3",
    _id: "seed-3",
    title: "Building your Production API Stack: High-Speed Microservices",
    slug: "building-your-api-stack",
    excerpt:
      "The rise of REST & GraphQL APIs has been met by a rise in tools for creating, testing, and managing them. Here is a definitive production guide.",
    coverImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=720&q=80",
    category: "Software Engineering",
    readTime: "7 min read",
    authorName: "Lana Steiner",
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    content: "<p>API Architecture breakdown.</p>",
    tags: ["Engineering", "APIs"],
    createdAt: "2026-01-18",
    updatedAt: "2026-01-18",
    status: "published",
    featured: false,
  },
];

async function BlogContent() {
  await connection();
  let dbPosts: PostModel[] = [];

  try {
    const db = getTursoClient();
    if (db) {
      await initDb();
      const res = await db.execute("SELECT * FROM posts WHERE status = 'published' ORDER BY createdAt DESC");
      dbPosts = res.rows.map((r) => ({
        id: String(r.id),
        _id: String(r.id),
        title: String(r.title),
        slug: String(r.slug),
        excerpt: String(r.excerpt || ""),
        coverImage: String(r.coverImage || ""),
        content: String(r.content || ""),
        tags: JSON.parse(String(r.tags || "[]")),
        category: String(r.category || "Entertainment"),
        readTime: String(r.readTime || "6 min read"),
        authorName: String(r.authorName || "Shivanshu Chauhan"),
        authorAvatar: String(
          r.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
        ),
        featured: Boolean(r.featured),
        status: "published",
        createdAt: String(r.createdAt),
        updatedAt: String(r.updatedAt),
      }));
    }
  } catch {
    dbPosts = [];
  }

  // Combine DB posts with fallbacks, ensuring Ramayana is first
  const allPosts: PostModel[] = [
    ...dbPosts,
    ...FALLBACK_POSTS.filter((fb) => !dbPosts.some((db) => db.slug === fb.slug)),
  ];

  // Pick hero featured post: specifically Ramayana or highest featured
  const featured =
    allPosts.find((p) => p.slug.includes("ramayana")) ||
    allPosts.find((p) => p.featured) ||
    allPosts[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* 1. HERO FEATURED SHOWCASE (Ramayana Part 1 Historic Box Office) */}
      {featured && (
        <section className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 bg-[#0c182b] shadow-2xl group transition duration-500 hover:border-amber-400">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full min-h-[400px] sm:min-h-[460px] overflow-hidden">
            {featured.coverImage ? (
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-[1.02] transition duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#0b172a] to-[#040810]" />
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111e] via-[#07111e]/85 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07111e] via-[#07111e]/75 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffb703] text-black text-xs font-black uppercase tracking-wider font-mono shadow-md">
                  <Flame size={13} className="fill-black" />
                  ALL-TIME BLOCKBUSTER
                </span>
                <span className="px-3 py-1 rounded-md bg-black/80 border border-[#1b3558] text-amber-300 text-xs font-bold font-mono">
                  LIVE TRADE REPORT
                </span>
                <span className="px-3 py-1 rounded-md bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-bold font-mono">
                  ₹ 934.55 Cr WW (Week 1)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="hover:text-amber-300 transition"
                >
                  {featured.title}
                </Link>
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-[#a4bedf] line-clamp-3 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={featured.authorAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {featured.authorName}
                    </h4>
                    <p className="text-[11px] text-[#86a2c7] flex items-center gap-2 font-mono">
                      <span>
                        {new Date(featured.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ffb703] hover:bg-amber-400 text-black text-xs font-black transition shadow-xl font-mono uppercase tracking-wider"
                >
                  <span>Open Day-Wise Report</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. THEATRICAL EDITORIAL HUB & MULTI-VIEW SUITE */}
      <BlogCardsGrid posts={allPosts} featuredSlug={featured?.slug} />

      {/* 3. BOTTOM TRADE DISCLAIMER & CTA */}
      <section className="rounded-2xl bg-[#091526] border border-[#1b3558] p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
            BOX OFFICE ANALYTICS &bull; INDIAN CINEMA TELEMETRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
            Tracking Box Office Momentum Across India &amp; Global Circuits
          </h2>
          <p className="text-xs sm:text-sm text-[#8ba3c7] leading-relaxed">
            Data aggregated from trade circuits, multiplex telemetry, distributor shares, and certified box office trackers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-[#1b3558] bg-[#0c182b] hover:bg-[#142640] text-white text-xs font-bold transition font-mono"
          >
            ← Back to Portfolio
          </Link>
          <a
            href="mailto:shivanshuchauhanofficials@gmail.com"
            className="px-5 py-2.5 rounded-xl bg-[#ffb703] hover:bg-amber-400 text-black text-xs font-black shadow-lg font-mono uppercase tracking-wide transition"
          >
            Contact Trade Desk
          </a>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <div className="relative z-10 min-h-screen bg-[#07111e] text-[#e6edf8] font-sans antialiased selection:bg-amber-400/30 flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar with Box Office / Cinema Intelligence Theme */}
        <header className="sticky top-0 z-40 border-b border-[#1b3152] bg-[#07111e]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
            <div className="flex items-center gap-6 sm:gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <span className="w-8 h-8 rounded-lg bg-[#ffb703] font-black text-black flex items-center justify-center text-xs shadow-md font-mono">
                  BO
                </span>
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-400 transition font-serif">
                  Box Office &bull; Shivanshu Chauhan
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-xs text-[#8ca5c9] font-mono">
                <Link href="/" className="hover:text-white transition">
                  Portfolio
                </Link>
                <Link href="/domains" className="hover:text-white transition">
                  Domains
                </Link>
                <Link href="/blog" className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Live Box Office Hub
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs font-mono font-bold text-[#8ca5c9] hover:text-white px-3.5 py-1.5 rounded-xl border border-[#1b3558] bg-[#0c182b] hover:bg-[#142640] transition"
              >
                ← Portfolio
              </Link>
            </div>
          </div>
        </header>

        <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-24 text-center text-[#7896be] font-mono">Loading Box Office Hub...</div>}>
          <BlogContent />
        </Suspense>
      </div>

      <MainFooter />
    </div>
  );
}
