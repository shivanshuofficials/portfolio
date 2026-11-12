"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostForm = dynamic(() => import("@/components/PostForm"), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center text-zinc-400">
      Loading editor...
    </div>
  ),
});

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-6">
      <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading...</div>}>
        <PostForm />
      </Suspense>
    </div>
  );
}
