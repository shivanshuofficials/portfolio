import { createClient, Client } from "@libsql/client";

let client: Client | null = null;
let schemaInitialized = false;

export function getTursoClient(): Client | null {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    return null;
  }

  if (!client) {
    client = createClient({
      url,
      authToken,
    });
  }

  return client;
}

export async function initDb() {
  const db = getTursoClient();
  if (!db || schemaInitialized) return;

  await db.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT DEFAULT '',
      coverImage TEXT DEFAULT '',
      content TEXT DEFAULT '',
      tags TEXT DEFAULT '[]',
      category TEXT DEFAULT 'Design & Engineering',
      readTime TEXT DEFAULT '5 min read',
      authorName TEXT DEFAULT 'Shivanshu Chauhan',
      authorAvatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      featured INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      metaTitle TEXT DEFAULT '',
      metaDescription TEXT DEFAULT '',
      metaKeywords TEXT DEFAULT '',
      noIndex INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      postSlug TEXT NOT NULL,
      userEmail TEXT NOT NULL,
      userName TEXT NOT NULL,
      userAvatar TEXT DEFAULT '',
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      status TEXT DEFAULT 'approved',
      createdAt TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS post_reactions (
      id TEXT PRIMARY KEY,
      postSlug TEXT NOT NULL,
      userId TEXT NOT NULL,
      reaction TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  // Safe migrations for existing tables
  const columns = [
    "metaTitle TEXT DEFAULT ''",
    "metaDescription TEXT DEFAULT ''",
    "metaKeywords TEXT DEFAULT ''",
    "noIndex INTEGER DEFAULT 0",
  ];
  for (const col of columns) {
    try {
      await db.execute(`ALTER TABLE posts ADD COLUMN ${col}`);
    } catch {
      // Column already exists
    }
  }

  schemaInitialized = true;
}
