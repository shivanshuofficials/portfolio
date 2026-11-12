import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  category?: string;
  readTime?: string;
  authorName?: string;
  authorAvatar?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "", maxlength: 400 },
    coverImage: { type: String, default: "" },
    content: { type: String, default: "" }, // sanitized HTML
    tags: [String],
    category: { type: String, default: "Design & Engineering" },
    readTime: { type: String, default: "5 min read" },
    authorName: { type: String, default: "Shivanshu Chauhan" },
    authorAvatar: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

const Post: Model<IPost> = (mongoose.models.Post as Model<IPost>) || mongoose.model<IPost>("Post", PostSchema);

export default Post;
