"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Globe, ArrowRight, Mail, MapPin, Code2 } from "lucide-react";
import styles from "./portfolio.module.css";
import { PROJECTS, PROCESS_STEPS, TESTIMONIALS, Project } from "@/data/portfolioData";
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
} from "@/components/ToolIcons";

import ProjectModal from "@/components/ProjectModal";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("shivanshu@shefware.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Subtle Ambient Floral Overlays */}
      <div className={styles.ambientFloralLeft} aria-hidden="true" />
      <div className={styles.ambientFloralRight} aria-hidden="true" />
      <div className={styles.ambientFloralBottom} aria-hidden="true" />

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
            <a href="#process" className={styles.navLink}>Process</a>
            <a href="#tools" className={styles.navLink}>Stack</a>
            <a href="#words" className={styles.navLink}>Testimonials</a>
          </div>
          <span className={styles.creativeTag}>CREATIVE PORTFOLIO</span>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className={styles.heroSection} id="hero">
        {/* Giant Editorial Title */}
        <div className={styles.heroTitleContainer}>
          <h1 className={styles.heroTitle}>PORTFOLIO</h1>
        </div>

        {/* 3-Column Content & Portrait */}
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

          {/* Center Portrait */}
          <div className={styles.heroCenter}>
            <div className={styles.heroImageFrame}>
              <Image
                src="/images/coder-hero.jpg"
                alt="Shivanshu Chauhan - Software Engineer"
                width={800}
                height={1067}
                priority
                className={styles.heroImage}
              />
              <div className={styles.heroImageOverlay} />
            </div>
          </div>


          {/* Right Hero Column */}
          <div className={styles.heroRight}>
            <p className={styles.heroBio}>
              Software Engineer specializing in Full Stack Web Dev, DevOps, Java, .NET, React Native, and UI/UX. Delivering robust enterprise solutions with Shefware.
            </p>

            <div className={styles.heroLocation}>
              <div className={styles.locationText}>
                <span>BASED IN INDIA</span>
                <span>WORKING WORLDWIDE</span>
              </div>
              <div className={styles.locationGlobe} title="Working Worldwide with Global Clients">
                <Globe size={18} className="animate-spin-slow" />
              </div>
            </div>

            {/* Quick Developer Links */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://github.com/shivanshuofficials"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.68rem", color: "var(--text-secondary)", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                <Code2 size={13} color="#d8838e" />
                <span>GITHUB</span>
              </a>

              <a
                href="https://shefware.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.68rem", color: "var(--text-secondary)", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                <Globe size={13} color="#d8838e" />
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
          SELECTED PROJECTS SECTION
          ===================================================================== */}
      <section className={styles.projectsSection} id="projects">
        <div className={styles.sectionHeaderBar}>
          <div className={styles.sectionTitle}>
            <span>FEATURED ENGINEERING WORK</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </div>

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

          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
              role="button"
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

              {/* Browser mockup with window dots */}
              <div className={styles.browserMockup}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDot} />
                  <div className={styles.browserDot} />
                  <div className={styles.browserDot} />
                </div>
                <div className={styles.browserImageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.browserImg}
                  />
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
      </section>

      {/* =====================================================================
          SPLIT SECTION: MY PROCESS & TOOLS I USE
          ===================================================================== */}
      <section className={styles.processToolsSection} id="process">
        {/* Left: My Process */}
        <div className={styles.processColumn}>
          <div className={styles.sectionTitle}>
            <span>ENGINEERING PROCESS</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </div>

          <div className={styles.processContentGrid}>
            <div className={styles.processList}>
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className={styles.processItem}>
                  <div className={styles.processItemHeader}>
                    <span className={styles.processStepNum}>{step.number}</span>
                    <h4 className={styles.processStepTitle}>{step.title}</h4>
                  </div>
                  <p className={styles.processStepDesc}>{step.description}</p>
                </div>
              ))}
            </div>

            {/* Medallion */}
            <div className={styles.processMedallionWrapper}>
              <div className={styles.medallionArch}>
                <div className={styles.medallionInner}>
                  <Image
                    src="/images/floral-accent.jpg"
                    alt="Process Floral Detail"
                    fill
                    sizes="155px"
                    className={styles.medallionImg}
                  />
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
          <div className={styles.sectionTitle}>
            <span>CORE TECH STACK</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </div>

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
          <div className={styles.sectionTitle}>
            <span>ENDORSEMENTS &amp; KIND WORDS</span>
            <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
          </div>
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
          FOOTER / CONTACT SECTION
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
              <span>{copiedEmail ? "COPIED TO CLIPBOARD!" : "SHIVANSHU@SHEFWARE.COM"}</span>
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
              href="https://linkedin.com/in/shivanshu-chauhan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLinkItem}
            >
              <LinkedinIcon className={styles.contactIcon} />
              <span>LINKEDIN.COM/IN/SHIVANSHU-CHAUHAN</span>
            </a>

            <div className={styles.contactLinkItem}>
              <MapPin className={styles.contactIcon} />
              <span>NEW DELHI, INDIA &bull; REMOTE WORLDWIDE</span>
            </div>
          </div>
        </div>


        {/* Right Column: Monochrome Portrait */}
        <div className={styles.footerColRight}>
          <div className={styles.footerPortraitFrame}>
            <Image
              src="/images/coder-footer.jpg"
              alt="Shivanshu Chauhan Editorial Coder Portrait"
              width={560}
              height={747}
              className={styles.footerPortraitImg}
            />

          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <span>THANK YOU FOR VISITING</span>
        <span style={{ color: "var(--text-accent-rose)" }}>✦</span>
        <span>&copy; 2025 SHIVANSHU CHAUHAN &bull; ALL RIGHTS RESERVED</span>
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
