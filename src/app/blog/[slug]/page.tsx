import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, ArrowUpRight } from "lucide-react";
import { Suspense } from "react";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { clean } from "@/lib/sanitize";
import { PostModel } from "@/models/Post";
import BlogReactions from "@/components/BlogReactions";
import BlogComments from "@/components/BlogComments";
import MainFooter from "@/components/MainFooter";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string): Promise<PostModel | null> {
  await connection();
  try {
    const db = getTursoClient();
    if (!db) return null;
    await initDb();
    const result = await db.execute({
      sql: "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
      args: [slug],
    });

    if (result.rows.length === 0) return null;
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
      category: String(r.category || "Design & Engineering"),
      readTime: String(r.readTime || "5 min read"),
      authorName: String(r.authorName || "Shivanshu Chauhan"),
      authorAvatar: String(r.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"),
      featured: Boolean(r.featured),
      status: "published",
      metaTitle: String(r.metaTitle || ""),
      metaDescription: String(r.metaDescription || ""),
      metaKeywords: String(r.metaKeywords || ""),
      noIndex: Boolean(r.noIndex),
      createdAt: String(r.createdAt),
      updatedAt: String(r.updatedAt),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) {
    return { title: "Post Not Found | Shivanshu Chauhan" };
  }
  const seoTitle = p.metaTitle?.trim() || p.title;
  const seoDesc = p.metaDescription?.trim() || p.excerpt || `Read ${p.title} on Shivanshu Chauhan's editorial blog.`;
  const keywords = p.metaKeywords
    ? p.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : p.tags;

  return {
    title: `${seoTitle} — Shivanshu Chauhan`,
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

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10">
      {/* Header section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
              {post.category}
            </span>
          )}
          {post.noIndex && (
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Excluded from Sitemap &amp; Search (noindex)
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#e1cec0]/10">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover border border-rose-400/30"
            />
            <div>
              <h4 className="text-sm font-semibold text-white">
                {post.authorName}
              </h4>
              <p className="text-xs text-[#9e8e85] flex items-center gap-2">
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </p>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-[#e1cec0]/15 shadow-2xl">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-auto max-h-[520px] object-cover"
          />
        </div>
      )}

      {/* Excerpt callout */}
      {post.excerpt && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border-l-4 border-rose-500 border-zinc-800 text-base sm:text-lg text-zinc-300 italic leading-relaxed">
          {post.excerpt}
        </div>
      )}

      {/* Rendered HTML content */}
      <article
        className="prose prose-invert prose-rose max-w-none text-[#f5ede6] leading-relaxed text-base sm:text-lg space-y-6"
        dangerouslySetInnerHTML={{ __html: clean(post.content || "") }}
      />

      {/* Helpful / Reaction Votes Handler */}
      <BlogReactions slug={post.slug} />

      {/* Verified Google Reviews & Comments */}
      <BlogComments slug={post.slug} postTitle={post.title} />

      {/* Post footer CTA */}
      <div className="pt-12 border-t border-[#e1cec0]/15 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 text-xs font-medium text-white hover:bg-zinc-800 transition"
        >
          <ArrowLeft size={14} /> Back to all posts
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300"
        >
          Explore Projects & Cloud Architecture <ArrowUpRight size={14} />
        </Link>
      </div>
    </main>
  );
}

export default function BlogPostPage({ params }: RouteProps) {
  return (
    <div className="relative z-10 min-h-screen bg-[#0b0507] text-[#f5ede6] font-sans antialiased selection:bg-rose-500/30 flex flex-col justify-between">
      <div>
        {/* Navigation */}
        <header className="sticky top-0 z-40 border-b border-[#e1cec0]/10 bg-[#0b0507]/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#c9bab0] hover:text-white transition"
            >
              <ArrowLeft size={15} /> All Articles
            </Link>

            <Link href="/" className="text-xs font-medium text-rose-400 hover:text-rose-300">
              Shivanshu Chauhan Portfolio →
            </Link>
          </div>
        </header>

        <Suspense fallback={<div className="max-w-4xl mx-auto px-6 py-24 text-center text-zinc-500">Loading article...</div>}>
          <BlogPostContent paramsPromise={params} />
        </Suspense>
      </div>

      <MainFooter />
    </div>
  );
}
