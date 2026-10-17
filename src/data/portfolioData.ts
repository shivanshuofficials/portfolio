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

