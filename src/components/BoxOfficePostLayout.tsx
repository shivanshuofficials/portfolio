"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Star,
  Flame,
  Calendar,
  Clock,
  Globe2,
  CheckCircle2,
  Share2,
  ArrowUpRight,
  Info,
  Award,
  BarChart2,
  Layers,
  ChevronRight,
  ThumbsUp,
} from "lucide-react";
import { PostModel } from "@/models/Post";
import BlogReactions from "@/components/BlogReactions";
import BlogComments from "@/components/BlogComments";

interface BoxOfficeLayoutProps {
  post: PostModel;
}

export default function BoxOfficePostLayout({ post }: BoxOfficeLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [userVerdict, setUserVerdict] = useState<string | null>(null);
  const [verdictCounts, setVerdictCounts] = useState({
    blockbuster: 742,
    superhit: 218,
    hit: 64,
    average: 18,
  });

  const totalVerdictVotes =
    verdictCounts.blockbuster +
    verdictCounts.superhit +
    verdictCounts.hit +
    verdictCounts.average;

  const handleVerdictVote = (type: "blockbuster" | "superhit" | "hit" | "average") => {
    if (userVerdict) return;
    setUserVerdict(type);
    setVerdictCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  // Day-wise collection dataset from Sacnilk & Trade reports for Ramayana Part 1
  const dayWiseData = [
    {
      day: "Day 1",
      dow: "Thursday (Diwali)",
      hindi: 39.5,
      telugu: 17.2,
      tamil: 5.15,
      other: 3.0,
      indiaNet: 64.85,
      indiaGross: 77.8,
      overseas: 49.7,
      worldwide: 127.5,
      change: "Opening",
    },
    {
      day: "Day 2",
      dow: "Friday",
      hindi: 29.8,
      telugu: 12.4,
      tamil: 3.85,
      other: 2.0,
      indiaNet: 48.05,
      indiaGross: 57.65,
      overseas: 34.75,
      worldwide: 92.4,
      change: "-25.9%",
    },
    {
      day: "Day 3",
      dow: "Saturday",
      hindi: 43.1,
      telugu: 18.2,
      tamil: 5.5,
      other: 3.0,
      indiaNet: 69.8,
      indiaGross: 83.75,
      overseas: 54.45,
      worldwide: 138.2,
      change: "+45.3%",
    },
    {
      day: "Day 4",
      dow: "Sunday",
      hindi: 34.6,
      telugu: 14.8,
      tamil: 4.45,
      other: 2.3,
      indiaNet: 56.15,
      indiaGross: 67.4,
      overseas: 45.1,
      worldwide: 112.5,
      change: "-19.5%",
    },
    {
      day: "Day 5",
      dow: "Monday (Holiday Peak)",
      hindi: 66.8,
      telugu: 27.5,
      tamil: 8.2,
      other: 5.0,
      indiaNet: 107.5,
      indiaGross: 129.0,
      overseas: 56.0,
      worldwide: 185.0,
      change: "+91.4% 🔥",
      isPeak: true,
    },
    {
      day: "Day 6",
      dow: "Tuesday",
      hindi: 58.2,
      telugu: 24.1,
      tamil: 7.4,
      other: 4.4,
      indiaNet: 94.1,
      indiaGross: 112.9,
      overseas: 49.4,
      worldwide: 162.3,
      change: "-12.5%",
    },
    {
      day: "Day 7",
      dow: "Wednesday",
      hindi: 43.4,
      telugu: 18.5,
      tamil: 5.6,
      other: 3.15,
      indiaNet: 70.65,
      indiaGross: 84.8,
      overseas: 31.8,
      worldwide: 116.6,
      change: "-24.9%",
    },
  ];

  // Language Breakdown
  const languageData = [
    { lang: "Hindi", net: 315.4, gross: 378.5, share: "61.7%" },
    { lang: "Telugu", net: 118.2, gross: 141.8, share: "23.1%" },
    { lang: "Tamil", net: 46.5, gross: 55.8, share: "9.1%" },
    { lang: "Kannada", net: 18.2, gross: 21.8, share: "3.6%" },
    { lang: "Malayalam", net: 12.8, gross: 15.4, share: "2.5%" },
  ];

  // Related trending movie tracking cards (exact Sacnilk carousel items)
  const relatedMovies = [
    {
      title: "Kalki 2898 AD",
      year: "2024",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 1,042.80 Cr",
      verdict: "All-Time Blockbuster",
      rating: "9.4",
      lang: "Telugu / Hindi",
    },
    {
      title: "Stree 2",
      year: "2024",
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 857.00 Cr",
      verdict: "All-Time Blockbuster",
      rating: "9.2",
      lang: "Hindi",
    },
    {
      title: "Animal",
      year: "2023",
      poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 915.00 Cr",
      verdict: "All-Time Blockbuster",
      rating: "8.9",
      lang: "Hindi / Telugu",
    },
    {
      title: "Jawan",
      year: "2023",
      poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 1,160.00 Cr",
      verdict: "Historic Blockbuster",
      rating: "9.3",
      lang: "Hindi / Tamil",
    },
    {
      title: "Pushpa 2: The Rule",
      year: "2024",
      poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 1,280.00 Cr",
      verdict: "Historic Blockbuster",
      rating: "9.6",
      lang: "Telugu / Hindi",
    },
    {
      title: "Devara: Part 1",
      year: "2024",
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 510.50 Cr",
      verdict: "Super Hit",
      rating: "8.5",
      lang: "Telugu / Hindi",
    },
    {
      title: "Singham Again",
      year: "2024",
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 385.00 Cr",
      verdict: "Hit",
      rating: "7.8",
      lang: "Hindi",
    },
    {
      title: "Salaar: Part 1 - Ceasefire",
      year: "2023",
      poster: "https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=600&q=80",
      worldwide: "₹ 618.00 Cr",
      verdict: "Blockbuster",
      rating: "8.8",
      lang: "Telugu / Hindi",
    },
  ];

  return (
    <div className="space-y-8 text-[#e6edf8]">
      {/* 1. TOP LEADERBOARD BANNER AD (Yellow Sponsor Banner as in screenshot) */}
      <div className="rounded-xl bg-[#ffb703] border-2 border-[#e09f00] p-3 sm:p-4 text-black flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="px-2.5 py-1 rounded bg-black text-[#ffb703] font-black text-xs uppercase tracking-wider font-mono">
            LIVE TRADE DATA
          </span>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base leading-tight">
              Ramayana Part 1 Shatters Worldwide Box Office Records (Week 1 Estimates)
            </h4>
            <p className="text-[11px] font-semibold text-black/80">
              Verified Sacnilk Trade Protocol &bull; Multi-language Theatre Grosses
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-black text-[#ffb703] font-bold text-xs uppercase tracking-wide">
            Updated Hourly
          </span>
        </div>
      </div>

      {/* 2. BREADCRUMBS & LIVE STATUS CHIP */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8ba3c7] font-mono border-b border-[#1b3152] pb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-400 transition">Home</Link>
          <ChevronRight size={12} />
          <Link href="/blog" className="hover:text-amber-400 transition">Box Office Reports</Link>
          <ChevronRight size={12} />
          <span className="text-amber-400 font-semibold truncate max-w-[200px] sm:max-w-none">
            Ramayana: Part 1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold text-[10px] uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            LIVE ESTIMATES
          </span>
          <span className="text-[11px] text-[#718aa8]">
            Updated: Nov 12, 2026 09:30 IST
          </span>
        </div>
      </div>

      {/* 3. HERO MOVIE IDENTITY BLOCK (Split Layout with Poster & Details) */}
      <div className="rounded-2xl bg-[#0e1c31] border border-[#1b3558] p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Vertical Movie Poster with Glow & Ribbon */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0 aspect-[2/3] rounded-xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-[#060c17]">
            <img
              src={post.coverImage || "https://ik.imagekit.io/5zsbf18hx/blog/1794544811699-Ramayana-part-1__1__s7QSml5YO.webp"}
              alt="Ramayana Part 1 Movie Poster"
              className="w-full h-full object-cover"
            />
            {/* Poster Overlay Tag */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#ffb703] text-black font-black text-[11px] uppercase tracking-wider font-mono shadow-md">
              HISTORIC OPENING
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 text-center">
              <span className="text-[11px] font-bold text-amber-300 font-mono">
                DIWALI 2026 PAN-INDIA MEGASTAR
              </span>
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Flame size={14} className="fill-amber-400" />
                TRADE VERDICT: ALL-TIME BLOCKBUSTER
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
                {post.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#9cb5d9] italic">
                {post.excerpt}
              </p>
            </div>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0a1526] border border-[#193254] text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Director</span>
                <span className="font-bold text-white">Nitesh Tiwari</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Star Cast</span>
                <span className="font-bold text-white truncate block">Ranbir, Sai Pallavi, Yash</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Release Date</span>
                <span className="font-bold text-amber-300">05 Nov 2026</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Runtime</span>
                <span className="font-bold text-white">3h 15m (195 mins)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Certificate</span>
                <span className="font-bold text-emerald-400">U/A 13+</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6d88ae] block uppercase">Est. Budget</span>
                <span className="font-bold text-amber-400">₹ 2,000 Cr</span>
              </div>
            </div>

            {/* Key Record Callouts */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2.5">
              <Award size={18} className="text-amber-400 shrink-0" />
              <span>
                <strong>New Indian Record:</strong> Surpassed lifetime collection of <em>Animal</em> (₹915 Cr) and <em>Stree 2</em> (₹857 Cr) in just 7 days!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE 4 PRIMARY KPI SCORECARD CARDS (Directly matching Sacnilk Box Office Totals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border-2 border-amber-400/30 shadow-xl">
          <div className="text-[11px] text-[#86a1c7] uppercase font-bold flex items-center justify-between">
            <span>India Net Collection</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
            ₹ 511.10 <span className="text-sm font-bold text-white">Cr</span>
          </div>
          <p className="text-[10px] text-[#7896be] mt-1 font-sans">
            7 Days Total across all languages
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border border-[#1e395e] shadow-xl">
          <div className="text-[11px] text-[#86a1c7] uppercase font-bold">
            India Gross Collection
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            ₹ 611.05 <span className="text-sm font-bold text-amber-400">Cr</span>
          </div>
          <p className="text-[10px] text-[#7896be] mt-1 font-sans">
            Domestic inclusive of taxes
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#132742] to-[#0b172a] border border-[#1e395e] shadow-xl">
          <div className="text-[11px] text-[#86a1c7] uppercase font-bold flex items-center justify-between">
            <span>Overseas Gross</span>
            <Globe2 size={13} className="text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400 mt-1">
            ₹ 323.50 <span className="text-sm font-bold text-white">Cr</span>
          </div>
          <p className="text-[10px] text-[#7896be] mt-1 font-sans">
            ~$38.8 Million USD overseas
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#193254] to-[#0d1c31] border-2 border-emerald-400/40 shadow-xl">
          <div className="text-[11px] text-emerald-300 uppercase font-extrabold flex items-center justify-between">
            <span>Worldwide Gross</span>
            <Award size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
            ₹ 934.55 <span className="text-sm font-bold text-white">Cr</span>
          </div>
          <p className="text-[10px] text-emerald-200/80 mt-1 font-sans">
            All-Time Top 10 Indian Cinema
          </p>
        </div>
      </div>

      {/* 5. MID-PAGE SPONSOR BANNER (Yellow Ad Banner) */}
      <div className="rounded-xl bg-gradient-to-r from-[#ffb703] via-[#f59e0b] to-[#fbbf24] p-3 text-black flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold font-mono">
          <span className="px-2 py-0.5 bg-black text-[#ffb703] rounded text-[10px]">ADVERTISEMENT</span>
          <span>BOX OFFICE TRACKER PRO &bull; ADVANCE BOOKING DATA ENGINE 2026</span>
        </div>
        <span className="text-xs font-extrabold bg-black text-white px-3 py-1 rounded">
          TRADE SUITE
        </span>
      </div>

      {/* 6. DAY-WISE BOX OFFICE COLLECTION TABLE (Sacnilk Table Style) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <BarChart2 size={15} />
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold font-serif text-white">
              Ramayana: Part 1 Day Wise Box Office Collection (India &amp; Worldwide)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#8ca5c9]">
            Figures in Crore (₹ INR) &bull; Trade Estimates
          </span>
        </div>

        <div className="rounded-xl border border-[#1b3558] bg-[#0c182b] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#12233b] border-b border-[#213f68] text-[#90abd3] font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3.5 font-bold text-amber-400">Day</th>
                  <th className="py-3 px-3.5 font-bold text-white">Date / DOW</th>
                  <th className="py-3 px-3.5 font-bold text-zinc-300">Hindi Net</th>
                  <th className="py-3 px-3.5 font-bold text-zinc-300">Telugu Net</th>
                  <th className="py-3 px-3.5 font-bold text-zinc-300">Tamil/Other</th>
                  <th className="py-3 px-3.5 font-bold text-amber-300">India Net</th>
                  <th className="py-3 px-3.5 font-bold text-emerald-300">Worldwide</th>
                  <th className="py-3 px-3.5 font-bold text-right text-zinc-300">Day Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172e4d] font-mono">
                {dayWiseData.map((d) => (
                  <tr
                    key={d.day}
                    className={`hover:bg-[#152a47] transition ${
                      d.isPeak ? "bg-[#ffb703]/10 font-bold" : ""
                    }`}
                  >
                    <td className="py-3 px-3.5 font-bold text-amber-400 whitespace-nowrap">
                      {d.day}
                    </td>
                    <td className="py-3 px-3.5 text-white whitespace-nowrap font-sans font-medium">
                      {d.dow}
                    </td>
                    <td className="py-3 px-3.5 text-[#cad8eb]">₹ {d.hindi.toFixed(2)} Cr</td>
                    <td className="py-3 px-3.5 text-[#cad8eb]">₹ {d.telugu.toFixed(2)} Cr</td>
                    <td className="py-3 px-3.5 text-[#cad8eb]">₹ {(d.tamil + d.other).toFixed(2)} Cr</td>
                    <td className="py-3 px-3.5 font-black text-amber-400 text-sm">
                      ₹ {d.indiaNet.toFixed(2)} Cr
                    </td>
                    <td className="py-3 px-3.5 font-black text-emerald-400">
                      ₹ {d.worldwide.toFixed(2)} Cr
                    </td>
                    <td className="py-3 px-3.5 text-right font-sans font-semibold text-[11px]">
                      <span
                        className={
                          d.change.includes("+")
                            ? "text-emerald-400"
                            : d.change.includes("-")
                            ? "text-red-400"
                            : "text-[#88a5cb]"
                        }
                      >
                        {d.change}
                      </span>
                    </td>
                  </tr>
                ))}

                {/* WEEK 1 TOTAL SUMMARY ROW (Orange/Gold Highlight Row as in Sacnilk) */}
                <tr className="bg-[#ffb703] text-black font-black text-sm border-t-2 border-[#ff9e00]">
                  <td className="py-3.5 px-3.5">Week 1 Total</td>
                  <td className="py-3.5 px-3.5 font-sans font-bold">7 Days Total</td>
                  <td className="py-3.5 px-3.5">₹ 315.40 Cr</td>
                  <td className="py-3.5 px-3.5">₹ 118.20 Cr</td>
                  <td className="py-3.5 px-3.5">₹ 77.50 Cr</td>
                  <td className="py-3.5 px-3.5 text-base">₹ 511.10 Cr Net</td>
                  <td className="py-3.5 px-3.5 text-base">₹ 934.55 Cr WW</td>
                  <td className="py-3.5 px-3.5 text-right font-sans">Historic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7. VISUAL COLLECTION TRAJECTORY CHART (Blue Line Graph with Dots as in screenshot) */}
      <div className="rounded-2xl bg-[#0b172a] border border-[#1b3558] p-5 sm:p-7 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b3558]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp size={14} />
              VISUAL COLLECTION MOMENTUM
            </span>
            <h3 className="text-lg font-bold font-serif text-white">
              Day 1 to Day 7 India Net Collection Trend Curve
            </h3>
          </div>
          <span className="text-xs font-mono text-[#86a2c7]">
            Peak: Monday ₹107.50 Cr
          </span>
        </div>

        {/* Responsive Line Graph */}
        <div className="w-full h-48 sm:h-56 bg-[#060e1a] rounded-xl p-4 border border-[#182f4e] relative flex items-end">
          <svg
            viewBox="0 0 700 160"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="700" y2="20" stroke="#172b47" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="700" y2="60" stroke="#172b47" strokeDasharray="3 3" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="#172b47" strokeDasharray="3 3" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#1f3b61" strokeWidth="1" />

            {/* Connecting Line (Sky Blue) */}
            <polyline
              points="40,85 140,110 240,78 340,98 440,25 540,45 640,76"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Shaded Area Under Curve */}
            <polygon
              points="40,85 140,110 240,78 340,98 440,25 540,45 640,76 640,140 40,140"
              fill="url(#blueGlowGrad)"
              opacity="0.25"
            />

            {/* Interactive Data Nodes */}
            {[
              { x: 40, y: 85, day: "D1", val: "₹64.85" },
              { x: 140, y: 110, day: "D2", val: "₹48.05" },
              { x: 240, y: 78, day: "D3", val: "₹69.80" },
              { x: 340, y: 98, day: "D4", val: "₹56.15" },
              { x: 440, y: 25, day: "D5 🔥", val: "₹107.50", isPeak: true },
              { x: 540, y: 45, day: "D6", val: "₹94.10" },
              { x: 640, y: 76, day: "D7", val: "₹70.65" },
            ].map((p, idx) => (
              <g key={idx}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.isPeak ? 7 : 5}
                  fill={p.isPeak ? "#ffb703" : "#0284c7"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fill={p.isPeak ? "#ffb703" : "#e0f2fe"}
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {p.val} Cr
                </text>
                <text
                  x={p.x}
                  y="155"
                  textAnchor="middle"
                  fill="#7ea0cb"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {p.day}
                </text>
              </g>
            ))}

            <defs>
              <linearGradient id="blueGlowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 8. LANGUAGE SHARE & OCCUPANCY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Breakdown Table */}
        <div className="rounded-xl border border-[#1b3558] bg-[#0c182b] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1b3558]">
            <h4 className="font-bold text-white font-serif flex items-center gap-2">
              <Layers size={14} className="text-amber-400" />
              Language Wise Collection (Week 1)
            </h4>
            <span className="text-[11px] font-mono text-[#8ca5c9]">Net / Gross</span>
          </div>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-[#88a5cb] border-b border-[#1b3558] pb-2">
                <th className="text-left pb-2">Language</th>
                <th className="text-left pb-2">India Net</th>
                <th className="text-left pb-2">India Gross</th>
                <th className="text-right pb-2">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#172e4d]">
              {languageData.map((l) => (
                <tr key={l.lang} className="hover:bg-[#132640]">
                  <td className="py-2.5 font-bold text-white">{l.lang}</td>
                  <td className="py-2.5 text-amber-400 font-bold">₹ {l.net} Cr</td>
                  <td className="py-2.5 text-[#cad8eb]">₹ {l.gross} Cr</td>
                  <td className="py-2.5 text-right font-bold text-emerald-400">{l.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Theatre Occupancy Meter */}
        <div className="rounded-xl border border-[#1b3558] bg-[#0c182b] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#1b3558]">
            <h4 className="font-bold text-white font-serif flex items-center gap-2">
              <Clock size={14} className="text-emerald-400" />
              Day 7 Theater Occupancy Tracking
            </h4>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Avg: 69.1%
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-[#a0badf] mb-1">
                <span>Morning Shows</span>
                <span className="text-white font-bold">48.2%</span>
              </div>
              <div className="w-full bg-[#070e1a] rounded-full h-2.5 overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: "48.2%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0badf] mb-1">
                <span>Afternoon Shows</span>
                <span className="text-white font-bold">67.5%</span>
              </div>
              <div className="w-full bg-[#070e1a] rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: "67.5%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0badf] mb-1">
                <span>Evening Shows</span>
                <span className="text-white font-bold">86.4%</span>
              </div>
              <div className="w-full bg-[#070e1a] rounded-full h-2.5 overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: "86.4%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[#a0badf] mb-1">
                <span>Night Shows</span>
                <span className="text-white font-bold">94.2% (Near Housefull)</span>
              </div>
              <div className="w-full bg-[#070e1a] rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "94.2%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. EDITORIAL ANALYSIS & TRADE BREAKDOWN (Rendered Post Content) */}
      <div className="rounded-2xl bg-[#0e1c31] border border-[#1b3558] p-6 sm:p-8 space-y-6 shadow-2xl">
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-white border-b border-[#1b3558] pb-3">
          Detailed Trade Analysis &amp; Box Office Milestone Insights
        </h3>

        <div className="prose prose-invert max-w-none text-[#cad8eb] leading-relaxed space-y-4">
          <p>
            Nitesh Tiwari&apos;s magnum opus <strong>Ramayana: Part 1</strong> arrived on November 5, 2026,
            in the festive Diwali corridor. Over its seven-day run, the epic visual retelling has
            ignited theaters globally, amassing an estimated <strong>₹ 934.55 crore worldwide gross</strong>.
          </p>
          <div className="p-4 rounded-xl bg-[#091424] border-l-4 border-amber-400 text-amber-200">
            <strong>Key Milestone:</strong> Ramayana Part 1 has officially crossed the lifetime worldwide gross
            of Ranbir Kapoor&apos;s <em>Animal</em> (₹ 915 Cr) and Shraddha Kapoor&apos;s <em>Stree 2</em> (₹ 857 Cr),
            making it one of the quickest films in Indian cinema history to enter the ₹900 Crore club.
          </div>
          <p>
            The domestic performance witnessed a massive holiday surge on Monday (Day 5), crossing
            the historic <strong>₹ 100 crore net</strong> threshold in a single day across India.
            Overseas markets have brought in an estimated <strong>$38.8 Million USD (₹ 323.50 Cr)</strong>,
            shattering previous opening-week benchmarks in the United Kingdom, North America, and Australia.
          </p>
        </div>
      </div>

      {/* 10. ADVANCE BOOKING REPORT FOR DAY 8 */}
      <div className="rounded-xl bg-[#0d1a2d] border border-amber-400/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
            UPCOMING RUN FORECAST
          </span>
          <h4 className="text-base font-bold text-white font-serif">
            Day 8 Advance Booking Tracker: ₹ 26.66 Crore Gross
          </h4>
          <p className="text-xs text-[#8ea8cd]">
            Over 8.2 Lakh tickets already sold across Maharashtra, Delhi-NCR, Gujarat, Karnataka &amp; Kerala.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider font-mono shrink-0 shadow-md">
          STRONG HOLD EXPECTED
        </div>
      </div>

      {/* 11. AUDIENCE VERDICT POLL (Sacnilk Audience Voting Meter) */}
      <div className="rounded-2xl bg-[#0c182b] border border-[#1b3558] p-6 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b3558]">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Award size={15} className="text-amber-400" />
              Audience Trade Verdict &bull; Ramayana Part 1
            </h4>
            <p className="text-xs text-[#8ca5c9]">
              How would you classify the box office outcome of this release?
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {totalVerdictVotes} Verified Reader Votes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              key: "blockbuster",
              label: "All-Time Blockbuster",
              count: verdictCounts.blockbuster,
              color: "amber",
            },
            {
              key: "superhit",
              label: "Super Hit",
              count: verdictCounts.superhit,
              color: "emerald",
            },
            {
              key: "hit",
              label: "Hit",
              count: verdictCounts.hit,
              color: "sky",
            },
            {
              key: "average",
              label: "Average",
              count: verdictCounts.average,
              color: "zinc",
            },
          ].map((v) => {
            const pct = Math.round((v.count / totalVerdictVotes) * 100);
            const isSelected = userVerdict === v.key;
            return (
              <button
                key={v.key}
                type="button"
                onClick={() => handleVerdictVote(v.key as any)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-400 text-black border-amber-300 shadow-lg scale-105"
                    : "bg-[#07111e] hover:bg-[#11233d] border-[#1b3558] text-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold font-mono">
                  <span>{v.label}</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-1.5 mt-2.5 overflow-hidden">
                  <div
                    className={`h-full ${
                      isSelected ? "bg-black" : "bg-amber-400"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] opacity-75 mt-1 font-mono">
                  {v.count} votes
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 12. TRENDING & RELATED MOVIES SHELF (Rows of Movie Posters as in screenshot) */}
      <div className="space-y-4 pt-4 border-t border-[#1b3558]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Flame size={15} />
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold font-serif text-white">
              Top All-Time Indian Box Office Releases &amp; Tracking Reports
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8aa5cb] hidden sm:inline">
            Ranked by Worldwide Gross
          </span>
        </div>

        {/* 2-Row Vertical Poster Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedMovies.map((m, idx) => (
            <div
              key={m.title}
              className="group rounded-xl overflow-hidden bg-[#0c182b] border border-[#1b3558] hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-black">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-amber-400 text-[10px] font-mono font-bold border border-white/10">
                  ★ {m.rating}
                </div>
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-[#ffb703] text-black text-[11px] font-black text-center shadow-md font-mono">
                  {m.worldwide}
                </div>
              </div>

              <div className="p-3 space-y-1">
                <span className="text-[10px] font-mono text-[#8ba4c7] block">
                  {m.lang} &bull; {m.year}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                  {m.title}
                </h4>
                <span className="inline-block text-[10px] font-semibold text-emerald-400">
                  {m.verdict}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 13. REACTIONS & COMMENTS INTEGRATION */}
      <div className="space-y-6 pt-6 border-t border-[#1b3558]">
        <BlogReactions slug={post.slug} />
        <BlogComments slug={post.slug} postTitle={post.title} />
      </div>

      {/* 14. FOOTER DISCLAIMER */}
      <div className="p-4 rounded-xl bg-[#07111e] border border-[#162a45] text-[11px] text-[#718dae] leading-relaxed">
        <strong>Disclaimer:</strong> Box office collection figures and trade reports on this page are compiled
        from multiple theatrical trade sources including Sacnilk, producer updates, and regional distributor estimates.
        Data is indicative and subject to final auditor revisions.
      </div>
    </div>
  );
}
