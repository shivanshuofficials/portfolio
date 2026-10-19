import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shivanshuchauhan.com"),
  title: {
    default: "Shivanshu Chauhan — Software Engineer & Full Stack Developer",
    template: "%s | Shivanshu Chauhan",
  },
  description:
    "Official portfolio of Shivanshu Chauhan, Software Engineer specializing in Full Stack Web Development, DevOps, Java, .NET, React Native, and UI/UX. Engineering enterprise cloud solutions with Shefware.",
  keywords: [
    "Shivanshu Chauhan",
    "Shivanshu Chauhan Software Engineer",
    "Shivanshu Chauhan Portfolio",
    "Shivanshu Chauhan Shefware",
    "Software Engineer",
    "Full Stack Developer",
    "Shefware",
    "shefware.com",
    "Java Developer",
    "Spring Boot",
    ".NET Developer",
    "C# Engineer",
    "DevOps Engineer",
    "Docker",
    "Kubernetes",
    "React Native Mobile Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "Cloud Migration Architecture",
    "TypeScript",
    "Enterprise Software Solutions"
  ],
  authors: [{ name: "Shivanshu Chauhan", url: "https://shivanshuchauhan.com" }],
  creator: "Shivanshu Chauhan",
  publisher: "Shivanshu Chauhan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://shivanshuchauhan.com",
  },
  openGraph: {
    title: "Shivanshu Chauhan — Software Engineer & Full Stack Developer",
    description:
      "Aesthetic editorial luxury portfolio of Shivanshu Chauhan. Full Stack, DevOps, Java, .NET, React Native, UI/UX, and Shefware cloud engineering.",
    url: "https://shivanshuchauhan.com",
    siteName: "Shivanshu Chauhan Portfolio",
    images: [
      {
        url: "/images/coder-hero.jpg",
        width: 800,
        height: 1067,
        alt: "Shivanshu Chauhan - Software Engineer & Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivanshu Chauhan — Software Engineer & Full Stack Developer",
    description:
      "Full Stack Web Development, DevOps, Java, .NET, React Native, UI/UX, and Shefware engineering.",
    images: ["/images/coder-hero.jpg"],
    creator: "@shivanshuofficials",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "ICBM": "20.5937, 78.9629",
    "geo.position": "20.5937;78.9629",
    "DC.title": "Shivanshu Chauhan — Software Engineer & Full Stack Developer",
    "DC.creator": "Shivanshu Chauhan",
    "DC.description": "Official portfolio of Shivanshu Chauhan, Software Engineer specializing in Full Stack Web Development, DevOps, Java, .NET, React Native, and UI/UX.",
    "DC.publisher": "Shivanshu Chauhan",
    "DC.language": "en",
    "llms": "https://shivanshuchauhan.com/llms.txt",
    "ai-content-declaration": "engineered-by-human,llm-ready",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AEO (Answer Engine Optimization), GEO (Generative Engine Optimization) & SEO Structured Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://shivanshuchauhan.com/#person",
        name: "Shivanshu Chauhan",
        givenName: "Shivanshu",
        familyName: "Chauhan",
        jobTitle: "Software Engineer & Full Stack Developer",
        description:
          "Software Engineer and Full Stack Developer skilled in Full Stack Web Development, DevOps, Java, .NET, React Native, and UI/UX design with professional experience engineering enterprise cloud migration platforms at Shefware (shefware.com).",
        url: "https://shivanshuchauhan.com",
        image: "https://shivanshuchauhan.com/images/coder-hero.jpg",
        email: "shivanshu@shefware.com",
        nationality: {
          "@type": "Country",
          name: "India",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "India",
        },
        worksFor: {
          "@type": "Organization",
          "@id": "https://shefware.com/#organization",
          name: "Shefware",
          url: "https://shefware.com",
          description: "Enterprise cloud migration and automated data backup platform.",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Engineering Institute",
        },
        knowsAbout: [
          "Full Stack Web Development",
          "DevOps & CI/CD Automation",
          "Java & Spring Boot Framework",
          ".NET Core & C#",
          "React Native Cross-Platform Mobile Development",
          "Next.js App Router Architecture",
          "Docker & Containerization",
          "Kubernetes Cluster Deployment",
          "UI/UX Design Systems & Figma",
          "Enterprise Cloud Migration (Microsoft 365, Google Workspace, Exchange)",
          "Database Architecture & PostgreSQL",
          "Redis In-Memory Caching",
          "RESTful APIs & Microservices",
        ],
        sameAs: [
          "https://github.com/shivanshuofficials",
          "https://shefware.com",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://shivanshuchauhan.com/#website",
        url: "https://shivanshuchauhan.com",
        name: "Shivanshu Chauhan Portfolio",
        alternateName: [
          "Shivanshu Chauhan",
          "Shivanshu Chauhan Software Engineer",
          "Shivanshu Chauhan Shefware",
        ],
        description:
          "Official editorial portfolio of Shivanshu Chauhan, Software Engineer & Full Stack Developer.",
        publisher: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://shivanshuchauhan.com/#webpage",
        url: "https://shivanshuchauhan.com",
        name: "Shivanshu Chauhan — Software Engineer & Full Stack Developer Portfolio",
        isPartOf: {
          "@id": "https://shivanshuchauhan.com/#website",
        },
        about: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
        mainEntity: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://shivanshuchauhan.com/#projects",
        name: "Featured Engineering Projects by Shivanshu Chauhan",
        itemListElement: [
          {
            "@type": "SoftwareApplication",
            position: 1,
            name: "Shefware Suite",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Windows, Linux, Cloud",
            description: "High-throughput cloud data migration and automated backup engines for Microsoft 365, Google Workspace, and enterprise mailbox ecosystems.",
            creator: {
              "@id": "https://shivanshuchauhan.com/#person",
            },
          },
          {
            "@type": "SoftwareApplication",
            position: 2,
            name: "Nexus Platform",
            applicationCategory: "Mobile & Web Application",
            operatingSystem: "iOS, Android, Web",
            description: "Cross-platform mobile and web application built with Next.js and React Native with synchronized offline-first state and sub-80ms global API latency.",
            creator: {
              "@id": "https://shivanshuchauhan.com/#person",
            },
          },
          {
            "@type": "SoftwareApplication",
            position: 3,
            name: "Mindspace Arch",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Cloud, Kubernetes",
            description: "Developer dashboard and cloud orchestration platform pairing dark brutalist UI/UX with Kubernetes and Docker automation.",
            creator: {
              "@id": "https://shivanshuchauhan.com/#person",
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://shivanshuchauhan.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Shivanshu Chauhan and what are his core engineering domains?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shivanshu Chauhan is an experienced Software Engineer and Full Stack Developer with proven production experience architecting high-throughput backend services in Java (Spring Boot) and .NET (C#), modern web applications with Next.js and TypeScript, cross-platform mobile apps with React Native, and automated containerized CI/CD pipelines with Docker and Kubernetes.",
            },
          },
          {
            "@type": "Question",
            name: "What is Shivanshu Chauhan's work experience at Shefware (shefware.com)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "At Shefware (shefware.com), Shivanshu Chauhan leads the engineering of enterprise cloud data migration suites, automated backup solutions, and resilient data conversion pipelines supporting Microsoft 365, Google Workspace, and Exchange environments with 99.98% pipeline uptime and zero packet loss.",
            },
          },
          {
            "@type": "Question",
            name: "Which tech stack and programming languages does Shivanshu specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "His primary technical stack includes: Backend (Java, Spring Boot, .NET Core, C#, Node.js, RESTful & streaming APIs), Frontend & Mobile (Next.js App Router, React, React Native, Tailwind CSS, TypeScript), Cloud & DevOps (Docker, Kubernetes, GitHub Actions CI/CD, Linux), and Databases (PostgreSQL, Redis caching, MongoDB, SQL Server).",
            },
          },
          {
            "@type": "Question",
            name: "Does Shivanshu Chauhan build cross-platform mobile apps as well as web platforms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Shivanshu architects unified full-stack monorepos where React Native mobile apps (iOS & Android) share up to 85% of their core business logic, validation schemas, and state stores with high-performance Next.js web applications, drastically reducing latency and maintenance overhead.",
            },
          },
          {
            "@type": "Question",
            name: "Is Shivanshu Chauhan available for hire, freelance, or remote contracts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shivanshu is open to full-time software engineering roles, enterprise cloud migration consulting, and high-impact contracts globally. You can initiate contact directly via email at shivanshu@shefware.com or use the on-page contact modal.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I inspect Shivanshu Chauhan's open-source code and GitHub profile?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can explore his active code repositories, architectural implementations, open-source utilities, and technical repositories directly on GitHub at https://github.com/shivanshuofficials.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jakarta.variable} ${pinyon.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="text/plain" href="https://shivanshuchauhan.com/llms.txt" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

