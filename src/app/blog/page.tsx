import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { PostModel } from "@/models/Post";

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
    category: "Featured",
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
    title: "Migrating to Linear 101",
    slug: "migrating-to-linear-101",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started smoothly across enterprise engineering teams.",
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
    title: "Building your API Stack",
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
    title: "Bill Walsh leadership lessons",
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
    title: "PM mental models",
    slug: "pm-mental-models",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships. Here are 7 frameworks for technical product managers.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=720&q=80",
    category: "Product Management",
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
    title: "What is Wireframing?",
    slug: "what-is-wireframing",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the software and design systems industry.",
    coverImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=720&q=80",
    category: "Design",
    readTime: "5 min read",
    authorName: "Candice Wu",
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    content: "<p>Wireframing guide.</p>",
    tags: ["UI/UX"],
    createdAt: "2026-01-19",
    updatedAt: "2026-01-19",
    status: "published",
    featured: false,
  },
  {
    id: "seed-7",
    _id: "seed-7",
    title: "How collaboration makes us better designers",
    slug: "how-collaboration-makes-us-better-designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs significantly better. Bridging engineers and designers.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=720&q=80",
    category: "Design",
    readTime: "5 min read",
    authorName: "Natali Craig",
    authorAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    content: "<p>Collaborative engineering design.</p>",
    tags: ["Design"],
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
        authorAvatar: String(r.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"),
        featured: Boolean(r.featured),
        status: "published",
        createdAt: String(r.createdAt),
        updatedAt: String(r.updatedAt),
      }));
    }
  } catch {
    dbPosts = [];
  }

  const posts = dbPosts.length > 0 ? dbPosts : FALLBACK_POSTS;
  const featured = posts.find((p) => p.featured) || posts[0];
  const recentPosts = posts.filter((p) => p !== featured);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Featured Article (Replicating Untitled UI Layout) */}
      {featured && (
        <section className="relative rounded-3xl overflow-hidden border border-[#e1cec0]/15 bg-[#140a0e] shadow-2xl group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full min-h-[420px] overflow-hidden">
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-[1.02] transition duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0507] via-[#0b0507]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0507]/90 via-[#0b0507]/40 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-end max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold w-max backdrop-blur-sm">
                <Sparkles size={12} />
                {featured.category || "Featured Article"}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-serif">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="hover:text-rose-200 transition"
                >
                  {featured.title}
                </Link>
              </h1>

              <p className="text-sm sm:text-base text-[#c9bab0] line-clamp-3 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featured.authorAvatar}
                    alt=""
                    className="w-10 h-10 rounded-full border border-rose-400/30 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {featured.authorName}
                    </h4>
                    <p className="text-xs text-[#9e8e85] flex items-center gap-2">
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
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition group-hover:translate-x-1"
                >
                  <ArrowUpRight size={22} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts Grid (3 Columns) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#e1cec0]/10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white font-serif">
              Recent blog posts
            </h2>
            <p className="text-xs sm:text-sm text-[#9e8e85] mt-1">
              Insights, engineering deep-dives, and product design explorations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-2xl bg-[#12090c] border border-[#e1cec0]/10 hover:border-rose-500/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-rose-950/20"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                    No Image
                  </div>
                )}
                {post.category && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0b0507]/80 backdrop-blur-md text-xs font-medium text-rose-300 border border-rose-500/20">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c9bab0] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e1cec0]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.authorAvatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-[#e1cec0]/20"
                    />
                    <div className="text-xs">
                      <span className="font-medium text-zinc-200 block">
                        {post.authorName}
                      </span>
                      <span className="text-[#9e8e85] text-[11px]">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-rose-400 group-hover:text-rose-300 flex items-center gap-1"
                  >
                    Read <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            type="button"
            className="px-6 py-2.5 rounded-xl border border-[#e1cec0]/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition backdrop-blur-md"
          >
            Loading more...
          </button>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="rounded-3xl bg-gradient-to-b from-[#170b10] to-[#0d0507] border border-[#e1cec0]/15 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
            Let&apos;s build something great together
          </h2>
          <p className="text-xs sm:text-sm text-[#c9bab0]">
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
          <Link
            href="mailto:shivanshuchauhanofficials@gmail.com"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950/40 transition"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <div className="relative z-10 min-h-screen bg-[#0b0507] text-[#f5ede6] font-sans antialiased selection:bg-rose-500/30">
      {/* Top Untitled-style Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#e1cec0]/10 bg-[#0b0507]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
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
                Domains & Ecosystem
              </Link>
              <Link href="/blog" className="text-white font-medium">
                Blog
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-[#c9bab0] hover:text-white px-3 py-2 rounded-lg transition"
            >
              ← Back to Portfolio
            </Link>
            <Link
              href="/admin/login"
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100 transition shadow-sm"
            >
              Admin Sign In
            </Link>
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-24 text-center text-zinc-500">Loading blog articles...</div>}>
        <BlogContent />
      </Suspense>

      {/* Footer */}
      <footer className="border-t border-[#e1cec0]/10 bg-[#080304] text-xs text-[#9e8e85] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-200">Shivanshu Chauhan</span>
            <span>•</span>
            <span>Engineering & Architecture</span>
          </div>
          <div>© 2026 Shivanshu Chauhan. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
