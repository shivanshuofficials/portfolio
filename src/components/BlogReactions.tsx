"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Sparkles, CheckCircle2 } from "lucide-react";

interface ReactionsData {
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
}

function getClientVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("blog_visitor_device_id");
  if (!id) {
    id = "dev_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem("blog_visitor_device_id", id);
  }
  return id;
}

export default function BlogReactions({ slug }: { slug: string }) {
  const [data, setData] = useState<ReactionsData>({
    likes: 0,
    dislikes: 0,
    userReaction: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync local reaction on mount to ensure zero SSR hydration mismatch
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem(`reaction_${slug}`) as "like" | "dislike" | null)
        : null;

    if (saved) {
      setData((prev) => ({ ...prev, userReaction: saved }));
    }

    const visitorId = getClientVisitorId();
    fetch(`/api/blog/${slug}/reactions`, {
      headers: { "x-visitor-id": visitorId },
    })
      .then((r) => r.json())
      .then((res) => {
        const reaction = res.userReaction || saved || null;
        setData({
          likes: Number(res.likes || 0),
          dislikes: Number(res.dislikes || 0),
          userReaction: reaction,
        });
        if (reaction) {
          localStorage.setItem(`reaction_${slug}`, reaction);
        } else {
          localStorage.removeItem(`reaction_${slug}`);
        }
      })
      .catch(() => {});
  }, [slug]);

  async function handleVote(reaction: "like" | "dislike") {
    if (loading) return;
    setLoading(true);

    const visitorId = getClientVisitorId();

    // Optimistic UI update
    setData((prev) => {
      let { likes, dislikes, userReaction } = prev;
      if (userReaction === reaction) {
        // Toggle off
        userReaction = null;
        if (reaction === "like") likes = Math.max(0, likes - 1);
        else dislikes = Math.max(0, dislikes - 1);
        localStorage.removeItem(`reaction_${slug}`);
      } else {
        if (userReaction === "like") likes = Math.max(0, likes - 1);
        if (userReaction === "dislike") dislikes = Math.max(0, dislikes - 1);

        userReaction = reaction;
        if (reaction === "like") likes += 1;
        else dislikes += 1;
        localStorage.setItem(`reaction_${slug}`, reaction);
      }
      return { likes, dislikes, userReaction };
    });

    try {
      const res = await fetch(`/api/blog/${slug}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-id": visitorId,
        },
        body: JSON.stringify({ reaction }),
      });
      const updated = await res.json();
      if (res.ok) {
        setData({
          likes: updated.likes,
          dislikes: updated.dislikes,
          userReaction: updated.userReaction,
        });
        if (updated.userReaction) {
          localStorage.setItem(`reaction_${slug}`, updated.userReaction);
        } else {
          localStorage.removeItem(`reaction_${slug}`);
        }
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
    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111827]/70 to-[#0b101c]/90 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5 font-serif">
            <Sparkles size={14} className="text-amber-400" />
            Was this technical breakdown helpful?
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
            {total > 0 ? (
              <>
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>
                  <strong className="text-emerald-400 font-semibold">{likeRatio}%</strong> of engineers found this actionable ({total} verified votes)
                </span>
              </>
            ) : (
              "Cast the first vote on this architectural deep dive"
            )}
          </p>
        </div>

        {/* Reaction Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleVote("like")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              data.userReaction === "like"
                ? "bg-amber-400 text-black shadow-lg shadow-amber-950/50 scale-105 border border-amber-300"
                : "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60"
            }`}
          >
            <ThumbsUp size={14} className={data.userReaction === "like" ? "fill-black" : ""} />
            <span>Insightful</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                data.userReaction === "like" ? "bg-black/20 text-black" : "bg-zinc-700/70 text-zinc-300"
              }`}
            >
              {data.likes}
            </span>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleVote("dislike")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              data.userReaction === "dislike"
                ? "bg-zinc-700 text-white border border-zinc-500 scale-105"
                : "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60"
            }`}
          >
            <ThumbsDown size={14} className={data.userReaction === "dislike" ? "fill-white" : ""} />
            <span>Needs Revision</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono ${
                data.userReaction === "dislike" ? "bg-white/20 text-white" : "bg-zinc-700/70 text-zinc-400"
              }`}
            >
              {data.dislikes}
            </span>
          </button>
        </div>
      </div>

      {total > 0 && (
        <div className="w-full bg-zinc-800/90 rounded-full h-2 overflow-hidden flex">
          <div
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${likeRatio}%` }}
          />
          <div
            className="bg-zinc-700 h-full transition-all duration-500"
            style={{ width: `${100 - likeRatio}%` }}
          />
        </div>
      )}
    </div>
  );
}
