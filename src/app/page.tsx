"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, ArrowRight, Mail, MapPin, Code2, Terminal, Cpu, Database, Layers, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import styles from "./portfolio.module.css";

import { PROJECTS, PROCESS_STEPS, TESTIMONIALS, FAQ_ITEMS, Project } from "@/data/portfolioData";
import {
  JavaIcon,
  DotNetIcon,
  ReactIcon,
  ReactNativeIcon,
  DockerIcon,
  TypeScriptIcon,
  FigmaIcon,
  WebflowIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ToolIcons";
import ProjectModal from "@/components/ProjectModal";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"profile" | "shefware" | "architecture">("profile");
  const [currentTime, setCurrentTime] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-who");

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


  const consoleTabs = {
    profile: [
      { line: 1, content: <><span className={styles.codeKeyword}>const</span> <span className={styles.codeVariable}>engineer</span> = &#123;</> },
      { line: 2, content: <>  name: <span className={styles.codeString}>&quot;Shivanshu Chauhan&quot;</span>,</> },
      { line: 3, content: <>  title: <span className={styles.codeString}>&quot;Software Engineer &amp; Full Stack&quot;</span>,</> },
      { line: 4, content: <>  experience: <span className={styles.codeString}>&quot;Shefware (shefware.com)&quot;</span>,</> },
      { line: 5, content: <>  languages: [<span className={styles.codeString}>&quot;Java&quot;</span>, <span className={styles.codeString}>&quot;C# / .NET&quot;</span>, <span className={styles.codeString}>&quot;TypeScript&quot;</span>],</> },
      { line: 6, content: <>  frameworks: [<span className={styles.codeString}>&quot;Next.js&quot;</span>, <span className={styles.codeString}>&quot;React Native&quot;</span>, <span className={styles.codeString}>&quot;Spring Boot&quot;</span>],</> },
      { line: 7, content: <>  infrastructure: [<span className={styles.codeString}>&quot;Docker&quot;</span>, <span className={styles.codeString}>&quot;Kubernetes&quot;</span>, <span className={styles.codeString}>&quot;CI/CD&quot;</span>],</> },
      { line: 8, content: <>  availableForHire: <span className={styles.codeBool}>true</span>,</> },
      { line: 9, content: <>&#125;;</> },
    ],
    shefware: [
      { line: 1, content: <><span className={styles.codeComment}>// Shefware Enterprise Cloud Migration Engine</span></> },
      { line: 2, content: <><span className={styles.codeKeyword}>public async</span> Task&lt;MigrationResult&gt; <span className={styles.codeVariable}>MigrateMailboxAsync</span>() &#123;</> },
      { line: 3, content: <>  <span className={styles.codeKeyword}>var</span> pipeline = <span className={styles.codeKeyword}>new</span> CloudStreamPipeline();</> },
      { line: 4, content: <>  pipeline.EnforceZeroPacketLoss(<span className={styles.codeBool}>true</span>);</> },
      { line: 5, content: <>  <span className={styles.codeKeyword}>await</span> pipeline.ProcessItemsAsync(500_000);</> },
      { line: 6, content: <>  <span className={styles.codeKeyword}>return</span> MigrationResult.Success(uptime: <span className={styles.codeString}>&quot;99.98%&quot;</span>);</> },
      { line: 7, content: <>&#125;</> },
    ],
    architecture: [
      { line: 1, content: <><span className={styles.codeComment}>// Full-Stack Monorepo: Next.js + React Native</span></> },
      { line: 2, content: <><span className={styles.codeKeyword}>export function</span> <span className={styles.codeVariable}>useSharedCoreState</span>() &#123;</> },
      { line: 3, content: <>  <span className={styles.codeKeyword}>const</span> [sharedLogic] = useSyncExternalStore();</> },
      { line: 4, content: <>  <span className={styles.codeKeyword}>return</span> &#123;</> },
      { line: 5, content: <>    codeReuseRatio: <span className={styles.codeString}>&quot;85%&quot;</span>,</> },
      { line: 6, content: <>    latency: <span className={styles.codeString}>&quot;&lt;80ms global&quot;</span>,</> },
      { line: 7, content: <>    deployTarget: [<span className={styles.codeString}>&quot;Web&quot;</span>, <span className={styles.codeString}>&quot;iOS&quot;</span>, <span className={styles.codeString}>&quot;Android&quot;</span>]</> },
      { line: 8, content: <>  &#125;;</> },
      { line: 9, content: <>&#125;</> },
    ],
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Pure CSS Ambient Velvet Orbs */}
      <div className={styles.ambientOrbLeft} aria-hidden="true" />
      <div className={styles.ambientOrbRight} aria-hidden="true" />

      {/* =====================================================================
          TOP BAR / HEADER
          ===================================================================== */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span>SOFTWARE ENGINEER &bull; FULL STACK &amp; DEVOPS</span>
        </div>

        <div className={styles.topBarRight}>
          <div className={styles.navLinksGroup}>
            <a href="#projects" className={styles.navLink}>Projects</a>
            <Link href="/domains" className={styles.navLink} style={{ color: "var(--text-accent-rose)", fontWeight: 600 }}>
              Live Domains ✦
            </Link>
            <a href="#process" className={styles.navLink}>Process</a>
            <a href="#tools" className={styles.navLink}>Stack</a>
            <a href="#words" className={styles.navLink}>Endorsements</a>
            <a href="#faq" className={styles.navLink}>FAQ</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>

          <span className={styles.creativeSignatureTag}>Shivanshu Chauhan</span>
        </div>
      </header>


      {/* =====================================================================
          KINETIC MARQUEE / TICKER
          ===================================================================== */}
      <div className={styles.tickerTrack} aria-hidden="true">
        <div className={styles.tickerContent}>
          <div className={styles.tickerItem}>
            <span>JAVA &amp; SPRING BOOT</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>.NET CORE &amp; C#</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>DEVOPS &amp; DOCKER</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>REACT NATIVE &amp; NEXT.JS</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>SHEFWARE.COM CLOUD ARCHITECTURE</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>KUBERNETES &amp; CI/CD</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>HAUTE-COUTURE UI/UX</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
        </div>
        <div className={styles.tickerContent}>
          <div className={styles.tickerItem}>
            <span>JAVA &amp; SPRING BOOT</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>.NET CORE &amp; C#</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>DEVOPS &amp; DOCKER</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>REACT NATIVE &amp; NEXT.JS</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>SHEFWARE.COM CLOUD ARCHITECTURE</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>KUBERNETES &amp; CI/CD</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
          <div className={styles.tickerItem}>
            <span>HAUTE-COUTURE UI/UX</span>
            <span className={styles.tickerStar}>✦</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN LANDMARK
          ===================================================================== */}
      <main id="main-content">
        {/* =====================================================================
            HERO SECTION (Text & Code-Driven Developer Showcase)
            ===================================================================== */}
        <section className={styles.heroSection} id="hero">
        {/* Giant Editorial Title */}
        <div className={styles.heroTitleContainer}>
          <h1 className={styles.heroTitle}>PORTFOLIO</h1>
        </div>

        {/* 3-Column Content & Interactive Code Monolith */}
        <div className={styles.heroContentGrid}>
          {/* Left Hero Column */}
          <div className={styles.heroLeft}>
            <p className={styles.heroTagline}>
              I ARCHITECT SCALABLE SYSTEMS &amp; ELEVATED DIGITAL EXPERIENCES
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              className={styles.pillButton}
              id="hero-available-btn"
            >
              <span>AVAILABLE FOR ROLES &amp; PROJECTS</span>
              <span className={styles.pillStar}>✦</span>
            </button>

            <div className={styles.heroSignature}>
              Shivanshu Chauhan
            </div>
          </div>

          {/* Center: Pure Code & Architecture Developer Console */}
          <div className={styles.heroCenter}>
            <div className={styles.consoleCard}>
              <div className={styles.consoleHeader}>
                <div className={styles.consoleDots}>
                  <div className={styles.dotRed} />
                  <div className={styles.dotYellow} />
                  <div className={styles.dotGreen} />
                </div>

                <div className={styles.consoleTabs}>
                  <button
                    onClick={() => setActiveConsoleTab("profile")}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === "profile" ? styles.activeTab : ""}`}
                  >
                    profile.ts
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("shefware")}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === "shefware" ? styles.activeTab : ""}`}
                  >
                    shefware.cs
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("architecture")}
                    className={`${styles.consoleTabBtn} ${activeConsoleTab === "architecture" ? styles.activeTab : ""}`}
                  >
                    stack.tsx
                  </button>
                </div>
              </div>

              <div className={styles.consoleBody}>
                {consoleTabs[activeConsoleTab].map((item) => (
                  <div key={item.line} className={styles.codeLine}>
                    <span className={styles.lineNum}>{item.line}</span>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>

              <div className={styles.consoleFooter}>
                <div className={styles.statusIndicator}>
                  <div className={styles.liveDot} />
                  <span>SYSTEM OPERATIONAL &bull; 99.98% UPTIME</span>
                </div>
                <span>NODE V24 &bull; NEXT 16</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column */}
          <div className={styles.heroRight}>
            <p className={styles.heroBio}>
              Software Engineer specializing in Full Stack Web Dev, DevOps, Java, .NET, React Native, and UI/UX. Delivering robust enterprise solutions with Shefware.
            </p>

            <div className={styles.heroLocation}>
              <div className={styles.locationGlobe} title="Working Worldwide with Global Clients">
                <Globe size={18} className="animate-spin-slow" />
              </div>
              <div className={styles.locationText}>
                <span>NEW DELHI, INDIA</span>
                <span>WORKING WORLDWIDE</span>
              </div>
            </div>

            {/* Quick Developer Badges */}
            <div className={styles.devSocialRow}>
              <a
                href="https://github.com/shivanshuofficials"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.devBadgeLink}
              >
                <GithubIcon />
                <span>GITHUB</span>
              </a>
              <a
                href="https://www.linkedin.com/in/shivanshu-chauhan-202317336/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.devBadgeLink}
              >
                <LinkedinIcon />
                <span>LINKEDIN</span>
              </a>
              <a
                href="https://instagram.com/shivu.__01"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.devBadgeLink}
              >
                <InstagramIcon />
                <span>INSTAGRAM</span>
              </a>
              <a
                href="https://shefware.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.devBadgeLink}
              >
                <Globe size={13} />
                <span>SHEFWARE.COM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ENGINEERING METRICS STRIP
          ===================================================================== */}
      <section className={styles.metricsStrip} aria-label="Engineering Track Record">
        <div className={styles.metricBox}>
          <span className={styles.metricValue}>500K+</span>
          <span className={styles.metricLabel}>Cloud Items Migrated</span>
          <span className={styles.metricSubtext}>Enterprise Shefware.com suites</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricValue}>99.98%</span>
          <span className={styles.metricLabel}>Pipeline Uptime</span>
          <span className={styles.metricSubtext}>Fault-tolerant cloud architecture</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricValue}>85%</span>
          <span className={styles.metricLabel}>Code Reuse</span>
          <span className={styles.metricSubtext}>Next.js &amp; React Native sync</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricValue}>5+ Stacks</span>
          <span className={styles.metricLabel}>Enterprise Proficiency</span>
          <span className={styles.metricSubtext}>Java &bull; .NET &bull; DevOps &bull; React &bull; UI/UX</span>
        </div>
      </section>

      {/* =====================================================================
          SELECTED PROJECTS SECTION (Text & Code-Rendered Preview)
          ===================================================================== */}
      <section className={styles.projectsSection} id="projects">
        <div className={styles.sectionHeaderBar}>
          <h2 className={styles.sectionTitle}>
            <span>FEATURED ENGINEERING WORK</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </h2>

          <button
            onClick={() => setSelectedProject(PROJECTS[0])}
            className={styles.sectionLink}
            id="view-all-projects-btn"
          >
            <span>VIEW ALL PROJECTS</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map((project, idx) => (
            <article
              key={project.id}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
              }}
              aria-label={`View project details for ${project.title}`}
            >
              <div className={styles.projectCardHeader}>
                <div className={styles.projectNumberTitle}>
                  <span className={styles.projectNum}>{project.number}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <span className={styles.projectCategory}>{project.category}</span>
              </div>

              {/* Code-Rendered Project Architectural Preview Window */}
              <div className={styles.codeProjectPreview}>
                <div className={styles.previewHeader}>
                  <div className={styles.consoleDots}>
                    <div className={styles.dotRed} />
                    <div className={styles.dotYellow} />
                    <div className={styles.dotGreen} />
                  </div>
                  <span className={styles.previewFileTitle}>
                    {idx === 0 ? "shefware-migration-stream.cs" : idx === 1 ? "nexus-sync-engine.tsx" : "docker-compose.k8s.yml"}
                  </span>
                </div>

                <div className={styles.previewBody}>
                  {idx === 0 ? (
                    <div>
                      <div style={{ color: "#d8838e", fontWeight: 600 }}>// ENTERPRISE CLOUD ENGINE</div>
                      <div style={{ color: "#e5b382" }}>&gt; target: Microsoft 365 / Google Workspace</div>
                      <div style={{ color: "#5ec498" }}>&gt; packetLoss: 0.00% [TRANSACTIONAL]</div>
                      <div style={{ color: "#dfd2c8", marginTop: "0.4rem" }}>throughput: 48.6 MB/s &bull; threads: 32</div>
                    </div>
                  ) : idx === 1 ? (
                    <div>
                      <div style={{ color: "#d8838e", fontWeight: 600 }}>// FULL STACK &amp; MOBILE SYNC</div>
                      <div style={{ color: "#e5b382" }}>&gt; client: Next.js 16 + React Native</div>
                      <div style={{ color: "#5ec498" }}>&gt; latency: 74ms &bull; offlineCache: true</div>
                      <div style={{ color: "#dfd2c8", marginTop: "0.4rem" }}>sharedBusinessLogic: 85% &bull; REST/GraphQL</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ color: "#d8838e", fontWeight: 600 }}>// DEVOPS &amp; ORCHESTRATION</div>
                      <div style={{ color: "#e5b382" }}>&gt; container: Docker Engine &bull; Pods: 12</div>
                      <div style={{ color: "#5ec498" }}>&gt; staging: Automated CI/CD Blue/Green</div>
                      <div style={{ color: "#dfd2c8", marginTop: "0.4rem" }}>downtime: 0ms &bull; telemetry: Prometheus</div>
                    </div>
                  )}

                  <div className={styles.previewActionPrompt}>
                    <span>Click to inspect case study</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className={styles.projectTags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.projectTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Live Production Domains Banner */}
        <div className={styles.domainsShowcaseBanner}>
          <div className={styles.domainsBannerLeft}>
            <span className={styles.domainsBannerBadge}>LIVE ECOSYSTEM</span>
            <p className={styles.domainsBannerText}>
              Explore production platforms engineered &amp; powered by Shivanshu Chauhan: <strong>shefware.com</strong>, <strong>osttopst.us</strong>, &amp; <strong>skystates.us</strong>
            </p>
          </div>
          <Link href="/domains" className={styles.domainsBannerBtn}>
            <span>VIEW PRODUCTION DOMAINS</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          SPLIT SECTION: MY PROCESS & TOOLS I USE
          ===================================================================== */}

      <section className={styles.processToolsSection} id="process">
        {/* Left: My Process */}
        <div className={styles.processColumn}>
          <h2 className={styles.sectionTitle}>
            <span>ENGINEERING PROCESS</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </h2>

          <div className={styles.processContentGrid}>
            <div className={styles.processList}>
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className={styles.processItem}>
                  <div className={styles.processItemHeader}>
                    <span className={styles.processStepNum}>{step.number}</span>
                    <h3 className={styles.processStepTitle}>{step.title}</h3>
                  </div>
                  <p className={styles.processStepDesc}>{step.description}</p>
                </div>
              ))}
            </div>

            {/* Geometric Orbit Medallion (Pure CSS/SVG) */}
            <div className={styles.processMedallionWrapper}>
              <div className={styles.geometricOrbitFrame}>
                <div className={styles.geometricCore}>
                  <Cpu size={32} color="#d8838e" />
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-primary)" }}>
                    ARCHITECTURE
                  </span>
                </div>
              </div>
              <p className={styles.medallionQuote}>
                &ldquo;A rigorous process for resilient engineering.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right: Tools & Stack */}
        <div className={styles.toolsColumn} id="tools">
          <h2 className={styles.sectionTitle}>
            <span>CORE TECH STACK</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </h2>

          <div className={styles.toolsGrid}>
            <div className={styles.toolCard}>
              <div className={styles.toolIconBox}>
                <JavaIcon />
              </div>
              <span className={styles.toolName}>JAVA &amp; SPRING</span>
            </div>

            <div className={styles.toolCard}>
              <DotNetIcon />
              <span className={styles.toolName}>.NET &amp; C#</span>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIconBox}>
                <ReactIcon />
              </div>
              <span className={styles.toolName}>REACT &amp; NEXT.JS</span>
            </div>

            <div className={styles.toolCard}>
              <ReactNativeIcon />
              <span className={styles.toolName}>REACT NATIVE</span>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIconBox}>
                <DockerIcon />
              </div>
              <span className={styles.toolName}>DEVOPS &amp; DOCKER</span>
            </div>

            <div className={styles.toolCard}>
              <TypeScriptIcon />
              <span className={styles.toolName}>TYPESCRIPT</span>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIconBox}>
                <FigmaIcon />
              </div>
              <span className={styles.toolName}>UI/UX &amp; FIGMA</span>
            </div>

            <div className={styles.toolCard}>
              <div className={styles.toolIconBox}>
                <WebflowIcon />
              </div>
              <span className={styles.toolName}>WEB DEVELOPMENT</span>
            </div>
          </div>

          <div className={styles.toolsFooter}>
            &amp; MORE GREAT TOOLS &bull; AWS &bull; KUBERNETES &bull; POSTGRESQL &bull; CI/CD &bull; SHEFWARE.COM
          </div>
        </div>
      </section>

      {/* =====================================================================
          KIND WORDS / TESTIMONIALS SECTION
          ===================================================================== */}
      <section className={styles.testimonialsSection} id="words">
        <div className={styles.sectionHeaderBar}>
          <h2 className={styles.sectionTitle}>
            <span>ENDORSEMENTS &amp; KIND WORDS</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((item) => (
            <article key={item.id} className={styles.testimonialCard}>
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.quoteText}>{item.quote}</p>

              <div className={styles.testimonialAuthor}>
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3d121c 0%, #17070b 100%)",
                  border: "1px solid rgba(216, 131, 142, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--text-accent-rose)",
                  letterSpacing: "0.05em",
                  flexShrink: 0
                }}>
                  {item.name.slice(0, 2)}
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.name}</span>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================================
          FAQ SECTION (Answer Engine Optimization & Generative Discovery)
          ===================================================================== */}
      <section className={styles.faqSection} id="faq" aria-labelledby="faq-section-title">
        <div className={styles.sectionHeaderBar}>
          <div className={styles.sectionTitle} id="faq-section-title">
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
            <span>05 / FREQUENTLY ASKED QUESTIONS &bull; AEO ENGINE</span>
          </div>
          <span className={styles.sectionLink} style={{ cursor: "default" }}>
            INDEXED FOR AI &amp; SEARCH
          </span>
        </div>

        <div className={styles.faqGrid}>
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  className={styles.faqHeader}
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className={styles.faqHeaderLeft}>
                    <span className={styles.faqCategoryBadge}>{faq.category}</span>
                    <h3 className={styles.faqQuestion} itemProp="name">
                      {faq.question}
                    </h3>
                  </div>
                  <span className={styles.faqToggleIcon} aria-hidden="true">
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    className={styles.faqBody}
                    id={`faq-answer-${faq.id}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className={styles.faqShortAnswer}>
                      <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
                      <span>{faq.shortAnswer}</span>
                    </div>
                    <p className={styles.faqDetailedAnswer} itemProp="text">
                      {faq.detailedAnswer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      </main>

      {/* =====================================================================
          FOOTER / CONTACT SECTION (Typographic Executive Card)
          ===================================================================== */}

      <footer className={styles.footerContactSection} id="contact">
        {/* Left Column: Let's Create Something Amazing */}
        <div className={styles.footerColLeft}>
          <div className={styles.footerBigHeadline}>
            <div>LET&apos;S BUILD</div>
            <div>SOMETHING</div>
            <span className={styles.footerScriptWord}>Amazing</span>
          </div>
        </div>

        {/* Center Column: Status & Contact */}
        <div className={styles.footerColCenter}>
          <div className={styles.footerOpenTag}>
            <span className={styles.footerStatusTitle}>
              OPEN FOR SOFTWARE ENGINEERING OPPORTUNITIES
            </span>
            <p className={styles.footerStatusDesc}>
              Let&apos;s build impactful software systems, full-stack platforms, and performant cloud architectures together.
            </p>
          </div>

          <button
            onClick={() => setIsContactOpen(true)}
            className={styles.pillButton}
            id="footer-send-msg-btn"
          >
            <span>SEND ME A MESSAGE</span>
            <span className={styles.pillStar}>✦</span>
          </button>

          <div className={styles.contactLinksList}>
            <button
              onClick={handleCopyEmail}
              className={styles.contactLinkItem}
              title="Click to copy email address"
            >
              <Mail className={styles.contactIcon} />
              <span>{copiedEmail ? "COPIED TO CLIPBOARD!" : "SHIVANSHUCHAUHANOFFICIALS@GMAIL.COM"}</span>
            </button>


            <a
              href="https://shefware.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLinkItem}
            >
              <Globe className={styles.contactIcon} />
              <span>SHEFWARE.COM</span>
            </a>

            <a
              href="https://github.com/shivanshuofficials"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLinkItem}
            >
              <GithubIcon className={styles.contactIcon} />
              <span>GITHUB.COM/SHIVANSHUOFFICIALS</span>
            </a>

            <a
              href="https://www.linkedin.com/in/shivanshu-chauhan-202317336/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLinkItem}
            >
              <LinkedinIcon className={styles.contactIcon} />
              <span>LINKEDIN.COM/IN/SHIVANSHU-CHAUHAN-202317336</span>
            </a>

            <a
              href="https://instagram.com/shivu.__01"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLinkItem}
            >
              <InstagramIcon className={styles.contactIcon} />
              <span>INSTAGRAM.COM/SHIVU.__01</span>
            </a>

            <div className={styles.contactLinkItem}>
              <MapPin className={styles.contactIcon} />
              <span>NEW DELHI, INDIA &bull; REMOTE WORLDWIDE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Typographic Executive Card */}
        <div className={styles.footerColRight}>
          <div className={styles.execDevCard}>
            <div className={styles.execCardHeader}>
              <span className={styles.execMonogram}>SC</span>
              <span className={styles.execBadge}>VERIFIED</span>
            </div>

            <div className={styles.execCardBody}>
              <span className={styles.execName}>Shivanshu Chauhan</span>
              <span className={styles.execRole}>Software Engineer &bull; Shefware</span>
            </div>

            <div className={styles.execMeta}>
              <div className={styles.execMetaItem}>
                <div className={styles.liveDot} />
                <span>AVAILABLE FOR HIRE</span>
              </div>
              <div className={styles.execMetaItem}>
                <Globe size={11} color="#d8838e" />
                <span>{currentTime ? `${currentTime} IST` : "NEW DELHI, INDIA"}</span>
              </div>
              <div className={styles.execMetaItem}>
                <Code2 size={11} color="#d8838e" />
                <span>JAVA &bull; .NET &bull; DEVOPS &bull; REACT</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span>THANK YOU FOR VISITING</span>
        <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
        <span>&copy; 2026 SHIVANSHU CHAUHAN &bull; ALL RIGHTS RESERVED</span>
      </div>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
