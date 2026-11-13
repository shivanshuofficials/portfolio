"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, ShieldCheck, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

interface CommentItem {
  id: string;
  userName: string;
  userAvatar?: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface GoogleUser {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

function UserAvatar({
  src,
  name,
  size = "w-8 h-8",
  borderColor = "border-zinc-700",
}: {
  src?: string;
  name: string;
  size?: string;
  borderColor?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initial = (name || "U").trim().charAt(0).toUpperCase();

  if (!src || failed) {
    return (
      <div
        className={`${size} rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-md border ${borderColor}`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${size} rounded-full object-cover border ${borderColor} flex-shrink-0`}
    />
  );
}

export default function BlogComments({ slug, postTitle }: { slug: string; postTitle: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [hasGoogleCredentials, setHasGoogleCredentials] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const loadComments = () => {
    fetch(`/api/blog/${slug}/comments`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.comments)) {
          setComments(data.comments);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const checkUser = () => {
    fetch("/api/auth/user")
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user || null);
        setHasGoogleCredentials(Boolean(data.hasGoogleCredentials));
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadComments();
    checkUser();
  }, [slug]);

  async function handleSignOut() {
    await fetch("/api/auth/user", { method: "DELETE" });
    setUser(null);
  }

  // Developer / Fallback sign in when Google Cloud keys are still being added
  async function handleDemoSignIn() {
    const res = await fetch("/api/auth/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Verified Google Reviewer" }),
    });
    const data = await res.json();
    if (data.user) setUser(data.user);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setErr("Please sign in with Google to post your review.");
      return;
    }
    if (content.trim().length < 3) {
      setErr("Please write a review with at least 3 characters.");
      return;
    }

    setSubmitting(true);
    setErr("");
    setSuccess("");

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating }),
      });
      const data = await res.json();
      setSubmitting(false);

      if (!res.ok) {
        setErr(data.error || "Failed to submit comment");
        return;
      }

      setContent("");
      setSuccess("Your genuine review has been posted!");
      loadComments();
    } catch {
      setSubmitting(false);
      setErr("Network error while submitting review");
    }
  }

  const avgRating =
    comments.length > 0
      ? (comments.reduce((acc, c) => acc + (c.rating || 5), 0) / comments.length).toFixed(1)
      : "5.0";

  return (
    <section id="comments" className="pt-10 border-t border-[#e1cec0]/15 space-y-8 font-sans scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight text-white font-serif flex items-center gap-2.5">
            <MessageSquare size={22} className="text-rose-400" />
            Reader Reviews &amp; Comments
          </h3>
          <p className="text-xs sm:text-sm text-[#9e8e85]">
            Genuine, verified insights on &ldquo;{postTitle}&rdquo;
          </p>
        </div>

        {/* Aggregate Review Score */}
        {comments.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={16} className="fill-amber-400" />
              <span className="text-base font-bold text-white">{avgRating}</span>
              <span className="text-xs text-zinc-500">/ 5.0</span>
            </div>
            <span className="text-xs text-zinc-400 font-medium border-l border-zinc-800 pl-3">
              {comments.length} {comments.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {/* Review Input Box / Google Auth Gate */}
      <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md space-y-6">
        {!user ? (
          <div className="text-center py-8 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Genuine Reviews Protected by Google</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                To keep comments authentic and prevent spam, please authenticate with Google to leave your review.
              </p>
            </div>

            <div className="pt-2 flex flex-col items-center gap-2">
              <a
                href={`/api/auth/google?redirect=/blog/${slug}`}
                className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-xs shadow-lg transition transform hover:-translate-y-0.5"
              >
                {/* Official Google 'G' SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </a>

              {!hasGoogleCredentials && (
                <div className="pt-2 text-center space-y-1.5">
                  <span className="text-[11px] text-zinc-500 block">
                    (Google Cloud OAuth keys not yet added to .env)
                  </span>
                  <button
                    type="button"
                    onClick={handleDemoSignIn}
                    className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
                  >
                    Quick Test: Sign in as Verified Reviewer
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Authenticated user indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <UserAvatar
                  src={user.picture}
                  name={user.name}
                  size="w-9 h-9"
                  borderColor="border-emerald-500/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{user.name}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={10} /> Verified Google Reviewer
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">{user.email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition flex items-center gap-1.5"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>

            {/* Star Rating Picker */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-zinc-400">Your Rating:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-zinc-600 hover:scale-110 transition cursor-pointer"
                  >
                    <Star
                      size={20}
                      className={
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-700"
                      }
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs text-amber-300 font-semibold ml-1">
                {rating === 5 && "Outstanding"}
                {rating === 4 && "Great"}
                {rating === 3 && "Good"}
                {rating === 2 && "Fair"}
                {rating === 1 && "Poor"}
              </span>
            </div>

            {/* Comment Textarea */}
            <div>
              <textarea
                rows={3}
                placeholder="Share your genuine review, insights, or thoughts on this article..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950/70 border border-zinc-800 rounded-2xl text-zinc-200 text-sm placeholder-zinc-500 focus:outline-none focus:border-rose-500/60 transition"
              />
            </div>

            {err && (
              <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/30 border border-rose-900/50 p-2.5 rounded-xl">
                <AlertCircle size={14} />
                {err}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/30 border border-emerald-900/50 p-2.5 rounded-xl">
                <CheckCircle2 size={14} />
                {success}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-950/50 transition cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Posting Review..." : "Submit Genuine Review"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-10 text-center text-xs text-zinc-500">Loading reviews...</div>
        ) : comments.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs border border-dashed border-zinc-800/80 rounded-2xl">
            No reviews yet. Be the first to share your feedback!
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((cmt) => (
              <div
                key={cmt.id}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/70 space-y-3 hover:border-zinc-700/80 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={cmt.userAvatar}
                      name={cmt.userName}
                      size="w-8 h-8"
                      borderColor="border-zinc-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-zinc-200">{cmt.userName}</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">
                          <CheckCircle2 size={9} /> Verified
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(cmt.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={
                          (cmt.rating || 5) >= star
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-700"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-11">
                  {cmt.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
