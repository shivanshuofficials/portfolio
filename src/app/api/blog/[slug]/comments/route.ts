import { NextRequest, NextResponse } from "next/server";
import { getTursoClient, initDb } from "@/lib/turso";
import { getSignedUser } from "@/lib/userAuth";
import { clean } from "@/lib/sanitize";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const db = getTursoClient();
  if (!db) return NextResponse.json({ comments: [] });

  try {
    await initDb();
    const res = await db.execute({
      sql: `
        SELECT id, postSlug, userEmail, userName, userAvatar, content, rating, createdAt
        FROM comments
        WHERE postSlug = ? AND status = 'approved'
        ORDER BY createdAt DESC
      `,
      args: [slug],
    });

    const comments = res.rows.map((r) => ({
      id: String(r.id),
      postSlug: String(r.postSlug),
      userName: String(r.userName),
      userAvatar: String(r.userAvatar || ""),
      content: String(r.content),
      rating: Number(r.rating || 5),
      createdAt: String(r.createdAt),
    }));

    return NextResponse.json({ comments });
  } catch (err) {
    console.error("Failed to load comments:", err);
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  const user = await getSignedUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required. Please sign in with Google to post a genuine review." },
      { status: 401 }
    );
  }

  const { slug } = await context.params;
  const body = await req.json().catch(() => ({}));
  const rawContent = String(body.content || "").trim();

  if (!rawContent || rawContent.length < 3) {
    return NextResponse.json(
      { error: "Comment is too short. Please write at least 3 characters." },
      { status: 400 }
    );
  }

  if (rawContent.length > 2000) {
    return NextResponse.json(
      { error: "Comment is too long (maximum 2,000 characters)." },
      { status: 400 }
    );
  }

  let rating = Number(body.rating);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    rating = 5;
  }

  const db = getTursoClient();
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }

  try {
    await initDb();
    const id = `cmt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const sanitizedContent = clean(rawContent);

    await db.execute({
      sql: `
        INSERT INTO comments (
          id, postSlug, userEmail, userName, userAvatar, content, rating, status, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?)
      `,
      args: [
        id,
        slug,
        user.email,
        user.name,
        user.picture || "",
        sanitizedContent,
        rating,
        now,
      ],
    });

    return NextResponse.json(
      {
        comment: {
          id,
          postSlug: slug,
          userName: user.name,
          userAvatar: user.picture || "",
          content: sanitizedContent,
          rating,
          createdAt: now,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Failed to post comment:", err);
    return NextResponse.json({ error: "Failed to save comment" }, { status: 500 });
  }
}
