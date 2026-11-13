"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Mail, MapPin, Code2, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ToolIcons";

export default function MainFooter() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shivanshuchauhanofficials@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="border-t border-[#e1cec0]/15 bg-[#080305] text-[#9e8e85] pt-16 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact & Sign-off Branding */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400 font-semibold flex items-center gap-1.5">
                <Sparkles size={12} />
                07 // CONTACT &amp; SIGN-OFF
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                LET&apos;S TALK{" "}
                <span className="italic font-serif font-normal text-rose-300">Available</span>{" "}
                FOR HIRE
              </h2>
              <p className="text-xs sm:text-sm text-[#c9bab0] max-w-xl leading-relaxed">
                Architecting full-stack web platforms, zero-downtime cloud migrations, and high-performance native engines.
              </p>
            </div>

            {/* Send message pill CTA */}
            <div>
              <a
                href="mailto:shivanshuchauhanofficials@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-rose-950/50 hover:scale-[1.02] transition"
              >
                <span>SEND ME A MESSAGE</span>
                <span className="text-rose-200">✦</span>
              </a>
            </div>

            {/* Contact links list */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-xs text-[#c9bab0] hover:text-white transition group cursor-pointer"
                title="Click to copy email address"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover:border-rose-500/40 transition">
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Mail size={14} />}
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">
                  {copiedEmail ? "COPIED TO CLIPBOARD!" : "SHIVANSHUCHAUHANOFFICIALS@GMAIL.COM"}
                </span>
              </button>

              <a
                href="https://shefware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-[#c9bab0] hover:text-white transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover:border-rose-500/40 transition">
                  <Globe size={14} />
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">SHEFWARE.COM</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
              </a>

              <a
                href="https://github.com/shivanshuofficials"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-[#c9bab0] hover:text-white transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover:border-rose-500/40 transition">
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">GITHUB.COM/SHIVANSHUOFFICIALS</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
              </a>

              <a
                href="https://www.linkedin.com/in/shivanshu-chauhan-202317336/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-[#c9bab0] hover:text-white transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover:border-rose-500/40 transition">
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-300" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">LINKEDIN.COM/IN/SHIVANSHU-CHAUHAN-202317336</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
              </a>

              <a
                href="https://instagram.com/shivu.__01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs text-[#c9bab0] hover:text-white transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400 group-hover:border-rose-500/40 transition">
                  <InstagramIcon className="w-3.5 h-3.5 text-zinc-300" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">INSTAGRAM.COM/SHIVU.__01</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
              </a>

              <div className="flex items-center gap-3 text-xs text-[#9e8e85]">
                <div className="w-8 h-8 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-rose-400">
                  <MapPin size={14} />
                </div>
                <span className="font-mono text-[11px] sm:text-xs tracking-wider">NEW DELHI, INDIA • REMOTE WORLDWIDE</span>
              </div>
            </div>

            {/* Internal Quick Links Group */}
            <div className="pt-4 border-t border-[#e1cec0]/10 flex flex-wrap gap-4 text-xs font-mono tracking-wider">
              <Link href="/domains" className="text-rose-400 hover:text-rose-300 font-semibold uppercase">
                Live Domains ✦
              </Link>
              <Link href="/#projects" className="text-[#c9bab0] hover:text-white uppercase transition">
                Projects
              </Link>
              <Link href="/#process" className="text-[#c9bab0] hover:text-white uppercase transition">
                Process
              </Link>
              <Link href="/#tools" className="text-[#c9bab0] hover:text-white uppercase transition">
                Stack
              </Link>
              <Link href="/#faq" className="text-[#c9bab0] hover:text-white uppercase transition">
                FAQ
              </Link>
              <Link href="/blog" className="text-white font-semibold uppercase">
                Blog
              </Link>
            </div>
          </div>

          {/* Right Column: Typographic Executive Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-[#150a0f] to-[#0d0507] border border-[#e1cec0]/15 p-6 sm:p-7 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#e1cec0]/10">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-rose-950/50">
                  SC
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 uppercase">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold font-serif text-white tracking-tight">
                  Shivanshu Chauhan
                </h4>
                <p className="text-xs text-[#c9bab0]">
                  Software Engineer • Shefware
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-[#c9bab0] border-t border-[#e1cec0]/10">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase">AVAILABLE FOR HIRE</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-rose-400 flex-shrink-0" />
                  <span className="text-[11px] tracking-wider uppercase">
                    {currentTime ? `${currentTime} IST` : "NEW DELHI, INDIA (IST)"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Code2 size={13} className="text-rose-400 flex-shrink-0" />
                  <span className="text-[11px] tracking-wider uppercase">JAVA • .NET • DEVOPS • REACT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with SEO Interlinks */}
        <div className="pt-8 border-t border-[#e1cec0]/10 space-y-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-mono tracking-wider text-[#9e8e85]">
            <Link href="/" className="hover:text-white transition uppercase">TOP ↑</Link>
            <span>•</span>
            <Link href="/#projects" className="hover:text-white transition uppercase">FEATURED WORK</Link>
            <span>•</span>
            <Link href="/domains" className="text-rose-400 hover:text-rose-300 font-semibold uppercase">PRODUCTION DOMAINS</Link>
            <span>•</span>
            <Link href="/#process" className="hover:text-white transition uppercase">ENGINEERING PROCESS</Link>
            <span>•</span>
            <Link href="/#tools" className="hover:text-white transition uppercase">TECH STACK</Link>
            <span>•</span>
            <Link href="/#faq" className="hover:text-white transition uppercase">FAQS</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-white transition uppercase">BLOG</Link>
            <span>•</span>
            <a href="https://its.edu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition uppercase">
              I.T.S GHAZIABAD (BCA)
            </a>
          </div>

          <div className="text-[11px] font-mono text-[#7a6d66] tracking-widest uppercase">
            &copy; 2026 SHIVANSHU CHAUHAN • ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}
