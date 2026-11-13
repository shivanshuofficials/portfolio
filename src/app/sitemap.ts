import { MetadataRoute } from "next";
import { getTursoClient, initDb } from "@/lib/turso";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Dynamic published blog posts from Turso DB
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const db = getTursoClient();
    if (db) {
      await initDb();
      const res = await db.execute(
        "SELECT slug, updatedAt, createdAt FROM posts WHERE status = 'published' ORDER BY updatedAt DESC"
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
