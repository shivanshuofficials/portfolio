export interface PostModel {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags: string[];
  category: string;
  readTime: string;
  authorName: string;
  authorAvatar: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}
