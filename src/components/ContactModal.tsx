"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ToolIcons";
import styles from "@/app/portfolio.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "UI/UX Design",
    budget: "$5,000 - $10,000",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Form submission failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      service: "Full Stack & Next.js Systems",
      budget: "Full-time Engineering Role",
      message: "",
    });
    onClose();
  };


  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "600px" }}>
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close message form">
          <X size={16} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(124, 22, 38, 0.3)",
              border: "1px solid var(--text-accent-rose)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <CheckCircle size={28} color="#d8838e" />
            </div>

            <h3 style={{ fontSize: "1.3rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem", color: "var(--text-primary)" }}>
              Message Dispatched
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.6", maxWidth: "420px", margin: "0 auto 2rem" }}>
              Thank you for reaching out, {formData.name || "friend"}. Shivanshu Chauhan will review your inquiry and reply via email within 24 hours.
            </p>

            <button onClick={handleReset} className={styles.formSubmitBtn}>
              Close &amp; Return to Portfolio
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "1.8rem" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-accent-rose)" }}>
                Start A Conversation
              </span>
              <h2 style={{ fontSize: "1.35rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-primary)", marginTop: "0.3rem" }}>
                Let&apos;s Create Together
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", marginTop: "0.4rem" }}>
                Send a message directly to Shivanshu Chauhan &bull; Available worldwide for engineering roles &amp; consultations.
              </p>
            </div>

            {errorMessage && (
              <div
                style={{
                  background: "rgba(142, 28, 48, 0.3)",
                  border: "1px solid var(--text-accent-rose)",
                  padding: "0.75rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.78rem",
                  color: "#ede0d4",
                  marginBottom: "1.2rem",
                }}
              >
                {errorMessage}
              </div>
            )}


            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Project Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={styles.formSelect}
                  >
                    <option value="Full Stack & Next.js">Full Stack Web &amp; Next.js Systems</option>
                    <option value="Enterprise Java / .NET">Enterprise Java &amp; .NET Services</option>
                    <option value="DevOps & Cloud">DevOps, Docker &amp; Cloud Infra</option>
                    <option value="React Native Mobile">React Native Mobile App</option>
                    <option value="UI/UX Engineering">UI/UX &amp; Design Systems</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Estimated Budget / Scope</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={styles.formSelect}
                  >
                    <option value="Full-time Role">Full-time Engineering Role</option>
                    <option value="Contract / Consultation">Contract / Engineering Consultation</option>
                    <option value="$3,000 - $5,000">$3,000 &ndash; $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 &ndash; $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Project / Role Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the engineering requirements, team, tech stack, or system goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.formTextarea}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.formSubmitBtn}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message ✦</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: "1.5rem", paddingTop: "1.2rem", borderTop: "1px solid rgba(225, 206, 192, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Direct Contact
              </span>
              <div style={{ display: "flex", gap: "1.2rem", fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Mail size={12} color="#d8838e" />
                  shivanshuchauhanofficials@gmail.com

                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <MapPin size={12} color="#d8838e" />
                  New Delhi &bull; Remote
                </span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
