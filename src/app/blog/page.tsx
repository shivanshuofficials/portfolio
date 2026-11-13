import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { PostModel } from "@/models/Post";
import BlogCardsGrid from "@/components/BlogCardsGrid";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  title: "Blog & Technical Editorial — Shivanshu Chauhan",
  description:
    "Articles on full stack architecture, cloud migration, product design, and modern web development systems.",
  alternates: {
    canonical: "https://www.shivanshuchauhan.com/blog",
  },
};

const FALLBACK_POSTS: PostModel[] = [
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
    featured: true,
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
  {
    id: "seed-4",
    _id: "seed-4",
    title: "Bill Walsh Leadership Lessons: Radical Precision in Engineering",
    slug: "bill-walsh-leadership-lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Principles of radical precision and engineering leadership.",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=720&q=80",
    category: "Leadership",
    readTime: "6 min read",
    authorName: "Alec Whitten",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    content: "<p>Leadership principles.</p>",
    tags: ["Leadership"],
    createdAt: "2026-01-18",
    updatedAt: "2026-01-18",
    status: "published",
    featured: false,
  },
  {
    id: "seed-5",
    _id: "seed-5",
    title: "Technical PM Mental Models: 7 Production Frameworks",
    slug: "pm-mental-models",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships. Here are 7 frameworks for technical product managers navigating scaling bottlenecks.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=720&q=80",
    category: "Product",
    readTime: "4 min read",
    authorName: "Demi Wilkinson",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    content: "<p>7 frameworks for technical PMs.</p>",
    tags: ["Product"],
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19",
    status: "published",
    featured: false,
  },
  {
    id: "seed-6",
    _id: "seed-6",
    title: "What is Modern Wireframing? Principles for Scalable Systems",
    slug: "what-is-wireframing",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the software and design systems industry how to bridge logic and UI.",
    coverImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=720&q=80",
    category: "Design & Engineering",
    readTime: "5 min read",
    authorName: "Candice Wu",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    content: "<p>Wireframing guide.</p>",
    tags: ["UI/UX", "Design"],
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19",
    status: "published",
    featured: false,
  },
  {
    id: "seed-7",
    _id: "seed-7",
    title: "How Collaboration Makes Us Better Engineers & Designers",
    slug: "how-collaboration-makes-us-better-designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual systems significantly better. Bridging engineers, product leads, and UI systems seamlessly.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=720&q=80",
    category: "Design & Engineering",
    readTime: "5 min read",
    authorName: "Natali Craig",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    content: "<p>Collaborative engineering design.</p>",
    tags: ["Design", "Teamwork"],
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19",
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
        category: String(r.category || "Design & Engineering"),
        readTime: String(r.readTime || "5 min read"),
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

  // Merge DB posts with curated fallback articles so that the grid is always richly populated
  const allPosts: PostModel[] = [
    ...dbPosts,
    ...FALLBACK_POSTS.filter((fb) => !dbPosts.some((db) => db.slug === fb.slug)),
  ];

  // Pick hero featured post: DB featured if exists, otherwise first post
  const featured = allPosts.find((p) => p.featured) || allPosts[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Hero Featured Article */}
      {featured && (
        <section className="relative rounded-3xl overflow-hidden border border-[#e1cec0]/15 bg-[#140a0e] shadow-2xl group transition duration-500 hover:border-rose-500/30">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full min-h-[380px] sm:min-h-[440px] overflow-hidden">
            {featured.coverImage ? (
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover object-[center_25%] group-hover:scale-[1.02] transition duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#170a10] to-[#0b0507]" />
            )}

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0507] via-[#0b0507]/75 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0507]/95 via-[#0b0507]/60 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/35 text-rose-300 text-xs font-semibold w-max backdrop-blur-md shadow-md">
                <Sparkles size={12} />
                <span>{featured.category || "Featured Article"}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight font-serif">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="hover:text-rose-200 transition"
                >
                  {featured.title}
                </Link>
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-[#c9bab0] line-clamp-3 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={featured.authorAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full border border-rose-400/40 object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {featured.authorName}
                    </h4>
                    <p className="text-[11px] text-[#9e8e85] flex items-center gap-2 font-mono">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition group-hover:border-rose-400/50 shadow-lg"
                >
                  <span>Read Article</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Blog Cards Grid with Category Filters & Search */}
      <BlogCardsGrid posts={allPosts} featuredSlug={featured?.slug} />

      {/* Bottom CTA Banner */}
      <section className="rounded-3xl bg-gradient-to-b from-[#180b11] to-[#0c0507] border border-[#e1cec0]/15 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400 font-semibold">
            COLLABORATION &amp; PLATFORM SCALING
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
            Let&apos;s build something great together
          </h2>
          <p className="text-xs sm:text-sm text-[#c9bab0] leading-relaxed">
            Full Stack Web Development, Cloud Migrations, Enterprise Architectures, and Design Systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/80 text-white text-xs font-medium hover:bg-zinc-800 transition"
          >
            Explore Portfolio
          </Link>
          <a
            href="mailto:shivanshuchauhanofficials@gmail.com"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/40 transition"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <div className="relative z-10 min-h-screen bg-[#0b0507] text-[#f5ede6] font-sans antialiased selection:bg-rose-500/30 flex flex-col justify-between">
      <div>
        {/* Top Navigation Bar — Admin Sign In Hidden (Direct URL Access) */}
        <header className="sticky top-0 z-40 border-b border-[#e1cec0]/10 bg-[#0b0507]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-900/30 group-hover:scale-105 transition">
                  SC
                </span>
                <span className="font-semibold text-lg tracking-tight text-white group-hover:text-rose-300 transition">
                  Shivanshu Chauhan
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm text-[#c9bab0]">
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
                <Link href="/domains" className="hover:text-white transition">
                  Domains &amp; Ecosystem
                </Link>
                <Link href="/blog" className="text-white font-medium">
                  Blog
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs font-medium text-[#c9bab0] hover:text-white px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 transition"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </div>
        </header>

        <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-24 text-center text-zinc-500">Loading blog articles...</div>}>
          <BlogContent />
        </Suspense>
      </div>

      {/* Main Website Link Footer */}
      <MainFooter />
    </div>
  );
}
