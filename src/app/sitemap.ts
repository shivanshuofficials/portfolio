import { MetadataRoute } from "next";
import { connection } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const baseUrl = "https://www.shivanshuchauhan.com";
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/domains`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic published blog posts from Turso DB (excluding any marked as noIndex)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const db = getTursoClient();
    if (db) {
      await initDb();
      const res = await db.execute(
        "SELECT slug, updatedAt, createdAt FROM posts WHERE status = 'published' AND (noIndex IS NULL OR noIndex = 0) ORDER BY updatedAt DESC"
      );

      blogRoutes = res.rows.map((row) => {
        const dateStr = String(row.updatedAt || row.createdAt || "");
        const postDate = dateStr ? new Date(dateStr) : now;
        return {
          url: `${baseUrl}/blog/${row.slug}`,
          lastModified: isNaN(postDate.getTime()) ? now : postDate,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        };
      });
    }
  } catch (err) {
    console.error("Failed to fetch blog posts for sitemap:", err);
  }

  return [...staticRoutes, ...blogRoutes];
}
