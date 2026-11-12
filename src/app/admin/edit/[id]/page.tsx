"use client";

import dynamic from "next/dynamic";
import { Suspense, use } from "react";

const PostForm = dynamic(() => import("@/components/PostForm"), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center text-zinc-400">
      Loading editor...
    </div>
  ),
});

function EditPostContent({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = use(paramsPromise);
  return <PostForm id={id} />;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-6">
      <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading editor...</div>}>
        <EditPostContent paramsPromise={params} />
      </Suspense>
    </div>
  );
}
