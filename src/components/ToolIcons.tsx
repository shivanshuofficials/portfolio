import React from "react";

export function JavaIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 19c4.5 1.5 11.5 1.5 16 0M6 21c3 1 9 1 12 0" stroke="#f89820" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14.5 3.5c-2 2-2 4 0 6s-2 4 0 6M9.5 5.5c-2 1.5-2 3.5 0 5.5s-2 3.5 0 5.5" stroke="#5382a1" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function DotNetIcon({ className = "" }: { className?: string }) {
  return (
    <div style={{
      width: "26px",
      height: "26px",
      borderRadius: "6px",
      backgroundColor: "#17072b",
      border: "1px solid #753be8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: "10px",
      color: "#a370f7",
      letterSpacing: "-0.5px"
    }}>
      .NET
    </div>
  );
}

export function ReactIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61dafb" />
    </svg>
  );
}

export function DockerIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="10" width="3" height="3" fill="#2496ed" rx="0.5" />
      <rect x="6" y="10" width="3" height="3" fill="#2496ed" rx="0.5" />
      <rect x="10" y="10" width="3" height="3" fill="#2496ed" rx="0.5" />
      <rect x="6" y="6" width="3" height="3" fill="#2496ed" rx="0.5" />
      <rect x="10" y="6" width="3" height="3" fill="#2496ed" rx="0.5" />
      <path d="M1 14c1 4 4.5 6 11 6 7 0 10.5-2.5 11-6-1.5-.5-3.5-1-6 0-1-2-3-2-5-2H1z" fill="#2496ed" opacity="0.85" />
    </svg>
  );
}

export function FigmaIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="24" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
    </svg>
  );
}

export function WebflowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="22" height="16" viewBox="0 0 114 74" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M113.844 0L76.9928 73.136H41.5361L58.5529 39.4628C47.2625 40.5401 36.3263 46.5441 33.5651 58.7479L30.0163 73.136H0L24.3164 24.3828H48.6328L40.2319 41.0538C45.3905 38.647 52.8872 36.6344 59.819 36.6344C66.8624 36.6344 68.3243 40.8525 68.3243 45.4199L86.8407 8.79093H62.9157L54.7779 24.9602H41.5361L53.9431 0H113.844Z" fill="#4353FF"/>
    </svg>
  );
}

export function ReactNativeIcon({ className = "" }: { className?: string }) {
  return (
    <div style={{
      width: "26px",
      height: "26px",
      borderRadius: "6px",
      backgroundColor: "#0d1b2a",
      border: "1px solid #61dafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: "9px",
      color: "#61dafb",
      letterSpacing: "-0.5px"
    }}>
      RN
    </div>
  );
}

export function TypeScriptIcon({ className = "" }: { className?: string }) {
  return (
    <div style={{
      width: "24px",
      height: "24px",
      borderRadius: "5px",
      backgroundColor: "#002a4a",
      border: "1px solid #3178c6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: "11px",
      color: "#3178c6",
      letterSpacing: "-0.5px"
    }}>
      TS
    </div>
  );
}

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

export function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}


