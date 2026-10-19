import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://shivanshuchauhan.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Search Engines
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Baiduspider", "YandexBot"],
        allow: "/",
      },
      // AI Search & LLM Engines (AEO / GEO / LLMs)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "GoogleOther",
          "cohere-ai",
          "Omgilibot",
          "FacebookBot",
          "Applebot",
          "Applebot-Extended",
          "Bytespider",
          "Diffbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

