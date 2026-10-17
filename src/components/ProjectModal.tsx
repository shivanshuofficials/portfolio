"use client";

import React, { useEffect } from "react";
import Image from "next/image";
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

        {/* Project Image Preview */}
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(225, 206, 192, 0.2)",
          marginBottom: "1.8rem"
        }}>
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            style={{ objectFit: "cover" }}
            priority 
          />
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
