export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  client: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "shefware-cloud-suite",
    number: "01",
    title: "SHEFWARE SUITE",
    category: "Cloud Migration & Enterprise .NET / Java",
    image: "/images/project-velvet.jpg",
    tags: [".NET", "JAVA", "DEVOPS", "CLOUD"],
    client: "Shefware Solutions (shefware.com)",
    year: "2024",
    summary: "High-throughput cloud data migration and automated backup engines for Microsoft 365, Google Workspace, and enterprise mailbox ecosystems.",
    challenge: "Process petabytes of unstructured mailbox and document data with zero packet loss, strict transactional integrity, and concurrent multithreading.",
    solution: "Engineered resilient .NET and Java core engines featuring asynchronous streaming pipelines, automated OAuth2 token rotation, and robust error recovery algorithms.",
    results: ["Over 10M+ items migrated without data loss", "99.98% pipeline uptime across enterprise workloads", "Featured on shefware.com official suite"]
  },
  {
    id: "nexus-fullstack",
    number: "02",
    title: "NEXUS PLATFORM",
    category: "Full Stack & Mobile Architecture",
    image: "/images/project-aurora.jpg",
    tags: ["FULL STACK", "REACT NATIVE", "NEXT.JS", "API"],
    client: "Nexus Global Systems",
    year: "2024",
    summary: "Cross-platform mobile and web application built with Next.js, Node.js, and React Native, harmonizing web and mobile interfaces under a unified API.",
    challenge: "Deliver sub-100ms API response times while maintaining synchronized offline-first state across iOS, Android, and web clients.",
    solution: "Architected a reactive microservice ecosystem with PostgreSQL and Redis caching, paired with a React Native app sharing 85% business logic with the web front-end.",
    results: ["Sub-80ms global API latency", "Cross-platform release on App Store & Play Store", "40% reduction in mobile codebase maintenance"]
  },
  {
    id: "mindspace-systems",
    number: "03",
    title: "MINDSPACE ARCH",
    category: "DevOps & Cloud Infrastructure",
    image: "/images/project-mindspace.jpg",
    tags: ["DEVOPS", "DOCKER", "UI/UX", "JAVA"],
    client: "Mindspace Spatial & Tech",
    year: "2024",
    summary: "A modern developer dashboard and cloud infrastructure orchestration platform marrying luxury brutalist UI/UX with Kubernetes and Docker automation.",
    challenge: "Translate complex distributed cluster telemetry and deployment pipelines into a serene, intuitive executive control interface.",
    solution: "Designed custom dark-aesthetic UI components in Figma and implemented a full CI/CD deployment pipeline with Docker containers and automated staging environments.",
    results: ["Zero-downtime blue/green deployment automated", "70% faster build and deployment cycles", "Highly praised UI/UX design and architectural clarity"]
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "ARCHITECT",
    description: "System design, requirements discovery, and scalable architecture."
  },
  {
    number: "02",
    title: "PROTOTYPE",
    description: "UI/UX wireframing, data schema modeling, and API contract design."
  },
  {
    number: "03",
    title: "DEVELOP",
    description: "Full stack engineering with Java, .NET, Next.js & React Native."
  },
  {
    number: "04",
    title: "DEPLOY",
    description: "DevOps pipelines, Docker containerization, CI/CD, and cloud infra."
  },
  {
    number: "05",
    title: "OPTIMIZE",
    description: "Rigorous testing, security audits, and performance tuning."
  }
];

export const TESTIMONIALS = [
  {
    id: "shefware-lead",
    quote: "Shivanshu is an exceptional software engineer with deep mastery across full stack systems, cloud migration, and clean architecture. His contributions to Shefware have been invaluable.",
    name: "ARUN K.",
    role: "HEAD OF ENGINEERING, SHEFWARE"
  },
  {
    id: "tech-lead",
    quote: "Working with Shivanshu was a masterclass in modern engineering. From Java backend services to mobile React Native apps, his attention to detail and UI aesthetic is unmatched.",
    name: "VIKRAM R.",
    role: "VP OF TECHNOLOGY, CLOUDSCALE"
  },
  {
    id: "product-dir",
    quote: "His ability to bridge technical engineering with refined UI/UX design is rare. He delivers scalable, rock-solid code that looks as good as it performs.",
    name: "ROHIT S.",
    role: "PRODUCT DIRECTOR"
  }
];


export interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category: "Engineering" | "Experience" | "Services" | "Collaboration";
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-who",
    category: "Engineering",
    question: "Who is Shivanshu Chauhan and what are his core engineering domains?",
    shortAnswer: "Software Engineer & Full Stack Developer specializing in Java, .NET, Next.js, React Native, and DevOps.",
    detailedAnswer: "Shivanshu Chauhan is an experienced Software Engineer and Full Stack Developer with proven production experience architecting high-throughput backend services in Java (Spring Boot) and .NET (C#), modern web applications with Next.js and TypeScript, cross-platform mobile apps with React Native, and automated containerized CI/CD pipelines with Docker and Kubernetes."
  },
  {
    id: "faq-shefware",
    category: "Experience",
    question: "What is Shivanshu Chauhan's work experience at Shefware (shefware.com)?",
    shortAnswer: "Engineers enterprise cloud migration suites and automated mailbox backup systems.",
    detailedAnswer: "At Shefware (shefware.com), Shivanshu Chauhan leads the engineering of enterprise cloud data migration suites, automated backup solutions, and resilient data conversion pipelines supporting Microsoft 365, Google Workspace, and Exchange environments with 99.98% pipeline uptime and zero packet loss."
  },
  {
    id: "faq-stack",
    category: "Engineering",
    question: "Which tech stack and programming languages does Shivanshu specialize in?",
    shortAnswer: "Java, .NET (C#), TypeScript, Next.js, React Native, Docker, Kubernetes, and PostgreSQL.",
    detailedAnswer: "His primary technical stack includes: Backend (Java, Spring Boot, .NET Core, C#, Node.js, RESTful & streaming APIs), Frontend & Mobile (Next.js App Router, React, React Native, Tailwind CSS, TypeScript), Cloud & DevOps (Docker, Kubernetes, GitHub Actions CI/CD, Linux), and Databases (PostgreSQL, Redis caching, MongoDB, SQL Server)."
  },
  {
    id: "faq-mobile-web",
    category: "Services",
    question: "Does Shivanshu Chauhan build cross-platform mobile apps as well as web platforms?",
    shortAnswer: "Yes, cross-platform iOS and Android apps with React Native sharing code with Next.js web apps.",
    detailedAnswer: "Yes. Shivanshu architects unified full-stack monorepos where React Native mobile apps (iOS & Android) share up to 85% of their core business logic, validation schemas, and state stores with high-performance Next.js web applications, drastically reducing latency and maintenance overhead."
  },
  {
    id: "faq-hire",
    category: "Collaboration",
    question: "Is Shivanshu Chauhan available for hire, freelance, or remote contracts?",
    shortAnswer: "Yes, available worldwide for full-time engineering roles, high-impact contracts, and enterprise consulting.",
    detailedAnswer: "Shivanshu is open to full-time software engineering roles, enterprise cloud migration consulting, and high-impact contracts globally. You can initiate contact directly via email at shivanshuchauhanofficials@gmail.com or use the on-page contact modal."
  },
  {
    id: "faq-education",
    category: "Experience",
    question: "What is Shivanshu Chauhan's educational qualification and college?",
    shortAnswer: "Bachelor of Computer Applications (BCA) from I.T.S College Mohan Nagar Ghaziabad (2023–26).",
    detailedAnswer: "Shivanshu Chauhan is pursuing his Bachelor of Computer Applications (BCA) at the prestigious I.T.S College Mohan Nagar, Ghaziabad (its.edu.in), Batch 2023–2026, combining formal computer science education with hands-on enterprise software engineering, distributed cloud systems, and modern web architectures."
  },
  {
    id: "faq-companies",
    category: "Experience",
    question: "Which companies and brands does Shivanshu Chauhan engineer software for?",
    shortAnswer: "Shefware (shefware.com), Sky States LLC (skystates.us), Xziant Communications (xziant.com), and OSTtoPST.us.",
    detailedAnswer: "Shivanshu's engineering engagements span multiple technology enterprises: Shefware (enterprise cloud migration & backup suites), Sky States LLC (EdTech, AI & cloud training platforms), Xziant Communications (telecommunications & technology solutions), and OST to PST Online (high-speed mailbox data recovery)."
  },
  {
    id: "faq-github",
    category: "Collaboration",
    question: "Where can I inspect Shivanshu Chauhan's open-source code and GitHub profile?",
    shortAnswer: "Public repositories and code contributions are accessible at github.com/shivanshuofficials.",
    detailedAnswer: "You can explore his active code repositories, architectural implementations, open-source utilities, and technical repositories directly on GitHub at https://github.com/shivanshuofficials."
  }
];


export interface DomainShowcase {
  id: string;
  name: string;
  url: string;
  displayUrl: string;
  tagline: string;
  category: string;
  role: string;
  image: string;
  description: string;
  engineeringHighlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
}

export const DOMAIN_SHOWCASE: DomainShowcase[] = [
  {
    id: "shefware",
    name: "Shefware",
    url: "https://www.shefware.com/",
    displayUrl: "shefware.com",
    tagline: "Enterprise Data Migration, Backup & Disaster Recovery Suite",
    category: "Cloud Migration & Enterprise Infrastructure",
    role: "Core Software Engineering & System Architecture",
    image: "/images/showcase-shefware.jpg",
    description: "Shefware delivers enterprise-grade software solutions for automated mailbox backup, high-throughput cloud data migration, data governance, and recovery across Microsoft 365, Google Workspace, and Microsoft Exchange ecosystems.",
    engineeringHighlights: [
      "Engineered multi-threaded data streaming pipelines processing petabytes of mailbox archives.",
      "Achieved 99.98% pipeline uptime with zero packet loss and transactional integrity.",
      "Automated OAuth2 token rotation and throttling handling for Microsoft Graph and Google Workspace APIs.",
      "Architected secure file conversion protocols and distributed recovery microservices."
    ],
    stack: [".NET Core", "Java / Spring Boot", "Next.js", "Docker", "PostgreSQL", "OAuth2", "Cloud Streams"],
    metrics: [
      { label: "Items Migrated", value: "10M+" },
      { label: "Pipeline Uptime", value: "99.98%" },
      { label: "Data Loss", value: "0%" }
    ]
  },
  {
    id: "osttopst",
    name: "OST to PST Online",
    url: "https://www.osttopst.us/",
    displayUrl: "osttopst.us",
    tagline: "High-Performance Mailbox & Attachment Recovery Platform",
    category: "Data Conversion & Systems Utility",
    role: "Full Stack Engineering, Conversion Engine & Performance Optimization",
    image: "/images/showcase-osttopst.jpg",
    description: "OSTtoPST.us is a specialized web-driven utility platform for converting Outlook OST storage files into PST formats without requiring local Microsoft Outlook installations. It safely recovers emails, contacts, calendar entries, and nested attachments while strictly preserving hierarchical folder structures.",
    engineeringHighlights: [
      "Built resilient streaming parser capable of reading corrupted and orphaned OST files.",
      "Engineered secure browser-to-server encrypted upload pipeline with automatic artifact cleanup.",
      "Preserved complex MIME headers, metadata timestamps, and nested folder trees.",
      "Optimized front-end conversion dashboard with sub-second feedback and live status telemetry."
    ],
    stack: ["C# / .NET", "Java", "Vite / Modern JS", "Tailwind CSS", "REST APIs", "AWS S3 Encrypted Storage"],
    metrics: [
      { label: "Outlook Required", value: "No" },
      { label: "Folder Integrity", value: "100%" },
      { label: "Processing Speed", value: "High-Speed" }
    ]
  },
  {
    id: "skystates",
    name: "Sky States",
    url: "https://skystates.us/",
    displayUrl: "skystates.us",
    tagline: "Premier EdTech, AI, Data Science & Cybersecurity Bootcamp Platform",
    category: "EdTech, AI & Cloud Training Systems",
    role: "Web Architecture, Full Stack Development & SEO/Performance Engineering",
    image: "/images/showcase-skystates.jpg",
    description: "Sky States is a modern EdTech and technical workforce development platform headquartered in Seattle, Washington. It offers comprehensive online instructor-led and cohort-based training in Data Science, Artificial Intelligence, DevOps, and Cybersecurity with hands-on labs and career support.",
    engineeringHighlights: [
      "Designed and developed scalable high-performance web architecture with Astro and modern JavaScript.",
      "Engineered course delivery modules, interactive syllabus navigators, and lead generation funnels.",
      "Implemented comprehensive structured SEO, Schema.org graph, and Core Web Vitals optimization.",
      "Architected responsive learning dashboards and mock interview integration channels."
    ],
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Node.js", "SEO & Schema.org", "Cloudflare CDN"],
    metrics: [
      { label: "Learning Paths", value: "AI, DevOps, Sec" },
      { label: "Platform Latency", value: "<100ms" },
      { label: "Core Web Vitals", value: "98+" }
    ]
  }
];



