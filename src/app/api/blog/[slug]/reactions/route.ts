import { NextRequest, NextResponse } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { getVisitorId } from "@/lib/userAuth";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const db = getTursoClient();
  if (!db) return NextResponse.json({ likes: 0, dislikes: 0, userReaction: null });

  try {
    await initDb();
    const visitorId = await getVisitorId();

    const [likesRes, dislikesRes, userRes] = await Promise.all([
      db.execute({
        sql: "SELECT COUNT(*) as count FROM post_reactions WHERE postSlug = ? AND reaction = 'like'",
        args: [slug],
      }),
      db.execute({
        sql: "SELECT COUNT(*) as count FROM post_reactions WHERE postSlug = ? AND reaction = 'dislike'",
        args: [slug],
      }),
      db.execute({
        sql: "SELECT reaction FROM post_reactions WHERE postSlug = ? AND userId = ?",
        args: [slug, visitorId],
      }),
    ]);

    const likes = Number(likesRes.rows[0]?.count || 0);
    const dislikes = Number(dislikesRes.rows[0]?.count || 0);
    const userReaction = (userRes.rows[0]?.reaction as "like" | "dislike") || null;

    return NextResponse.json({ likes, dislikes, userReaction });
  } catch (err) {
    console.error("Failed to load reactions:", err);
    return NextResponse.json({ likes: 0, dislikes: 0, userReaction: null });
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const body = await req.json().catch(() => ({}));
  const chosen = body.reaction as "like" | "dislike";

  if (chosen !== "like" && chosen !== "dislike") {
    return NextResponse.json({ error: "Reaction must be 'like' or 'dislike'" }, { status: 400 });
  }

  const db = getTursoClient();
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 500 });

  try {
    await initDb();
    const visitorId = await getVisitorId();
    const reactionId = `${slug}_${visitorId}`;
    const now = new Date().toISOString();

    const existing = await db.execute({
      sql: "SELECT reaction FROM post_reactions WHERE id = ?",
      args: [reactionId],
    });

    let currentReaction: "like" | "dislike" | null = null;

    if (existing.rows.length > 0) {
      const prev = existing.rows[0].reaction;
      if (prev === chosen) {
        // Toggle off
        await db.execute({
          sql: "DELETE FROM post_reactions WHERE id = ?",
          args: [reactionId],
        });
        currentReaction = null;
      } else {
        // Switch reaction
        await db.execute({
          sql: "UPDATE post_reactions SET reaction = ?, createdAt = ? WHERE id = ?",
          args: [chosen, now, reactionId],
        });
        currentReaction = chosen;
      }
    } else {
      // First time reaction
      await db.execute({
        sql: "INSERT INTO post_reactions (id, postSlug, userId, reaction, createdAt) VALUES (?, ?, ?, ?, ?)",
        args: [reactionId, slug, visitorId, chosen, now],
      });
      currentReaction = chosen;
    }

    // Return updated totals
    const [likesRes, dislikesRes] = await Promise.all([
      db.execute({
        sql: "SELECT COUNT(*) as count FROM post_reactions WHERE postSlug = ? AND reaction = 'like'",
        args: [slug],
      }),
      db.execute({
        sql: "SELECT COUNT(*) as count FROM post_reactions WHERE postSlug = ? AND reaction = 'dislike'",
        args: [slug],
      }),
    ]);

    return NextResponse.json({
      likes: Number(likesRes.rows[0]?.count || 0),
      dislikes: Number(dislikesRes.rows[0]?.count || 0),
      userReaction: currentReaction,
    });
  } catch (err) {
    console.error("Failed to toggle reaction:", err);
    return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
