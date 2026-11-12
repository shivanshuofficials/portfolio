import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { clean } from "@/lib/sanitize";
export const revalidate = 60;

async function getPost(slug) {
  await connectDB();
  return Post.findOne({ slug, status: "published" }).lean();
}
export async function generateMetadata({ params }) {
  const p = await getPost(params.slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { images: p.coverImage ? [p.coverImage] : [] } } : {};
}
export default async function BlogPost({ params }) {
  const p = await getPost(params.slug);
  if (!p) notFound();
  return (
    <article className="wrap">
      <a href="/blog" className="ui">← All posts</a>
      <h1 style={{ fontSize: "2.4em", lineHeight: 1.15 }}>{p.title}</h1>
      <small className="ui" style={{ color: "var(--muted)" }}>{new Date(p.createdAt).toLocaleDateString()}</small>
      {p.coverImage && <img src={p.coverImage} alt="" style={{ width: "100%", borderRadius: 8, margin: "20px 0" }} />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: clean(p.content) }} />
    </article>
  );
}
