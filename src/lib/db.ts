import mongoose from "mongoose";

interface CachedMongoose {
  conn: typeof mongoose | null;
  p: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: CachedMongoose | undefined;
}

let cached: CachedMongoose = global._mongoose || { conn: null, p: null };
if (!global._mongoose) {
  global._mongoose = cached;
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }
  if (cached.conn) return cached.conn;
  cached.p ||= mongoose.connect(uri);
  cached.conn = await cached.p;
  return cached.conn;
}
