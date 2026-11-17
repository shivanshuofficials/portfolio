import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  ArrowUpRight,
  Clock,
  Calendar,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { clean } from "@/lib/sanitize";
import { PostModel } from "@/models/Post";
import BlogReactions from "@/components/BlogReactions";
import BlogComments from "@/components/BlogComments";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BoxOfficePostLayout from "@/components/BoxOfficePostLayout";
import MainFooter from "@/components/MainFooter";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const FALLBACK_POSTS: PostModel[] = [
  {
    id: "e4df3a39-7190-41ba-a89f-f98a3942e37b",
    _id: "e4df3a39-7190-41ba-a89f-f98a3942e37b",
    title: "Ramayana Part 1 Box Office: A First-Week Report",
    slug: "ramayana-part-1-box-office-collection-week-1",
    excerpt:
      "Nitesh Tiwari's Ramayana: Part 1 arrived on November 5, 2026, in the Diwali window, and its first week has been one of the biggest in recent Indian cinema. Here is what the numbers say so far.",
    coverImage:
      "https://ik.imagekit.io/5zsbf18hx/blog/1794544811699-Ramayana-part-1__1__s7QSml5YO.webp",
    category: "Entertainment",
    readTime: "6 min read",
    authorName: "Shivanshu Chauhan",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    content: "<p>Updated November 12, 2026. Figures are trade estimates (mainly Sacnilk) and may change.</p>",
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

async function getPost(slug: string): Promise<PostModel | null> {
  await connection();
  try {
    const db = getTursoClient();
    if (db) {
      await initDb();
      const result = await db.execute({
        sql: "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
        args: [slug],
      });

      if (result.rows.length > 0) {
        const r = result.rows[0];
        return {
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
          metaTitle: String(r.metaTitle || ""),
          metaDescription: String(r.metaDescription || ""),
          metaKeywords: String(r.metaKeywords || ""),
          noIndex: Boolean(r.noIndex),
          createdAt: String(r.createdAt),
          updatedAt: String(r.updatedAt),
        };
      }
    }

    // Check fallbacks if not in DB
    const foundFallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    if (foundFallback) return foundFallback;

    return null;
  } catch {
    const foundFallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    return foundFallback || null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<PostModel[]> {
  let list: PostModel[] = [];
  try {
    const db = getTursoClient();
    if (db) {
      const result = await db.execute({
        sql: "SELECT * FROM posts WHERE slug != ? AND status = 'published' ORDER BY createdAt DESC LIMIT 3",
        args: [currentSlug],
      });
      list = result.rows.map((r) => ({
        id: String(r.id),
        _id: String(r.id),
        title: String(r.title),
        slug: String(r.slug),
        excerpt: String(r.excerpt || ""),
        coverImage: String(r.coverImage || ""),
        content: String(r.content || ""),
        tags: JSON.parse(String(r.tags || "[]")),
        category: String(r.category || "Entertainment"),
        readTime: String(r.readTime || "5 min read"),
        authorName: String(r.authorName || "Shivanshu Chauhan"),
        authorAvatar: String(r.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"),
        featured: Boolean(r.featured),
        status: "published",
        createdAt: String(r.createdAt),
        updatedAt: String(r.updatedAt),
      }));
    }
  } catch {}

  const fallbacks = FALLBACK_POSTS.filter((p) => p.slug !== currentSlug);
  return [...list, ...fallbacks.filter((fb) => !list.some((l) => l.slug === fb.slug))].slice(0, 3);
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) {
    return { title: "Post Not Found | Shivanshu Chauhan" };
  }
  const seoTitle = p.metaTitle?.trim() || p.title;
  const seoDesc = p.metaDescription?.trim() || p.excerpt || `Read ${p.title} on Shivanshu Chauhan's editorial suite.`;
  const keywords = p.metaKeywords
    ? p.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : p.tags;

  return {
    title: `${seoTitle} — Box Office & Trade Intelligence`,
    description: seoDesc,
    keywords,
    robots: p.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: `https://www.shivanshuchauhan.com/blog/${p.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://www.shivanshuchauhan.com/blog/${p.slug}`,
      type: "article",
      images: p.coverImage ? [{ url: p.coverImage, alt: seoTitle }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: p.coverImage ? [p.coverImage] : [],
    },
  };
}

async function BlogPostContent({ paramsPromise }: { paramsPromise: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Check if this post is a Box Office / Entertainment report (like Ramayana or Sacnilk-style posts)
  const isBoxOffice =
    post.category?.toLowerCase() === "entertainment" ||
    post.slug.includes("box-office") ||
    post.slug.includes("ramayana");

  if (isBoxOffice) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <BoxOfficePostLayout post={post} />
      </main>
    );
  }

  const relatedPosts = await getRelatedPosts(slug);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* 1. Header Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-black shadow-md font-mono">
              {post.category}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            <ShieldCheck size={13} /> Production Verified
          </span>
          {post.noIndex && (
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Excluded from Sitemap &amp; Search (noindex)
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
          {post.title}
        </h1>

        {/* Metadata & Author Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover border border-amber-400/40 shadow-sm"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">
                {post.authorName}
              </h4>
              <p className="text-xs text-zinc-400 flex items-center gap-2 font-mono">
                <Calendar size={11} className="text-amber-400/80" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <Clock size={11} className="text-amber-400/80" />
                <span>{post.readTime}</span>
              </p>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 2. Analytical Scorecard Block */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#090f1a] border border-zinc-800 shadow-lg text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 block uppercase">TRACK DOMAIN</span>
            <span className="text-amber-300 font-bold truncate block">{post.category}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 block uppercase">READING PACE</span>
            <span className="text-zinc-200 font-bold block">{post.readTime}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 block uppercase">SYSTEM TIER</span>
            <span className="text-sky-300 font-bold block">Enterprise L3</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 block uppercase">VERDICT STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={11} /> Ready
            </span>
          </div>
        </div>
      </div>

      {/* 3. Cover Image */}
      {post.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto max-h-[520px] object-cover"
          />
        </div>
      )}

      {/* 4. Excerpt Callout */}
      {post.excerpt && (
        <div className="p-6 rounded-2xl bg-zinc-950/80 border-l-4 border-amber-400 border-zinc-800 text-base sm:text-lg text-zinc-300 italic leading-relaxed">
          {post.excerpt}
        </div>
      )}

      {/* 5. Rendered HTML content */}
      <article
        className="prose prose-invert prose-amber max-w-none text-[#e2e8f0] leading-relaxed text-base sm:text-lg space-y-6"
        dangerouslySetInnerHTML={{ __html: clean(post.content || "") }}
      />

      {/* 6. Helpful / Reaction Votes Handler */}
      <BlogReactions slug={post.slug} />

      {/* 7. Verified Google Reviews & Comments */}
      <BlogComments slug={post.slug} postTitle={post.title} />

      {/* 8. Related Publications Shelf */}
      {relatedPosts.length > 0 && (
        <div className="pt-10 border-t border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-amber-400" />
            <h3 className="text-lg font-bold font-serif text-white">
              Related Technical Reports
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-4 rounded-2xl bg-[#090f1a] border border-zinc-800 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-semibold uppercase text-amber-400">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                  <span className="font-mono text-[11px]">{rel.readTime}</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1 text-[11px]">
                    Read <ArrowUpRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 9. Post Footer Navigation */}
      <div className="pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 transition"
        >
          <ArrowLeft size={14} /> Back to all articles
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
        >
          Explore Shivanshu Chauhan Portfolio <ArrowUpRight size={14} />
        </Link>
      </div>
    </main>
  );
}

export default function BlogPostPage({ params }: RouteProps) {
  return (
    <div className="relative z-10 min-h-screen bg-[#070c16] text-[#e2e8f0] font-sans antialiased selection:bg-amber-400/30 flex flex-col justify-between">
      <ReadingProgressBar />
      <div>
        {/* Navigation */}
        <header className="sticky top-0 z-40 border-b border-[#1b3152] bg-[#07111e]/95 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-white transition font-mono"
              >
                <ArrowLeft size={15} /> All Box Office Reports
              </Link>
            </div>

            <Link href="/" className="text-xs font-bold text-[#8ba3c7] hover:text-amber-400 transition font-mono">
              Shivanshu Chauhan &bull; Trade Desk →
            </Link>
          </div>
        </header>

        <Suspense fallback={<div className="max-w-4xl mx-auto px-6 py-24 text-center text-zinc-500 font-mono">Loading report...</div>}>
          <BlogPostContent paramsPromise={params} />
        </Suspense>
      </div>

      <MainFooter />
    </div>
  );
}
