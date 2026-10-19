import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, Database, CheckCircle, Globe, Terminal } from "lucide-react";
import styles from "./domains.module.css";
import { DOMAIN_SHOWCASE } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Production Web Domains & Platform Ecosystem — Shivanshu Chauhan",
  description:
    "Explore the production websites, platforms, and cloud systems engineered and maintained by Shivanshu Chauhan: Shefware.com, OSTtoPST.us, and SkyStates.us.",
  alternates: {
    canonical: "https://shivanshuchauhan.com/domains",
  },
  openGraph: {
    title: "Production Domains & Platforms | Shivanshu Chauhan",
    description:
      "Showcase of production websites and systems: Shefware.com, OSTtoPST.us, and SkyStates.us. Cloud migration, data conversion, and EdTech AI infrastructure.",
    url: "https://shivanshuchauhan.com/domains",
    siteName: "Shivanshu Chauhan Portfolio",
    images: [
      {
        url: "/images/showcase-shefware.jpg",
        width: 1200,
        height: 675,
        alt: "Production Web Domains by Shivanshu Chauhan",
      },
    ],
  },
};

export default function DomainsPage() {
  const domainSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://shivanshuchauhan.com/domains#webpage",
        url: "https://shivanshuchauhan.com/domains",
        name: "Production Web Domains & Platforms Engineered by Shivanshu Chauhan",
        description:
          "Showcase and technical architectural breakdown of production websites: Shefware.com, OSTtoPST.us, and SkyStates.us.",
        isPartOf: {
          "@id": "https://shivanshuchauhan.com/#website",
        },
        about: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
      },
      ...DOMAIN_SHOWCASE.map((domain, index) => ({
        "@type": "WebSite",
        position: index + 1,
        name: domain.name,
        url: domain.url,
        description: domain.description,
        creator: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
      })),
    ],
  };

  return (
    <div className={styles.domainsPageWrapper}>
      {/* Background Ambience */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(domainSchemas) }}
      />

      {/* Top Header */}
      <header className={styles.headerBar}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={14} />
            <span>BACK TO MAIN PORTFOLIO</span>
          </Link>
          <div className={styles.navBreadcrumbGroup}>
            <Link href="/#projects" className={styles.breadcrumbLink}>Projects</Link>
            <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>/</span>
            <Link href="/#process" className={styles.breadcrumbLink}>Process</Link>
            <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>/</span>
            <Link href="/#tools" className={styles.breadcrumbLink}>Stack</Link>
            <span style={{ color: "var(--text-muted)", fontSize: "0.65rem" }}>/</span>
            <Link href="/#faq" className={styles.breadcrumbLink}>FAQ</Link>
          </div>
        </div>
        <span className={styles.systemTag}>PRODUCTION DOMAIN SHOWCASE</span>
      </header>


      {/* Hero Headline */}
      <section className={styles.heroBanner}>
        <div className={styles.heroSubtitle}>
          <span className={styles.bulletStar}>✦</span>
          <span>LIVE PRODUCTION ECOSYSTEM &bull; DOMAIN HIGHLIGHTS</span>
        </div>
        <h1 className={styles.heroTitle}>
          DOMAINS &amp; SYSTEMS <span className={styles.scriptAccent}>Engineered</span>
        </h1>
        <p className={styles.heroDesc}>
          An in-depth showcase of production web applications, enterprise data pipelines, and scalable EdTech platforms that I actively engineer, optimize, and maintain across the web.
        </p>

        {/* Global Stats Strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>03</span>
            <span className={styles.statLabel}>Active Production Domains</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>10M+</span>
            <span className={styles.statLabel}>Enterprise Items Processed</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>99.98%</span>
            <span className={styles.statLabel}>Architecture Reliability</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNumber}>&lt;100ms</span>
            <span className={styles.statLabel}>Global Edge Response Times</span>
          </div>
        </div>
      </section>

      {/* Domains Showcase List */}
      <main className={styles.domainsList}>
        {DOMAIN_SHOWCASE.map((domain, index) => (
          <article
            key={domain.id}
            id={domain.id}
            className={styles.domainCard}
            itemScope
            itemType="https://schema.org/WebSite"
          >
            {/* Left Column: Visual Mockup */}
            <div className={styles.visualColumn}>
              <div className={styles.imageFrame}>
                <Image
                  src={domain.image}
                  alt={`${domain.name} — ${domain.tagline}`}
                  width={1200}
                  height={675}
                  className={styles.showcaseImage}
                  priority={index === 0}
                />
                <div className={styles.imageOverlayBadge}>
                  <div className={styles.livePulseDot} />
                  <span>LIVE ON WEB</span>
                </div>
              </div>

              {/* Metrics Pill Grid */}
              <div className={styles.metricsPillGrid}>
                {domain.metrics.map((m) => (
                  <div key={m.label} className={styles.metricPill}>
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Architectural Breakdown */}
            <div className={styles.detailsColumn}>
              <div className={styles.domainTopMeta}>
                <span className={styles.domainIndex}>0{index + 1} / DOMAIN</span>
                <span className={styles.categoryBadge}>{domain.category}</span>
              </div>

              <div className={styles.titleGroup}>
                <h2 className={styles.domainName} itemProp="name">
                  {domain.name}
                </h2>
                <a
                  href={domain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveSiteLink}
                  itemProp="url"
                  title={`Visit live website ${domain.url}`}
                >
                  <span>{domain.displayUrl}</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              <p className={styles.tagline}>{domain.tagline}</p>

              <p className={styles.description} itemProp="description">
                {domain.description}
              </p>

              {/* Role & Involvement */}
              <div className={styles.roleBlock}>
                <span className={styles.blockHeading}>
                  <Terminal size={12} color="#d8838e" />
                  <span>MY ENGINEERING ROLE</span>
                </span>
                <p className={styles.roleText}>{domain.role}</p>
              </div>

              {/* Engineering Highlights */}
              <div className={styles.highlightsBlock}>
                <span className={styles.blockHeading}>
                  <ShieldCheck size={12} color="#d8838e" />
                  <span>KEY ARCHITECTURAL HIGHLIGHTS</span>
                </span>
                <ul className={styles.highlightsList}>
                  {domain.engineeringHighlights.map((highlight, hIdx) => (
                    <li key={hIdx} className={styles.highlightItem}>
                      <span className={styles.checkIcon}>✦</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className={styles.stackBlock}>
                <span className={styles.blockHeading}>
                  <Cpu size={12} color="#d8838e" />
                  <span>TECHNOLOGY STACK</span>
                </span>
                <div className={styles.stackTags}>
                  {domain.stack.map((tech) => (
                    <span key={tech} className={styles.stackTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className={styles.actionRow}>
                <a
                  href={domain.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.visitSiteBtn}
                >
                  <span>EXPLORE {domain.displayUrl.toUpperCase()}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Cross Link Callout */}
      <section className={styles.calloutSection}>
        <div className={styles.calloutContent}>
          <span className={styles.calloutSub}>LOOKING TO ARCHITECT OR SCALE A PLATFORM?</span>
          <h3 className={styles.calloutTitle}>
            LET&apos;S ENGINEER YOUR NEXT <span className={styles.scriptAccent}>Breakthrough</span>
          </h3>
          <p className={styles.calloutText}>
            Whether you need enterprise data migration engines, high-speed file conversion pipelines, or modern full-stack web platforms, I build solutions with speed, aesthetic elegance, and zero downtime.
          </p>
          <div className={styles.calloutButtons}>
            <a href="mailto:shivanshuchauhanofficials@gmail.com" className={styles.primaryPillBtn}>
              <span>GET IN TOUCH &bull; SHIVANSHUCHAUHANOFFICIALS@GMAIL.COM</span>
              <span className={styles.pillStar}>✦</span>
            </a>
            <Link href="/#projects" className={styles.secondaryPillBtn}>
              <span>EXPLORE CASE STUDIES</span>
            </Link>
            <Link href="/#faq" className={styles.secondaryPillBtn}>
              <span>VIEW AEO FAQ</span>
            </Link>
            <Link href="/" className={styles.secondaryPillBtn}>
              <span>RETURN TO HOME</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.pageFooter}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>HOME</Link>
          <span style={{ color: "var(--text-muted)" }}>&bull;</span>
          <Link href="/#projects" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>PROJECTS</Link>
          <span style={{ color: "var(--text-muted)" }}>&bull;</span>
          <Link href="/#process" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>PROCESS</Link>
          <span style={{ color: "var(--text-muted)" }}>&bull;</span>
          <Link href="/#tools" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>TECH STACK</Link>
          <span style={{ color: "var(--text-muted)" }}>&bull;</span>
          <Link href="/#faq" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>FAQ</Link>
          <span style={{ color: "var(--text-muted)" }}>&bull;</span>
          <Link href="/#contact" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>CONTACT</Link>
        </div>
        <span>&copy; 2026 SHIVANSHU CHAUHAN &bull; SHEFWARE, OSTTOPST &amp; SKYSTATES ECOSYSTEM</span>
      </footer>
    </div>
  );
}

