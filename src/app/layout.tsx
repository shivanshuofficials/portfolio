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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AEO (Answer Engine Optimization) & SEO Structured Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://shivanshuchauhan.com/#person",
        name: "Shivanshu Chauhan",
        givenName: "Shivanshu",
        familyName: "Chauhan",
        jobTitle: "Software Engineer",
        description:
          "Software Engineer and Full Stack Developer skilled in Full Stack Web Development, DevOps, Java, .NET, React Native, and UI/UX design with professional experience at shefware.com.",
        url: "https://shivanshuchauhan.com",
        image: "https://shivanshuchauhan.com/images/coder-hero.jpg",
        email: "shivanshu@shefware.com",
        worksFor: {
          "@type": "Organization",
          name: "Shefware",
          url: "https://shefware.com",
        },
        knowsAbout: [
          "Full Stack Web Development",
          "DevOps & CI/CD",
          "Java & Spring Boot",
          ".NET & C#",
          "React Native Mobile Development",
          "Next.js Architecture",
          "Docker & Containerization",
          "Kubernetes",
          "UI/UX Design & Figma",
          "Enterprise Cloud Migration",
          "Database Architecture & PostgreSQL",
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
        description:
          "Official portfolio of Shivanshu Chauhan, Software Engineer & Full Stack Developer.",
        publisher: {
          "@id": "https://shivanshuchauhan.com/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": "https://shivanshuchauhan.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Shivanshu Chauhan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shivanshu Chauhan is a Software Engineer and Full Stack Developer with expertise in Full Stack Web Development, DevOps, Java, .NET, React Native, and UI/UX design, with experience engineering enterprise solutions at shefware.com.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies does Shivanshu Chauhan specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shivanshu Chauhan specializes in Java (Spring Boot), .NET (C#), Next.js, React, React Native for cross-platform mobile apps, DevOps with Docker and CI/CD pipelines, and modern UI/UX design in Figma.",
            },
          },
          {
            "@type": "Question",
            name: "What is Shivanshu Chauhan's experience at Shefware?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "At Shefware (shefware.com), Shivanshu Chauhan works on enterprise-grade cloud migration suites, automated mailbox backup platforms, and resilient file conversion utilities supporting Microsoft 365, Google Workspace, and Exchange environments.",
            },
          },
          {
            "@type": "Question",
            name: "Where can I view Shivanshu Chauhan's work and GitHub profile?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can view Shivanshu Chauhan's repositories, project code, and technical contributions directly on GitHub at https://github.com/shivanshuofficials.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${bodoni.variable} ${jakarta.variable} ${pinyon.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
