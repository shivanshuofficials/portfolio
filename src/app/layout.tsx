import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Shivanshu Chauhan — Software Engineer & Full Stack Developer",
  description: "Aesthetic editorial luxury portfolio of Shivanshu Chauhan, Software Engineer specializing in Full Stack Web Development, DevOps, Java, .NET, React Native, UI/UX, and Shefware engineering.",
  keywords: [
    "Shivanshu Chauhan",
    "Software Engineer",
    "Full Stack Developer",
    "Shefware",
    "Java",
    ".NET",
    "DevOps",
    "React Native",
    "UI/UX Designer",
    "Portfolio"
  ],
  authors: [{ name: "Shivanshu Chauhan" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jakarta.variable} ${pinyon.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
