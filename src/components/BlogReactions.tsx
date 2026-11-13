"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";

interface ReactionsData {
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
}

export default function BlogReactions({ slug }: { slug: string }) {
  const [data, setData] = useState<ReactionsData>({ likes: 0, dislikes: 0, userReaction: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}/reactions`)
      .then((r) => r.json())
      .then((res) => {
        setData({
          likes: Number(res.likes || 0),
          dislikes: Number(res.dislikes || 0),
          userReaction: res.userReaction || null,
        });
      })
      .catch(() => {});
  }, [slug]);

  async function handleVote(reaction: "like" | "dislike") {
    if (loading) return;
    setLoading(true);

    // Optimistic UI update
    setData((prev) => {
      let { likes, dislikes, userReaction } = prev;
      if (userReaction === reaction) {
        // Toggle off
        userReaction = null;
        if (reaction === "like") likes = Math.max(0, likes - 1);
        else dislikes = Math.max(0, dislikes - 1);
      } else {
        if (userReaction === "like") likes = Math.max(0, likes - 1);
        if (userReaction === "dislike") dislikes = Math.max(0, dislikes - 1);

        userReaction = reaction;
        if (reaction === "like") likes += 1;
        else dislikes += 1;
      }
      return { likes, dislikes, userReaction };
    });

    try {
      const res = await fetch(`/api/blog/${slug}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      });
      const updated = await res.json();
      if (res.ok) {
        setData({
          likes: updated.likes,
          dislikes: updated.dislikes,
          userReaction: updated.userReaction,
        });
      }
    } catch {
      // Revert if error
    } finally {
      setLoading(false);
    }
  }

  const total = data.likes + data.dislikes;
  const likeRatio = total > 0 ? Math.round((data.likes / total) * 100) : 100;

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
            <Sparkles size={14} className="text-rose-400" />
            Was this article helpful?
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            {total > 0
              ? `${likeRatio}% of readers found this insightful (${total} total votes)`
              : "Be the first to share your feedback"}
          </p>
        </div>

        {/* Reaction Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleVote("like")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              data.userReaction === "like"
                ? "bg-rose-500 text-white shadow-lg shadow-rose-950/50 scale-105 border border-rose-400/50"
                : "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60"
            }`}
          >
            <ThumbsUp size={14} className={data.userReaction === "like" ? "fill-white" : ""} />
            <span>Helpful</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                data.userReaction === "like" ? "bg-white/20 text-white" : "bg-zinc-700/60 text-zinc-300"
              }`}
            >
              {data.likes}
            </span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleVote("dislike")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
              data.userReaction === "dislike"
                ? "bg-zinc-700 text-white border border-zinc-500 scale-105"
                : "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60"
            }`}
          >
            <ThumbsDown size={14} className={data.userReaction === "dislike" ? "fill-white" : ""} />
            <span>Needs Work</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                data.userReaction === "dislike" ? "bg-white/20 text-white" : "bg-zinc-700/60 text-zinc-400"
              }`}
            >
              {data.dislikes}
            </span>
          </button>
        </div>
      </div>

      {total > 0 && (
        <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-rose-500 to-rose-400 h-full transition-all duration-500"
            style={{ width: `${likeRatio}%` }}
          />
          <div
            className="bg-zinc-600 h-full transition-all duration-500"
            style={{ width: `${100 - likeRatio}%` }}
          />
        </div>
      )}
    </div>
  );
}
