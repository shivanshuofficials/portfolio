"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ToolIcons";
import { Project } from "@/data/portfolioData";
import styles from "@/app/portfolio.module.css";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ProjectModal({ project, onClose, onOpenContact }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={styles.modalWindow} 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: "800px" }}
      >
        <button 
          className={styles.modalCloseBtn} 
          onClick={onClose} 
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--text-accent-rose)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.15em" }}>
            {project.number}
          </span>
          <h2 style={{ fontSize: "1.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-primary)" }}>
            {project.title}
          </h2>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          {project.category} &bull; {project.client} ({project.year})
        </p>

        {/* Project Architecture & System Console Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          padding: "1.4rem",
          background: "linear-gradient(135deg, rgba(22, 9, 14, 0.95), rgba(12, 5, 8, 0.98))",
          borderRadius: "10px",
          border: "1px solid rgba(225, 206, 192, 0.18)",
          marginBottom: "1.8rem",
          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(225, 206, 192, 0.1)",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
        }}>
          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.8rem", borderBottom: "1px solid rgba(225, 206, 192, 0.08)", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }}></span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }}></span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.08em", marginLeft: "0.4rem" }}>
                arch-blueprint.spec.json
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.68rem", color: "#34d399", letterSpacing: "0.1em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399", display: "inline-block" }}></span>
              <span>DEPLOYED // HEALTH: 100%</span>
            </div>
          </div>

          {/* Grid of Key Architecture Attributes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.8rem", marginBottom: "1.2rem" }}>
            <div style={{ padding: "0.7rem 0.9rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px", border: "1px solid rgba(225, 206, 192, 0.06)" }}>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Target Architecture</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-primary)", fontWeight: 600, marginTop: "0.2rem" }}>{project.category}</div>
            </div>
            <div style={{ padding: "0.7rem 0.9rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px", border: "1px solid rgba(225, 206, 192, 0.06)" }}>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Core Pipeline</div>
              <div style={{ fontSize: "0.8rem", color: "#f87171", fontWeight: 600, marginTop: "0.2rem" }}>{project.tags.slice(0, 2).join(" + ")}</div>
            </div>
            <div style={{ padding: "0.7rem 0.9rem", background: "rgba(255, 255, 255, 0.03)", borderRadius: "6px", border: "1px solid rgba(225, 206, 192, 0.06)" }}>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Runtime Profile</div>
              <div style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 600, marginTop: "0.2rem" }}>Docker • Kubernetes • CI/CD</div>
            </div>
          </div>

          {/* Code Schema Block */}
          <div style={{ fontSize: "0.75rem", lineHeight: "1.7", color: "var(--text-secondary)", background: "rgba(0,0,0,0.3)", padding: "0.9rem 1.1rem", borderRadius: "6px", border: "1px solid rgba(225, 206, 192, 0.05)", overflowX: "auto" }}>
            <div><span style={{ color: "#f87171" }}>const</span> <span style={{ color: "#38bdf8" }}>deploymentSpec</span> = &#123;</div>
            <div style={{ paddingLeft: "1.2rem" }}><span style={{ color: "#a5b4fc" }}>clusterId</span>: <span style={{ color: "#fef08a" }}>&quot;prod-ap-south-{project.number.toLowerCase()}&quot;</span>,</div>
            <div style={{ paddingLeft: "1.2rem" }}><span style={{ color: "#a5b4fc" }}>microservices</span>: [<span style={{ color: "#fef08a" }}>&quot;auth-gateway&quot;</span>, <span style={{ color: "#fef08a" }}>&quot;event-bus&quot;</span>, <span style={{ color: "#fef08a" }}>&quot;core-worker&quot;</span>],</div>
            <div style={{ paddingLeft: "1.2rem" }}><span style={{ color: "#a5b4fc" }}>sloTarget</span>: <span style={{ color: "#34d399" }}>99.98</span>, <span style={{ color: "#64748b" }}>// high-availability target achieved</span></div>
            <div style={{ paddingLeft: "1.2rem" }}><span style={{ color: "#a5b4fc" }}>securityProfile</span>: <span style={{ color: "#fef08a" }}>&quot;mTLS + OAuth2 + ZeroTrust&quot;</span></div>
            <div>&#125;;</div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.projectTag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Overview & Story */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2rem" }}>
          <div>
            <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-accent-rose)", marginBottom: "0.4rem" }}>
              Project Overview
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.65" }}>
              {project.summary}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "0.5rem" }}>
            <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(225, 206, 192, 0.08)" }}>
              <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                The Challenge
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: "1.5" }}>
                {project.challenge}
              </p>
            </div>

            <div style={{ padding: "1.2rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(225, 206, 192, 0.08)" }}>
              <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                The Solution
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: "1.5" }}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div style={{ marginTop: "0.5rem" }}>
            <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "0.6rem" }}>
              Key Outcomes
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {project.results.map((res, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={14} color="#d8838e" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid rgba(225, 206, 192, 0.1)", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className={styles.pillButton}
              style={{ width: "auto" }}
            >
              <span>Get In Touch</span>
              <span className={styles.pillStar}>✦</span>
            </button>

            <a
              href="https://github.com/shivanshuofficials"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pillButton}
              style={{ width: "auto", background: "rgba(35, 15, 22, 0.6)" }}
            >
              <GithubIcon />
              <span>View On GitHub</span>
            </a>
          </div>

          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            <span>Back to Portfolio</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
